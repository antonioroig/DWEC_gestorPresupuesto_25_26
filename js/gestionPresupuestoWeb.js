"use strict"
import * as presupuesto from './gestionPresupuesto.js'

let numeroFiltro = 0

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = valor
}
function mostrarGastoWeb(idElemento, listaGastos) {
    const contenedor = document.getElementById(idElemento)
    contenedor.innerHTML = ""
    if (idElemento.includes("filtrado")) {
        const h1 = document.createElement("h1")
        h1.textContent = `Filtrado Numero ${++numeroFiltro}`
        contenedor.appendChild(h1)
    }
    listaGastos.forEach(gasto => {
        const divGasto = document.createElement("div")
        divGasto.classList.add("gasto")

        const gastoFiltrado = Object.fromEntries(
            Object.entries(gasto).filter(([k, v]) => typeof v !== "function")
        )

        for (let key in gastoFiltrado) {
            if (key === "etiquetas") {
                const divEtiquetas = document.createElement("div")
                divEtiquetas.classList.add(`gasto-${key}`)
                // divEtiquetas.textContent = `${key}:`
                divGasto.appendChild(divEtiquetas)

                gastoFiltrado[key].forEach(etiqueta => {
                    const span = document.createElement("span")
                    span.classList.add("gasto-etiquetas-etiqueta")
                    span.textContent = etiqueta
                    const manejadorBorrarEtiqueta = new BorrarEtiquetasHandle()
                    manejadorBorrarEtiqueta.gasto = gasto
                    manejadorBorrarEtiqueta.etiqueta = etiqueta
                    span.addEventListener("click", manejadorBorrarEtiqueta)

                    divEtiquetas.appendChild(span)
                    divEtiquetas.appendChild(document.createElement("br"))
                })
            } else if (key !== "fecha") {
                if (key !== "id") {
                    const divProp = document.createElement("div")
                    divProp.classList.add(`gasto-${key}`)
                    divProp.textContent = `${gastoFiltrado[key]}`
                    divGasto.appendChild(divProp)
                }

            } else {
                const divFecha = document.createElement("div")
                divFecha.classList.add(`gasto-${key}`)
                // divFecha.textContent = `${key}: ${(new Date(gastoFiltrado[key])).toISOString().slice(0, 10)}`
                divFecha.textContent = `${(new Date(gastoFiltrado[key])).toISOString().slice(0, 10)}`
                divGasto.appendChild(divFecha)
            }
        }
        if (!idElemento.includes("filtrado")) {
            const botonEditar = document.createElement("button")
            botonEditar.type = "button"
            botonEditar.classList.add("gasto-editar")
            botonEditar.textContent = "Editar"
            const manejadorEditar = new EditarHandle()
            manejadorEditar.gasto = gasto
            botonEditar.addEventListener("click", manejadorEditar)
            divGasto.appendChild(botonEditar)

            const botonBorrar = document.createElement("button")
            botonBorrar.type = "button"
            botonBorrar.classList.add("gasto-borrar")
            botonBorrar.textContent = "Borrar"
            const manejadorBorrar = new BorrarHandle()
            manejadorBorrar.gasto = gasto
            botonBorrar.addEventListener("click", manejadorBorrar)
            divGasto.appendChild(botonBorrar)

            const botonEditarFormulario = document.createElement("button")
            botonEditarFormulario.type = "button"
            botonEditarFormulario.classList.add("gasto-editar-formulario")
            botonEditarFormulario.textContent = "Editar (formulario)"
            let manejadorEditarFormulario = new EditarHandleFormulario()
            manejadorEditarFormulario.gasto = gasto
            botonEditarFormulario.addEventListener("click", manejadorEditarFormulario)
            divGasto.appendChild(botonEditarFormulario)

        }

        contenedor.appendChild(divGasto)
    })

    contenedor.appendChild(document.createElement("br"))
    contenedor.appendChild(document.createElement("br"))
    contenedor.appendChild(document.createElement("br"))
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento)
    if (!contenedor) {
        console.log(`El elemento ${idElemento} no existe o no se encuentra en este documento`)
    }
    else {
        const divAgrupacion = document.createElement("div")
        divAgrupacion.className = "agrupacion"

        const h1 = document.createElement("h1")
        h1.textContent = "Gastos agrupados por " + periodo

        contenedor.appendChild(divAgrupacion)
        divAgrupacion.appendChild(h1)


        for (let clave in agrup) {
            const divDato = document.createElement("div")
            divDato.className = "agrupacion-dato"

            const spanClave = document.createElement("span")
            spanClave.className = "agrupacion-dato-clave"
            spanClave.innerHTML = clave + ": "

            const spanValor = document.createElement("span")
            spanValor.className = "agrupacion-dato-valor"
            spanValor.innerHTML = agrup[clave] + "<br>"

            divDato.appendChild(spanClave)
            divDato.appendChild(spanValor)
            divAgrupacion.appendChild(divDato)
        }
    }
}
function repintar() {
    mostrarDatoEnId("presupuesto", presupuesto.mostrarPresupuesto())

    mostrarDatoEnId("gastos-totales", presupuesto.calcularTotalGastos())

    mostrarDatoEnId("balance-total", presupuesto.calcularBalance())

    mostrarGastoWeb("listado-gastos-completo", presupuesto.listarGastos())
}
function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt("Ingrese el nuevo valor del presupuesto")
    nuevoPresupuesto = Number(nuevoPresupuesto)
    presupuesto.actualizarPresupuesto(nuevoPresupuesto)
    repintar()
}
function nuevoGastoWeb() {
    let descripcion = prompt("Ingrese la descripción del nuevo gasto")
    let valor = prompt("Ingrese el valor del nuevo gasto")
    valor = Number(valor)
    let fecha = prompt("Ingrese la fecha en formato yyyy-mm-dd")
    let etiquetas = prompt("Ingrese las etiquetas separadas por una coma sin espacios")
    let arrayEtiquetas = etiquetas.split(",")
    let gasto = new presupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas)
    presupuesto.anyadirGasto(gasto)
    repintar()
}
function EditarHandle() {
    this.handleEvent = function () {
        let arrayEtiquetas
        let etiquetas
        let descripcion = prompt("Ingrese la nueva descripción", this.gasto.descripcion)
        if (descripcion != null && descripcion != "") {
            this.gasto.actualizarDescripcion(descripcion)
        }
        let valor = Number(prompt("Ingrese el nuevo valor del gasto", this.gasto.valor))
        if (valor != null && valor != "") {
            this.gasto.actualizarValor(valor)
        }
        let fecha = prompt("Ingrese la nueva fecha con formato yyyy-mm-dd", (new Date(this.gasto.fecha)).toISOString().slice(0, 10))
        if (fecha != null && fecha != "") {
            this.gasto.actualizarFecha(fecha)
        }
        etiquetas = prompt("Ingrese las etiquetas que quiera añadir al gasto separadas por una coma sin espacios")
        arrayEtiquetas = etiquetas.split(",")

        if (etiquetas !== "") {
            this.gasto.anyadirEtiquetas(...arrayEtiquetas)
        }
        repintar()
    }
}
function BorrarHandle() {
    this.handleEvent = function () {
        presupuesto.borrarGasto(this.gasto.id)
        repintar()
    }
}
function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar()
    }
}
function nuevoGastoWebFormulario(event) {
    let contenedor = document.getElementById("controlesprincipales")
    let boton = event.currentTarget
    boton.disabled = true

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true)
    let formulario = plantillaFormulario.querySelector("form")

    formulario.addEventListener("submit", formSubmitHandler)

    let botonCancelar = formulario.querySelector(".cancelar")
    let manejadorCancelar = new ManejarCancelar()
    manejadorCancelar.form = formulario
    manejadorCancelar.boton = boton
    botonCancelar.addEventListener("click", manejadorCancelar)
    contenedor.appendChild(formulario)
}
function formSubmitHandler(event) {
    event.preventDefault()
    let form = event.target
    let boton = event.currentTarget
    console.log(boton)
    let descripcion = form.querySelector("#descripcion").value
    let valor = form.querySelector("#valor").value
    valor = Number(valor)
    let fecha = form.querySelector("#fecha").value
    let etiqueta = form.querySelector("#etiquetas").value
    etiqueta = etiqueta.split(",")

    let nuevoGasto = new presupuesto.CrearGasto(descripcion, valor, fecha, ...etiqueta)
    presupuesto.anyadirGasto(nuevoGasto)
    repintar()
    document.getElementById("anyadirgasto-formulario").disabled = false
    form.remove()
}
function ManejarCancelar() {
    this.handleEvent = function () {
        this.form.remove()
        this.boton.disabled = false
    }
}
function EditarHandleFormulario() {
    this.handleEvent = function (event) {
       let contenedor = event.target.parentElement
       let boton = event.target
       boton.disabled = true

       let formulario = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form")

       let descripcion = formulario.querySelector("#descripcion")
       let valor = formulario.querySelector("#valor")
       let fecha = formulario.querySelector("#fecha")
       let etiquetas = formulario.querySelector("#etiquetas")
       let cancelar = formulario.querySelector(".cancelar")

       descripcion.value = this.gasto.descripcion
       valor.value = this.gasto.valor
       fecha.value = new Date(this.gasto.fecha).toISOString().slice(0,10)
       etiquetas.value = this.gasto.etiquetas

       let manejadorEnvioFormulario = new EnviarHandleFormulario()
       manejadorEnvioFormulario.gasto = this.gasto
       formulario.addEventListener("submit", manejadorEnvioFormulario)

       let manejadorCancelar = new ManejarCancelar()
       manejadorCancelar.boton = boton
       manejadorCancelar.form = formulario
       cancelar.addEventListener("click", manejadorCancelar)
       
       contenedor.appendChild(formulario)
    }
}
function EnviarHandleFormulario(){
    this.handleEvent = function (event){
        event.preventDefault()

        let formulario = event.target
        console.log(formulario)

        this.gasto.descripcion = formulario.querySelector("#descripcion").value
        this.gasto.valor = formulario.querySelector("#valor").value
        this.gasto.fecha = formulario.querySelector("#fecha").value
        this.gasto.etiquetas = formulario.querySelector("#etiquetas").value.split(",")

        console.log(this.gasto.etiquetas)
        repintar()
    }
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario
}