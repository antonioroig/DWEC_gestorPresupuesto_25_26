import * as gP from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let presupuesto = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.innerHTML = valor;
    presupuesto.appendChild(parrafo);
}

function mostrarGastoWeb(idElemento, gasto){
    for (let i = 0; i < gasto.length; i++){
        let divgasto = document.createElement('div');
        divgasto.className = 'gasto';
        let divgastodescripcion = document.createElement('div');
        divgastodescripcion.className = 'gasto-descripcion';
        divgastodescripcion.innerHTML = gasto[i].descripcion;
        divgasto.appendChild(divgastodescripcion);
        let divgastofecha = document.createElement('div');
        divgastofecha.className = 'gasto-fecha';
        divgastofecha.innerHTML = new Date(gasto[i].fecha).toLocaleDateString();
        divgasto.appendChild(divgastofecha);
        let divgastovalor = document.createElement('div');
        divgastovalor.className = 'gasto-valor';
        divgastovalor.innerHTML = gasto[i].valor;
        divgasto.appendChild(divgastovalor);
        let divgastoetiquetas = document.createElement('div');
        divgastoetiquetas.className = 'gasto-etiquetas';
        
        for (let j = 0; j < gasto[i].etiquetas.length; j++){
            let spanetiquetas = document.createElement('span');
            spanetiquetas.className = 'gasto-etiquetas-etiqueta';
            spanetiquetas.innerHTML = gasto[i].etiquetas[j];
            divgastoetiquetas.appendChild(spanetiquetas);
            
            let objBorrarEtiqueta = new BorrarEtiquetasHandle();
            objBorrarEtiqueta.gasto = gasto[i];
            objBorrarEtiqueta.etiqueta = gasto[i].etiquetas[j];
            spanetiquetas.addEventListener("click", objBorrarEtiqueta);
        }
        divgasto.appendChild(divgastoetiquetas);
        document.getElementById(idElemento).appendChild(divgasto);

        let botonEditar = document.createElement("button");
        botonEditar.setAttribute("type", "button");
        botonEditar.className = "gasto-editar";
        botonEditar.innerHTML = "Editar";
        let objEditar = new EditarHandle();
        objEditar.gasto = gasto[i];
        botonEditar.addEventListener("click", objEditar);
        divgasto.appendChild(botonEditar);

        let botonBorrar = document.createElement("button");
        botonBorrar.setAttribute("type", "button");
        botonBorrar.className = "gasto-borrar";
        botonBorrar.innerHTML = "Borrar";
        let objBorrar = new BorrarHandle();
        objBorrar.gasto = gasto[i];
        botonBorrar.addEventListener("click", objBorrar);
        divgasto.appendChild(botonBorrar);

        let botonEditarFormulario = document.createElement("button");
        botonEditarFormulario.setAttribute("type", "button");
        botonEditarFormulario.className = "gasto-editar-formulario";
        botonEditarFormulario.innerHTML = "Editar (formulario)";
        let objEditarFormulario = new EditarHandleFormulario();
        objEditarFormulario.gasto = gasto[i];
        botonEditarFormulario.addEventListener("click", function(){
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
            let formulario = plantillaFormulario.querySelector("form");
            formulario.elements["descripcion"].value = gasto[i].descripcion;
            formulario.elements["valor"].value = gasto[i].valor;
            let nuevaFecha = new Date(gasto[i].fecha);
            
            let mes = String(nuevaFecha.getMonth() + 1).padStart(2, '0'); // si no tiene 2 caracteres añade 0 al inicio
            let dia = String(nuevaFecha.getDate()).padStart(2, '0'); // si no tiene 2 caracteres añade 0 al inicio
            formulario.elements["fecha"].value = nuevaFecha.getFullYear() + "-" + mes + "-" + dia;
            formulario.addEventListener("submit", objEditarFormulario); 
            divgasto.append(formulario);
            botonEditarFormulario.disabled = true;

            let botonCancelar = formulario.getElementsByClassName("cancelar")[0];
            botonCancelar.addEventListener("click", function(){
                formulario.remove();
                botonEditarFormulario.disabled = false;
            });
        });
        divgasto.appendChild(botonEditarFormulario);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let divagrupacion = document.createElement("div");
    divagrupacion.className = "agrupacion";
    let h1 = document.createElement("h1");
    h1.innerHTML = ("Gastos agrupados por " + periodo);
    divagrupacion.appendChild(h1);
    for (let i = 0; i < Object.keys(agrup).length; i++){
        let divagrupaciondato = document.createElement("div");
        divagrupaciondato.className = "agrupacion-dato";
        let spanagrupaciondatoclave = document.createElement("span");
        spanagrupaciondatoclave.className = "agrupacion-dato-clave";
        spanagrupaciondatoclave.innerHTML = Object.keys(agrup)[i];
        divagrupaciondato.appendChild(spanagrupaciondatoclave);
        let spanagrupaciondatovalor = document.createElement("span");
        spanagrupaciondatovalor.className = "agrupacion-dato-valor";
        spanagrupaciondatovalor.innerHTML = Object.values(agrup)[i];
        divagrupaciondato.appendChild(spanagrupaciondatovalor);
        divagrupacion.appendChild(divagrupaciondato);
    }
    document.getElementById(idElemento).appendChild(divagrupacion);
}

function repintar (){
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduce un presupuesto");
    let nPresupuesto = Number(presupuesto);
    if (nPresupuesto != NaN)
        gP.actualizarPresupuesto(nPresupuesto);
    repintar();
}

let bActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
bActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripcion = prompt("Introduce la descripción");
    let valor = prompt("Introduce el valor");
    let fecha = prompt("Introduce la fecha");
    let etiquetas = prompt("Introduce las etiquetas");
    if (valor != NaN)
        valor = Number(valor);
    etiquetas = etiquetas.split(",");
    let gasto = new gP.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gP.anyadirGasto(gasto);
    repintar();
}

