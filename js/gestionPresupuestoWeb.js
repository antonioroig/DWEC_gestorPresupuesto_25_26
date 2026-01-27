import * as GP from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    
    if (elemento)
        elemento.textContent = valor;        
};

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.getElementById(idElemento)

    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.classList.add("gasto-descripcion");
    gastoDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(gastoDescripcion);

    let gastoFecha = document.createElement("div");
    gastoFecha.classList.add("gasto-fecha");
    gastoFecha.textContent = gasto.obtenerPeriodoAgrupacion("dia");
    divGasto.appendChild(gastoFecha);

    let gastoValor = document.createElement("div");
    gastoValor.classList.add("gasto-valor");
    gastoValor.textContent = gasto.valor;
    divGasto.appendChild(gastoValor);

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.classList.add("gasto-etiquetas");
    let manejadorEtiquetas = new BorrarEtiquetasHandle();
    manejadorEtiquetas.gasto = gasto;
    gasto.etiquetas.forEach(etiqueta => {
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        manejadorEtiquetas.etiqueta = etiqueta;
        gastoEtiqueta.addEventListener("click", manejadorEtiquetas);
        gastoEtiqueta.textContent = etiqueta;
        gastoEtiquetas.appendChild(gastoEtiqueta);        
    });
    divGasto.appendChild(gastoEtiquetas);

    let btnEditar = document.createElement("button");
    btnEditar.classList.add("gasto-editar");
    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", manejadorEditar);
    divGasto.appendChild(btnEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.classList.add("gasto-borrar");
    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", manejadorBorrar);
    divGasto.appendChild(btnBorrar);

    let btnEditarFormulario = document.createElement("button");
    btnEditarFormulario.classList.add("gasto-editar-formulario");
    let manejadorEditarFormulario = new EditarHandleFormulario();
    manejadorEditarFormulario.gasto = gasto;
    btnEditarFormulario.textContent = "Editar (Formulario)";
    btnEditarFormulario.addEventListener("click", manejadorEditarFormulario);
    divGasto.appendChild(btnEditarFormulario);

    elemento.appendChild(divGasto);
};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento)

    let agrupacion = document.createElement("div");
    agrupacion.classList.add("agrupacion");

    let textAgrup = document.createElement("h1");
    textAgrup.textContent = "Gastos agrupados por " + periodo;
    agrupacion.appendChild(textAgrup);

    Object.entries(agrup).forEach(([key, value]) => {
        let agrupacionDato = document.createElement("div");
        agrupacionDato.classList.add("agrupacion-dato");
    
        let agrupacionDatoClave = document.createElement("span");
        agrupacionDatoClave.classList.add("agrupacion-dato-clave");
        agrupacionDatoClave.textContent = key;
        agrupacionDato.appendChild(agrupacionDatoClave);
    
        let agrupacionDatoValor = document.createElement("span");
        agrupacionDatoValor.classList.add("agrupacion-dato-valor");
        agrupacionDatoValor.textContent = value;
        agrupacionDato.appendChild(agrupacionDatoValor);

        agrupacion.appendChild(agrupacionDato);
    });

    elemento.appendChild(agrupacion);
};

function repintar(){
    let presupuesto = GP.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);
    let gastosTotales = GP.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);
    let balanceTotal = GP.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);
    let listadoCompleto = document.getElementById("listado-gastos-completo");
    listadoCompleto.innerHTML = "";
    let listarGastos = GP.listarGastos();
    listarGastos.forEach(gasto => {mostrarGastoWeb("listado-gastos-completo", gasto)});
};

function actualizarPresupuestoWeb(){
    let presupuesto = Number(prompt("Introduzca un presupuesto: "));
    GP.actualizarPresupuesto(presupuesto);
    repintar();
}

let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb)

function nuevoGastoWeb(){
    let descripcion = prompt("Introduzca una descripción para el nuevo gasto: ");
    let valor = Number(prompt("Introduzca un valor para el nuevo gasto: "));
    let fecha = prompt("Introduzca una fecha en formato yyyy-mm-dd : ");
    let etiquetas = prompt("Introduzca etiquetas para el nuevo gasto en formato etiqueta1,etiqueta2,etiqueta3 : ");
    etiquetas = etiquetas.split(",").map(etiqueta => etiqueta.trim());
    let gasto = new GP.CrearGasto(descripcion, valor, fecha, etiquetas);
    GP.anyadirGasto(gasto);
    repintar();
};

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);
 
function EditarHandle(){
    this.handleEvent = function(event){
        let descripcion = prompt("Introduzca una descripción para el gasto: ", this.gasto.descripcion);
        let valor = Number(prompt("Introduzca un valor para el gasto: ", this.gasto.valor));
        let fecha = prompt("Introduzca una fecha en formato yyyy-mm-dd : ", this.gasto.obtenerPeriodoAgrupacion("dia"));
        let etiquetas = prompt("Introduzca etiquetas para el gasto en formato etiqueta1,etiqueta2,etiqueta3 : ", this.gasto.etiquetas);
        etiquetas = etiquetas.split(",").map(etiqueta => etiqueta.trim());
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    };
};

