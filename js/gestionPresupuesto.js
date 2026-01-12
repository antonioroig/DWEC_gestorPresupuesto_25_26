"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0
var gastos = []
var idGasto = 0

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto
        return presupuesto
    }
    else {
        console.log("El valor introducido no es valido")
        return -1
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion
    this.valor = (!isNaN(valor) && valor >= 0) ? valor : 0
    this.fecha = (fecha !== undefined && !isNaN(Date.parse(fecha))) ? Date.parse(fecha) : Date.now()
    this.etiquetas = (etiquetas !== undefined) ? etiquetas : []

    this.actualizarDescripcion = function (descripcionNueva) {
        this.descripcion = descripcionNueva
    }
    this.actualizarValor = function (valorNuevo) {
        if (!isNaN(valorNuevo) && valorNuevo >= 0) {
            this.valor = valorNuevo
        }
    }
    this.actualizarFecha = function (fechaNueva) {
        this.fecha = (fechaNueva !== undefined && !isNaN(Date.parse(fechaNueva))) ? Date.parse(fechaNueva) : this.fecha
    }
    this.anyadirEtiquetas = function (...etiquetas) {
        etiquetas.forEach(nueva => {
            if (!this.etiquetas.includes(nueva)) {
                this.etiquetas.push(nueva)
            }
        })
    }
    this.borrarEtiquetas = function (...etiquetas) {
        etiquetas.forEach(eliminar => {
            let indice = this.etiquetas.indexOf(eliminar)
            if (indice !== -1) {
                this.etiquetas.splice(indice, 1)
            }
        })
    }
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
    }

    this.mostrarGastoCompleto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${(new Date(this.fecha)).toLocaleString()}
Etiquetas:
- ${this.etiquetas.join("\n- ")}
`}
    this.obtenerPeriodoAgrupacion = function (periodo) {
        switch (periodo) {
            case "dia":
                return (new Date(this.fecha)).toISOString().slice(0, 10)
                break
            case "mes":
                return (new Date(this.fecha)).toISOString().slice(0, 7)
                break
            case "anyo":
                return (new Date(this.fecha)).toISOString().slice(0, 4)
                break
            default:
                return (new Date(this.fecha)).toISOString().slice(0, 7)
        }
    }
}
function listarGastos() {
    return gastos
}
function anyadirGasto(Gasto) {
    Object.assign(Gasto, { id: idGasto })
    idGasto++
    gastos.push(Gasto)
}
function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1)
            break
        }
    }
}
function calcularTotalGastos() {
    let suma = 0
    for (let i = 0; i < gastos.length; i++) {
        suma += gastos[i].valor
    }
    return suma
}
function calcularBalance() {
    let gastosTotales = calcularTotalGastos()
    return presupuesto - gastosTotales
}
function filtrarGastos(filtros) {
    let filtrado = gastos.filter(param =>
        (!filtros.fechaDesde || (!isNaN(Date.parse(filtros.fechaDesde)) && param.fecha >= (Date.parse(filtros.fechaDesde)))) &&
        (!filtros.fechaHasta || (!isNaN(Date.parse(filtros.fechaHasta)) && param.fecha <= (Date.parse(filtros.fechaHasta)))) &&
        (!filtros.valorMinimo || (!isNaN(filtros.valorMinimo) && param.valor > filtros.valorMinimo)) &&
        (!filtros.valorMaximo || (!isNaN(filtros.valorMaximo) && param.valor < filtros.valorMaximo)) &&
        (!filtros.descripcionContiene || param.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) &&
        (!filtros.etiquetasTiene ||
            (filtros.etiquetasTiene.some(etiquetaFiltro =>
                param.etiquetas.some(etiquetaGasto =>
                    etiquetaGasto.toLowerCase() === etiquetaFiltro.toLowerCase()
                )))))

    return filtrado
}
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    let filtros = {}
    if (etiquetas) filtros.etiquetasTiene = etiquetas
    if (fechaDesde) filtros.fechaDesde = fechaDesde
    if (fechaHasta) filtros.fechaHasta = fechaHasta

    let filtrado = filtrarGastos(filtros)

    let reducido = filtrado.reduce((acc, element) => {
        let clave = element.obtenerPeriodoAgrupacion(periodo)

        if (!acc[clave]) acc[clave] = element.valor
        else acc[clave] += element.valor

        return acc
    }, {})

    return reducido
}
function transformarListadoEtiquetas(texto){
    let etiquetas = []
    if(texto){
        etiquetas = texto.split(/[,.\.;:\s]+/)
    }
    return etiquetas
}
function cargarGastos(gastosAlmacenamiento){
    gastos = []
    for (let g of gastosAlmacenamiento){
        let gastoRehidratado = new CrearGasto()
        Object.assign(gastoRehidratado, g)
        gastos.push(gastoRehidratado)
    }
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
    transformarListadoEtiquetas,
    cargarGastos
}
