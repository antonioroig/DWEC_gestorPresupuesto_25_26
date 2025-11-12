import * as gP from "./gestionPresupuesto.js"
import * as gPw from "./gestionPresupuestoWeb.js"

//ACTUALIZAR Y MOSTRAR EL PRESUPUESTO EN  DIVPRESUPUESTO
gP.actualizarPresupuesto(1500);
gPw.mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto())

//CREAR LOS 6 GASTOS Y AÑADIRLOS

gP.anyadirGasto(new gP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gP.anyadirGasto(new gP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gP.anyadirGasto(new gP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gP.anyadirGasto(new gP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gP.anyadirGasto(new gP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gP.anyadirGasto(new gP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

//MOSTRAR TODOS LOS GASTOS EN DIVGASTOSTOTALES
gPw.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());

//MOSTRAR EL BALANCE TOTAL EN BALANCETOTAL
gPw.mostrarDatoEnId("balance-total", gP.calcularBalance());

//MOSTRAR EL LISTADO COMPLETO DE GASTOS EN DIVLISTADOGASTOSCOMPLETOS
gPw.mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());

//MOSTRAR EL LISTADO FILTRADO 1
let objeto1 = new Object();
let fechaDesde = "fechaDesde";
let fechaHasta = "fechaHasta";
objeto1[fechaDesde] = "2021-09-01";
objeto1[fechaHasta] = "2021-09-30";
gPw.mostrarGastoWeb("listado-gastos-filtrado-1", gP.filtrarGastos(objeto1));

//MOSTRAR EL LISTADO FILTRADO 2
let objeto2 = new Object();
let valorMinimo = "valorMinimo";
objeto2[valorMinimo] = 50;
gPw.mostrarGastoWeb("listado-gastos-filtrado-2", gP.filtrarGastos(objeto2));

//MOSTRAR EL LISTADO FILTRADO 3
let objeto3 = new Object();
let etiquetasTiene = "etiquetasTiene";
objeto3[valorMinimo] = 200;
objeto3[etiquetasTiene] = ["seguros"]
gPw.mostrarGastoWeb("listado-gastos-filtrado-3", gP.filtrarGastos(objeto3));

//MOSTRAR EL LISTADO FILTRADO 4
let objeto4 = new Object();
let valorMaximo = "valorMaximo";
objeto4[valorMaximo] = 50;
objeto4[etiquetasTiene] = ["comida", "transporte"];
gPw.mostrarGastoWeb("listado-gastos-filtrado-4", gP.filtrarGastos(objeto4));

//TOTAL DE GASTOS AGRUPADOS POR DÍA
gPw.mostrarGastosAgrupadosWeb("agrupacion-dia", gP.agruparGastos("dia"), "día");

//TOTAL DE GASTOS AGRUPADOS POR MES
gPw.mostrarGastosAgrupadosWeb("agrupacion-mes", gP.agruparGastos("mes"), "mes");

//TOTAL DE GASTOS AGRUPADOS POR AÑO
gPw.mostrarGastosAgrupadosWeb("agrupacion-anyo", gP.agruparGastos("anyo"), "año");

//FUNCIÓN ACTUALIZARPRESUPUESTOWEB Y BOTÓN ACTUALIZARPRESUPUESTO

//FUNCIÓN NUEVOGASTOWEB Y BOTÓN ANYADIR GASTO

//FUNCIÓN EDITARHANDLE



    

