require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapToggle",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend",
    "esri/geometry/Extent"
], function (EsriConfig, Map, MapView, MapImageLayer, FeatureLayer, BasemapToggle, ScaleBar, Legend, Extent) {
    EsriConfig.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";

    var map = new Map({
        basemap: "satellite"
    });

    var view = new MapView({
        container: "mapViewDiv", // This should be the ID of the div where you want to display the map
        map: map,
        extent: new Extent({
            xmin: -14462706.515378611,
            ymin: 3626924.807223475,
            xmax: -12496134.65165812,
            ymax: 5471197.425687718,
            spatialReference: { wkid: 3857 }
        })
    });

    var lyrUSA = new MapImageLayer({
        url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
        opacity: 0.5
    });

    var lyrQuakes = new FeatureLayer({
        url: "http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0",
        definitionExpression: "MAGNITUDE >= 2.0"
    });

    map.addMany([lyrUSA, lyrQuakes]);

    view.when(function () {
        var basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: "streets"
        });

        view.ui.add(basemapToggle, "top-right");

        var legend = new Legend({
            view: view,
            layerInfos: [{
                layer: lyrQuakes,
                title: "Earthquakes"
            }, {
                layer: lyrUSA,
                title: "USA"
            }]
        });

        // Add scalebar with custom style
        var scaleBar = new ScaleBar({
            view: view,
            style: "ruler",
            unit: "dual"
        });

        view.ui.add(scaleBar, {
            position: "bottom-left"
        });

        // Asignar el contenedor de la leyenda al div específico en lugar de añadirlo al mapa
        // Esto insertará el widget de leyenda dentro del div con id="legendPanel"
        legend.container = document.getElementById("legendPanel");
    });

    

});
