
/**
 * Archivo principal de la aplicación.
 * Este archivo contiene la lógica principal para crear y controlar el mapa, así como agregar capas, widgets y funcionalidades adicionales.
 */

const mapContainer = document.getElementById("map-container");
const mapController = new MapController(mapContainer, "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer");

//mapController.AddDynamicLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer");

mapController.AddLeyenda(document.getElementById("leyenda-container"));
mapController.AddSearchWidget();
mapController.AddBaseMapoGallery();
mapController.AddScaleBar();

const overviewMapContainer = document.getElementById("overviewDiv");
mapController.AddOverviewMap(overviewMapContainer);

mapController.InitSelectCityFeatures();

/**
 * Evento de clic para el botón "btoGotoEstado".
 * Obtiene el valor seleccionado del elemento "cboEstado" y utiliza el controlador del mapa para navegar al estado correspondiente.
 */
const btoGotoEstado = document.getElementById("btoGotoEstado");
btoGotoEstado.addEventListener("click", () => {
    const cboEstado = document.getElementById("cboEstado");
    const selectedValue = cboEstado.value;
    mapController.GotoEstado(selectedValue);
});

const btoSelectCiudades = document.getElementById("btoSelectCiudades");
btoSelectCiudades.addEventListener("click", () => {
    mapController.StartCitiesSelection();
});

