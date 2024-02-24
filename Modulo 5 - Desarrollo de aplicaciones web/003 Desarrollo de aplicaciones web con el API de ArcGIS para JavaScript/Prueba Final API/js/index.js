
/**
 * Inicializa el mapa y agrega varios componentes y event listeners.
 */
const mapContainer = document.getElementById("map-container");
const mapController = new MapController(mapContainer, "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer");


// Agregar componentes al mapa
// Agregar leyenda
mapController.AddLeyenda(document.getElementById("leyenda-container"));

// Agregar widget de búsqueda
mapController.AddSearchWidget();

// Agregar widget de coordenadas
mapController.AddBaseMapoGallery();

// Agregar escala
mapController.AddScaleBar();

// Agregar componente de vista general
const overviewMapContainer = document.getElementById("overviewDiv");
mapController.AddOverviewMap(overviewMapContainer);

// Agregar selección de estados
const btoGotoEstado = document.getElementById("btoGotoEstado");
btoGotoEstado.addEventListener("click", () => {
    const cboEstado = document.getElementById("cboEstado");
    const selectedValue = cboEstado.value;
    mapController.GotoEstado(selectedValue);
});

// Agregar selección de ciudades
mapController.InitSelectCityFeatures();
const btoSelectCiudades = document.getElementById("btoSelectCiudades");
btoSelectCiudades.addEventListener("click", () => {
    mapController.StartCitiesSelection();    
});

// Agregar limpiar selección
btoClearAllSelections = document.getElementById("btoClearAllSelections");
btoClearAllSelections.addEventListener("click", () => {
    mapController.ClearAllSelections();
});

