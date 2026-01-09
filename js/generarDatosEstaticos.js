import * as Js1 from './gestionPresupuestoWeb.js';
import * as Js2 from './gestionPresupuesto.js';

Js2.actualizarPresupuesto(1500);
let texto = Js2.mostrarPresupuesto();
Js1.mostrarDatoEnId(texto, "presupuesto");

let g1 = new Js2.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new Js2.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new Js2.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new Js2.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new Js2.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new Js2.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

Js2.anyadirGasto(g1);
Js2.anyadirGasto(g2);
Js2.anyadirGasto(g3);
Js2.anyadirGasto(g4);
Js2.anyadirGasto(g5);
Js2.anyadirGasto(g6);

Js1.mostrarDatoEnId(Js2.calcularTotalGastos(), "gastos-totales");
Js1.mostrarDatoEnId(Js2.calcularBalance(), "balance-total");
Js1.mostrarGastoWeb("listado-gastos-completo", Js2.listarGastos());
Js1.mostrarGastoWeb("listado-gastos-filtrado-1", Js2.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));
Js1.mostrarGastoWeb("listado-gastos-filtrado-2", Js2.filtrarGastos({valorMinimo: "50"}));
Js1.mostrarGastoWeb("listado-gastos-filtrado-3", Js2.filtrarGastos({valorMinimo: "200", etiquetasTiene: ["seguros"]}));
Js1.mostrarGastoWeb("listado-gastos-filtrado-4", Js2.filtrarGastos({valorMaximo: "50", etiquetasTiene: ["comida", "transporte"]}));
Js1.mostrarGastosAgrupadosWeb("agrupacion-dia", Js2.agruparGastos("dia"), "día");
Js1.mostrarGastosAgrupadosWeb("agrupacion-mes", Js2.agruparGastos("mes"), "mes");
Js1.mostrarGastosAgrupadosWeb("agrupacion-anyo", Js2.agruparGastos("anyo"), "año");
Js1.filtrarGastosWeb();
Js1.guardarGastosWeb();
Js1.cargarGastosWeb();