require([
    "esri/config",
    "esri/Map",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Graphic",
    "esri/views/draw/Draw",
    "esri/views/MapView",
    "esri/widgets/Expand",    
    "esri/widgets/FeatureTable",
    "esri/rest/query"
], function (EsriConfig, Map, MapImageLayer, FeatureLayer, SimpleMarkerSymbol, Graphic, Draw, MapView, Expand, FeatureTable, query) {
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

        // get the geometry from graphic and use it to select features
        selectQuakes(graphic.geometry);
    }

    function selectQuakes(geometryInput) {
        // Define symbol for selected features
        let symbolSelected = {
            type: "simple-marker",
            style: "circle",
            color: [255, 115, 0, 128],
            size: 6,
            outline: {
                color: [255, 0, 0, 214],
                width: 1
            }
        };

        // Select the features that intersect the drawn polygon
        var queryParams = lyrQuakes.createQuery();
        queryParams.geometry = geometryInput;
        lyrQuakes.queryFeatures(queryParams)
            .then(function (results) {
                // Apply the renderer to the selected features
                populateGrid(results);
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
            container: "divGrid",
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


        // Set the data for the feature table
        featureTable.set("data", gridData);





    }

});
