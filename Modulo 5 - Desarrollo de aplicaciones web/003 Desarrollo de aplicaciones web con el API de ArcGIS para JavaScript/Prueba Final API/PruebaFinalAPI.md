# Documentación Prueba Final API de ArcGIS para JS

## Introducción

Este documento sirve como memoria y documentación para la aplicación desarrollada como parte de la prueba final de la unidad 3 "Desarrollo de aplicaciones web con el API de ArcGIS para JS". Basada en una plantilla de aplicación proporcionada, esta aplicación web utiliza la ArcGIS API for JavaScript para cumplir con una serie de requisitos específicos orientados a la visualización y manipulación de datos geográficos de los Estados Unidos. Los requisitos del ejercicio son los siguientes:

1. **Consumir el MapServer con datos de EEUU**: La aplicación debe integrar datos geográficos provenientes de `http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/`.
2. **Centrar la extensión de inicio del mapa**: Ajustar la vista inicial del mapa para que muestre una extensión geográfica específica.
3. **Implementar widgets**:
    - **Leyenda (Legend)**: Para mostrar la simbología del mapa.
    - **Búsqueda (Search)**: Permitir a los usuarios buscar lugares específicos.
    - **Galería de mapas base (BaseMapGallery)**: Ofrecer diferentes estilos de mapa base.
    - **Vista general (Overview)**: Proporcionar un mapa de vista general que muestre la extensión actual del mapa principal en un contexto más amplio.
    - **Barra de escala (ScaleBar)**: Mostrar una escala gráfica para entender las distancias en el mapa.
4. **Mostrar información del estado**: Utilizar un `FeatureLayer` con el identificador 2 del MapServer para mostrar información específica del condado a través de un popup al interactuar con el mapa.

