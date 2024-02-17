require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/rest/locator",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/TextSymbol",
    "esri/symbols/Font",
], function (EsriConfig, Map, MapView, Graphic, locator, SimpleMarkerSymbol, TextSymbol, Font) {
    EsriConfig.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";


    // Create the map
    var mapMain = new Map({
        basemap: "topo"
    });

    var view = new MapView({
        container: "cpCenter",
        map: mapMain,
        center: [-117.19, 34.05],
        zoom: 13
    });

    /*
     * Step: Construct and bind the Locator task
     */
    // var taskLocator = new locator({
    //     url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    // });

    /*
     * Step: Wire the button's onclick event handler
     */
    document.getElementById("btnLocate").addEventListener("click", doAddressToLocations);

    /*
     * Step: Wire the task's completion event handler
     */
    //taskLocator.on("locate", showResults);

    function doAddressToLocations() {
        view.graphics.removeAll();
    
        /*
         * Step: Complete the Locator input parameters
         */
        var objAddress = {
            "SingleLine": document.getElementById("taAddress").value
        }
        var params = {
            address: objAddress,
            outFields: ["Loc_name"]
        }

        /*
         * Step: Execute the task
         */
        // taskLocator.locate(params);


        url = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
        res = locator.addressToLocations(url,params).then(showResults);

    }

    function showResults(event) {
        var candidates = event;

        // Define the symbology used to display the results
        var symbolMarker = new SimpleMarkerSymbol({
            style: "circle",
            color: [255, 0, 0, 0.75]
        });
        var font = new Font({
            size: "14pt",
            weight: "normal"
        });

        // loop through the array of AddressCandidate objects
        candidates.forEach(function (candidate) {

            // if the candidate was a good match
            if (candidate.score > 80) {

                // retrieve attribute info from the candidate
                var attributesCandidate = {
                    address: candidate.address,
                    score: candidate.score,
                    locatorName: candidate.attributes.Loc_name
                };

                /*
                 * Step: Retrieve the result's geometry
                 */
                var geometryLocation = candidate.location;

                /*
                 * Step: Display the geocoded location on the map
                 */
                var graphicResult = new Graphic({
                    geometry: geometryLocation,
                    symbol: symbolMarker,
                    attributes: attributesCandidate
                });
                view.graphics.add(graphicResult);

                // display the candidate's address as text
                var sAddress = candidate.address;
                var textSymbol = new TextSymbol({
                    text: sAddress,
                    font: font,
                    color: "#FF0000",
                    yoffset: -22
                });
                view.graphics.add(new Graphic({
                    geometry: geometryLocation,
                    symbol: textSymbol
                }));

                // exit the loop after displaying the first good match
                return;
            }
        });

        // Center and zoom the map on the result
        if (candidates.length > 0) {
            view.goTo({
                target: candidates[0].location,
                zoom: 15
            });
        }
    }

});
