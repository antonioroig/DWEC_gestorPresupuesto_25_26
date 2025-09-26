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

function CrearGasto(descripcion, valor, fecha, etiquetas) {
  this.descripcion = descripcion;
  this.valor = valor >= 0 ? valor : 0;
  this.fecha = fecha >= null ? fecha : fechaHoy.toDateString;
  this.etiquetas = etiquetas >= null ? etiquetas : [];


  this.mostrarGastoCompleto = function () {
    return (
      "Gasto correspondiente a " +
      this.descripcion +
      " con valor " +
      this.valor +
      " €.\n" +
      "Fecha: " + 
      this.fecha +
      "\nEtiquetas: "
      + this.gastos
    );
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

  this.anyadirEtiquetas = function (...nuevasEtiquetas)
  {
    for(let i = 0; i < nuevasEtiquetas.length; i++)
    {
        if(this.etiquetas.includes(nuevasEtiquetas[i]) != false)
        {
            this.etiquetas.push(nuevasEtiquetas[i]);
        }
    }
  }
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
    for(let i = 0; i < gastos.length; i++)
    {
        if(gastos[i].id == id)
        {
            gastos.splice(i, 1)
        }
        else if(gastos[i] == null)
        {
            return;
        }
    }
}

function calcularTotalGastos() {

    let sumaGastos = 0;
    for(let i = 0; i < gastos.length;i++)
    { 
        sumaGastos = sumaGastos + gastos[i].valor
    }

    return sumaGastos;

}

function calcularBalance() {
    let balance;

    balance = presupuesto - calcularTotalGastos();
    return balance;

}

export { mostrarPresupuesto, actualizarPresupuesto, CrearGasto, listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos, calcularBalance };
