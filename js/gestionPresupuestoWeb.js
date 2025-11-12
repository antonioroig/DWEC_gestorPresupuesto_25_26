import * as gP from "./gestionPresupuesto.js"

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.innerHTML = valor;
    elemento.append(parrafo);
}

function mostrarGastoWeb(idElemento, ...gastos){
    let elemento = document.getElementById(idElemento);
    for(let i = 0; i < gastos.length; i++){
        let gasto = gastos[i];
        let cajaGrande = document.createElement("div");
        cajaGrande.classList.add("gasto");

        let cajaDescripcion = document.createElement("div");
        cajaDescripcion.classList.add("gasto-descripcion");
        cajaDescripcion.innerHTML = gasto.descripcion;
        cajaGrande.append(cajaDescripcion);

        let cajaFecha = document.createElement("div");
        cajaFecha.classList.add("gasto-fecha");
        cajaFecha.innerHTML = gasto.fecha;
        cajaGrande.append(cajaFecha);

        let cajaValor = document.createElement("div");
        cajaValor.classList.add("gasto-valor");
        cajaValor.innerHTML = gasto.valor;
        cajaGrande.append(cajaValor);

        if (gasto.etiquetas != undefined)
        {
            let cajaEtiqueta = document.createElement("div");
            cajaEtiqueta.classList.add("gasto-etiquetas");

            for (let j = 0; j < gasto.etiquetas.length; j++){
                let etiqueta = gasto.etiquetas[j];
                let span = document.createElement("span");
                span.classList.add("gasto-etiquetas-etiqueta");
                span.innerHTML = etiqueta;
                cajaEtiqueta.append(span);

                cajaGrande.append(cajaEtiqueta);
            }
        }
        elemento.append(cajaGrande);
   }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let elemento = document.getElementById(idElemento);

    let cajaGrande = document.createElement("div");
    cajaGrande.classList.add("agrupacion");

    let encabezado = document.createElement("h1");
    encabezado.innerHTML = "Gastos agrupados por " + periodo;
    cajaGrande.append(encabezado);

    let claves = Object.keys(agrup);
    let valores = Object.values(agrup);

    for (let j = 0; j < Object.keys(agrup).length; j++){
        let cajaDato = document.createElement("div");
        cajaDato.classList.add("agrupacion-dato");

        let spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.innerHTML = claves[j];
        cajaDato.append(spanClave);

        let spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.innerHTML = valores[j];
        cajaDato.append(spanValor);
            
        cajaGrande.append(cajaDato);
        }
        
    elemento.append(cajaGrande);
}

function repintar(){
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());

    /*
    let contenido = document.getElementById("listado-gastos-completo");

    contenido.innerHTML = "";
    */
   
    mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());
}

function actualizarPresupuestoWeb(){

    let botonActualizar = document.getElementById("actualizarpresupuesto");

    let presupuestoActualizado = {
        handleEvent: function(){
            let cantidadPresupuesto = prompt("Introduce el presupuesto: ");
            Number(cantidadPresupuesto);
            gP.actualizarPresupuesto(cantidadPresupuesto);
            repintar();
        }
    }

    botonActualizar.addEventListener("click", presupuestoActualizado);
        
}


function nuevoGastoWeb(){

    let botonAnyadir = document.getElementById("anyadirgasto");

    let gastoNuevo = {
        handleEvent: function(){
            let descripcion = prompt("Descripción: ");
            let valor = prompt("Valor: ");
            let fecha = prompt("Fecha: ")
            let etiquetas = prompt("Etiquetas: ")

            valor = Number(valor);

            let array = etiquetas.split(",");

            let gasto = new gP.CrearGasto(descripcion, valor, fecha, array);

            gP.anyadirGasto(gasto);

            repintar();
        }
    }

    botonAnyadir.addEventListener("click", gastoNuevo);
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}