![image](https://github.com/InesMacias/MasterGIS/assets/156369707/b45daa16-0e3b-44ab-a62b-16ca57e3151a)

## Componentes

### Leyenda
EL componente de leyenda aparece anclado a la izquierda e independiente del mapa

<img src="https://github.com/InesMacias/MasterGIS/assets/156369707/332584ab-d298-4ac2-9cae-2e60af0a77d3" width="300"  />

### Busqueda integrada

<img src="https://github.com/InesMacias/MasterGIS/assets/156369707/0fbb6931-2eb9-486e-a718-b72dd621b703" width="400"  />

### Galeria de Mapas

<img src="https://github.com/InesMacias/MasterGIS/assets/156369707/1915f9bb-ede9-429d-89a8-b263e18f5533" width="400"  />

### Barra de Escala

![image](https://github.com/InesMacias/MasterGIS/assets/156369707/cb2c1cdd-8a11-464a-a1c0-c7ce2a461ad0)

### Poup de Informacion del estado.


La aplicación demostrativa elaborada, siguiendo estos requisitos, utiliza tecnologías web fundamentales como HTML, CSS, y JavaScript, mostrando las capacidades y potencial del API de ArcGIS en la creación de aplicaciones de mapeo interactivas. A continuación, se detalla la estructura de archivos de la aplicación, su configuración y los pasos principales para replicar y entender el funcionamiento de la misma.

## Estructura del Proyecto

La aplicación se organiza en una estructura de archivos y carpetas que facilitan su desarrollo, mantenimiento y escalabilidad. A continuación, se describe la organización de los archivos y carpetas principales del proyecto:

- [index.html](index.html): Este es el archivo principal que contiene la estructura HTML de la aplicación. Define la maquetación de la página, incluyendo el encabezado, el pie de página, los contenedores para el mapa y los widgets, así como la inclusión de los archivos CSS y JavaScript necesarios para el funcionamiento de la aplicación.

- `/css/`:
  - [layout.css](/css/layout.cs): Archivo de hoja de estilos CSS que define los estilos de la aplicación. Incluye estilos para el encabezado, pie de página, la disposición del mapa y los widgets, así como estilos personalizados para los elementos de la interfaz de usuario.

- `/js/`:
  - [index.js](/js/index.js): Archivo JavaScript que contiene la lógica de inicialización de la aplicación. Se encarga de configurar el mapa, agregar widgets y gestionar eventos de la interfaz de usuario.
  - [map_controller.js](/js/map_controller.js): Archivo JavaScript que actúa como controlador del mapa. Contiene las funciones y métodos para interactuar con el API de ArcGIS, como la adición de capas, widgets y herramientas para la manipulación y visualización de datos geográficos.

- `/images/`:
  - [banner.jpg](/images/banner.jpg): Imagen utilizada en el encabezado de la aplicación.

La estructura está diseñada para separar claramente el contenido (HTML), la presentación (CSS) y la lógica de la aplicación (JavaScript), siguiendo las mejores prácticas de desarrollo web. Esto permite una mayor facilidad a la hora de realizar modificaciones y añadir nuevas funcionalidades.

## Archivo [index.html](index.html)

El archivo [index.html](index.html) constituye la base de la interfaz de usuario de la aplicación. Para la estructuración y diseño de la interfaz se ha empleado **Bootstrap** como marco de referencia. Esto proporciona una serie de ventajas para el desarrollo de la aplicación, como:

- **Responsividad**: Asegura que la aplicación se muestre correctamente en dispositivos de diferentes tamaños.
- **Estilos predefinidos**: Facilita la aplicación de estilos a los elementos HTML para mantener una apariencia coherente y profesional.
- **Componentes interactivos**: Permite la incorporación de elementos interactivos como pestañas y botones de forma sencilla y estilizada.

La elección de Bootstrap contribuye significativamente a la rapidez y eficiencia del desarrollo de la interfaz, permitiendo centrarse más en las funcionalidades específicas relacionadas con el API de ArcGIS para JS.

## Recursos de Estilos y Imágenes

### Hojas de Estilo CSS

- [layout.css](/css/layout.cs): Este archivo CSS se encuentra dentro de la carpeta `/css` y contiene todos los estilos específicos utilizados en la aplicación, como la personalización del encabezado, el pie de página, el contenedor del mapa, y otros elementos de la UI. Se ha diseñado para trabajar en conjunto con Bootstrap, asegurando que la aplicación mantenga una apariencia coherente y responsive.

### Recursos de Imágenes

- [banner.jpg](/images/banner.jpg): Ubicado en la carpeta `/images`, este recurso gráfico se utiliza como imagen de fondo en el encabezado de la aplicación. Aporta un aspecto visualmente atractivo y relacionado con la temática de la aplicación GIS.

Estos recursos juegan un papel crucial en la presentación y la funcionalidad de la aplicación, asegurando una interfaz de usuario agradable y una experiencia de usuario coherente.

## Ficheros JavaScript

La aplicación hace uso de dos ficheros JavaScript principales para gestionar la interactividad y las funcionalidades del mapa:

### [index.js](/js/index.js)

Este archivo sirve como el punto de entrada para la inicialización y configuración de la aplicación. Se encarga de crear una instancia del controlador del mapa, configurar eventos de UI como botones y selecciones, e invocar métodos específicos del controlador para añadir widgets y funcionalidades al mapa.

### [map_controller.js](/js/map_controller.js)

El archivo [map_controller.js](/js/map_controller.js) define la clase `MapController`, que actúa como el núcleo de la aplicación para gestionar el mapa y sus interacciones. A continuación, se detallan algunas de las características clave de este controlador:

- **Inicialización del Mapa**: Se configura un mapa de ArcGIS utilizando la API de JavaScript de ArcGIS, definiendo capas, vistas y otros componentes necesarios.

- **Widgets y Herramientas**: Implementa métodos para agregar diversos widgets al mapa, como una leyenda (`AddLeyenda`), un widget de búsqueda (`AddSearchWidget`), una galería de mapas base (`AddBaseMapoGallery`), y una barra de escala (`AddScaleBar`).

- **Vista General del Mapa**: Proporciona una función (`AddOverviewMap`) para añadir un mapa de vista general, mejorando la orientación del usuario al explorar áreas específicas.

- **Navegación y Selección**: Incluye métodos para la navegación a estados específicos (`GotoEstado`) y la selección interactiva de ciudades a través de dibujo en el mapa (`StartCitiesSelection`).

- **Gestión de Eventos**: Maneja eventos para la selección de características geográficas y la interacción del usuario con el mapa.

Este controlador encapsula la lógica necesaria para interactuar con el API de ArcGIS, ofreciendo una interfaz clara y concisa para la manipulación del mapa y sus elementos, y facilitando la extensión y mantenimiento de la aplicación.
