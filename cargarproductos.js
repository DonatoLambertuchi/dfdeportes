
import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const productosLocales = [
  {
    id: "local-1",
    nombre: "Pelota de Fútbol Profesional",
    imagen: "img/pelota.png",
    descripcion: "Balón de fútbol diseño profesional para entrenar y jugar en cancha.",
    precio: 8400,
    stock: 12
  },
  {
    id: "local-2",
    nombre: "Zapatillas Running",
    imagen: "img/zapas.png",
    descripcion: "Calzado ligero y cómodo para correr todos los días.",
    precio: 15200,
    stock: 8
  },
  {
    id: "local-3",
    nombre: "Guantes de Boxeo",
    imagen: "img/guantes.png",
    descripcion: "Guantes acolchados para sparring y entrenamientos intensos.",
    precio: 9200,
    stock: 10
  },
  {
    id: "local-4",
    nombre: "Raqueta de Tenis",
    imagen: "img/raqueta.png",
    descripcion: "Raqueta de última generación para jugadores recreativos y amateur.",
    precio: 17800,
    stock: 6
  },
  {
    id: "local-5",
    nombre: "Malla de Natación",
    imagen: "img/malla.png",
    descripcion: "Traje de natación de poliéster con corte ergonómico.",
    precio: 6200,
    stock: 14
  },
  {
    id: "local-6",
    nombre: "Camiseta de Entrenamiento",
    imagen: "img/camiseta.png",
    descripcion: "Playera deportiva transpirable para gimnasio y outdoor.",
    precio: 4200,
    stock: 20
  },
  {
    id: "local-7",
    nombre: "Bandas Elásticas Fitness",
    imagen: "img/bandas.png",
    descripcion: "Set de bandas para ejercicios de estiramiento y fuerza.",
    precio: 2800,
    stock: 25
  },
  {
    id: "local-8",
    nombre: "Casco de Ciclismo",
    imagen: "img/casco.png",
    descripcion: "Casco urbano con ventilación y ajuste seguro.",
    precio: 13400,
    stock: 5
  },
  {
    id: "local-9",
    nombre: "Pelota de Baloncesto",
    imagen: "img/basket.png",
    descripcion: "Pelota de baloncesto con agarre avanzado para cancha o parque.",
    precio: 7300,
    stock: 16
  },
  {
    id: "local-10",
    nombre: "Mancuernas Ajustables",
    imagen: "img/mancuernas.png",
    descripcion: "Mancuernas con peso variable para rutinas de fuerza en casa.",
    precio: 20400,
    stock: 7
  }
];

let productos = [];

const contenedor = document.getElementById("boxproductos");

function crearTarjeta(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "product-card";

  const titulo = document.createElement("h2");
  titulo.textContent = producto.nombre;

  const imagen = document.createElement("img");
  imagen.className = "product-image";
  imagen.src = producto.imagen || "";
  imagen.alt = producto.nombre;

  imagen.onerror = () => {
    imagen.alt = "Imagen no disponible";
    imagen.removeAttribute("src");
  };

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcion || "";

  const precio = document.createElement("h3");
  precio.textContent = "$ " + Number(producto.precio || 0).toLocaleString("es-AR");

  const stock = document.createElement("p");
  stock.textContent = `Stock: ${Number(producto.stock) || 0}`;

  const acciones = document.createElement("div");
  acciones.className = "product-actions";

  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = "Ver detalle";

  boton.addEventListener("click", () => {
    localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
    window.location.href = "detalle.html";
  });

  acciones.appendChild(boton);
  tarjeta.append(titulo, imagen, descripcion, precio, stock, acciones);

  return tarjeta;
}

async function cargarProductos() {
  contenedor.replaceChildren();

  try {
    const consulta = await getDocs(collection(db, "productos"));

    if (!consulta.empty) {
      productos = consulta.docs.map(d => ({
        ...d.data(),
        id: d.id
      }));
    } else {
      productos = productosLocales;
    }
  } catch (error) {
    console.error("No se pudo consultar Firestore:", error);
    productos = productosLocales;
  }

  contenedor.replaceChildren();

  productos.forEach(producto => {
    contenedor.appendChild(crearTarjeta(producto));
  });
}

document.getElementById("cartToggle").addEventListener("click", () => {
  alert("La funcionalidad del carrito está deshabilitada.");
});

document.getElementById("closeCart").addEventListener("click", () => {});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("La funcionalidad del carrito está deshabilitada.");
});

document.getElementById("cartCount").textContent = "0";
document.getElementById("cartItems").textContent =
  "La funcionalidad del carrito está deshabilitada.";

cargarProductos();
