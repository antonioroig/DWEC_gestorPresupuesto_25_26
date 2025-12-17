// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
  if (typeof valor !== "number" || valor <= 0) {
    return -1;
  }
  presupuesto = valor;
  return presupuesto;
}

function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor = 0, fecha = null, ...etiquetas) {
  this.descripcion = descripcion;

  if (typeof valor !== "number" || valor < 0) {
    this.valor = 0;
  } else {
    this.valor = valor;
  }

  let fechaParseada = Date.parse(fecha);
  if (!fecha || isNaN(fechaParseada)) {
    this.fecha = Date.now();
  } else {
    this.fecha = fechaParseada;
  }
  this.etiquetas = [];
  if (etiquetas.length > 0) {
    this.anyadirEtiquetas(...etiquetas);
  }
}


CrearGasto.prototype.mostrarGastoCompleto = function () {
  let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
  texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
  if (this.etiquetas.length > 0) {
    texto += "Etiquetas:\n";
    this.etiquetas.forEach(e => {
      texto += `- ${e}\n`;
    });
  }
  return texto;
};


CrearGasto.prototype.actualizarFecha = function (nuevaFecha) {
  let fechaParseada = Date.parse(nuevaFecha);
  if (!isNaN(fechaParseada)) {
    this.fecha = fechaParseada;
  }
};

CrearGasto.prototype.anyadirEtiquetas = function (...nuevasEtiquetas) {
  nuevasEtiquetas.forEach(etiqueta => {
    if (!this.etiquetas.includes(etiqueta)) {
      this.etiquetas.push(etiqueta);
    }
  });
};

CrearGasto.prototype.borrarEtiquetas = function (...etiquetasABorrar) {
  this.etiquetas = this.etiquetas.filter(e => !etiquetasABorrar.includes(e));
};

CrearGasto.prototype.mostrarGasto = function () {
  return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
};

CrearGasto.prototype.actualizarDescripcion = function (nuevaDescripcion) {
  this.descripcion = nuevaDescripcion;
  return this.descripcion;
};

CrearGasto.prototype.actualizarValor = function (nuevoValor) {
  if (typeof nuevoValor === "number" && nuevoValor >= 0) {
    this.valor = nuevoValor;
  }
  return this.valor; 
};

function listarGastos() {
  return gastos;
}

function anyadirGasto(gasto) {
  gasto.id = idGasto;
  idGasto++;
  gastos.push(gasto);
}

function borrarGasto(id) {
  gastos = gastos.filter(g => g.id !== id);
}

function calcularTotalGastos() {
  return gastos.reduce((total, g) => total + g.valor, 0);
}

function calcularBalance() {
  return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros = {}) {
  const {
    fechaDesde,
    fechaHasta,
    valorMinimo,
    valorMaximo,
    descripcionContiene,
    etiquetasTiene
  } = filtros;

  const parseMs = (v) => {
    if (v === undefined || v === null) return NaN;
    if (typeof v === "number") return v;
    if (v instanceof Date) return v.getTime();
    const t = Date.parse(v);
    return isNaN(t) ? NaN : t;
  };

  const isISODateOnly = (s) =>
    typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);

  const desdeMs = parseMs(fechaDesde);
  let hastaMs = parseMs(fechaHasta);
  if (!isNaN(hastaMs) && isISODateOnly(fechaHasta)) {
    hastaMs += (24 * 60 * 60 * 1000) - 1;
  }

  const hayNumero = (v) =>
    (typeof v === "number" && !isNaN(v)) ||
    (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v)));

  const min = hayNumero(valorMinimo) ? Number(valorMinimo) : null;
  const max = hayNumero(valorMaximo) ? Number(valorMaximo) : null;

  const needle = typeof descripcionContiene === "string"
    ? descripcionContiene.trim().toLowerCase()
    : "";

  const etiquetasQuery = Array.isArray(etiquetasTiene)
    ? etiquetasTiene.map(e => String(e).trim().toLowerCase()).filter(Boolean)
    : [];

  return gastos.filter(g => {
    const gMs = typeof g.fecha === "number" ? g.fecha : parseMs(g.fecha);

    if (!isNaN(desdeMs) && gMs < desdeMs) return false;
    if (!isNaN(hastaMs) && gMs > hastaMs) return false;
    if (min !== null && g.valor < min) return false;
    if (max !== null && g.valor > max) return false;

    if (needle) {
      const dsc = String(g.descripcion ?? "").toLowerCase();
      if (!dsc.includes(needle)) return false;
    }

    if (etiquetasQuery.length > 0) {
      const etiquetasGasto = (Array.isArray(g.etiquetas) ? g.etiquetas : [])
        .map(e => String(e).trim().toLowerCase());
      const coincide = etiquetasQuery.some(tag => etiquetasGasto.includes(tag));
      if (!coincide) return false;
    }

    return true;
  });
}


CrearGasto.prototype.obtenerPeriodoAgrupacion = function (periodo = "mes") {
  const d = new Date(this.fecha);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  switch (periodo) {
    case "dia":
      return `${y}-${m}-${day}`;
    case "anyo":
      return `${y}`;
    case "mes":
    default:
      return `${y}-${m}`;
  }
};

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
  const hoyLocalISO = (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  })();

  const filtros = {};
  if (fechaDesde !== undefined) filtros.fechaDesde = fechaDesde;
  filtros.fechaHasta = fechaHasta ?? hoyLocalISO;
  if (Array.isArray(etiquetas) && etiquetas.length > 0) {
    filtros.etiquetasTiene = etiquetas;
  }

  const gastosFiltrados = filtrarGastos(filtros);

  const keyFrom = (g) => {
    if (typeof g.obtenerPeriodoAgrupacion === "function") {
      return g.obtenerPeriodoAgrupacion(periodo);
    }
    const d = new Date(g.fecha);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    switch (periodo) {
      case "dia": return `${y}-${m}-${day}`;
      case "anyo": return `${y}`;
      case "mes":
      default: return `${y}-${m}`;
    }
  };

  return gastosFiltrados.reduce((acc, g) => {
    const clave = keyFrom(g);
    const valor = (typeof g.valor === "number") ? g.valor : Number(g.valor) || 0;
    acc[clave] = (acc[clave] ?? 0) + valor;
    return acc;
  }, {});
}

function transformarListadoEtiquetas() {

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas
}