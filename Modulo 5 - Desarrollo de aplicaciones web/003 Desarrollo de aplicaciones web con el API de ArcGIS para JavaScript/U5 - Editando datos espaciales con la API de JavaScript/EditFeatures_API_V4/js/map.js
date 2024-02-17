require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Editor",    
    "esri/widgets/Sketch",
    "esri/config"
], function (Map, MapView, FeatureLayer, Editor, Sketch, config) {

    config.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";
    config.portalUrl = "https://www.arcgis.com";

    const mapMain = new Map({
        basemap: "topo",
        ground: "world-elevation"
    });

    const view = new MapView({
        container: "divMap",
        map: mapMain,
        center: [-116.64, 34.37],
        zoom: 10
    });

    // Construct the editable layers
    const flFirePoints = new FeatureLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0",
        outFields: ["*"]
    });
    const flFireLines = new FeatureLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/1",
        outFields: ["*"]
    });
    const flFirePolygons = new FeatureLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2",
        outFields: ["*"]
    });

    view.whenLayerView(flFirePoints).then(initEditor());

    mapMain.addMany([flFirePolygons, flFireLines, flFirePoints]);

    function initEditor() {
        var layerInfosWildfire = [
            {
                layer: flFirePoints,
                addEnabled: true,
                updateEnabled: true,
                deleteEnabled: true               
            },
            {
                layer: flFireLines,
                addEnabled: true,
                updateEnabled: true,
                deleteEnabled: true               
            },
            {
                layer: flFirePolygons,
                addEnabled: true,
                updateEnabled: true,
                deleteEnabled: true               
            }
        ];



        var widgetEditor = new Editor({
            view : view,
            allowedWorkflows: ["create","update"],
            layerInfos: layerInfosWildfire,
            tooltipOptions: {
                enabled: true
            }
          
        });

        view.ui.add(widgetEditor);

        var editorContainer = document.getElementById("divLeft");
        editorContainer.appendChild(widgetEditor.container);      
        
        
        // const sketch = new Sketch({
        //     view : view,
        //     layer: flFirePolygons
        //   });


        // view.ui.add(sketch, "top-right");         

        // widgetEditor.on("activeWorkflowChanged", function() {
        //     if (widgetEditor.activeWorkflow) {
        //       var activeLayer = widgetEditor.activeWorkflow.viewModel.inputFeatureLayer;
        //       sketch.layer = activeLayer;
        //     }
        //   });

    }
});
