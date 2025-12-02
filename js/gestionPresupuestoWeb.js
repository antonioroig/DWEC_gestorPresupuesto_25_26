import * as gestionPresupuesto from "./gestionPresupuesto.js"
import * as Utils from "./jsUtils.js"

function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento)
    if( elem != null || elem!= undefined)
    {
        Element.textContent = ""
        elem.textContent = valor
    }
    else

        console.log(`La función mostrarDatoEnId con idElemento + ${idElemento} y valor ${valor} ha fallado`)
}
function mostrarGastoWeb(idElemento, gastos){
    let elem = document.getElementById(idElemento)

    for(let gasto of gastos)
    {
        let divGasto = Utils.divWithClass("gasto")
        elem.append(divGasto)
        let divDes = Utils.divWithClass("gasto-descripcion")
        divDes.textContent = gasto.descripcion;
        divGasto.append(divDes)
        let divFec = Utils.divWithClass("gasto-fecha")
        let fechaFormateada = new Date(gasto.fecha).toLocaleDateString()
        divFec.textContent = fechaFormateada
        divGasto.append(divFec)
        let divVal = Utils.divWithClass("gasto-valor")
        divVal.textContent = gasto.valor
        divGasto.append(divVal)
        let divEti = Utils.divWithClass("gasto-etiquetas")
        divGasto.append(divEti)
        for(let etiqueta of gasto.etiquetas)
        {
            if(gasto.etiquetas[0] == "" && gasto.etiquetas.length == 1)
                continue    
            let objManejadorEtiquetas = new BorrarEtiquetasHandle()
            objManejadorEtiquetas.gasto = gasto;
            let span = Utils.elementWithClass("span", "gasto-etiquetas-etiqueta")
            span.textContent = etiqueta
            objManejadorEtiquetas.etiqueta = etiqueta
            span.addEventListener("click", objManejadorEtiquetas)
            divEti.append(span)
            let br = document.createElement("br")
            divEti.append(br)
        }
        let botonEditarGasto = Utils.buttonWithClass("gasto-editar")
        botonEditarGasto.innerText = "Editar"
        let objManejadorEdicion = new EditarHandle()
        objManejadorEdicion.gasto = gasto
        botonEditarGasto.addEventListener("click", objManejadorEdicion)
        divEti.append(botonEditarGasto)
        let botonBorrarGasto = Utils.buttonWithClass("gasto-borrar")
        botonBorrarGasto.innerText = "Borrar"
        let objManejadorBorrado = new BorrarHandle()
        objManejadorBorrado.gasto = gasto
        botonBorrarGasto.addEventListener("click", objManejadorBorrado)
        divEti.append(botonBorrarGasto)
        let botonEditarFormulario = Utils.buttonWithClass("gasto-editar-formulario")
        botonEditarFormulario.setAttribute("type", "submit")
        botonEditarFormulario.innerText = "Editar (formulario)"
        let objManEdiFor = new EditarHandleFormulario();
        objManEdiFor.gasto = gasto
        objManEdiFor.divGasto = divGasto
        botonEditarFormulario.addEventListener("click", objManEdiFor)
        divEti.append(botonEditarFormulario)
    }
}
function  mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento)
    let divAgrup = Utils.divWithClass("agrupacion")
    elem.append(divAgrup)
    let titulo = document.createElement("h1")
    titulo.textContent = `Gastos agrupados por ${periodo}`
    divAgrup.append(titulo)
    for(const [clave, valor] of Object.entries(agrup))
    {
        let divAgrupGasto = Utils.divWithClass("agrupacion-dato")
        let spanClave = Utils.elementWithClass("span", "agrupacion-dato-clave")
        divAgrupGasto.append(spanClave)
        spanClave.textContent = clave
        let spanValor = Utils.elementWithClass("span", "agrupacion-dato-valor")
        divAgrupGasto.append(spanValor)
        spanValor.textContent = valor
        divAgrup.append(divAgrupGasto)
    }
}
function repintar(){
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto())
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos()) 
    mostrarDatoEnId("balance-total",  gestionPresupuesto.calcularBalance())
    let divGastosCompletos = document.getElementById("listado-gastos-completo")
    divGastosCompletos.innerHTML = ""
    mostrarGastoWeb("listado-gastos-completo", gestionPresupuesto.listarGastos())
    let titulo = document.createElement("h1")
    titulo.innerText = "Gastos Filtrados"
    divGastosCompletos.append(titulo)
    let form = document.forms[0]
    form.remove()
}
function actualizarPresupuestoWeb(){
    let botonPresupuesto = document.getElementById("actualizarpresupuesto")
    let nuevoPresupuesto = {
        handleEvent : function(){
            let respuesta = prompt("ingrese su nuevo presupuesto")
            gestionPresupuesto.actualizarPresupuesto(parseInt(respuesta))
            repintar()
        }
    }
    botonPresupuesto.addEventListener("click", nuevoPresupuesto)
}
function nuevoGastoWeb(){
    let botonAnyadirGasto = document.getElementById("anyadirgasto")
    let gastoNuevo = {
        handleEvent : function(){
            let concepto = prompt("Ingrese un concepto general del gasto")
            let valorTotal = Number(prompt("Ingrese el valor total del gasto"))
            let fechaDelGasto = prompt("Ingrese la fecha del gasto (formato: yyyy-mm-dd)")
            let etiquetasGasto = prompt("Ingrese las referencias que quiere que contenga su gasto")
            let arrayEtiquetas = etiquetasGasto.split(",")
            let nuevoGasto = new gestionPresupuesto.CrearGasto(concepto, valorTotal, fechaDelGasto, arrayEtiquetas)
            gestionPresupuesto.anyadirGasto(nuevoGasto)
            repintar()
        }
    }
    botonAnyadirGasto.addEventListener("click", gastoNuevo)
}
function EditarHandle(){   
    this.handleEvent = function(e){
        let concepto = prompt("Ingrese un concepto general del gasto", `${this.gasto.descripcion}`)
        let valorTotal = Number(prompt("Ingrese el valor total del gasto",  `${this.gasto.valor}`))
        let fechaPrompt = Utils.formatDate(this.gasto.fecha)
        let fechaDelGasto = prompt("Ingrese la fecha del gasto (formato: yyyy-mm-dd)",  `${fechaPrompt}`)
        let etiquetasGasto = prompt("Ingrese las referencias que quiere que contenga su gasto",  `${this.gasto.etiquetas}`)
        let arrayEtiquetas = etiquetasGasto.split(",")
        this.gasto.actualizarDescripcion(concepto)
        this.gasto.actualizarValor(valorTotal)
        this.gasto.actualizarFecha(fechaDelGasto)
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas)
        this.gasto.anyadirEtiquetas(...arrayEtiquetas)
        repintar()
        }
    }
