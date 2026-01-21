"use strict"
import * as presupuesto from './gestionPresupuesto.js'

let numeroFiltro = 0
const urlApi = "https://gestion-presupuesto-api.onrender.com/api"
let usuario = ""

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

                if (key !== "id" && key !== "gastoId" && key !== "usuario") {
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

            const botonBorrarApi = document.createElement("button")
            botonBorrarApi.type = "button"
            botonBorrarApi.textContent = "Borrar (API)"
            botonBorrarApi.classList.add("gasto-borrar-api")
            let manejadorBorrarApi = new BorrarApiHandle()
            manejadorBorrarApi.gasto = gasto
            botonBorrarApi.addEventListener("click", manejadorBorrarApi)
            divGasto.appendChild(botonBorrarApi)

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
        if (!this.gasto.gastoId) {
            this.gasto.borrarEtiquetas(this.etiqueta)
            repintar()
        }
        else {
            let indiceEtiqueta = this.gasto.etiquetas.indexOf(this.etiqueta)
            this.gasto.etiquetas.splice(indiceEtiqueta, 1)
            let gastoEditado = this.gasto
            gastoEditado = JSON.stringify(gastoEditado)

            fetch(urlApi + "/" + usuario + "/" + this.gasto.gastoId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: gastoEditado
            })
                .then(() => cargarGastosApi())
        }
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

    let botonEnviarApi = formulario.querySelector(".gasto-enviar-api")
    let manejadorEnviarApi = new EnviarApiHandleFormulario()
    manejadorEnviarApi.formulario = formulario
    botonEnviarApi.addEventListener("click", manejadorEnviarApi)

    contenedor.appendChild(formulario)
}
function formSubmitHandler(event) {
    event.preventDefault()
    let form = event.target
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
    this.handleEvent = function (event) {
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
        let cancelar = formulario.querySelector(".cancelar")
        let enviarApi = formulario.querySelector(".gasto-enviar-api")

        descripcion.value = this.gasto.descripcion
        valor.value = this.gasto.valor
        fecha.value = new Date(this.gasto.fecha).toISOString().slice(0, 10)

        let manejadorEnvioFormulario = new EnviarHandleFormulario()
        manejadorEnvioFormulario.gasto = this.gasto
        formulario.addEventListener("submit", manejadorEnvioFormulario)

        let manejadorCancelar = new ManejarCancelar()
        manejadorCancelar.boton = boton
        manejadorCancelar.form = formulario
        cancelar.addEventListener("click", manejadorCancelar)

        let manejadorEnviarApi = new EnviarApiEditarHandleFormulario()
        manejadorEnviarApi.gasto = this.gasto
        manejadorEnviarApi.formulario = formulario
        enviarApi.addEventListener("click", manejadorEnviarApi)

        contenedor.appendChild(formulario)
    }
}
function EnviarHandleFormulario() {
    this.handleEvent = function (event) {
        event.preventDefault()

        let formulario = event.target

        this.gasto.actualizarDescripcion(formulario.querySelector("#descripcion").value)
        this.gasto.actualizarValor(Number(formulario.querySelector("#valor").value))
        this.gasto.actualizarFecha(formulario.querySelector("#fecha").value)
        let etiquetas = formulario.querySelector("#etiquetas").value
        if (etiquetas.length > 0) {
            this.gasto.anyadirEtiquetas(etiquetas.split(","))
        }

        repintar()
    }
}
function filtrarGastoWeb(event) {
    event.preventDefault()
    const descripcionContiene = document.getElementById("formulario-filtrado-descripcion").value;
    const valorMinimo = document.getElementById("formulario-filtrado-valor-minimo").value;
    const valorMaximo = document.getElementById("formulario-filtrado-valor-maximo").value;
    const fechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value;
    const fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
    const etiquetasTexto = document.getElementById("formulario-filtrado-etiquetas-tiene").value;

    let etiquetasTiene = []

    if (etiquetasTexto) {
        etiquetasTiene = presupuesto.transformarListadoEtiquetas(etiquetasTexto)
    }
    let filtros = {}



    if (descripcionContiene) { filtros.descripcionContiene = descripcionContiene }
    if (valorMinimo) { filtros.valorMinimo = valorMinimo }
    if (valorMaximo) { filtros.valorMaximo = valorMaximo }
    if (fechaDesde) { filtros.fechaDesde = fechaDesde }
    if (fechaHasta) { filtros.fechaHasta = fechaHasta }
    if (etiquetasTiene.length > 0) { filtros.etiquetasTiene = etiquetasTiene }

    let gastosFiltrados = presupuesto.filtrarGastos(filtros)

    if (filtros) {
        mostrarGastoWeb("listado-gastos-completo", gastosFiltrados)
    }
    else {
        mostrarGastoWeb("listado-gastos-completo", presupuesto.listarGastos())
    }
}
function guardarGastoWeb() {
    localStorage.setItem("GestorGastosDWEC", JSON.stringify(presupuesto.listarGastos()))
}
function cargarGastoWeb() {
    // let gastosGuardados = JSON.parse(localStorage.getItem("GestorGastosDEWC"))
    let gastosGuardados = localStorage.getItem("GestorGastosDWEC")
    gastosGuardados = JSON.parse(gastosGuardados)
    console.log(gastosGuardados);

    if (!gastosGuardados) {
        presupuesto.cargarGastos([])
        repintar()
    }
    else {
        presupuesto.cargarGastos(gastosGuardados)
        repintar()
    }
}
function cargarGastosApi() {
    actualizarUsuario()

    if (usuario) {
        fetch(urlApi + "/" + usuario, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => presupuesto.cargarGastos(data))
            .then(() => repintar())
            .catch(error => console.error(error.message))
    }
    else {
        alert("Introduzca un nombre de usuario")
    }
}
function actualizarUsuario() {
    usuario = document.getElementById("nombre_usuario").value
}
function BorrarApiHandle() {
    this.handleEvent = function (event) {
        event.preventDefault()
        actualizarUsuario()

        fetch(urlApi + "/" + usuario + "/" + this.gasto.gastoId, {
            method: "DELETE"
        })
            .then(res => console.log(res.message))
            .then(() => cargarGastosApi())
            .catch(err => console.error(err.message))
    }
}
function EnviarApiHandleFormulario() {
    this.handleEvent = function (event) {
        event.preventDefault()

        let form = this.formulario

        let descripcion = form.querySelector("#descripcion").value
        let valor = form.querySelector("#valor").value
        valor = Number(valor)
        let fecha = form.querySelector("#fecha").value
        let etiqueta = form.querySelector("#etiquetas").value
        etiqueta = etiqueta.split(",")

        let nuevoGasto = new presupuesto.CrearGasto(descripcion, valor, fecha, ...etiqueta)
        let nuevoGastoJSON = JSON.stringify(nuevoGasto)

        actualizarUsuario()

        console.log(urlApi + "/" + usuario);


        fetch(urlApi + "/" + usuario, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: nuevoGastoJSON

        })
        cargarGastosApi()
    }
}
function EnviarApiEditarHandleFormulario() {
    this.handleEvent = function (event) {
        event.preventDefault()

        let form = this.formulario
        let gastoEditado = {}
        gastoEditado.descripcion = form.querySelector("#descripcion").value
        gastoEditado.valor = form.querySelector("#valor").value
        gastoEditado.fecha = form.querySelector("#fecha").value
        gastoEditado.etiquetas = this.gasto.etiquetas
        let etiquetasNuevas = form.querySelector("#etiquetas").value
        etiquetasNuevas = etiquetasNuevas.split(",")

        if (etiquetasNuevas.length > 0) {
            etiquetasNuevas.forEach(etiqueta => {
                gastoEditado.etiquetas.push(etiqueta)
            });
        }

        gastoEditado = JSON.stringify(gastoEditado)
        actualizarUsuario()
        fetch(urlApi + "/" + usuario + "/" + this.gasto.gastoId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: gastoEditado
        })
            .then(() => cargarGastosApi())
    }
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    filtrarGastoWeb,
    guardarGastoWeb,
    cargarGastoWeb,
    cargarGastosApi
}