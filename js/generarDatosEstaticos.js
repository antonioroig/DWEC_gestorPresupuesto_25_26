import * as L from './gestionPresupuesto.js'; 
import * as Web from './gestionPresupuestoWeb.js'; 

const gastos = [];
let presupuesto = 1500;

const anyadirGasto = (descripcion, valor, fecha, ...etiquetas) => {
    const nuevoGasto = { descripcion, valor, fecha, etiquetas }; 
    gastos.push(nuevoGasto);
};


const calcularTotalGastos = (listaGastos) => {
    return listaGastos.reduce((total, gasto) => total + gasto.valor, 0);
};

const calcularBalance = (presupuesto, totalGastos) => {
    return presupuesto - totalGastos;
};

const agruparGastos = (listaGastos, periodo) => {
    const agrupado = {};
    listaGastos.forEach(gasto => {
        let clave;
        switch (periodo) {
            case 'dia':
                clave = gasto.fecha; 
                break;
            case 'mes':
                clave = gasto.fecha.substring(0, 7);
                break;
            case 'anyo':
                clave = gasto.fecha.substring(0, 4);
                break;
            default:
                return;
        }
        
        if (!agrupado[clave]) {
            agrupado[clave] = 0;
        }
        agrupado[clave] += gasto.valor;
    });
    
    for (const clave in agrupado) {
        agrupado[clave] = parseFloat(agrupado[clave].toFixed(2));
    }
    return agrupado;
};

anyadirGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
anyadirGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
anyadirGasto("Bonobús", 18.60, "2020-05-26", "transporte");
anyadirGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
anyadirGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
anyadirGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");


const totalGastosReal = calcularTotalGastos(gastos);
const totalGastos = Math.floor(totalGastosReal);
const balance = calcularBalance(presupuesto, totalGastosReal);

Web.mostrarDatoEnId("presupuesto", `Tu presupuesto actual es de ${presupuesto} €`);
Web.mostrarDatoEnId("gastos-totales", totalGastos);
Web.mostrarDatoEnId("balance-total", parseFloat(balance.toFixed(2)));


const listadoCompleto = document.getElementById("listado-gastos-completo");
if (listadoCompleto) listadoCompleto.innerHTML = "";
gastos.forEach(gasto => {
    Web.mostrarGastoWeb("listado-gastos-completo", gasto);
});


const filtro1 = gastos.filter(g => g.fecha.startsWith("2021-09"));
filtro1.forEach(gasto => Web.mostrarGastoWeb("listado-gastos-filtrado-1", gasto));

const filtro2 = gastos.filter(g => g.valor > 50);
filtro2.forEach(gasto => Web.mostrarGastoWeb("listado-gastos-filtrado-2", gasto));

const filtro3 = gastos.filter(g => g.valor > 200 && g.etiquetas.includes("seguros"));
filtro3.forEach(gasto => Web.mostrarGastoWeb("listado-gastos-filtrado-3", gasto));

const filtro4 = gastos.filter(g => (g.etiquetas.includes("comida") || g.etiquetas.includes("transporte")) && g.valor < 50);
filtro4.forEach(gasto => Web.mostrarGastoWeb("listado-gastos-filtrado-4", gasto));


Web.mostrarGastosAgrupadosWeb("agrupacion-dia", agruparGastos(gastos, "dia"), "dia");
Web.mostrarGastosAgrupadosWeb("agrupacion-mes", agruparGastos(gastos, "mes"), "mes");
Web.mostrarGastosAgrupadosWeb("agrupacion-anyo", agruparGastos(gastos, "anyo"), "anyo");