function BorrarHandle()
{
    this.handleEvent = function(e){
        gestionPresupuesto.borrarGasto(this.gasto.id)
        repintar()
    }
}
function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar()  
    }
}


function EditarHandleFormulario(){
    this.handleEvent = function(e){
        let clonForm = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = clonForm.querySelector("form")
        formulario[0].value = this.gasto.descripcion
        formulario[1].value = this.gasto.valor
        formulario[2].value = Utils.formatDate(this.gasto.fecha)
        formulario[3].value = this.gasto.etiquetas
        this.divGasto.append(formulario)
        let manejadorSubmit = new EditarSubmit
        manejadorSubmit.formulario = formulario
        manejadorSubmit.gasto = this.gasto
        formulario.addEventListener("submit", manejadorSubmit)
        let botonenviar = formulario.querySelector(`[type="submit"]`)
        botonenviar.addEventListener("click", manejadorSubmit)
    }
}

function EditarSubmit(){
    this.handleEvent = function(e){
        e.preventDefault()
        this.gasto.valor = this.formulario[0].value
        repintar()
    }
}

function nuevoGastoWebFormulario(){    
    let botonAñadirForm = document.getElementById("anyadirgasto-formulario")
    botonAñadirForm.addEventListener("click", function(event){    
        if(document.forms.length > 0)
            return
        let clonForm = document.getElementById("formulario-template").content.cloneNode(true);
        let divBotones = document.getElementById("controlesprincipales")
        let formulario = clonForm.querySelector("form")
        divBotones.append(formulario)
        formulario.addEventListener("submit", manejaSubmit)
        let botonEnviar = document.querySelector(`[type="submit"]`);
        botonEnviar.addEventListener("click", manejaSubmit)
        let botonCancelar = document.forms[0].getElementsByClassName("cancelar")
        let manejadorCancelar = new ManejaCancelar
        botonCancelar[0].addEventListener("click", manejadorCancelar)
        botonAñadirForm.setAttribute("disabled", "true")
    })
}
function ManejaCancelar(event){
    this.handleEvent=function(e){
        let botonAñadirForm = document.getElementById("anyadirgasto-formulario")
        botonAñadirForm.removeAttribute("disabled")
        console.log("formulario cancelado")
        repintar()
    }
}
function manejaSubmit(event){
    event.preventDefault();
    let form = document.forms[0]
    let concepto = form[0].value;
    let valorTotal = form[1].value;
    valorTotal = +valorTotal
    let fechaDelGasto = new Date();
    fechaDelGasto = form[2].value
    let etiquetasGasto = form[3].value;
    let arrayEtiquetas = etiquetasGasto.split(",")
    let nuevoGasto = new gestionPresupuesto.CrearGasto(concepto, valorTotal, fechaDelGasto, ...arrayEtiquetas)
    gestionPresupuesto.anyadirGasto(nuevoGasto)
    let botonAñadirForm = document.getElementById("anyadirgasto-formulario")
    botonAñadirForm.removeAttribute("disabled")
    repintar()
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario
}