"use strict";
import * as gp from "./gestionPresupuesto.js"

function mostrarDatoEnId (idElemento,valor){
    let element = document.getElementById(idElemento);
    if(element)
        element.textContent = String(valor);    
}
function mostrarGastoWeb (idElemento, gasto){
    let element = document.getElementById(idElemento);

    //Creo divPadre y le asigno una clase
    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');
    element.append(divGasto);

    //Creo divHijo, le asigno una clase, le asigno texto y lo añado al divPadre
    let divDescripcion = document.createElement('div');
    divDescripcion.classList.add('gasto-descripcion');
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    let divFecha = document.createElement('div');
    divFecha.classList.add('gasto-fecha');
    //Cambiamos gasto.fecha, el resultado no es en formato internacional 
    divFecha.textContent = gasto.obtenerPeriodoAgrupacion("dia");
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.classList.add('gasto-valor');
    divValor.textContent = gasto.valor;
    divGasto.append(divValor);
    
    let divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');
    divGasto.append(divEtiquetas);
    if (gasto.etiquetas && gasto.etiquetas.length > 0) {
        for (let i = 0; i < gasto.etiquetas.length ; i++){
            // gasto.etiquetas = gasto.etiquetas.filter(etiqueta => etiqueta.trim() !== "");
            let spanEtiqueta = document.createElement ('span');
            spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
            spanEtiqueta.textContent = gasto.etiquetas[i];

            let objBorEti = new BorrarEtiquetasHandle();
            objBorEti.gasto = gasto;
            objBorEti.etiqueta = gasto.etiquetas[i];
            spanEtiqueta.addEventListener("click",objBorEti)

            divEtiquetas.append (spanEtiqueta);
            }
    }   
    let botonEd = document.createElement("button");
    botonEd.type = "button";
    botonEd.textContent = "Editar";
    botonEd.classList.add("gasto-editar");

    let objEdit = new EditarHandle();
    objEdit.gasto= gasto; 
    botonEd.addEventListener("click", objEdit);
    divGasto.append(botonEd);

    let botonBo = document.createElement("button");
    botonBo.type = "button";
    botonBo.textContent = "Borrar"
    botonBo.classList.add("gasto-borrar");

    let objBor = new BorrarHandle();
    objBor.gasto = gasto;
    botonBo.addEventListener("click", objBor);
    divGasto.append(botonBo);

    let btnEdiForm = document.createElement("button");
    btnEdiForm.type = "button";
    btnEdiForm.textContent = "Editar (Formulario)";
    btnEdiForm.classList.add("gasto-editar-formulario");

    let btnBorrAPI = document.createElement("button");
    btnBorrAPI.type= "button";
    btnBorrAPI.classList.add("gasto-borrar-api");
    btnBorrAPI.textContent = "Borrar (API)";

    let objBorAPI = new BorrarHandleAPI();
    objBorAPI.gasto = gasto;
    btnBorrAPI.addEventListener("click", objBorAPI);

    divGasto.append(btnBorrAPI);
    
    let obEdtForm = new EditarHandleformulario();
    obEdtForm.gasto = gasto;
    btnEdiForm.addEventListener("click",obEdtForm);
    divGasto.append(btnEdiForm);   
}
    
function mostrarGastosAgrupadosWeb (idElemento,agrup,periodo){
    let element = document.getElementById(idElemento);
    if(element && agrup){
        let divAgrupacion = document.createElement("div");
        divAgrupacion.classList.add("agrupacion");
        element.append(divAgrupacion);

        let textoPeriodo = periodo === "dia" ? "día" : (periodo === "anyo" ? "año" : "mes");

        let h1Periodo = document.createElement("h1");
        h1Periodo.textContent = `Gastos agrupados por ${textoPeriodo}`;// textpPerodo
        divAgrupacion.append(h1Periodo);

        let claves = Object.keys(agrup);
        claves.sort();
        for(let i = 0; i < claves.length;i++){
            let clave = claves[i];
            let valor = agrup[clave];

            let divAgrupDato = document.createElement("div");
            divAgrupDato.classList.add("agrupacion-dato");
            divAgrupacion.append(divAgrupDato);

            let spanADClave = document.createElement("span")
            spanADClave.classList.add("agrupacion-dato-clave");
            spanADClave.textContent = clave;
            divAgrupDato.append(spanADClave);

            let spanADValor = document.createElement("span");
            spanADValor.classList.add("agrupacion-dato-valor");
            spanADValor.textContent = String(valor);
            divAgrupDato.append(spanADValor);
        }
    }
} 

