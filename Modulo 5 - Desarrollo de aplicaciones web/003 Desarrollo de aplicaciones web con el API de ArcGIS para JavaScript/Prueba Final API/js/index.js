
const mapContainer = document.getElementById("map-container");

const mapController = new MapController(mapContainer);
mapController.AddDynamicLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer");

mapController.AddLeyenda(document.getElementById("leyenda-container"));
mapController.AddSearchWidget();
mapController.AddBaseMapoGallery();
mapController.AddScaleBar();
mapController.AddOverviewMap();

const overviewMapContainer = document.getElementById("overviewDiv");
mapController.AddOverviewMap(overviewMapContainer);