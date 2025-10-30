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

export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  const contenedor = document.getElementById(idElemento);
  if (!contenedor) return;

  let titulo = "";
  switch (periodo.toLowerCase()) {
    case "dia":
    case "día":
      titulo = "Gastos agrupados por día";
      break;
    case "mes":
      titulo = "Gastos agrupados por mes";
      break;
    case "anyo":
    case "año":
      titulo = "Gastos agrupados por año";
      break;
    default:
      titulo = `Gastos agrupados por ${periodo}`;
      break;
  }

  contenedor.innerHTML = "";

  const divAgrup = document.createElement("div");
  divAgrup.className = "agrupacion";

  const h1 = document.createElement("h1");
  h1.textContent = titulo;
  divAgrup.appendChild(h1);

  for (const [clave, valor] of Object.entries(agrup || {})) {
    const divDato = document.createElement("div");
    divDato.className = "agrupacion-dato";

    const spanClave = document.createElement("span");
    spanClave.className = "agrupacion-dato-clave";
    spanClave.textContent = clave;

    const spanValor = document.createElement("span");
    spanValor.className = "agrupacion-dato-valor";
    spanValor.textContent = valor;

    divDato.append(spanClave, spanValor);
    divAgrup.appendChild(divDato);
  }

  contenedor.appendChild(divAgrup);
}
