import * as gP from "./gestionPresupuesto.js"

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.innerHTML = valor;
    elemento.append(parrafo);
}

function mostrarGastoWeb(idElemento, gastos){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let formulario = plantillaFormulario.querySelector("form");
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = "";
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
        let fechaLocal = new Date(gasto.fecha);
        let fechaFormateada = fechaLocal.toLocaleDateString();
        cajaFecha.innerHTML = fechaFormateada;
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
                let manejadorSpan = new BorrarEtiquetasHandle();
                manejadorSpan.gasto = gasto;
                manejadorSpan.etiqueta = etiqueta;
                span.addEventListener("click", manejadorSpan);
                cajaEtiqueta.append(span);

                cajaGrande.append(cajaEtiqueta);
            }
        }

        let botonEditar = document.createElement("button");
        botonEditar.setAttribute("type", "button");   
        botonEditar.classList.add("gasto-editar");
        botonEditar.textContent = "Editar";

        let manejadorGastoEditar = new EditarHandle();

        manejadorGastoEditar.gasto = gasto;

        botonEditar.addEventListener("click", manejadorGastoEditar);

        cajaGrande.append(botonEditar);

        let botonBorrar = document.createElement("button");
        botonBorrar.setAttribute("type", "button");   
        botonBorrar.classList.add("gasto-borrar");
        botonBorrar.textContent = "Borrar gasto";

        let manejadorGastoBorrar = new BorrarHandle();

        manejadorGastoBorrar.gasto = gasto;

        botonBorrar.addEventListener("click", manejadorGastoBorrar);

        cajaGrande.append(botonBorrar);

        let botonBorrarApi = document.createElement("button");
        botonBorrarApi.setAttribute("type", "button");   
        botonBorrarApi.classList.add("gasto-borrar-api");
        botonBorrarApi.textContent = "Borrar (API)";

        let manejadorBorrarApi = new BorrarApiHandle();

        manejadorBorrarApi.gasto = gasto;

        botonBorrarApi.addEventListener("click", manejadorBorrarApi);
        botonBorrarApi.addEventListener("click", function(){
            cajaGrande.append(formulario);
        })

        cajaGrande.append(botonBorrarApi);

        let botonEditarFormulario = document.createElement("button");
        botonEditarFormulario.setAttribute("type", "button");   
        botonEditarFormulario.classList.add("gasto-editar-formulario");
        botonEditarFormulario.textContent = "Editar gasto formulario";

        let manejadorEditarFormulario = new EditarHandleFormulario();

        manejadorEditarFormulario.gasto = gasto;
        manejadorEditarFormulario.form = formulario;

        botonEditarFormulario.addEventListener("click", manejadorEditarFormulario);
        botonEditarFormulario.addEventListener("click", function(){
            cajaGrande.append(formulario);
        })

        cajaGrande.append(botonEditarFormulario);

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
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());
}

function actualizarPresupuestoWeb(){
    let cantidadPresupuesto = prompt("Introduce el presupuesto: ");
    Number(cantidadPresupuesto);
    gP.actualizarPresupuesto(cantidadPresupuesto);
    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt("Descripción: ");
    let valor = prompt("Valor: ");
    let fecha = prompt("Fecha: ")
    let etiquetas = prompt("Etiquetas: ")

    valor = Number(valor);

    let array = etiquetas.split(",");
    let gasto = new gP.CrearGasto(descripcion, valor, fecha, ...array);

    gP.anyadirGasto(gasto);

    repintar();
}

