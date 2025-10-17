let presupuesto = 0;
let fechaHoy = new Date();

let gastos = [];

let idGasto = 0;

function actualizarPresupuesto(a) {
  if (a >= 0) {
    presupuesto = a;
    return presupuesto;
  } else {
    return -1;
  }
}

function mostrarPresupuesto() {
  return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  this.descripcion = descripcion;
  this.valor = valor >= 0 ? valor : 0;
  this.fecha =
    fecha === undefined || isNaN(Date.parse(fecha))
      ? +fechaHoy
      : Date.parse(fecha);
  this.etiquetas = etiquetas.length > 0 ? etiquetas : [];

  this.mostrarGastoCompleto = function () {
    return (
      "Gasto correspondiente a " +
      this.descripcion +
      " con valor " +
      this.valor +
      " €.\n" +
      "Fecha: " +
      formatearFecha(this.fecha) +
      "\nEtiquetas:\n" +
      formatearEtiquetas(this.etiquetas)
    );
  };

  this.actualizarFecha = function (fechaAnyadida) {
    let timestamp = Date.parse(fechaAnyadida);
    if (isNaN(timestamp) == false) {
      this.fecha = timestamp;
    }
  };

  this.mostrarGasto = function () {
    return (
      "Gasto correspondiente a " +
      this.descripcion +
      " con valor " +
      this.valor +
      " €"
    );
  };

  this.borrarEtiquetas = function (...etiquetasABorrar) {
    for (let i = 0; i < etiquetasABorrar.length; i++) {
      let index = this.etiquetas.indexOf(etiquetasABorrar[i]);
      if (index !== -1) {
        this.etiquetas.splice(index, 1);
        i--;
      }
    }
  };

  this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  };

  this.actualizarValor = function (nuevoValor) {
    if (nuevoValor >= 0) {
      this.valor = nuevoValor;
    } else {
      console.log("Error: El valor introducido no es válido.");
    }
  };

  this.anyadirEtiquetas = function (...nuevasEtiquetas) {
    for (let i = 0; i < nuevasEtiquetas.length; i++) {
      if (this.etiquetas.includes(nuevasEtiquetas[i]) == false) {
        this.etiquetas.push(nuevasEtiquetas[i]);
      } else {
        continue;
      }
    }
  };

  this.obtenerPeriodoAgrupacion = function (periodo) {
    let d = formateartPeriodo(this.fecha);
    let str = "";
    switch (periodo) {
      case "anyo":
        str = d.slice(0, 4);
        break;
      case "mes":
        str = d.slice(0, 7);
        break;
      case "dia":
        str = d;
        break;
    }
    return str;
  };
}

function formateartPeriodo(fechaSinFormato) {
  let periodo = new Date(fechaSinFormato);
  return periodo.toISOString().slice(0, 10);
}

function formatearEtiquetas(etiquetas) {
  if (!etiquetas || etiquetas.length === 0) return "";
  return etiquetas.map((e) => "- " + e).join("\n") + "\n";
}

function formatearFecha(timestamp) {
  let fecha = new Date(timestamp);
  return fecha.toLocaleString();
}

function listarGastos() {
  return gastos;
}

function anyadirGasto(gasto) {
  gasto.id = idGasto;
  idGasto++;
  gastos.push(gasto);
}

function borrarGasto(id) {
  for (let i = 0; i < gastos.length; i++) {
    if (gastos[i].id == id) {
      gastos.splice(i, 1);
    } else if (gastos[i] == null) {
      return;
    }
  }
}

function calcularTotalGastos() {
  let sumaGastos = 0;
  for (let i = 0; i < gastos.length; i++) {
    sumaGastos = sumaGastos + gastos[i].valor;
  }

  return sumaGastos;
}

function calcularBalance() {
  let balance;

  balance = presupuesto - calcularTotalGastos();
  return balance;
}

function filtrarGastos(filtros) {

  for (let i = 0; i < gastos.length; i++) {
    gastos[i].descripcion = gastos[i].descripcion.toUpperCase();
  };

  for (let i = 0; i < filtros.length; i++) {
    filtros[i].descripcionContiene = filtros[i].descripcionContiene.toUpperCase()
  };



  return gastos.filter((gasto) => {

    if (filtros.fechaDesde && gasto.fecha < Date.parse(filtros.fechaDesde)) {
      return false;
    }
    if (filtros.fechaHasta && gasto.fecha > Date.parse(filtros.fechaHasta)) {
      return false;
    }
    if (filtros.valorMinimo && gasto.valor < filtros.valorMinimo) {
      return false;
    }
    if (filtros.valorMaximo && gasto.valor > filtros.valorMaximo) {
      return false;
    }
    if (filtros.descripcionContiene) {
      let descFiltro = filtros.descripcionContiene.toUpperCase();
      let descGasto = gasto.descripcion.toUpperCase();
      if (!descGasto.includes(descFiltro)) {
        return false;
      }
    }

    if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {
      let coincide = false;
      for (let i = 0; i < filtros.etiquetasTiene.length; i++) {
        if (gasto.etiquetas.includes(filtros.etiquetasTiene[i])) {
          coincide = true;
          break;
        }
      }
      if (!coincide) {
        return false;
      }
    }
    return gastos;
  });
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
  let gastosFiltrados = filtrarGastos({
    fechaDesde: fechaDesde,
    fechaHasta: fechaHasta,
    etiquetasTiene: etiquetas
  });

  return gastosFiltrados.reduce((acc, gasto) => {
    let clave = gasto.obtenerPeriodoAgrupacion(periodo);
    if (!acc[clave]) acc[clave] = 0;
    acc[clave] += gasto.valor;
    return acc;
  }, {});
}


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
};
