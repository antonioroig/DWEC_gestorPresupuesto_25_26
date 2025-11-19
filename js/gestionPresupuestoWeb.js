import * as gp from './gestionPresupuesto.js';


export function mostrarDatoEnId(idElemento, valor) {
  const el = document.getElementById(idElemento);
  if (!el) return;
  el.textContent = String(valor ?? "");
}

export function mostrarGastoWeb(idElemento, gasto) {
  const cont = document.getElementById(idElemento);
  if (!cont || !gasto) return;

  const wrap = document.createElement("div");
  wrap.className = "gasto";

  const dsc = document.createElement("div");
  dsc.className = "gasto-descripcion";
  dsc.textContent = gasto.descripcion ?? "";
  wrap.appendChild(dsc);

  const fechaDiv = document.createElement("div");
  fechaDiv.className = "gasto-fecha";
  const ts = typeof gasto.fecha === "number"
    ? gasto.fecha
    : Date.parse(gasto.fecha);
  fechaDiv.textContent = isNaN(ts)
    ? ""
    : new Date(ts).toLocaleDateString();
  wrap.appendChild(fechaDiv);

  const valorDiv = document.createElement("div");
  valorDiv.className = "gasto-valor";
  const num = typeof gasto.valor === "number"
    ? gasto.valor
    : Number(gasto.valor) || 0;
  valorDiv.textContent = num.toFixed(2);
  wrap.appendChild(valorDiv);

  const etq = document.createElement("div");
  etq.className = "gasto-etiquetas";

  (Array.isArray(gasto.etiquetas) ? gasto.etiquetas : []).forEach((tag, i) => {
    if (i > 0) etq.appendChild(document.createTextNode(" "));
    const span = document.createElement("span");
    span.className = "gasto-etiquetas-etiqueta";
    span.textContent = String(tag);
    etq.appendChild(span);
  });
  wrap.appendChild(etq);

  cont.appendChild(wrap);
}


export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo = "mes") {
  const cont = document.getElementById(idElemento);
  if (!cont || !agrup || typeof agrup !== "object") return;

  cont.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "agrupacion";

  const titulo = document.createElement("h1");
  const literal = periodo === "dia" ? "día" : (periodo === "anyo" ? "año" : "mes");
  titulo.textContent = `Gastos agrupados por ${literal}`;
  wrap.appendChild(titulo);

  Object.entries(agrup).forEach(([clave, valor]) => {
    const fila = document.createElement("div");
    fila.className = "agrupacion-dato";

    const sClave = document.createElement("span");
    sClave.className = "agrupacion-dato-clave";
    sClave.textContent = String(clave);
    fila.appendChild(sClave);

    const sValor = document.createElement("span");
    sValor.className = "agrupacion-dato-valor";
    const num = typeof valor === "number" ? valor : Number(valor) || 0;
    sValor.textContent = num.toFixed(2);

    fila.appendChild(sValor);
    wrap.appendChild(fila);
  });

  cont.appendChild(wrap);
}

function ponerTituloAntesDe(idElemento, texto) {
  const div = document.getElementById(idElemento);
  if (!div) return;

  const titulo = document.createElement("h2");
  titulo.textContent = texto;

  div.parentNode.insertBefore(titulo, div);
}

export function repintar() {
  const presupuestoActual = gp.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuestoActual);

  const totalGastos = gp.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", totalGastos);

  const balanceActual = gp.calcularBalance();
  mostrarDatoEnId("balance-total", balanceActual);

  const contenedorListado = document.getElementById("listado-gastos-completo");
  if (!contenedorListado) return;
  contenedorListado.innerHTML = "";

  const gastos = gp.listarGastos();
  gastos.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  });

}


export function actualizarPresupuestoWeb() {

  const nuevoPresupuesto = prompt('Introduce el nuevo presupuesto');
  const presupuesto = Number(nuevoPresupuesto)
  gp.actualizarPresupuesto(presupuesto);
  repintar();
}
//boton act presupuest
const botonPresupuesto = document.getElementById("actualizarpresupuesto");
if (botonPresupuesto) {
  botonPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
}

//botonAnyadir.addEventListener("click", nuevoGastoWeb)


ponerTituloAntesDe("listado-gastos-filtrado-1", "Gastos filtrados 1");
ponerTituloAntesDe("listado-gastos-filtrado-2", "Gastos filtrados 2");
ponerTituloAntesDe("listado-gastos-filtrado-3", "Gastos filtrados 3");
ponerTituloAntesDe("listado-gastos-filtrado-4", "Gastos filtrados 4");