function repintar(){
    mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gp.calcularBalance());
    let listadoCompleto = document.getElementById("listado-gastos-completo");
    if(listadoCompleto)
        listadoCompleto.innerHTML= "";// no tenia innerHTML
    // llamo a la funcion aqui o en cargar gastoa API?
    // limpiarResultadosExtra();
    let lista = gp.listarGastos();
        for (let i = 0; i< lista.length; i++)
            mostrarGastoWeb("listado-gastos-completo", lista[i]);        
}

function actualizarPresupuestoWeb(){
    let pedirNPresupuesto = prompt("Introduzca un nuevo presupuesto");
    pedirNPresupuesto = Number(pedirNPresupuesto);
    gp.actualizarPresupuesto(pedirNPresupuesto);
    repintar();
}

let boton = document.getElementById("actualizarpresupuesto");
boton.addEventListener('click',actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    debugger;
    let nuevaDescripcion = prompt("Introduzca la descripcion:");
    let nuevoValor = Number(prompt("Introduzca el valor:"));//Poniendo Numbre delante se guarda un número
    // let nuevoValor = +prompt("Introduzca el valor:"); el + lo convierte a numero
    let nuevaFecha = prompt("Introduzca la fecha con el siguiente formato yyyy-mm-dd:");
    let nuevasEqtiquetas = prompt("Introduzca las etiquetas separadas por comas:");
    
    let nuevoGasto = new gp.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevasEqtiquetas.split(','))
    gp.anyadirGasto(nuevoGasto);
    repintar();
}

let btnNueboGasto = document.getElementById("anyadirgasto");
btnNueboGasto.addEventListener('click',nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(evento){
        let nDesc = prompt("Nueva descripción:", this.gasto.descripcion);
        this.gasto.actualizarDescripcion(nDesc);

        let nVal = +prompt("Valor",this.gasto.valor);
        this.gasto.actualizarValor(nVal);

        //el método obtenerPeriodoAgrupacion nos da la fecha en el formato internacional
        let nFec = prompt("Fecha",this.gasto.obtenerPeriodoAgrupacion("dia"));
        this.gasto.actualizarFecha(nFec);

        let nEti = prompt("Etiquetas", this.gasto.etiquetas.join(','));
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        nEti = nEti.split(',');
        this.gasto.anyadirEtiquetas(...nEti);

        repintar();
    }    
}

