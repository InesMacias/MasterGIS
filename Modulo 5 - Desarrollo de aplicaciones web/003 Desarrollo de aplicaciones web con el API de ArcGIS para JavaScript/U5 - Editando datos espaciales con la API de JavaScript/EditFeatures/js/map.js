var mapMain;
var widgetEditor;

require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/tasks/GeometryService",
    "esri/dijit/editing/Editor",
    "esri/dijit/editing/TemplatePicker",
    "esri/config",

    "dojo/ready",
    "dojo/parser",
    "dojo/on",
    "dojo/_base/array",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"],
    function (Map, FeatureLayer, GeometryService, Editor, TemplatePicker, config,
        ready, parser, on, array,
        BorderContainer, ContentPane) {
        ready(function () {

            parser.parse();

            mapMain = new Map("divMap", {
                basemap: "topo",
                center: [-116.64, 34.37],
                zoom: 10
            });

            var flFirePoints, flFireLines, flFirePolygons;

            flFirePoints = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0", {
                outFields: ['*']
            });
            flFireLines = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/1", {
                outFields: ['*']
            });
            flFirePolygons = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2", {
                outFields: ['*']
            });

            mapMain.on("layers-add-result", initEditor);

            mapMain.addLayers([flFirePolygons, flFireLines, flFirePoints]);

            function initEditor(results) {

                var layerInfosWildfire = array.map(results.layers, function (result) {
                    return {
                        featureLayer: result.layer
                    };
                });

                var layersWildfire = array.map(results.layers, function (result) {
                    return result.layer;
                });

                var tpCustom = new TemplatePicker({
                    featureLayers: layersWildfire,
                    columns: 2
                }, "divLeft");
                tpCustom.startup();

                var editorSettings = {
                    map: mapMain,
                    geometryService: new GeometryService("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer"),
                    layerInfos: layerInfosWildfire,
                    toolbarVisible: true,
                    templatePicker: tpCustom,
                    createOptions: {
                        polygonDrawTools: [Editor.CREATE_TOOL_FREEHAND_POLYGON, Editor.CREATE_TOOL_RECTANGLE, Editor.CREATE_TOOL_TRIANGLE, Editor.CREATE_TOOL_CIRCLE]
                    },
                    toolbarOptions: {
                        reshapeVisible: true
                    },
                    enableUndoRedo: true,
                    maxUndoRedoOperations: 20
                };

                var editorParams = {
                    settings: editorSettings
                };

                widgetEditor = new Editor(editorParams, "divTop");
                widgetEditor.startup();

            };

        });
    });
