"use strict";
import * as gestionPresupuesto from './gestionPresupuesto.js';
//función para mostrar dato en id
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

// función para mostrar gasto en web
function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    if (!elemento) return;

    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    // descripción
    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    // fecha
    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    let fecha = new Date(gasto.fecha);
    divFecha.textContent = fecha.toLocaleDateString();
    divGasto.appendChild(divFecha);

    // valor
    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor.toFixed(2);
    divGasto.appendChild(divValor);

    // etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    if (Array.isArray(gasto.etiquetas)) {
        gasto.etiquetas.forEach(etiqueta => {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
            spanEtiqueta.textContent = etiqueta;
            divEtiquetas.appendChild(spanEtiqueta);
        });
    } else if (gasto.etiqueta) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.textContent = gasto.etiqueta;
        divEtiquetas.appendChild(spanEtiqueta);
    }

    divGasto.appendChild(divEtiquetas);
    elemento.appendChild(divGasto);
}

//función para mostrar gastos agrupados en web
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    let titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(titulo);

    for (let clave in agrup) {
        let valor = agrup[clave];

        let divDato = document.createElement("div");
        divDato.classList.add("agrupacion-dato");

        let spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        let spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = valor;

        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);
        divAgrupacion.appendChild(divDato);
    }
    contenedor.appendChild(divAgrupacion);
    
}
function repintar(){
        mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
        mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());   
        mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

        let contenedorListadoGastoComp = document.getElementById('listado-gastos-completo');
        contenedorListadoGastoComp.innerHTML = '';

        for (let i = 0; i < gestionPresupuesto.listarGastos().length; i++) {
            mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.listarGastos()[i]);
        }
    }
    

    function actualizarPresupuestoWeb (){
        debugger;
        let entradaPresupuesto = prompt("Introduce el nuevo presupuesto:");
        entradaPresupuesto = Number(entradaPresupuesto);

        gestionPresupuesto.actualizarPresupuesto(entradaPresupuesto);
        repintar();
    }

    let botonActualizarpresupuesto = document.getElementById('actualizarpresupuesto');
    botonActualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
    


    function ayadirGastoWeb (){
        debugger;
        let descripcion = prompt("Introduce la descripción del gasto:");
        let valor = Number(prompt("Introduce el valor del gasto:"));
        let fecha = prompt("Introduce la fecha del gasto (YYYY-MM-DD):");
        let etiquetas = prompt("Introduce las etiquetas del gasto (separadas por comas):");

        etiquetas = etiquetas.split(',');

        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);
        repintar();
    }

    let ayadirGAsto = document.getElementById('anyadirgasto');
    ayadirGAsto.addEventListener('click', ayadirGastoWeb);

    //funcion creadora de objeto manejador de evento

    function EditarHandle(gasto){
        this.gasto = gasto;

        this.handleEvent = function(evento){
            let nuevaDescripcion = prompt('Editar descripción: ', this.gasto.descripcion);
            let valor = Number(prompt('Editar valor: ', this.gasto.valor));
            let fecha = prompt('Editar fecha (YYYY-MM-DD): ', this.gasto.fecha);
            let etiqueta = prompt('Editar etiquetas (separadas por comas): ', this.gasto.etiqueta);
//////////////////////77777777777777777777/
            etiqueta = etiqueta.split(',');
        }
    }

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
};