var mapMain;

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Search"

], function (EsriConfig,Map, MapView, Search) {
    EsriConfig.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";

    // Create the map
    mapMain = new Map({
        basemap: "topo"
    });

    var view = new MapView({
        container: "cpCenter",
        map: mapMain,
        center: [-117.19, 34.05],
        zoom: 13
    });

    /*
     * Step: Add the Search widget
     */
    var searchWidget = new Search({
        view: view,
        includeDefaultSources: true,
        autocomplete: true,
        popupEnabled: true
    });

    view.ui.add(searchWidget, {
        position: "top-left",
    });

});
