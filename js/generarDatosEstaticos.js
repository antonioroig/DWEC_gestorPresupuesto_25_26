import * as L from './gestionPresupuesto.js';
import { Web } from './gestionPresupuestoWeb.js';

Web.repintar();

const gastos = L.listarGastos();

const filtro1 = gastos.filter(g => g.fecha && new Date(g.fecha).getMonth()===8); // septiembre
filtro1.forEach(g => Web.mostrarGastoWeb("listado-gastos-filtrado-1", g));

const filtro2 = gastos.filter(g => g.valor>50);
filtro2.forEach(g => Web.mostrarGastoWeb("listado-gastos-filtrado-2", g));

const filtro3 = gastos.filter(g => g.valor>200 && g.etiquetas.includes("seguros"));
filtro3.forEach(g => Web.mostrarGastoWeb("listado-gastos-filtrado-3", g));

const filtro4 = gastos.filter(g => (g.etiquetas.includes("comida") || g.etiquetas.includes("transporte")) && g.valor<50);
filtro4.forEach(g => Web.mostrarGastoWeb("listado-gastos-filtrado-4", g));
