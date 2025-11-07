import * as gp from './gestionPresupuesto.js'
import * as gpw from './gestionPresupuestoWeb.js'

// Parte 1 (Test 1)
gp.actualizarPresupuesto(1500);
let presupuesto = gp.mostrarPresupuesto();
gpw.mostrarDatoEnId("presupuesto", presupuesto)

// Parte 2 (Test 1)
let g1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let g2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let g3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte")
let g4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let g5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let g6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")


gp.anyadirGasto(g1)
gp.anyadirGasto(g2)
gp.anyadirGasto(g3)
gp.anyadirGasto(g4)
gp.anyadirGasto(g5)
gp.anyadirGasto(g6)

let total = gp.calcularTotalGastos();
gpw.mostrarDatoEnId("gastos-totales", total)
let balance = gp.calcularBalance()
gpw.mostrarDatoEnId("balance-total", balance)

// Parte 3 (Test 2)
let completo = gp.listarGastos();
gpw.mostrarGastoWeb("listado-gastos-completo", completo);

let sept21 = gp.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"})
gpw.mostrarGastoWeb("listado-gastos-filtrado-1", sept21)

let mas50 = gp.filtrarGastos({valorMinimo: 50})
gpw.mostrarGastoWeb("listado-gastos-filtrado-2", mas50)

let mas200 = gp.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]})
gpw.mostrarGastoWeb("listado-gastos-filtrado-3", mas200)

let conTags = gp.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]})
gpw.mostrarGastoWeb("listado-gastos-filtrado-4", conTags)


let agrup1 = gp.agruparGastos("dia")
gpw.mostrarGastosAgrupadosWeb("agrupacion-dia", agrup1, "día")

let agrup2 = gp.agruparGastos("mes")
gpw.mostrarGastosAgrupadosWeb("agrupacion-mes", agrup2, "mes")

let agrup3 = gp.agruparGastos("anyo")
gpw.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrup3, "año")


gpw.repintar();

function ActualizarPresupuestoWeb() {
    this.handleEvent = function(e) {
        let newPresupuesto = prompt("¿Qué nuevo presupuesto quieres?")
        if (isNaN(newPresupuesto)) {
            alert("Intruduce sólo números!")
        }
        else {
            newPresupuesto = parseInt(newPresupuesto)
            gp.actualizarPresupuesto(newPresupuesto)
            gpw.repintar()
        }
    }
}


let manejadorActualizarPresupuestoWeb = new ActualizarPresupuestoWeb()
let updatePresupuestoBtn = document.getElementById("actualizarpresupuesto")
updatePresupuestoBtn.addEventListener("click", manejadorActualizarPresupuestoWeb)


let anyadirGastoBtn = document.getElementById("anyadirgasto")
let manejadorAnyadirGasto = new gpw.NuevoGastoWeb()
anyadirGastoBtn.addEventListener("click", manejadorAnyadirGasto)