function BorrarHandle(){
    this.handleEvent= function(evento){
       gp.borrarGasto(this.gasto.id); 
       repintar(); 
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent= function(event){
        
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
        
    }
}

let btnAnyGasFor = document.getElementById("anyadirgasto-formulario");
btnAnyGasFor.addEventListener("click",nuevoGastoWebFormulario);

function nuevoGastoWebFormulario (){
    
    btnAnyGasFor.disabled = true;
    //coge la plantilla y la clona con todos los descendientes que tiene
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    //no quier todos los elementos del template
    //selecciono solo el formilario
    //uso querySelector ya que es el primer y unico form dentro del template
    let formulario = plantillaFormulario.querySelector("form");
    
    formulario.addEventListener("submit",submithandled);//subhand es la manejadora del evento submit que todavia no he creado
    
    let btnCancelar = formulario.querySelector("button.cancelar");
    let objCancelar = new CancelHandled();
    objCancelar.formulario = formulario;
    btnCancelar.addEventListener("click",objCancelar);
    
    let btnEnviAPI = formulario.querySelector(".gasto-enviar-api");
    btnEnviAPI.addEventListener("click", enviarGastoApi);

    let controles = document.getElementById("controlesprincipales");
    controles.append(plantillaFormulario);
}
//creo la funcion manejadora del evento submit alojada en nuevoGastoWebFormulario
function submithandled(event){
    event.preventDefault();
    let form = event.currentTarget;
    
    let desc = form.elements["descripcion"].value.trim();
    let val = Number(form.elements["valor"].value.trim());
    let fec = form.elements["fecha"].value.trim();
    let etiq = form.elements["etiquetas"].value.split(',');

    let gasto = new gp.CrearGasto(desc,val,fec,...etiq);
    gp.anyadirGasto(gasto);
    repintar();
    btnAnyGasFor.disabled = false;

    form.remove();
}
function CancelHandled(){
    this.handleEvent = function(event){
        this.formulario.remove();
        btnAnyGasFor.disabled = false;
        if (this.botonEditar) {
            this.botonEditar.disabled = false;
        }
    }    
}

function EditarHandleformulario(){
    this.handleEvent= function(event){
        let boton = event.currentTarget;
        boton.disabled = true;

        let divGasto = event.target.closest(".gasto");  

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);        
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements["descripcion"].value =this.gasto.descripcion;
        formulario.elements["valor"].value =this.gasto.valor;
        formulario.elements["fecha"].value =this.gasto.obtenerPeriodoAgrupacion("dia");
        
        if(this.gasto.etiquetas){
            formulario.elements["etiquetas"].value = this.gasto.etiquetas.join(' ');            
        }

        let objSubForm = new SubmithandledForm();
        objSubForm.gasto = this.gasto;    
        formulario.addEventListener("submit",objSubForm);//subhand es la manejadora del evento submit que todavia no he creado
        
        let btnCancelar = formulario.querySelector("button.cancelar");
        let objCancelar = new CancelHandled();

        objCancelar.formulario = formulario;
        objCancelar.botonEditar = boton; 

        btnCancelar.addEventListener("click",objCancelar);     
        
        let btnEnviarApi = formulario.querySelector(".gasto-enviar-api");
        let objEnviarApiEditar = new EnviarGastoApiEditarHandle();
        objEnviarApiEditar.gasto = this.gasto;
        btnEnviarApi.addEventListener("click", objEnviarApiEditar);
       
        divGasto.append(formulario);
    
    }
    
}

function SubmithandledForm(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;

        let nDesc = formulario.elements["descripcion"].value;
        this.gasto.actualizarDescripcion(nDesc);

        let nVal = Number(formulario.elements["valor"].value);
        this.gasto.actualizarValor(nVal);

        let nFec = formulario.elements["fecha"].value;
        this.gasto.actualizarFecha(nFec);

        let nEti = formulario.elements["etiquetas"].value
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        // nEti = nEti.Trim();
        console.log(nEti)
        if(nEti.length > 0){
            nEti = nEti.trim()
            this.gasto.anyadirEtiquetas(...nEti.split(' '));
        }
        repintar();        
    }
}
let formFiltro = document.getElementById("formulario-filtrado");
formFiltro.addEventListener("submit",filtrarGastosWeb);


function filtrarGastosWeb(event){
    event.preventDefault();
    let formFulario = event.currentTarget;

    let desc = formFulario.elements["formulario-filtrado-descripcion"].value;
    let valMin = formFulario.elements["formulario-filtrado-valor-minimo"].value;
    let valMax = formFulario.elements["formulario-filtrado-valor-maximo"].value;
    let fecMin = formFulario.elements["formulario-filtrado-fecha-desde"].value;
    let fecMax = formFulario.elements["formulario-filtrado-fecha-hasta"].value;    
    let etiTie = formFulario.elements["formulario-filtrado-etiquetas-tiene"].value;

    let filtros = {};

    if (desc.trim() !== "") {
        filtros.descripcionContiene = desc;
    }
    if (valMin.trim() !== "") {
        filtros.valorMinimo = Number(valMin);
    }
    if (valMax.trim() !== "") {
        filtros.valorMaximo = Number(valMax);
    }
    if (fecMin.trim() !== "") {
        filtros.fechaDesde = fecMin;
    }
    if (fecMax.trim() !== "") {
        filtros.fechaHasta = fecMax;
    }
    if (etiTie.trim() !== "") {
        filtros.etiquetasTiene = gp.transformarListadoEtiquetas(etiTie);
    }
    let filtrogastos = gp.filtrarGastos(filtros);

    let listadoCompleto = document.getElementById("listado-gastos-completo");
    listadoCompleto.innerHTML= "";

    filtrogastos.forEach(gasto => {
        mostrarGastoWeb ("listado-gastos-completo", gasto)
    });
        
}

