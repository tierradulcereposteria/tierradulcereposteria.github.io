// Función para cargar componentes HTML
async function includeHTML(elementId, path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error cargando ${path}:`, error);
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar head
    includeHTML('head-content', 'components/head.html');
    
    // Cargar header
    includeHTML('header-content', 'components/header.html');
    
    // Cargar footer
    includeHTML('footer-content', 'components/footer.html');
}); 