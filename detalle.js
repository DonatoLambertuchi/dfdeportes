
import { db } from "./firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

async function cargarDetalle() {
  const contenedor = document.getElementById("boxproductos");
  const guardado = localStorage.getItem("productoSeleccionado");

  if (!guardado) {
    contenedor.textContent = "No seleccionaste un producto. Volvé al catálogo.";
    return;
  }

  let producto;

  try {
    producto = JSON.parse(guardado);
  } catch {
    contenedor.textContent = "No se pudo leer el producto seleccionado.";
    return;
  }

  // Si el producto proviene de Firestore, volvemos a consultar sus datos.
  if (producto.id && !String(producto.id).startsWith("local-")) {
    try {
      const resultado = await getDoc(doc(db, "productos", producto.id));

      if (!resultado.exists()) {
        contenedor.textContent = "El producto ya no existe en Firebase.";
        return;
      }

      producto = { ...resultado.data(), id: resultado.id };
    } catch (error) {
      console.error("Error al consultar el producto:", error);
      contenedor.textContent = "No se pudo consultar el producto en Firebase.";
      return;
    }
  }

  const precio = Number(producto.precio) || 0;
  const stock = Math.max(0, Number(producto.stock) || 0);

  const tarjeta = document.createElement("article");
  tarjeta.className = "product-card detail-card";

  const titulo = document.createElement("h2");
  titulo.textContent = producto.nombre || "Producto";

  const imagen = document.createElement("img");
  imagen.className = "product-image detail-image";
  imagen.src = producto.imagen || "";
  imagen.alt = producto.nombre || "Producto";
  imagen.onerror = () => imagen.removeAttribute("src");

  const descripcion = document.createElement("p");
  descripcion.id = "detalle";
  descripcion.textContent = producto.descripcion || "";

  const precioElemento = document.createElement("h3");
  precioElemento.textContent = "$ " + precio.toLocaleString("es-AR");

  const stockElemento = document.createElement("p");
  stockElemento.textContent = `Stock: ${stock}`;

  const control = document.createElement("div");
  control.className = "qty-control";

  const menos = document.createElement("button");
  menos.type = "button";
  menos.textContent = "-";

  const cantidadTexto = document.createElement("span");
  cantidadTexto.id = "cantidad";

  const mas = document.createElement("button");
  mas.type = "button";
  mas.textContent = "+";

  const comprar = document.createElement("button");
  comprar.id = "comprar";
  comprar.type = "button";
  comprar.textContent = "Comprar";

  control.append(menos, cantidadTexto, mas);
  tarjeta.append(titulo, imagen, descripcion, precioElemento, stockElemento, control, comprar);
  contenedor.replaceChildren(tarjeta);

  let cantidad = stock > 0 ? 1 : 0;

  function actualizarUI() {
    cantidadTexto.textContent = cantidad;
    menos.disabled = cantidad <= 1;
    mas.disabled = cantidad >= stock;
    comprar.disabled = stock === 0;
  }

  menos.addEventListener("click", () => {
    if (cantidad > 1) cantidad--;
    actualizarUI();
  });

  mas.addEventListener("click", () => {
    if (cantidad < stock) cantidad++;
    actualizarUI();
  });

  comprar.addEventListener("click", () => {
    if (stock === 0) {
      alert("No hay stock disponible.");
      return;
    }

    alert(
      `Has comprado ${cantidad} unidad(es) de ${producto.nombre}. ` +
      `Total: $${(precio * cantidad).toLocaleString("es-AR")}`
    );
  });

  actualizarUI();
}

cargarDetalle();
