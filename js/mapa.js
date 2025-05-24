/**
 * Configuración del mapa y ubicaciones
 * @constant {Object} CONFIG_MAPA - Configuración general del mapa
 */
const CONFIG_MAPA = {
    ZOOM_INICIAL: 16,
    ZOOM_MIN: 13,
    ZOOM_MAX: 18,
    RETRASO_AJUSTE: 100,
    ATRIBUCION: '© OpenStreetMap contributors',
    URL_TILE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};

/**
 * Datos de las ubicaciones de la repostería
 * @constant {Array<Object>} ubicaciones - Array con la información de ubicación
 */
const ubicaciones = [
    {
        nombre: 'Tierra Dulce Repostería artesanal',
        lat: 4.1329229,
        lng: -73.6299253,
        direccion: 'Carrera 36 a #16 65, Villavicencio, Meta'
    }
];

/**
 * Inicializa el mapa de Leaflet con la configuración especificada
 * @param {HTMLElement} contenedor - Elemento contenedor del mapa
 * @param {Object} ubicacion - Objeto con la información de ubicación
 * @returns {L.Map} Instancia del mapa de Leaflet
 */
function inicializarMapa(contenedor, ubicacion) {
    try {
        const mapa = L.map(contenedor, {
            center: [ubicacion.lat, ubicacion.lng],
            zoom: CONFIG_MAPA.ZOOM_INICIAL,
            zoomControl: true,
            minZoom: CONFIG_MAPA.ZOOM_MIN,
            maxZoom: CONFIG_MAPA.ZOOM_MAX,
            scrollWheelZoom: false
        });

        // Agregar la capa de OpenStreetMap
        L.tileLayer(CONFIG_MAPA.URL_TILE, {
            attribution: CONFIG_MAPA.ATRIBUCION
        }).addTo(mapa);

        return mapa;
    } catch (error) {
        console.error('Error al inicializar el mapa:', error);
        throw error;
    }
}

/**
 * Agrega el marcador y popup al mapa
 * @param {L.Map} mapa - Instancia del mapa de Leaflet
 * @param {Object} ubicacion - Objeto con la información de ubicación
 */
function agregarMarcador(mapa, ubicacion) {
    try {
        const marcador = L.marker([ubicacion.lat, ubicacion.lng]).addTo(mapa);
        const popupContent = `
            <div class="mapa-popup">
                <strong>¡Acá es Tierra Dulce! 🍪</strong><br>
                ${ubicacion.direccion}
            </div>
        `;
        marcador.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'mapa-popup-custom'
        }).openPopup();
    } catch (error) {
        console.error('Error al agregar el marcador:', error);
    }
}

/**
 * Ajusta el tamaño del mapa cuando cambia el tamaño de la ventana
 * @param {L.Map} mapa - Instancia del mapa de Leaflet
 */
function configurarAjusteResponsive(mapa) {
    const ajustarMapa = () => {
        try {
            mapa.invalidateSize();
        } catch (error) {
            console.error('Error al ajustar el mapa:', error);
        }
    };

    // Ajustar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', ajustarMapa);

    // Ajustar después de cargar
    setTimeout(ajustarMapa, CONFIG_MAPA.RETRASO_AJUSTE);
}

/**
 * Inicializa el mapa cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        const mapaWrapper = document.querySelector('.mapa-wrapper');
        if (!mapaWrapper || !ubicaciones.length) {
            console.warn('No se encontró el contenedor del mapa o no hay ubicaciones definidas');
            return;
        }

        const ubicacion = ubicaciones[0];
        
        // Crear el contenedor del mapa
        mapaWrapper.innerHTML = '<div id="mapa-leaflet" style="width: 100%; height: 100%; border-radius: 16px;"></div>';
        
        // Inicializar el mapa
        const mapa = inicializarMapa('mapa-leaflet', ubicacion);
        
        // Agregar marcador y popup
        agregarMarcador(mapa, ubicacion);
        
        // Configurar ajuste responsive
        configurarAjusteResponsive(mapa);

    } catch (error) {
        console.error('Error al inicializar el mapa:', error);
        // Mostrar mensaje de error al usuario si es necesario
        const mapaWrapper = document.querySelector('.mapa-wrapper');
        if (mapaWrapper) {
            mapaWrapper.innerHTML = `
                <div class="error-mapa" style="padding: 1rem; text-align: center; color: #a23e6d;">
                    Lo sentimos, no pudimos cargar el mapa en este momento.
                    <br>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${ubicaciones[0].lat},${ubicaciones[0].lng}" 
                       target="_blank" 
                       rel="noopener"
                       style="color: #a23e6d; text-decoration: underline; margin-top: 0.5rem; display: inline-block;">
                        Ver ubicación en Google Maps
                    </a>
                </div>
            `;
        }
    }
}); 