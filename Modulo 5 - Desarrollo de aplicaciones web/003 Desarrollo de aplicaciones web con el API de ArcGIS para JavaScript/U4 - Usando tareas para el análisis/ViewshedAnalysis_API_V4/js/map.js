require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/rest/support/FeatureSet",
    "esri/rest/support/LinearUnit",    
    "esri/rest/geoprocessor",
    "esri/widgets/Print",
    "esri/rest/support/PrintTemplate",    
], function (EsriConfig, Map, MapView, Graphic, Point, FeatureSet, LinearUnit, geoprocessor, Print, PrintTemplate) {
    EsriConfig.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";
    var mapMain = new Map({
        basemap: "topo"
    });

    var view = new MapView({
        container: "divMap",
        map: mapMain,
        center: [-122.45, 37.75],
        zoom: 12
    });

    const gpUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed";

    const markerSymbol = {
        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
        size: "12px",  // pixels
        color: [0, 0, 0],
        outline: {  // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 3  // points
        }
    };

    const polygonSymbol = {
        type: "simple-fill",
        color: [255, 127, 0, 0.5],
        outline: {
            color: [255, 255, 0, 0.5],
            width: 1
        },
    };

    view.when(function () {

        view.on("click", function (event) {
            var point = new Point({
                longitude: event.mapPoint.longitude,
                latitude: event.mapPoint.latitude,
                spatialReference: view.spatialReference
            });

            var graphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
            });

            view.graphics.removeAll();
            view.graphics.add(graphic);

            
            var inputPoint = new FeatureSet();
            inputPoint.features = [graphic];

            var distance = new LinearUnit({
                distance: 5,
                units: "miles"
            });

            var params = {
                "Input_Observation_Point": inputPoint,
                "Viewshed_Distance": distance
            };

            geoprocessor.execute(gpUrl, params)
                .then(function (results) {
                    var resultFeatures = results.results[0].value.features;

                    view.graphics.removeAll();

                    var viewshedGraphics = resultFeatures.map((feature) => {
                        feature.symbol = polygonSymbol;
                        return feature;
                      });

                    view.graphics.addMany(viewshedGraphics);

                    view.goTo(resultFeatures);
                })
                .catch(function (error) {
                    console.error("Error:", error);
                });
        });

    });



    const myLayouts = [{
        "name": "Letter ANSI A Landscape",
        "label": "Landscape (PDF)",
        "format": "pdf",
        "options": {
            "legendLayers": [], // empty array means no legend
            "scalebarUnit": "Miles",
            "titleText": "Landscape PDF"
        }
    }, {
        "name": "Letter ANSI A Portrait",
        "label": "Portrait (JPG)",
        "format": "jpg",
        "options": {
            "legendLayers": [],
            "scaleBarUnit": "Miles",
            "titleText": "Portrait JPG"
        }
    }];

    const myTemplates = myLayouts.map(function (lo) {
        var t = new PrintTemplate({
            layout: lo.name,
            label: lo.label,
            format: lo.format,
            layoutOptions: lo.options
        });
        return t;
    });

    var print = new Print({
        view: view,
        printServiceUrl: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
        templates: myTemplates
    });

    view.ui.add(print, "bottom-right");    

});
