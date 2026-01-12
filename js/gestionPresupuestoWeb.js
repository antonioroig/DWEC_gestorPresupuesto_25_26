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

    /*Boton Editar*/


    let btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";

    btnEditar.classList.add("gasto-editar");

    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = datosGasto;

    btnEditar.addEventListener("click", manejadorEditar);

    bloqueGasto.appendChild(btnEditar);

    /*Boton Borrar*/

    let btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";

    btnBorrar.classList.add("gasto-borrar");

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = datosGasto;

    btnBorrar.addEventListener("click", manejadorBorrar);

    bloqueGasto.appendChild(btnBorrar);

    /*Boton Editar Formulario */
    let btnEditarFormulario = document.createElement("button")
    btnEditarFormulario.textContent = "Editar (formulario)";

    btnEditarFormulario.classList.add("gasto-editar-formulario")
    // btnEditarFormulario.addEventListener("click", )
    bloqueGasto.appendChild(btnEditarFormulario)

    
    
    let editarFormHandler = new EditarHandleFormulario();
    editarFormHandler.gasto = datosGasto;

    btnEditarFormulario.addEventListener("click", editarFormHandler);


    
}







function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);
    if (!contenedor || !agrup) return;

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
  
    let h1Periodo = document.createElement("h1");
    h1Periodo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1Periodo);

    for (let clave of Object.keys(agrup)) {
      let valor = agrup[clave];

      let divAgrupacionDato = document.createElement("div");
      divAgrupacionDato.className = "agrupacion-dato";

      let spanClave = document.createElement("span");
      spanClave.className = "agrupacion-dato-clave";
      spanClave.textContent = clave;

      let spanValor = document.createElement("span");
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




function nuevoGastoWebFormulario(evento){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    let formulario = plantillaFormulario.querySelector("form");

    let botonAnyadir = evento.currentTarget;
    botonAnyadir.setAttribute("disabled", "true");

   
    formulario.addEventListener("submit", function(evento){
        evento.preventDefault(); 

        let form = evento.currentTarget;

        let descripcion = form.querySelector("input[name='descripcion']").value;
        let valor = Number(form.querySelector("input[name='valor']").value);
        let fecha = form.querySelector("input[name='fecha']").value;
        let etiquetas = form.querySelector("input[name='etiquetas']").value.split(",");

        let gasto = new gP.CrearGasto(descripcion, valor, fecha, etiquetas);

        gP.anyadirGasto(gasto);

        repintar();

        botonAnyadir.removeAttribute("disabled");

        form.remove();
    });

    
    let botonCancelar = formulario.querySelector("button.cancelar");

    let manejadorCancelar = new CancelarFormularioHandle();
    manejadorCancelar.formulario = formulario;
    manejadorCancelar.botonAnyadirGastoForm = botonAnyadir;

    botonCancelar.addEventListener("click", manejadorCancelar);
    
   
    document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
}


function CancelarFormularioHandle(){
   this.handleEvent = function(event) {
        let formulario = event.currentTarget.closest("form");
        if(formulario){
            formulario.remove();
        }
        this.botonAnyadirGastoForm.disabled = false; 
        repintar();
    }
}




let btnAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);



function EditarHandleFormulario() {
    this.handleEvent = function (event) {

        let botonEditar = event.currentTarget;
        botonEditar.disabled = true;

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements["descripcion"].value = this.gasto.descripcion;
        formulario.elements["valor"].value = this.gasto.valor;
        formulario.elements["fecha"].value = this.gasto.fecha;
        formulario.elements["etiquetas"].value = this.gasto.etiquetas.join(",");

        let submitEditar = new SubmitEditarFormularioHandle();
        submitEditar.gasto = this.gasto;

        formulario.addEventListener("submit", submitEditar);

        let cancelar = new CancelarFormularioHandle();
        cancelar.botonAnyadirGastoForm = botonEditar;

        formulario.querySelector(".cancelar").addEventListener("click", cancelar);

        botonEditar.parentNode.appendChild(formulario);
    }
}

function SubmitEditarFormularioHandle() {

    this.handleEvent = function(event) {
        event.preventDefault();
        let form = event.currentTarget;

        let descripcion = form.elements["descripcion"].value.trim();
        let valor = Number(form.elements["valor"].value.trim());
        let fecha = form.elements["fecha"].value.trim();
        let etiquetas = form.elements["etiquetas"].value.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();  

        form.remove();
    }
}

function filtrarGastosWeb(evento) {
    evento.preventDefault();

    let filtros = {};

    let valorMin = document.getElementById("formulario-filtrado-valor-minimo").value;
    if (valorMin !== "") {
        filtros.valorMinimo = Number(valorMin);
    }

    let valorMax = document.getElementById("formulario-filtrado-valor-maximo").value;
    if (valorMax !== "") {
        filtros.valorMaximo = Number(valorMax);
    }

    let fechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value;
    if (fechaDesde !== "") {
        filtros.fechaDesde = fechaDesde;
    }

    let fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
    if (fechaHasta !== "") {
        filtros.fechaHasta = fechaHasta;
    }


    let descripcion = document.getElementById("formulario-filtrado-descripcion").value;
    if (descripcion !== "") {
        filtros.descripcionContiene = descripcion;
    }

    let etiquetasTexto = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
    if (etiquetasTexto !== "") {
        filtros.etiquetasTiene = gP.transformarListadoEtiquetas(etiquetasTexto);
    }

    let gastosFiltrados = gP.filtrarGastos(filtros);

    let contenedor = document.getElementById("listado-gastos-completo");
    contenedor.innerHTML = "";

    for (let gasto of gastosFiltrados) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
    
}
document.addEventListener("submit", function (evento) {
    if (evento.target.id === "formulario-filtrado") {
        filtrarGastosWeb(evento);
    }
});

function guardarGastosWeb() {
   
   let gastos = gP.listarGastos();
    let gastosJSON = JSON.stringify(gastos);
    localStorage.setItem("GestorGastosDWEC", gastosJSON);
}
let btnGuardar = document.getElementById("guardar-gastos");
btnGuardar.addEventListener("click", guardarGastosWeb);


function cargarGastosWeb() {
    let datos = localStorage.getItem("GestorGastosDWEC");

    let gastosAlmacenados;
    if (datos) {
        gastosAlmacenados = JSON.parse(datos);
    } else {
        gastosAlmacenados = [];
    }

    gP.cargarGastos(gastosAlmacenados);
    repintar();
}
document.addEventListener("DOMContentLoaded", function () {
    
    let btnCargar = document.getElementById("cargar-gastos");

    
    if (btnCargar) {
        btnCargar.addEventListener("click", cargarGastosWeb);
    }
});




export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb
}

import * as gP from './gestionPresupuesto.js';