function nuevoGastoWebFormulario(event){

    let divControles = document.getElementById("controlesprincipales");

    event.target.setAttribute("disabled", true);

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let formulario = plantillaFormulario.querySelector("form");

    divControles.append(plantillaFormulario);

    let botonCancelar = formulario.querySelector("button.cancelar");

    let manejadorCancelar = new CancelarHandle();

    manejadorCancelar.form = formulario;

    botonCancelar.addEventListener("click", manejadorCancelar);

    formulario.addEventListener("submit", botonEnviarFormulario);

    let botonEnviarApi = formulario.querySelector("button.gasto-enviar-api");

    botonEnviarApi.addEventListener("click", function(){

        let gastoDatos = new gP.CrearGasto(event.currentTarget.elements["description"].value, event.currentTarget.elements["valor"].value, event.currentTarget.elements["fecha"].value, event.currentTarget.elements["etiquetas"].value)
        
        let options = {
            method: "POST",
            header: {
                'Context-Type': 'application/json'
            },
            body: JSON.stringify(gastoDatos)
        }

        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`, options)
        .then(response => console.log(response))
        .then(data => console.log(data));

        cargarGastosApi();
    })

    let manejadorEnviarApi = new EditarHandleFormulario();

    manejadorEnviarApi.form = formulario;

    botonEnviarApi.addEventListener("click", manejadorEnviarApi);

}

function botonEnviarFormulario(event){

    event.preventDefault();

    let descripcion = event.currentTarget.elements["descripcion"].value;

    let valor = event.currentTarget.elements["valor"].value;

    valor = Number(valor);

    let fecha = event.currentTarget.elements["fecha"].value;

    let etiquetas = event.currentTarget.elements["etiquetas"].value;

    let arrayEtiquetas = etiquetas.split(",");

    let gasto = new gP.CrearGasto(descripcion, valor, fecha, arrayEtiquetas);

    gP.anyadirGasto(gasto);

    event.currentTarget.remove();

    repintar();

    let botonAnyadir = document.getElementById("anyadirgasto-formulario");
    botonAnyadir.removeAttribute("disabled");
    
}

function filtrarGastosWeb(){

    let formulario = document.getElementById("formulario-filtrado");

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        let objeto = new Object();

        if (formulario.elements["formulario-filtrado-descripcion"].value != "")
            objeto.descripcionContiene = formulario.elements["formulario-filtrado-descripcion"].value;
        if (formulario.elements["formulario-filtrado-valor-minimo"].value != "")
            objeto.valorMinimo = Number(formulario.elements["formulario-filtrado-valor-minimo"].value);
        if (formulario.elements["formulario-filtrado-valor-maximo"].value != "")
        objeto.valorMaximo = Number(formulario.elements["formulario-filtrado-valor-maximo"].value);
        if (formulario.elements["formulario-filtrado-fecha-desde"].value != "")
        objeto.fechaDesde = new Date(formulario.elements["formulario-filtrado-fecha-desde"].value);
        if (formulario.elements["formulario-filtrado-fecha-hasta"].value != "")
            objeto.fechaHasta = new Date(formulario.elements["formulario-filtrado-fecha-hasta"].value);
        if (formulario.elements["formulario-filtrado-etiquetas-tiene"].value != "")
            objeto.etiquetasTiene = gP.transformarListadoEtiquetas(formulario.elements["formulario-filtrado-etiquetas-tiene"].value);

        let gastosFiltrados = gP.filtrarGastos(objeto);

        mostrarGastoWeb("listado-gastos-completo", gastosFiltrados);
    })

}

function guardarGastosWeb(){

    let gastos = gP.listarGastos();

    localStorage.setItem("GestorGastosDWEC", JSON.stringify(gastos));


}

function cargarGastosWeb(){

    if(localStorage.getItem("GestorGastosDWEC") != undefined)
        gP.cargarGastos(JSON.parse(localStorage.getItem("GestorGastosDWEC")));
    else{
        gP.cargarGastos([]);
    }

    repintar();
}

function cargarGastosApi(){

    let options = {
        method: "GET"
    }

    let nombreUsuario = document.getElementById("nombre_usuario").value;

    async function cargar(){
    
        let response = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`, options)
                
        let gastos = await response.json();

        console.log(gastos);

        gP.cargarGastos(gastos);

        repintar();
    }

    cargar()

}

function CancelarHandle(){
    
    this.handleEvent = function(event){
        let botonAnyadir = document.getElementById("anyadirgasto-formulario");
        botonAnyadir.removeAttribute("disabled");
        this.form.remove();
    }
}

function CancelarHandleFormulario(){
    this.handleEvent = function(event){
        this.boton.removeAttribute("disabled");
        this.form.remove();
    }
}


function EditarHandle(){

        this.handleEvent = function(event){

            let descripcion = prompt("Descripción: ");
            let valor = prompt("Valor: ");
            let fecha = prompt("Fecha: ")
            let etiquetas = prompt("Etiquetas: ")

            valor = Number(valor);

            let array = etiquetas.split(",");
        
            this.gasto.actualizarDescripcion(descripcion);

            this.gasto.actualizarValor(valor);

            this.gasto.actualizarFecha(fecha);

            this.gasto.anyadirEtiquetas(array);

            repintar();
        }
}

function BorrarHandle(){
    this.handleEvent = function(event){
        gP.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EnviarHandle(){
    this.handleEvent = function(event){
        this.gasto.actualizarDescripcion(this.formulario.elements["descripcion"].value);
        let valor = Number(this.formulario.elements["valor"].value);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(this.formulario.elements["fecha"].value);
        let stringEtiqueta = this.formulario.elements["etiquetas"].value;
        console.log(stringEtiqueta);
        let arrayEtiqueta = stringEtiqueta.split(",");
        this.gasto.anyadirEtiquetas(...arrayEtiqueta);
        repintar();
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(event){
        
        event.target.setAttribute("disabled", true);

        let fecha = new Date(this.gasto.fecha);

        let year = fecha.getFullYear();
        let month = String(fecha.getMonth() + 1).padStart(2, "0");
        let day = String(fecha.getDate()).padStart(2, "0");

        this.form.elements["descripcion"].value = this.gasto.descripcion;
        this.form.elements["valor"].value = this.gasto.valor;
        this.form.elements["fecha"].value = `${year}-${month}-${day}`;

        let manejadorEnviar = new EnviarHandle();

        manejadorEnviar.gasto = this.gasto;
        manejadorEnviar.formulario = this.form;

        this.form.addEventListener("submit", manejadorEnviar);

        let botonCancelar = this.form.querySelector("button.cancelar")

        let manejadorCancelar = new CancelarHandleFormulario();

        manejadorCancelar.form = this.form;
        manejadorCancelar.boton = event.target;

        botonCancelar.addEventListener("click", manejadorCancelar);

        let gastoDatos = new gP.CrearGasto(this.gasto.descripcion, this.gasto.valor, this.gasto.fecha, this.gasto.etiquetas)

        let options = {
            method: "PUT", 
            header: {
                'Context-Type': 'application/json'
            },
            body: JSON.stringify(gastoDatos)
        }

        let nombreUsuario = document.getElementById("nombre_usuario").value;

        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.id}`, options)
        .then(response => response.json())
        .then(data => console.log(data));
    
    }
}

function BorrarApiHandle(){
    this.handleEvent = function(event){

        let options = {
            method: "DELETE"
        }

        let nombreUsuario = document.getElementById("nombre_usuario").value;

        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.id}`, options)
        .then(response => response.json())
        .then(data => console.log(data));

        cargarGastosApi();

    }
}

let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);
let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener("click", nuevoGastoWeb);
let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb, 
    cargarGastosWeb,
    cargarGastosApi
}