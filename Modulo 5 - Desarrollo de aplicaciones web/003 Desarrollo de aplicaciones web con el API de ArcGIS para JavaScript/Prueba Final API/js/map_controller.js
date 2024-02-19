class MapController {
    

    constructor(containerElement) {
        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/config"
        ], (Map, MapView, config) => {

            config.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";
            config.portalUrl = "https://www.arcgis.com";

            this.mapMain = new Map({
                basemap: "topo",
                ground: "world-elevation"
            });

            this.view = new MapView({
                container: containerElement,
                map: this.mapMain,
                center: [-97.5, 38.5],
                zoom: 4
            });

        });
    }

    AddLeyenda(leyendaContainer) {
        require([
            "esri/widgets/Legend"
        ], (Legend) => {
            this.legend = new Legend({
                view: this.view,
                title: "Leyenda",
                container: leyendaContainer
            });
    
        });
    }

    AddDynamicLayer(url) {
        require([
            "esri/layers/MapImageLayer"
        ], (MapImageLayer) => {
            this.dynamicLayer = new MapImageLayer({
                url: url
            });

            this.mapMain.add(this.dynamicLayer);
        });
    }

    AddSearchWidget(searchContainer) {
        require([
            "esri/widgets/Search"
        ], (Search) => {
            this.search = new Search({
                view: this.view,
                container: searchContainer 
            });

            if (!searchContainer) {
                this.view.ui.add(this.search, "top-right");
            }
        });
    }

    AddBaseMapoGallery(basemapGalleryContainer) {
        require([
            "esri/widgets/BasemapGallery",
            "esri/widgets/Expand"
        ], (BasemapGallery,Expand) => {

            var basemapGallery = new BasemapGallery({
                view: this.view,
                container: basemapGalleryContainer
            });


            if (!basemapGalleryContainer) {
                var expand = new Expand({
                    expandIconClass: "esri-icon-basemap",
                    view: this.view,
                    content: basemapGallery
                });
    
                this.view.ui.add( expand, "top-left");
            }
        });
    }

    AddScaleBar(scaleBarContainer) {
        require([
            "esri/widgets/ScaleBar"
        ], (ScaleBar) => {
            this.scaleBar = new ScaleBar({
                view: this.view,
                container: scaleBarContainer
            });

            if (!scaleBarContainer) {
                this.view.ui.add(this.scaleBar, "bottom-left");
            }
        });
    }

    AddOverviewMap(overviewMapContainer) {
        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/Graphic",            
            "esri/core/reactiveUtils",
            "esri/core/promiseUtils"            
        ], (Map, MapView, Graphic, reactiveUtils, promiseUtils) => {

            var overviewMap = new Map({
                basemap: "topo-vector"
            });

            var overviewMapView = new MapView({
                container: overviewMapContainer,
                map: overviewMap,
                center: [-97.5, 38.5],
                zoom: 1,                
                constraints: {
                    rotationEnabled: false
                }
            });
            overviewMapView.ui.components = [];

            overviewMapView.when(() => {
                this.view.when(() => {
                    const extentGraphic = new Graphic({
                        geometry: null,
                        symbol: {
                            type: "simple-fill",
                            color: [0, 0, 0, 0.5],
                            outline: null
                        }
                    });
                    overviewMapView.graphics.add(extentGraphic);

                    reactiveUtils.watch(
                        () => this.view.extent,
                        (extent) => {
                            extentDebouncer().then(() => {
                                extentGraphic.geometry = extent;
                            });
                        },
                        {
                            initial: true
                        }
                    );
                });
            });

            const extentDebouncer = promiseUtils.debounce(async () => {
                if (this.view.stationary) {
                  await overviewMapView.goTo({
                    center: this.view.center,
                    scale:
                    this.view.scale *
                      2 *
                      Math.max(
                        this.view.width / overviewMapView.width,
                        this.view.height / overviewMapView.height
                      )
                  });
                }
              });            
        });
    }


}


