
/**
 * Clase que representa el controlador del mapa.
 */
class MapController {

    /**
     * Constructor de la clase MapController.
     * @param {HTMLElement} containerElement - Elemento contenedor del mapa.
     */
    constructor(containerElement, url) {
        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/config"
        ], (Map, MapView, MapImageLayer, config) => {

            config.apiKey = "AAPK67942d4773a94924a7c03d707148d230cvm3Td6tC1gUSyijET8f2Y2YHgaQnpXVGVS_pQWOfwWzidth8Dp6OYK4Czr1jQSN";
            config.portalUrl = "https://www.arcgis.com";


            this.dynamicLayer = new MapImageLayer({
                url: url
            });

            //Se utiliza el método when para esperar a que la capa dinámica esté lista para ser utilizada.
            this.dynamicLayer.when().then(() => {
                this.dynamicLayer.sublayers.forEach((sublayer) => {
                    if (sublayer.id === 0) {
                        sublayer.popupTemplate = this.ciudadTemplate;
                    };
                    if (sublayer.id === 2) {
                        sublayer.popupTemplate = this.estadoTemplate;
                    };
                });
                this.view.whenLayerView(this.dynamicLayer).then((layerView) => {
                    this.dynamicLayerView = layerView;
                });
            });

            //Se crea el mapa principal y la vista del mapa.
            this.mapMain = new Map({
                basemap: "topo",
                ground: "world-elevation",
                layers: [this.dynamicLayer]
            });

            this.view = new MapView({
                container: containerElement,
                map: this.mapMain,
                center: [-97.5, 38.5],
                zoom: 4
            });


        });
    }

    /**
     * Plantilla de información para el estado.
     * @type {Object}
     */
    estadoTemplate = {
        title: "Información del estado",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "STATE_NAME",
                label: "Nombre del estado",
                visible: true
            }, {
                fieldName: "POP2000",
                label: "Población 2000",
                visible: true
            }, {
                fieldName: "POP00_SQMI",
                label: "Población por milla cuadrada en 2000",
                visible: true
            }, {
                fieldName: "AREA",
                label: "Área",
                visible: true
            }]
        }]
    };

    /**
     * Plantilla de información para la ciudad.
     * @type {Object}
     */
    ciudadTemplate = {
        title: "Información de la ciudad",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "AREANAME",
                label: "Nombre",
                visible: true
            }, {
                fieldName: "ST",
                label: "Estado",
                visible: true
            }, {
                fieldName: "POP2000",
                label: "Población 2000",
                visible: true
            }]
        }]
    };


    /**
     * Agrega una leyenda al mapa.
     * @param {HTMLElement} leyendaContainer - Elemento contenedor de la leyenda.
     */
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

    /**
     * Agrega un widget de búsqueda al mapa.
     * @param {HTMLElement} searchContainer - Elemento contenedor del widget de búsqueda.
     */
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

    /**
     * Agrega una galería de mapas base al mapa.
     * @param {HTMLElement} basemapGalleryContainer - Elemento contenedor de la galería de mapas base.
     */
    AddBaseMapoGallery(basemapGalleryContainer) {
        require([
            "esri/widgets/BasemapGallery",
            "esri/widgets/Expand"
        ], (BasemapGallery, Expand) => {

            var basemapGallery = new BasemapGallery({
                view: this.view,
                container: basemapGalleryContainer
            });


            if (!basemapGalleryContainer) {
                var expand = new Expand({
                    expandIconClass: "esri-icon-basemap",
                    view: this.view,
                    content: basemapGallery,
                    expandTooltip: "Basemap"
                });

                this.view.ui.add(expand, "top-right");
            }
        });
    }

    /**
     * Agrega una barra de escala al mapa.
     * @param {HTMLElement} scaleBarContainer - Elemento contenedor de la barra de escala.
     */
    AddScaleBar(scaleBarContainer) {
        require([
            "esri/widgets/ScaleBar"
        ], (ScaleBar) => {
            this.scaleBar = new ScaleBar({
                view: this.view,
                container: scaleBarContainer
            });

            if (!scaleBarContainer) {
                this.view.ui.add(this.scaleBar, "bottom-right");
            }
        });
    }

    /**
     * Agrega un mapa de vista general al mapa.
     * @param {HTMLElement} overviewMapContainer - Elemento contenedor del mapa de vista general.
     */
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
                zoom: 2,
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
                        scale: this.view.scale * 2 * Math.max(
                            this.view.width / overviewMapView.width,
                            this.view.height / overviewMapView.height
                        )
                    });
                }
            });
        });
    }

    /**
     * Realiza un zoom al estado especificado.
     * @param {string} nombreEstado - Nombre del estado al que se desea hacer zoom.
     */
    GotoEstado(nombreEstado) {
        require([
            "esri/rest/query"
        ], (query) => {
            query.where = `STATE_NAME = '${nombreEstado}'`;
            query.outSpatialReference = this.mapMain.spatialReference;
            query.returnGeometry = true;

            const stateLayer = this.mapMain.layers.items[0].findSublayerById(2);
            stateLayer.queryFeatures(query).then((result) => {
                if (result.features.length > 0) {
                    const stateExtent = result.features[0].geometry.extent;
                    this.view.goTo(stateExtent);

                    this.view.whenLayerView(this.dynamicLayer).then((layerView) => {
                        if (this.estadoHighlight) {
                            this.estadoHighlight.remove();
                        }
                        layerView.highlightOptions = {
                            color: [236, 233, 114, 1],
                            haloColor: [255, 0, 0, 1],
                            haloOpacity: 1,
                            fillOpacity: 0.5
                        };
                        this.estadoHighlight = layerView.highlight(result.features[0]);
                    });
                } else {
                    console.log("No se ha podido encontrar el estado");
                }
            }).catch((error) => {
                console.error(error);
            });
        });
    }


    /**
     * Inicializa la selección de ciudades.
     */
    InitSelectCityFeatures() {
        require([
            "esri/layers/GraphicsLayer",
            "esri/widgets/Sketch/SketchViewModel",
            "esri/geometry/geometryEngineAsync"
        ], (GraphicsLayer, SketchViewModel, geometryEngineAsync) => {

            this.polygonGraphicsLayer = new GraphicsLayer();
            this.mapMain.add(this.polygonGraphicsLayer);

            this.sketchViewModel = new SketchViewModel({
                view: this.view,
                layer: this.polygonGraphicsLayer
            });


            // Once user is done drawing a rectangle on the map
            // use the rectangle to select features on the map and table
            this.sketchViewModel.on("create", async (event) => {
                if (event.state === "complete") {
                    // this polygon will be used to query features that intersect it
                    const geometries = this.polygonGraphicsLayer.graphics.map(function (graphic) {
                        return graphic.geometry;
                    });
                    const queryGeometry = await geometryEngineAsync.union(geometries.toArray());
                    //const citySubLayer = this.mapMain.layers.items[0].findSublayerById(0);
                    this.#selectFeatures(this.view, this.dynamicLayer, queryGeometry);
                }
            });



        });
    }


    /**
     * Inicia la selección de ciudades.
     */
    StartCitiesSelection() {
        // cierra el popup si está abierto
        this.view.closePopup();

        // clear the previous selection
        if (this.polygonGraphicsLayer) {
            this.polygonGraphicsLayer.removeAll();
        }
        if (this.citiesHighlight) {
            this.citiesHighlight.remove();

        }
        this.sketchViewModel.create("polygon");

    }

    /**
     * Limpia todas las selecciones.
     */
    ClearAllSelections() {
        if (this.polygonGraphicsLayer) {
            this.polygonGraphicsLayer.removeAll();
        }
        if (this.citiesHighlight) {
            this.citiesHighlight.remove();
        }
        if (this.estadoHighlight) {
            this.estadoHighlight.remove();
        }
    }



    /** Esta función se llama cuando el usuario completa el dibujo de un rectángulo
     * en el mapa. Utiliza el rectángulo para seleccionar elementos en la capa y la tabla.
     * @param {MapView} view - La vista del mapa en la que se realizará la selección.
     * @param {DynamicLayer} dynamicLayer - La capa dinámica en la que se realizará la selección.
     * @param {Geometry} geometry - La geometría utilizada para realizar la selección.
     */
    #selectFeatures(view, dynamicLayer, geometry) {
        const citySubLayer = dynamicLayer.findSublayerById(0);
        if (citySubLayer) {
            // crea una consulta y establece su parámetro de geometría al
            // poligono que se dibujó en la vista
            const query = {
                geometry: geometry,
                outFields: ["*"]
            };

            // consulta los gráficos desde la vista de capa con ciudades. La geometría establecida para la consulta
            // puede ser un polígono para entidades de punto y solo se devuelven las geometrías que se intersectan
            citySubLayer
                .queryFeatures(query)
                .then((results) => {
                    if (results.features.length === 0) {
                        clearSelection();
                    } else {
                        view.whenLayerView(dynamicLayer).then((layerView) => {
                            // resalta las entidades que se devolvieron de la consulta
                            layerView.highlightOptions = {
                                color: [236, 233, 114, 1],
                                haloColor: [255, 0, 0, 1],
                                haloOpacity: 1,
                                fillOpacity: 0.5
                            };
                            this.citiesHighlight = layerView.highlight(results.features);
                        });
                    }
                });
        }
    }
}

