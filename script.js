let carrito = [];

// Elementos del DOM
const contadorCarrito = document.getElementById('cart-count');
const botonesAgregar = document.querySelectorAll('.add-to-cart');
const modalCarrito = document.getElementById('cart-modal');
const botonAbrirCarrito = document.getElementById('cart-count').closest('button');
const botonCerrarCarrito = document.getElementById('close-cart');
const listaCarrito = document.getElementById('cart-items');
const precioTotalElemento = document.getElementById('cart-total-price');
const botonWhatsApp = document.getElementById('checkout-btn');

// Tu número de WhatsApp con código de país (Ejemplo Perú: 51999999999)
const NUMERO_TELEFONO = "51903198884"; 

// Abrir y cerrar modal
botonAbrirCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'block';
});

botonCerrarCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

// Añadir producto al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const nombre = btn.getAttribute('data-name');
        const precio = parseFloat(btn.getAttribute('data-price'));

        carrito.push({ nombre, precio });
        actualizarCarrito();

        btn.textContent = '¡Agregado!';
        setTimeout(() => { btn.textContent = 'Añadir al carrito'; }, 1000);
    });
});

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
    contadorCarrito.textContent = carrito.length;
    listaCarrito.innerHTML = '';
    
    let total = 0;
    
    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span>${item.nombre} - S/ ${item.precio.toFixed(2)}</span>
            <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold; margin-left:10px;">❌</button>
        `;
        listaCarrito.appendChild(li);
    });

    precioTotalElemento.textContent = total.toFixed(2);
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Enviar pedido formateado por WhatsApp
botonWhatsApp.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";
    
    carrito.forEach(item => {
        mensaje += `• ${item.nombre} - S/ ${item.precio.toFixed(2)}\n`;
    });

    const total = precioTotalElemento.textContent;
    mensaje += `\n*Total a pagar: S/ ${total}*`;

    const url = `https://api.whatsapp.com/send?phone=${NUMERO_TELEFONO}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const productCards = document.querySelectorAll('.product-card');

function filtrarProductos() {
    const busqueda = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    productCards.forEach(card => {
        const nombre = card.querySelector('h3').textContent.toLowerCase();
        const categoriaCard = card.getAttribute('data-category');

        const coincideNombre = nombre.includes(busqueda);
        const coincideCategoria = categoria === 'todos' || categoriaCard === categoria;

        if (coincideNombre && coincideCategoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filtrarProductos);
categorySelect.addEventListener('change', filtrarProductos);