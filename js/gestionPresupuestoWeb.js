import * as L from './gestionPresupuesto.js';

export function mostrarDatoEnId(idElemento, valor) {
  const elemento = document.getElementById(idElemento);
  if (elemento) elemento.textContent = valor;
}

export function mostrarGastoWeb(idElemento, gasto) {
  const contenedor = document.getElementById(idElemento);
  if (!contenedor) return;

  const divGasto = document.createElement("div");
  divGasto.className = "gasto";

  const divDescripcion = document.createElement("div");
  divDescripcion.className = "gasto-descripcion";
  divDescripcion.textContent = gasto.descripcion;

  const divFecha = document.createElement("div");
  divFecha.className = "gasto-fecha";
  divFecha.textContent = gasto.fecha;

  const divValor = document.createElement("div");
  divValor.className = "gasto-valor";
  divValor.textContent = gasto.valor;

  const divEtiquetas = document.createElement("div");
  divEtiquetas.className = "gasto-etiquetas";

  const etiquetas = Array.isArray(gasto.etiquetas) ? gasto.etiquetas : [];
  for (const etiqueta of etiquetas) {
    const span = document.createElement("span");
    span.className = "gasto-etiquetas-etiqueta";
    span.textContent = etiqueta;
    divEtiquetas.appendChild(span);
  }

  divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas);
  contenedor.appendChild(divGasto);
}

export function mostrarGastosAgrupadosWeb(idElemento, agrup = [], periodo) {
  const cont = document.getElementById(idElemento);
  if (!cont) return;

  const titulos = { dia: "Gastos agrupados por día", día: "Gastos agrupados por día", mes: "Gastos agrupados por mes", anyo: "Gastos agrupados por año", año: "Gastos agrupados por año" };
  const titulo = titulos[periodo.toLowerCase()] || `Gastos agrupados por ${periodo}`;

  cont.innerHTML = `
    <div class="agrupacion">
      <h1>${titulo}</h1>
      ${Object.entries(agrup).map(([clave, valor]) =>
        `<div class="agrupacion-dato"><span class="agrupacion-dato-clave">${clave}</span><span class="agrupacion-dato-valor">${valor}</span></div>`
      ).join("")}
    </div>
  `;
}

export function repintar() {
  mostrarDatoEnId("presupuesto", L.mostrarPresupuesto());

  const totalGastos = L.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", totalGastos.toString());


  const balance = L.calcularBalance();
  mostrarDatoEnId("balance-total", balance.toFixed(0));
  const listadoCompleto = document.getElementById("listado-gastos-completo");
  if (listadoCompleto) listadoCompleto.innerHTML = "";

  const gastos = L.listarGastos();
  gastos.forEach(gasto => mostrarGastoWeb("listado-gastos-completo", gasto));
}

function actualizarPresupuestoWeb() {
  const entrada = prompt("Introduce el nuevo presupuesto:");
  const nuevoPresupuesto = Number(entrada);
  if (!isNaN(nuevoPresupuesto)) {
    L.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
  } else {
    alert("Por favor, introduce un número válido.");
  }
}

const botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb() {
  const gasto = new L.CrearGasto(
    prompt("Introduce la descripción del gasto:"),
    Number(prompt("Introduce el valor del gasto:")),
    prompt("Introduce la fecha del gasto (yyyy-mm-dd):"),
    prompt("Introduce las etiquetas separadas por comas:").split(",").map(e => e.trim())
  );

  L.anyadirGasto(gasto);
  repintar();
}

const botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener("click", nuevoGastoWeb);





