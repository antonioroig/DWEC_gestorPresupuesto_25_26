import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento,valor){
    let elem = document.getElementById(idElemento);

    if (elem){
        elem.textContent = valor;
    }
}
function mostrarGastoWeb(idElemento, gasto){
let contenedor = document.getElementById(idElemento);

if (!contenedor){
    return;
}

let divGasto = document.createElement("div");
divGasto.className = "gasto";

let divDescripcion = document.createElement("div");
divDescripcion.className = "gasto-descripcion";
divDescripcion.textContent = gasto.descripcion;
divGasto.appendChild(divDescripcion);

let divFecha = document.createElement("div");
divFecha.className = "gasto-fecha";
let fecha = new Date(gasto.fecha);
divFecha.textContent = fecha.toLocaleDateString();
divGasto.appendChild(divFecha);

let divValor = document.createElement("div");
divValor.className = "gasto-valor";
divValor.textContent = gasto.valor;
divGasto.appendChild(divValor);

let divEtiquetas = document.createElement("div");
divEtiquetas.className = "gasto-etiquetas";

if (gasto.etiquetas && gasto.etiquetas.length > 0){
    gasto.etiquetas.forEach(element => {
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = element;
        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
        manejadorBorrarEtiqueta.gasto = gasto;
        manejadorBorrarEtiqueta.etiqueta = element;
        span.addEventListener("click", manejadorBorrarEtiqueta);
        divEtiquetas.appendChild(span);
    });
}

divGasto.appendChild(divEtiquetas);
contenedor.appendChild(divGasto);

let botonEditar = document.createElement("button");
botonEditar.type = 'button';
botonEditar.textContent = "Editar";
botonEditar.classList.add("gasto-editar");

let manejadorEditar = new EditarHandle(gasto);

botonEditar.addEventListener("click", manejadorEditar);

divGasto.appendChild(botonEditar);
contenedor.appendChild(divGasto);

let botonBorrar = document.createElement("button");
botonBorrar.type = 'button';
botonBorrar.textContent = "Borrar";
botonBorrar.classList.add("gasto-borrar");

let manejadorBorrar = new BorrarHandle(gasto);

botonBorrar.addEventListener("click", manejadorBorrar);

divGasto.appendChild(botonBorrar);
contenedor.appendChild(divGasto);

let botonEditarFormulario = document.createElement("button");
botonEditarFormulario.type = 'button';
botonEditarFormulario.textContent = "Editar (Formulario)";
botonEditarFormulario.classList.add("gasto-editar-formulario");

let manejadorEditarFormulario = new EditarHandleFormulario(gasto);

botonEditarFormulario.addEventListener("click", manejadorEditarFormulario);

divGasto.appendChild(botonEditarFormulario);
contenedor.appendChild(divGasto);

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);
    if (!contenedor){
        return;
    }

    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    let nombrePeriodo = "";

    switch (periodo){
        case "dia":
            nombrePeriodo = "día";
            break;
        case "mes":
            nombrePeriodo = "mes";
            break;
        case "anyo":
            nombrePeriodo = "año";
            break;
    }

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${nombrePeriodo}`;
    divAgrupacion.appendChild(h1);

    for (let [clave, valor] of Object.entries(agrup)){
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
    let listadoGastosCompleto = document.getElementById("listado-gastos-completo");

    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());
    
    listadoGastosCompleto.innerHTML = '';
    gestionPresupuesto.listarGastos().forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });

    let contenedorListado = document.getElementById("listado-gastos-completo");
    let tituloAgrupaciones = document.createElement("h1");
    tituloAgrupaciones.textContent = "Agrupaciones";
    contenedorListado.insertAdjacentElement("afterend", tituloAgrupaciones);
}

function actualizarPresupuestoWeb(){
    let respuesta = prompt ('Introduce el presupuesto que tienes', '');
    let intPresu = parseInt(respuesta);
    if (!isNaN(intPresu)) {
        gestionPresupuesto.actualizarPresupuesto(intPresu);
        repintar();
      }
}
let botonActualizar = document.getElementById("actualizarpresupuesto");
let objActualizar = {
    handleEvent(event) {
        actualizarPresupuestoWeb();
      }  
};
botonActualizar.addEventListener("click", objActualizar);

function nuevoGastoWeb(){
    let respuestaDescripcion = prompt('Introduce la Descripcion del nuevo gasto');
    let respuestaValor = prompt('Introduce el Valor del nuevo gasto');
    let respuestaFecha = prompt('Introduce la Fecha del nuevo gasto con formato YYYY/MM/DD');
    let respuestaEtiquetas = prompt('Introduce las Etiquetas del nuevo gasto');
    let intValor = parseFloat(respuestaValor);

    let etiquetasOrdenadas = respuestaEtiquetas.split(',');
    let nuevoGasto = new gestionPresupuesto.CrearGasto(respuestaDescripcion,intValor, respuestaFecha, ...etiquetasOrdenadas);

    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();

}
let botonAnyadir = document.getElementById("anyadirgasto");
let objAnyadir = {
    handleEvent(event) {
        nuevoGastoWeb();
    }
};
botonAnyadir.addEventListener("click", objAnyadir);

function nuevoGastoWebFormulario(){

    let botonForm = document.getElementById("anyadirgasto-formulario");
    botonForm.disabled = true;

    let formExistente = document.querySelector("#controlesprincipales form");
    if (formExistente) formExistente.remove();

    let plantilla = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantilla.querySelector("form");

    let contenedor = document.getElementById("controlesprincipales");
    contenedor.appendChild(formulario);

     let botonCancelar = formulario.querySelector("button.cancelar");
     let manejadorCancelar = new CancelarHandle(formulario, botonForm);

     botonCancelar.addEventListener("click", manejadorCancelar);
    
    formulario.addEventListener("submit", function(event){
        event.preventDefault();

        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.etiquetas.value;

        let etiquetasOrdenadas = etiquetas.split(',');
        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor, fecha, ...etiquetasOrdenadas);

        gestionPresupuesto.anyadirGasto(nuevoGasto);
        repintar();
        formulario.remove();
        botonForm.disabled = false;
    });
}
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);


function EditarHandle(gasto){
    this.gasto = gasto;
    this.handleEvent = function(event){
        let respuestaDescripcion = prompt('Introduce la Descripcion del gasto a editar', this.gasto.descripcion);
        let respuestaValor = prompt('Introduce el Valor del gasto a editar', this.gasto.valor);
        let respuestaFecha = prompt('Introduce la Fecha del gasto a editar con formato YYYY-MM-DD', new Date(this.gasto.fecha).toISOString().split('T')[0]);
        let respuestaEtiquetas = prompt('Introduce las Etiquetas del gasto a editar', this.gasto.etiquetas.join(','));
        let floatValor = parseFloat(respuestaValor);

        let etiquetasOrdenadas = respuestaEtiquetas.split(',');
        
        this.gasto.actualizarDescripcion(respuestaDescripcion);
        this.gasto.actualizarValor(floatValor);
        this.gasto.actualizarFecha(respuestaFecha);
        this.gasto.anyadirEtiquetas(...etiquetasOrdenadas);
        repintar();
    }
}
function BorrarHandle(gasto){
    this.gasto = gasto;
    this.handleEvent = function(event){
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle(gasto, etiqueta){
    this.gasto = gasto;
    this.etiqueta = etiqueta;
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta); 
        repintar();
    }
}
function CancelarHandle(formulario, botonForm) {
    this.formulario = formulario;
    this.botonForm = botonForm;

    this.handleEvent = function(event) {
        this.formulario.remove();
        this.botonForm.disabled = false;
    }
}
function EditarHandleFormulario(gasto){
    this.gasto = gasto;
    
    this.handleEvent = function(event){
        let botonEditor = event.currentTarget;
        let divGasto = botonEditor.closest('.gasto');
        let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
        
        botonEditor.disabled = true;
        if (botonAnyadirFormulario) botonAnyadirFormulario.disabled = true;

        let formExistenteGlobal = document.querySelector("#controlesprincipales form");
        if (formExistenteGlobal) formExistenteGlobal.remove();

        let plantilla = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantilla.querySelector("form");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        let fechaFormateada = new Date(this.gasto.fecha).toISOString().split('T')[0];
        formulario.elements.fecha.value = fechaFormateada; 
        formulario.elements.etiquetas.value = this.gasto.etiquetas.join(", "); 
        
        divGasto.appendChild(plantilla); 

        let botonCancelar = formulario.querySelector("button.cancelar");
        
        botonCancelar.addEventListener("click", function(){
            formulario.remove(); 
            botonEditor.disabled = false;
            if (botonAnyadirFormulario) botonAnyadirFormulario.disabled = false;
        });

        let gastoAEditar = this.gasto;

        formulario.addEventListener("submit", function(event){
            event.preventDefault();
            
            let form = event.currentTarget;
            
            let descripcion = form.elements.descripcion.value;
            let valor = parseFloat(form.elements.valor.value);
            let fecha = form.elements.fecha.value;
            let etiquetasTexto = form.elements.etiquetas.value;
            let etiquetasOrdenadas = etiquetasTexto.split(',');
            
            gastoAEditar.actualizarDescripcion(descripcion);
            gastoAEditar.actualizarValor(valor);
            gastoAEditar.actualizarFecha(fecha);                
            gastoAEditar.anyadirEtiquetas(...etiquetasOrdenadas);
            
            if (botonAnyadirFormulario) botonAnyadirFormulario.disabled = false;
            
            repintar(); 
        });
    }
}
function filtrarGastosWeb(event){
    event.preventDefault();

    let formulario = event.currentTarget;

    let descripcion = formulario.elements["formulario-filtrado-descripcion"].value;
    let valorMinimo = formulario.elements["formulario-filtrado-valor-minimo"].value;
    let valorMaximo = formulario.elements["formulario-filtrado-valor-maximo"].value;
    let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
    let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;
    let etiquetasTexto = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

    valorMinimo = valorMinimo !== "" ? parseFloat(valorMinimo) : undefined;
    valorMaximo = valorMaximo !== "" ? parseFloat(valorMaximo) : undefined;

    let etiquetas = undefined;
    if (etiquetasTexto && etiquetasTexto.trim() !== "") {
        etiquetas = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTexto);
    }

    let contenedor = document.getElementById("listado-gastos-completo");
    contenedor.innerHTML = "";

    if (
        descripcion === "" &&
        valorMinimo === undefined &&
        valorMaximo === undefined &&
        fechaDesde === "" &&
        fechaHasta === "" &&
        !etiquetas
    ) {
        gestionPresupuesto.listarGastos().forEach(gasto => {
            mostrarGastoWeb("listado-gastos-completo", gasto);
        });
        return;
    }

    let filtro = {
        descripcionContiene: descripcion !== "" ? descripcion : undefined,
        valorMinimo: valorMinimo,
        valorMaximo: valorMaximo,
        fechaDesde: fechaDesde !== "" ? fechaDesde : undefined,
        fechaHasta: fechaHasta !== "" ? fechaHasta : undefined,
        etiquetasTiene: etiquetas
    };

    let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtro);

    gastosFiltrados.forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });
}
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);

function guardarGastosWeb(event) {
    event.preventDefault();

    let gastos = gestionPresupuesto.listarGastos();
    let gastosString = JSON.stringify(gastos);

    localStorage.setItem("GestorGastosDWEC", gastosString);
}

document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);

function cargarGastosWeb(event) {
    event.preventDefault();

    let datos = localStorage.getItem("GestorGastosDWEC");

    if (datos === null) {
        gestionPresupuesto.cargarGastos([]);
    } else {
        let gastos = JSON.parse(datos);
        gestionPresupuesto.cargarGastos(gastos);
    }

    repintar();
}


document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    CancelarHandle,
    EditarHandleFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb
};