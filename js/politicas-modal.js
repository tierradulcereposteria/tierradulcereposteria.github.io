// Modal de Políticas Legales Tierra Dulce
const politicasContenido = {
    datos: {
        titulo: "Política de Tratamiento de Datos Personales",
        contenido: `
            <p>En Tierra Dulce Repostería artesanal, nos comprometemos a proteger tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información:</p>
            <ul>
                <li><strong>Datos que recopilamos:</strong> Nombre, correo electrónico, teléfono y dirección cuando realizas un pedido o contacto.</li>
                <li><strong>Uso de datos:</strong> Para procesar pedidos, responder consultas y enviar información relevante sobre nuestros productos.</li>
                <li><strong>Protección:</strong> Implementamos medidas de seguridad para proteger tu información personal.</li>
                <li><strong>Tus derechos:</strong> Puedes solicitar acceso, rectificación o eliminación de tus datos en cualquier momento.</li>
            </ul>
            <p>Para ejercer tus derechos o consultas sobre el tratamiento de datos, contáctanos a <a href="mailto:tierradulcerepo@gmail.com">tierradulcerepo@gmail.com</a></p>
        `
    },
    cookies: {
        titulo: "Política de Cookies",
        contenido: `
            <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web:</p>
            <ul>
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
                <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo interactúas con nuestro sitio.</li>
                <li><strong>Cookies de funcionalidad:</strong> Permiten recordar tus preferencias.</li>
            </ul>
            <p>Puedes controlar y/o eliminar las cookies según desees. Puedes eliminar todas las cookies que ya están en tu computadora y puedes configurar la mayoría de los navegadores para evitar que se coloquen.</p>
        `
    }
};

const modal = document.getElementById('modal-politicas');
const modalTitulo = document.getElementById('modal-titulo');
const modalContenido = document.getElementById('modal-contenido');
const btnCerrar = document.querySelector('.modal-close');
const btnPoliticas = document.getElementById('btn-politicas');

function abrirModal() {
    modalTitulo.textContent = "Políticas Legales";
    modalContenido.innerHTML = `
        <div class="politicas-tabs">
            <button class="tab-btn active" data-tab="datos">Tratamiento de Datos</button>
            <button class="tab-btn" data-tab="cookies">Cookies</button>
        </div>
        <div class="tab-content active" id="tab-datos">
            ${politicasContenido.datos.contenido}
        </div>
        <div class="tab-content" id="tab-cookies" style="display:none;">
            ${politicasContenido.cookies.contenido}
        </div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Inicializar tabs
    const tabs = modalContenido.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            modalContenido.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            modalContenido.querySelector(`#tab-${tab.dataset.tab}`).style.display = 'block';
        });
    });
}

function cerrarModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

btnPoliticas.addEventListener('click', abrirModal);
btnCerrar.addEventListener('click', cerrarModal);

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
});

// Cerrar modal con la tecla Escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') cerrarModal();
}); 