function BorrarHandle(){
    this.handleEvent = function(event){
        GP.borrarGasto(this.gasto.id);
        repintar();
    };
};

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
};

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    
    let form = plantillaFormulario.querySelector("form");

    form.addEventListener("submit", function(event){
        event.preventDefault();
    
        const descripcion = form.elements["descripcion"].value.trim();
        const valor = Number(form.elements["valor"].value.trim());
        const fecha = form.elements["fecha"].value.trim();
        const etiquetas = form.elements["etiquetas"].value.trim();
        
        const gasto = new GP.CrearGasto(descripcion, valor, fecha, etiquetas);
        GP.anyadirGasto(gasto);
        repintar();        
        
        document.getElementById("anyadirgasto-formulario").disabled = false;

    });

    let btnCancelar = form.querySelector("button.cancelar");

    let cancelar = new CancelarFormularioHandle();
    cancelar.formulario = form;
    cancelar.boton = document.getElementById("anyadirgasto-formulario");

    btnCancelar.addEventListener("click", cancelar);

    document.getElementById("anyadirgasto-formulario").disabled = true;

    document.getElementById("controlesprincipales").append(plantillaFormulario);
};

function CancelarFormularioHandle(){
    this.handleEvent = function(event){
        this.formulario.remove();
        this.boton.disabled = false;
    }
}

let btnAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

function EditarHandleFormulario(){
    this.handleEvent = function(event){
        event.target.disabled = true;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let form = plantillaFormulario.querySelector("form");
        form.elements["descripcion"].value = this.gasto.descripcion;
        form.elements["valor"].value = this.gasto.valor;
        form.elements["fecha"].value = this.gasto.fecha;
        form.elements["etiquetas"].value = this.gasto.etiquetas;   
        let enviarFormulario = new SubmitFormulario();
        enviarFormulario.gasto = this.gasto;
        form.addEventListener("submit", enviarFormulario);
        let botonCancelar = form.querySelector("button.cancelar");
        let manejadorCancelar = new CancelarFormularioHandle();
        manejadorCancelar.formulario = form;
        manejadorCancelar.boton = event.currentTarget;
        botonCancelar.addEventListener("click", manejadorCancelar);
        event.target.insertAdjacentElement("afterend", form);
    }
};

function SubmitFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let form = event.currentTarget;
        let descripcion = form.elements["descripcion"].value.trim();
        let valor = Number(form.elements["valor"].value.trim());
        let fecha = form.elements["fecha"].value.trim();
        let etiquetas = form.elements["etiquetas"].value.trim();
        etiquetas = etiquetas.split(",").map(etiqueta => etiqueta.trim());
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}

function filtrarGastosWeb(){
    event.preventDefault();
    let form = document.getElementById("formulario-filtrado");
        
    let descripcionContiene = form.elements["formulario-filtrado-descripcion"].value.trim();
    let valorMinimo = form.elements["formulario-filtrado-valor-minimo"].value.trim();
    let valorMaximo = form.elements["formulario-filtrado-valor-maximo"].value.trim();
    let fechaDesde = form.elements["formulario-filtrado-fecha-desde"].value.trim();
    let fechaHasta = form.elements["formulario-filtrado-fecha-hasta"].value.trim();
    let etiquetasTiene = form.elements["formulario-filtrado-etiquetas-tiene"].value.trim();
    

    let objeto = {};

    if (descripcionContiene !== "")
        objeto.descripcionContiene = descripcionContiene;
    if (valorMinimo !== "")
        objeto.valorMinimo = Number(valorMinimo);
    if (valorMaximo !== "")
        objeto.valorMaximo = Number(valorMaximo);
    if (fechaDesde !== "")
        objeto.fechaDesde = fechaDesde;
    if (fechaHasta !== "")
        objeto.fechaHasta = fechaHasta;
    if (etiquetasTiene !== "")
        objeto.etiquetasTiene = GP.transformarListadoEtiquetas(etiquetasTiene);

    let gastosFiltrados = GP.filtrarGastos(objeto);

    document.getElementById("listado-gastos-completo").innerHTML = "";

    gastosFiltrados.forEach(gasto => {mostrarGastoWeb("listado-gastos-completo", gasto)});
}

document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);

function guardarGastosWeb(){
    localStorage.setItem("GestorGastosDWEC", JSON.stringify(GP.listarGastos()));
}

function cargarGastosWeb(){
    let datosAnteriores = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
    if (!datosAnteriores || datosAnteriores.length === 0){
        datosAnteriores = [];
    }
    GP.cargarGastos(datosAnteriores);
    repintar();
}

async function cargarGastosApi(){
    let usuario = document.getElementById("nombre_usuario").value;
    const url = `https://gestion-presupuesto-api.onrender.com/api/${usuario}`;
    
    const options = {
        method: "GET",
        headers: {
            'Accept' : 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) throw new Error("Error en la petición");

        const data = await response.json();
        console.log("Datos recibidos", data);
    } catch (error) {
        console.error(error);
    }    
}

document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi);

document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);

document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb, 
    nuevoGastoWebFormulario
}