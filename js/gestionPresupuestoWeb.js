import * as gp from './gestionPresupuesto.js';

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

       
        }
    }



    let botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";

    botonEditar.classList.add("gasto-editar");

    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = datosGasto;

    botonEditar.addEventListener("click", manejadorEditar);

    bloqueGasto.appendChild(botonEditar);



    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";

    botonBorrar.classList.add("gasto-borrar");

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = datosGasto;

    botonBorrar.addEventListener("click", manejadorBorrar);

    bloqueGasto.appendChild(botonBorrar);


   
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  const elemento = document.getElementById(idElemento);
  if (!elemento) return;

  const divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");

  const titulo = document.createElement("h1");
  titulo.textContent = `Gastos agrupados por ${periodo}`;
  divAgrupacion.appendChild(titulo);

  Object.entries(agrup).forEach(([clave, valor]) => {
    const divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");

    const spanClave = document.createElement("span");
    spanClave.classList.add("agrupacion-dato-clave");
    spanClave.textContent = clave;

    const spanValor = document.createElement("span");
    spanValor.classList.add("agrupacion-dato-valor");
    spanValor.textContent = valor;

    divDato.appendChild(spanClave);
    divDato.appendChild(spanValor);
    divAgrupacion.appendChild(divDato);
  });

  elemento.appendChild(divAgrupacion);

}
function repintar() {
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gastoTotal = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastoTotal);

    let balanceTotal = gp.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    const contenedor = document.getElementById("listado-gastos-completo");
    contenedor.innerHTML = "";

    let gastosCompletos = gp.listarGastos();
    for (let gasto of gastosCompletos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}


let btnAcualizar = document.getElementById("actualizarpresupuesto");
btnAcualizar.addEventListener("click", actualizarPresupuestoWeb);

function actualizarPresupuestoWeb(){
  let valor = +prompt("Introduce un nuevo presupuesto");
  gp.actualizarPresupuesto(valor);
  repintar();
}

let btnAnyadir = document.getElementById("anyadirgasto");
btnAnyadir.addEventListener("click", nuevoGastoWeb);

function nuevoGastoWeb ()
{
     let descripcion = prompt("Introduce la descripcion al gasto");
      let valor = +prompt("Introduce un valor al gasto");
      let fecha = prompt("Introduce la fecha del gasto");
      let etiquetas = prompt("Introduce las etiquetas");

  etiquetas = etiquetas.split(",")

  let gasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas)

  gp.anyadirGasto(gasto);

  repintar();
}

function EditarHandle(){}

  EditarHandle.prototype.handleEvent = function(evento){
      let descripcion = prompt("Introduce la descripcion al gasto", this.gasto.descripcion);
      let valor = +prompt("Introduce un valor al gasto", this.gasto.valor);
      let fecha = prompt("Introduce la fecha del gasto", this.gasto.fecha);
      let etiquetas = prompt("Introduce las etiquetas", this.gasto.etiquetas);
     
  
  etiquetas = etiquetas.split(",");

  this.gasto.actualizarDescripcion(descripcion);
  this.gasto.actualizarValor(valor);
  this.gasto.actualizarFecha(fecha);
  this.gasto.anyadirEtiquetas(etiquetas);

  repintar();
}
function BorrarHandle(){}
BorrarHandle.prototype.handleEvent = function(){
  gp.borrarGasto(this.gasto.id)
  repintar();
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar, 
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}