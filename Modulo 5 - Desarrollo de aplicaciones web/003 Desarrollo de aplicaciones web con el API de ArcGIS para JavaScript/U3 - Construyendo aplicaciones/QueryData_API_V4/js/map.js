require([
    "esri/config",
    "esri/Map",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Graphic",
    "esri/geometry/geometryEngine",    
    "esri/views/draw/Draw",
    "esri/views/MapView",
    "esri/Color",
    "esri/widgets/Expand",
    "esri/widgets/Legend",
    "esri/widgets/FeatureTable",
], function (EsriConfig, Map, MapImageLayer, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Graphic, geometryEngine, Draw, MapView, Color, Expand, Legend, FeatureTable) {
    EsriConfig.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";

    // URL variables
    var sUrlUSAService = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer";
    var sUrlQuakesLayer = "http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0";

    // Create the map
    var mapMain = new Map({
        basemap: "satellite"
    });

    // Create the map view
    var view = new MapView({
        container: "divMap",
        map: mapMain,
        center: [-119.65, 36.87],
        zoom: 4
    });

    // Construct the USA layer
    var lyrUSA = new MapImageLayer({
        url: sUrlUSAService,
        opacity: 0.5
    });
    lyrUSA.visibleLayers = [0, 1, 3];
    mapMain.add(lyrUSA);

    /*
     * Step: Specify the output fields
     */
    var outFieldsQuakes = ["EQID", "UTC_DATETIME", "MAGNITUDE", "PLACE"];

    // Construct the Quakes layer
    var lyrQuakes = new FeatureLayer({
        url: sUrlQuakesLayer,
        outFields: outFieldsQuakes
    });
    mapMain.add(lyrQuakes);

    /*
     * Step: Wire the draw tool initialization function
     */
    view.when(function () {
        initDrawTool();
    });

    function initDrawTool() {
        /*
        * Step: Implement the Draw toolbar
        */
        var tbDraw = new Draw({ view: view });
        let action = tbDraw.create("polygon");

        action.on("vertex-add", function (evt) {
            createPolygonGraphic(evt.vertices);
        });

        action.on("vertex-remove", function (evt) {
            createPolygonGraphic(evt.vertices);
        });

        action.on("cursor-update", function (evt) {
            createPolygonGraphic(evt.vertices);
        });

        action.on("draw-complete", displayPolygon);

    }

    function createPolygonGraphic(vertices) {
        view.graphics.removeAll();
        let polygon = {
            type: "polygon", // autocasts as Polygon
            rings: vertices,
            spatialReference: view.spatialReference
        };

        let graphic = new Graphic({
            geometry: polygon,
            symbol: {
                type: "simple-fill", // autocasts as SimpleFillSymbol
                color: "purple",
                style: "solid",
                outline: {  // autocasts as SimpleLineSymbol
                    color: "white",
                    width: 1
                }
            }
        });
        view.graphics.add(graphic);
    }

    function displayPolygon(evt) {
        const vertices = evt.vertices;
        view.graphics.removeAll();

        // a graphic representing the polyline that is being drawn
        const graphic = new Graphic({
            geometry: {
                type: "polyline",
                paths: vertices,
                spatialReference: view.spatialReference
            },
            symbol: {
                type: "simple-fill", // autocasts as SimpleFillSymbol
                color: [255, 255, 0, 0.5], // yellow with 50% transparency
                outline: {  // autocasts as SimpleLineSymbol
                    color: "yellow",
                    width: 3,
                    style: "dash-dot"
                }
            }
        });
        view.graphics.add(graphic);
    }

    function selectQuakes(geometryInput) {

        // Define symbol for selected features (using JSON syntax for improved readability!)
        var symbolSelected = new SimpleMarkerSymbol({
            "type": "esriSMS",
            "style": "esriSMSCircle",
            "color": [255, 115, 0, 128],
            "size": 6,
            "outline": {
                "color": [255, 0, 0, 214],
                "width": 1
            }
        });

    }

    function populateGrid(results) {
        var gridData = results.features.map(function (feature) {
            return {
                EQID: feature.attributes.EQID,
                UTC_DATETIME: feature.attributes.UTC_DATETIME,
                MAGNITUDE: feature.attributes.MAGNITUDE,
                PLACE: feature.attributes.PLACE
            };
        });

        // Create the feature table
        var featureTable = new FeatureTable({
            view: view,
            layer: lyrQuakes,
            fieldConfigs: [{
                name: "EQID",
                label: "ID"
            }, {
                name: "UTC_DATETIME",
                label: "Date/Time",
                format: {
                    dateFormat: "short-date-short-time"
                }
            }, {
                name: "MAGNITUDE",
                label: "Mag"
            }, {
                name: "PLACE",
                label: "Place"
            }]
        });

        // Create the expand widget for the feature table
        var expand = new Expand({
            view: view,
            content: featureTable
        });

        // Add the feature table and expand widget to the view
        view.ui.add(expand, "top-right");

        // Set the data for the feature table
        featureTable.set("data", gridData);
    }

});
