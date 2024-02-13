var mapMain;

// @formatter:off
require([
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/dijit/BasemapToggle",
        "esri/dijit/Legend",
        "esri/dijit/Scalebar",

        "dojo/ready",
        "dojo/parser",
        "dojo/on",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map, Extent, ArcGISDynamicMapServiceLayer, FeatureLayer, BasemapToggle, Legend, Scalebar,
              ready, parser, on,
              BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            /*
             * Step: Specify the initial extent
             * Note: Exact coordinates may vary slightly from snippet/solution
             * Reference: https://developers.arcgis.com/javascript/jssamples/fl_any_projection.html
             */
            var extentInitial = new Extent({
                "xmin": -14462706.515378611,
                "ymin": 3626924.807223475,
                "xmax": -12496134.65165812,
                "ymax": 5471197.425687718,
                "spatialReference": {
                    "wkid": 102100
                }
            });

            // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "satellite",
                extent: extentInitial
            });

            /*
             * Step: Add the USA map service to the map
             */
            var lyrUSA = new ArcGISDynamicMapServiceLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer", {
                opacity: 0.5
            });
            //mapMain.addLayer(lyrUSA);

            /*
             * Step: Add the earthquakes layer to the map
             */
            var lyrQuakes = new FeatureLayer("http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0");
            lyrQuakes.setDefinitionExpression("MAGNITUDE >= 2.0");
            //mapMain.addLayer(lyrQuakes);

            /*
            * Step: Revise code to use the addLayers() method
            */
            mapMain.addLayers([lyrUSA, lyrQuakes]);


            /* Step: Add a BasemapToggle widget to the map
             */
            var toggle = new BasemapToggle({
                map: mapMain,
                basemap: "topo"}, "BasemapToggle");
            toggle.startup();

            /*
            * Step: Add the scalebar widget to the map
            */
            var scalebar = new Scalebar({
                map: mapMain,
                scalebarUnit: "dual",
                attchTo: "bottom-left"
            });

            /* Step: Add a legend once all layers have been added to the map
             */
            
            mapMain.on("layers-add-result", function() {
                var dijitLegend = new Legend({
                    map: mapMain,
                    arrangement: Legend.ALIGN_RIGHT
                }, "divLegend");
                dijitLegend.startup();
            });
       
        });
    });