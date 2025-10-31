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
  const ts = typeof gasto.fecha === "number" ? gasto.fecha : Date.parse(gasto.fecha);
  fechaDiv.textContent = isNaN(ts) ? "" : new Date(ts).toLocaleDateString();
  wrap.appendChild(fechaDiv);

  const valorDiv = document.createElement("div");
  valorDiv.className = "gasto-valor";
  const num = typeof gasto.valor === "number" ? gasto.valor : Number(gasto.valor) || 0;
  valorDiv.textContent = `${num.toFixed(2)} €`;
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
    fila.appendChild(document.createTextNode(" "));
    const sValor = document.createElement("span");
    sValor.className = "agrupacion-dato-valor";
    sValor.textContent = String(valor);
    fila.appendChild(sValor);

    wrap.appendChild(fila);
  });

  cont.appendChild(wrap);
}