let bAnyadirGasto = document.getElementById("anyadirgasto");
bAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(evento){
        let descripcion = prompt("Introduce la descripción");
        let valor = prompt("Introduce el valor");
        let fecha = prompt("Introduce la fecha");
        let etiquetas = prompt("Introduce las etiquetas");
        etiquetas = etiquetas.split(",");
        if (valor != NaN)
            valor = Number(valor);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(evento){
        gP.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(evento){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(event){ 
        let descripcion = event.currentTarget["descripcion"].value;
        let valor = Number(event.currentTarget["valor"].value);
        let fecha = event.currentTarget["fecha"].value;
        let etiquetas = event.currentTarget["etiquetas"].value;
        etiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        event.currentTarget.disabled = false;
        repintar();
        event.currentTarget.remove();
    }
}

document.getElementById("anyadirgasto-formulario").addEventListener("click", function(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    formulario.addEventListener("submit", nuevoGastoWebFormulario);
    document.getElementById("controlesprincipales").append(formulario);
    document.getElementById("anyadirgasto-formulario").disabled = true;

    formulario.getElementsByClassName("cancelar")[0].addEventListener("click", function(){
        document.getElementById("anyadirgasto-formulario").disabled = false;
        formulario.remove();
    });
});


function nuevoGastoWebFormulario(event){
    event.preventDefault(); // no enviar
    let descripcion = event.currentTarget["descripcion"].value;
    let valor = Number(event.currentTarget["valor"].value);
    let fecha = event.currentTarget["fecha"].value;
    let etiquetas = event.currentTarget["etiquetas"].value;
    etiquetas = etiquetas.split(",");
    let gasto = new gP.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    document.getElementById("anyadirgasto-formulario").disabled = false;
    gP.anyadirGasto(gasto);
    repintar();
    event.currentTarget.remove();
}

function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let form = event.target;
        let descripcion = form.elements("formulario-filtrado-descripcion").value;
        let valMinimo = form.elements("formulario-filtrado-valor-minimo").value;
        let valMaximo = form.elements("formulario-filtrado-valor-maximo").value;
        let fechaInicial = form.elements("formulario-filtrado-fecha-desde").value;
        let fechaFinal = form.elements("formulario-filtrado-fecha-hasta").value;
        let etiquetas = form.elements("formulario-filtrado-etiquetas-tiene").value;

        // voy por 
        // Si el campo formulario-filtrado-etiquetas-tiene tiene datos, 
        // llamar a la función transformarListadoEtiquetas (recordad que está en el paquete gestionpresupuesto.js) 
        // para que devuelva un array de etiquetas válidas.
    }
}

document.getElementById("formulario-filtrado").addEventListener("submit", new filtrarGastosWeb());

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    EditarHandleFormulario,
    filtrarGastosWeb
}