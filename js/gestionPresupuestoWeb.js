function mostrarDatoEnId(idElemento, valor) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = valor;
  }
}

function mostrarGastoWeb(idContenedor, datosGasto) {
    let contenedor = document.getElementById(idContenedor);

    let bloqueGasto = document.createElement('div');
    bloqueGasto.classList.add('gasto');
    contenedor.appendChild(bloqueGasto);

    let descripcion = document.createElement('div');
    descripcion.classList.add('gasto-descripcion');
    descripcion.textContent = datosGasto.descripcion;
    bloqueGasto.appendChild(descripcion);

    let fecha = document.createElement('div');
    fecha.classList.add('gasto-fecha');
    fecha.textContent = datosGasto.fecha;
    bloqueGasto.appendChild(fecha);

    let valor = document.createElement('div');
    valor.classList.add('gasto-valor');
    valor.textContent = datosGasto.valor;
    bloqueGasto.appendChild(valor);

    let etiquetas = document.createElement('div');
    etiquetas.classList.add('gasto-etiquetas');
    bloqueGasto.appendChild(etiquetas);

    if (datosGasto.etiquetas && datosGasto.etiquetas.length > 0) {
        for (let etiqueta of datosGasto.etiquetas) {
            let etiquetaSpan = document.createElement('span');
            etiquetaSpan.classList.add('gasto-etiquetas-etiqueta');
            etiquetaSpan.textContent = etiqueta;
            etiquetas.appendChild(etiquetaSpan);

        
        //Borrar Etiquetas
        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
        manejadorBorrarEtiqueta.gasto = datosGasto; 
        manejadorBorrarEtiqueta.etiqueta = etiqueta; 
            
        
        etiquetaSpan.addEventListener("click", manejadorBorrarEtiqueta);
        }
    }

    /*BotonEditar*/


    let botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";

    botonEditar.classList.add("gasto-editar");

    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = datosGasto;

    botonEditar.addEventListener("click", manejadorEditar);

    bloqueGasto.appendChild(botonEditar);

    /*BotonBorrar*/

    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";

    botonBorrar.classList.add("gasto-borrar");

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = datosGasto;

    botonBorrar.addEventListener("click", manejadorBorrar);

    bloqueGasto.appendChild(botonBorrar);


    
}







function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor || !agrup) return;

    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
  
    const h1Periodo = document.createElement("h1");
    h1Periodo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1Periodo);

    for (const clave of Object.keys(agrup)) {
      const valor = agrup[clave];

      const divAgrupacionDato = document.createElement("div");
      divAgrupacionDato.className = "agrupacion-dato";

      const spanClave = document.createElement("span");
      spanClave.className = "agrupacion-dato-clave";
      spanClave.textContent = clave;

      const spanValor = document.createElement("span");
      spanValor.className = "agrupacion-dato-valor";
      spanValor.textContent = valor;

      divAgrupacionDato.append(spanClave, spanValor);
      divAgrupacion.appendChild(divAgrupacionDato);
    }

    contenedor.appendChild(divAgrupacion);
  }


 function repintar() {
 
  let presupuesto = gP.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuesto);

  
  let totalGastos = gP.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", totalGastos);

  let balance = gP.calcularBalance();
  mostrarDatoEnId("balance-total", balance);

  let contenedor = document.getElementById("listado-gastos-completo");
  contenedor.innerHTML = "";


  let gastos = gP.listarGastos(); 
  for (let gasto of gastos) {
    
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}

 let btnActualizar = document.getElementById("actualizarpresupuesto");
 btnActualizar.addEventListener("click", actualizarPresupuestoWeb);
 
 function actualizarPresupuestoWeb(){

  let valor = +prompt("Introduzca un presupuesto");
  gP.actualizarPresupuesto(valor);
  repintar();


  repintar();

 }

 function nuevoGastoWeb(){

  let descripcion = prompt ("Descripcion del gasto: ");
  let valorStr = prompt ("Valor del gasto: ");
  let fecha = prompt ("Fecha del gasto: ");
  let etiquetas = prompt ("Etiquetas del gasto: ");

  let valor = Number(valorStr);
 
  etiquetas = etiquetas.split(",")



  let gasto = new gP.CrearGasto(descripcion, valor, fecha, etiquetas);

  gP.anyadirGasto(gasto); 

  repintar();
 }

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){}

   

EditarHandle.prototype.handleEvent = function (evento){

  let descripcion = prompt ("Descripcion del gasto: ", this.gasto.descripcion);
  let valor = +prompt ("Valor del gasto: ", this.gasto.valor);
  let fecha = prompt ("Fecha del gasto: ", this.gasto.fecha);
  let etiquetas = prompt ("Etiquetas del gasto: ", this.gasto.etiquetas);

  etiquetas = etiquetas.split(",")

  this.gasto.actualizarDescripcion(descripcion);
  this.gasto.actualizarValor(valor);
  this.gasto.actualizarFecha(fecha);
  this.gasto.anyadirEtiquetas(etiquetas);

  repintar();

}


function BorrarHandle(){}

 BorrarHandle.prototype.handleEvent = function(evento){
  

  gP.borrarGasto(this.gasto.id);

  repintar();


 }


function BorrarEtiquetasHandle(){

  this.handleEvent = function(evento){

  this.gasto.borrarEtiquetas(this.etiqueta)

  repintar();

  }
}




export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}

import * as gP from './gestionPresupuesto.js';
