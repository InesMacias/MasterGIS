var mapMain;

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Directions",
    "esri/layers/RouteLayer",
    "esri/widgets/Print",
    "esri/rest/support/PrintTemplate",
], function (EsriConfig, Map, MapView, Directions, RouteLayer, Print, PrintTemplate) {
    EsriConfig.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";

    var myLayouts = [{
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

    var myTemplates = myLayouts.map(function (lo) {
        var t = new PrintTemplate({
            layout: lo.name,
            label: lo.label,
            format: lo.format,
            layoutOptions: lo.options
        });
        return t;
    });

    const routeLayer = new RouteLayer();

    mapMain = new Map({
        basemap: "topo",
        layers: [routeLayer]
    });

    var view = new MapView({
        container: "cpCenter",
        map: mapMain,
        center: [-117.19, 34.05],
        zoom: 13
    });

    var directions = new Directions({
        view: view,
        layer: routeLayer
    });

    view.ui.add(directions, "top-right");
    var directionsContainer = document.getElementById("divDirections");
    directionsContainer.appendChild(directions.container);

    var print = new Print({
        view: view,
        printServiceUrl: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
        templates: myTemplates
    });

    view.ui.add(print, "top-right");

    var printContainer = document.getElementById("divPrint");
    printContainer.appendChild(print.container);

});