let guardar = document.getElementById("guardar-gastos");
guardar.addEventListener("click",guardarGastosWeb);

function guardarGastosWeb(){
    let gastosList = gp.listarGastos();
    localStorage.setItem('GestorGastosDWEC',JSON.stringify(gastosList));    
    // alert(JSON.stringify(gastosList));
}

let cargar = document.getElementById("cargar-gastos");
cargar.addEventListener("click",cargarGastosWeb);

function cargarGastosWeb(){
    let storedGastos = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

    if(storedGastos === null){
        storedGastos = [];
    }

    gp.cargarGastos(storedGastos);
    repintar();
}
let btnCarGasApi = document.getElementById("cargar-gastos-api");
btnCarGasApi.addEventListener("click",cargarGastosApi);

async function cargarGastosApi(){
    let nombre = document.getElementById("nombre_usuario").value.trim().toLowerCase();
    let url =`https://gestion-presupuesto-api.onrender.com/api/${nombre}`;
    let respuesta = await fetch(url);    
    let datos = await respuesta.json();

    for (const g of datos) {
    if (g.gastoId != null && g.id == null) g.id = g.gastoId;
  }
    gp.cargarGastos(datos);
    limpiarResultadosExtra();
    repintar();
}

function BorrarHandleAPI(){
    this.handleEvent = async function(event){
        let nombre = document.getElementById("nombre_usuario").value.trim().toLowerCase();
        let url =`https://gestion-presupuesto-api.onrender.com/api/${nombre}/${this.gasto.id}`;
        const options = {
            method: 'DELETE'
        };

        await fetch(url, options);
        
        await cargarGastosApi();
    }
}

async function enviarGastoApi(event) {
    let formulario = event.currentTarget.closest("form");

    let nombre = document.getElementById("nombre_usuario").value.trim().toLowerCase();
    let url =`https://gestion-presupuesto-api.onrender.com/api/${nombre}`;
    
    let descripcion = formulario.elements["descripcion"].value.trim();
    let valor = Number(formulario.elements["valor"].value);
    let fecha = formulario.elements["fecha"].value;
    let etiquetas = formulario.elements["etiquetas"].value.split(/[, ]+/).map(e => e.trim()).filter(Boolean);

let datos = { descripcion, valor, fecha, etiquetas };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos) // Convertir objeto a JSON string
    };
    await fetch(url, options);

    await cargarGastosApi();
}

function EnviarGastoApiEditarHandle(){
  this.handleEvent = async function(event){
    let formulario = event.currentTarget.closest("form");

    let nombre = document.getElementById("nombre_usuario").value.trim().toLowerCase();
    let url = `https://gestion-presupuesto-api.onrender.com/api/${nombre}/${this.gasto.id}`;

    let descripcion = formulario.elements["descripcion"].value.trim();
    let valor = Number(formulario.elements["valor"].value);
    let fecha = formulario.elements["fecha"].value;
    let etiquetas = formulario.elements["etiquetas"].value
      .split(/[, ]+/).map(e => e.trim()).filter(Boolean);

    let datos = { descripcion, valor, fecha, etiquetas };
    const options = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos) // Convertir objeto a JSON string
    };
    await fetch(url, options);

    await cargarGastosApi();
  }
}
// Funcion  que limpia el html para ver solo los gastos almacenados en la Api
//Necesito usar esta funcion o debo modificar la funcion repintar?
// preguntar
function limpiarResultadosExtra() {
  const ids = [
    "listado-gastos-filtrado-1",
    "listado-gastos-filtrado-2",
    "listado-gastos-filtrado-3",
    "listado-gastos-filtrado-4",
    "agrupacion-dia",
    "agrupacion-mes",
    "agrupacion-anyo"
  ];
  ids.forEach(id => {
    const e = document.getElementById(id);
    if (e) e.innerHTML = "";
  });
}

//Al cargar la API tiene que recalcular las agrupaciones por dia mes y año?
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
