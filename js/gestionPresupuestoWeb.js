import * as Js1 from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento) {
    let elem = document.getElementById(idElemento);
    elem.textContent = valor;
};

function mostrarGastoWeb(idElemento, gastos) {
    let elem = document.getElementById(idElemento);
    elem.innerHTML = "";
    for (let j = 0; j < gastos.length; j++) {
        let g = document.createElement("div");
        g.classList.add("gasto");
        elem.appendChild(g);
        let gd = document.createElement("div");
        gd.classList.add("gasto-descripcion");
        gd.textContent = gastos[j].descripcion;
        g.appendChild(gd);
        let gf = document.createElement("div");
        gf.classList.add("gasto-fecha");
        gf.textContent = new Date(gastos[j].fecha).toLocaleDateString();
        g.appendChild(gf);
        let gv = document.createElement("div");
        gv.classList.add("gasto-valor");
        gv.textContent = gastos[j].valor;
        g.appendChild(gv);
        let ge = document.createElement("div");
        ge.classList.add("gasto-etiquetas");
        for (let i = 0; i < gastos[j].etiquetas.length; i++) {
            let gee = document.createElement("span");
            gee.classList.add("gasto-etiquetas-etiqueta");
            gee.textContent = gastos[j].etiquetas[i];
            //BOTON BORRAR ETIQUETA
            let eventoBorrarEtiqueta = new BorrarEtiquetasHandle();
            eventoBorrarEtiqueta.gasto = gastos[j];
            eventoBorrarEtiqueta.etiqueta = gastos[j].etiquetas[i];
            gee.addEventListener("click", eventoBorrarEtiqueta);
            ge.appendChild(gee);
        }
        g.appendChild(ge);
        //BOTON EDITAR GASTO
        let bEditar = document.createElement("button");
        bEditar.textContent = "Editar";
        bEditar.classList.add("gasto-editar");
        g.appendChild(bEditar);
        let evento = new EditarHandle();
        evento.gasto = gastos[j];
        bEditar.addEventListener("click", evento);
        //BOTON BORRAR GASTO
        let bBorrar = document.createElement("button");
        bBorrar.textContent = "Borrar";
        bBorrar.classList.add("gasto-borrar");
        g.appendChild(bBorrar);
        let eventoBorrar = new BorrarGasto();
        eventoBorrar.gasto = gastos[j];
        bBorrar.addEventListener("click", eventoBorrar);
        // BOTON BORRAR GASTO API
        let bBorrarApi = document.createElement("button");
        bBorrarApi.textContent = "Borrar (API)";
        bBorrarApi.classList.add("gasto-borrar-api");
        g.appendChild(bBorrarApi);
        // BOTON EDITAR FORMULARIO
        let bEditarForm = document.createElement("button");
        bEditarForm.textContent = "Editar (formulario)";
        bEditarForm.classList.add("gasto-editar-formulario");
        g.appendChild(bEditarForm);
        let manejadorEditarForm = new EditarHandleFormulario();
        manejadorEditarForm.gasto = gastos[j];
        manejadorEditarForm.contenedor = g;
        bEditarForm.addEventListener("click", manejadorEditarForm);
    }
};

function mostrarGastosAgrupadosWeb(idElemento, agroup, periodo) {
    let elem = document.getElementById(idElemento);
    let d = document.createElement("div");
    d.classList.add("agrupacion");
    elem.appendChild(d);
    let h = document.createElement("h1");
    h.textContent = 'Gastos agrupados por ' + periodo;
    d.appendChild(h);
    for (let [clave, value] of Object.entries(agroup)){
        let div = document.createElement("div");
        div.classList.add("agrupacion-dato");
        d.appendChild(div);
        let span1 = document.createElement("span");
        span1.classList.add("agrupacion-dato-clave");
        span1.textContent = clave;
        div.appendChild(span1);
        let span2 = document.createElement("span");
        span2.classList.add("agrupacion-dato-valor");
        span2.textContent = ` ${value}`;
        div.appendChild(span2);
    }
};

function repintar(){
    mostrarDatoEnId(Js1.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(Js1.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(Js1.calcularBalance(), "balance-total");
    let d = document.getElementById("listado-gastos-completo");
    d.innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", Js1.listarGastos());

}


function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduce un presupuesto");
    presupuesto = Number(presupuesto);
    Js1.actualizarPresupuesto(presupuesto);
    repintar();
}


function nuevoGastoWeb(){
    let descripcion = prompt("Añade descripción al gasto");
    let valor = Number(prompt("Añade valor al gasto"));
    let fecha = prompt("Añade fecha al gasto con formato yyyy-mm-dd");
    let etiquetas = prompt("Añade etiquetas al gasto seguidas de una coma (etiqueta1,etiqueta2,etiqueta3)");
    etiquetas = etiquetas.split(',');
    let gasto = new Js1.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    Js1.anyadirGasto(gasto);
    repintar();
}

const botonActualizarPresupuestp = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuestp.addEventListener("click", actualizarPresupuestoWeb);

const botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(evento){
        this.gasto.descipcion = prompt("Añade descripción al gasto", this.gasto.descripcion);
        this.gasto.valor = Number(prompt("Añade valor al gasto", this.gasto.valor));
        this.gasto.fecha = prompt("Añade fecha al gasto con formato yyyy-mm-dd", this.gasto.fecha);
        this.gasto.etiquetas = prompt("Añade etiquetas al gasto seguidas de una coma (etiqueta1,etiqueta2,etiqueta3)", this.gasto.etiquetas).split(',');
        this.gasto.actualizarDescripcion(this.gasto.descipcion);
        this.gasto.actualizarValor(this.gasto.valor);
        this.gasto.actualizarFecha(this.gasto.fecha);
        this.gasto.anyadirEtiquetas(...this.gasto.etiquetas);
        repintar();
    }
}

function BorrarGasto(){
    this.handleEvent = function(evento){
        Js1.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

const botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

function nuevoGastoWebFormulario(event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        let descripcion = e.currentTarget.descripcion.value;
        let valor = Number(e.currentTarget.valor.value);
        let fecha = e.currentTarget.fecha.value;
        let etiquetas = e.currentTarget.etiquetas.value.split(",").map(et => et.trim());
        let nuevoGasto = new Js1.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        Js1.anyadirGasto(nuevoGasto);
        repintar();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        formulario.remove();
    });
    function CancelarFormularioHandle() {
        this.formulario = formulario;
        this.boton = document.getElementById("anyadirgasto-formulario");
        this.handleEvent = function () {
            this.formulario.remove();
            this.boton.removeAttribute("disabled");
        };
    }
    let botonCancelar = formulario.querySelector("button.cancelar");
    let manejadorCancelar = new CancelarFormularioHandle();
    botonCancelar.addEventListener("click", manejadorCancelar);
    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
}

function EditarHandleFormulario() {
    this.handleEvent = function (event) {
        const gasto = this.gasto;
        const contenedor = this.contenedor;
        const botonEditar = contenedor.querySelector(".gasto-editar-formulario");
        botonEditar.setAttribute("disabled", "");
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");
        formulario.querySelector("#descripcion").value = gasto.descripcion;
        formulario.querySelector("#valor").value = gasto.valor;
        formulario.querySelector("#fecha").value = new Date(gasto.fecha).toLocaleDateString("en-CA");
        formulario.querySelector("#etiquetas").value = gasto.etiquetas.join(", ");
        let submitHandler = new SubmitEditarHandle();
        submitHandler.gasto = gasto;
        formulario.addEventListener("submit", submitHandler);
        let botonCancelar = formulario.querySelector(".cancelar");
        let cancelarHandler = new CancelarFormularioHandle();
        cancelarHandler.formulario = formulario;
        cancelarHandler.boton = botonEditar;
        botonCancelar.addEventListener("click", cancelarHandler);
        contenedor.appendChild(plantillaFormulario);
    };
}

function SubmitEditarHandle() {
    this.gasto = null;
    this.handleEvent = function (e) {
        e.preventDefault();
        let descripcion = e.currentTarget.descripcion.value;
        let valor = Number(e.currentTarget.valor.value);
        let fecha = e.currentTarget.fecha.value;
        let etiquetasTexto = e.currentTarget.etiquetas.value.split(",");
        let etiquetas = [];
        for (let i = 0; i < etiquetasTexto.length; i++) {
            let etiqueta = etiquetasTexto[i].trim();
            if (etiqueta !== "") {
                etiquetas.push(etiqueta);
            }
        }
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.etiquetas = [];
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    };
}


function CancelarFormularioHandle() {
    this.formulario = null;
    this.boton = null;
    this.handleEvent = function (e) {
        this.formulario.remove();
        this.boton.removeAttribute("disabled");
    };
}

function filtrarGastosWeb(){
    let formulario = document.getElementById("formulario-filtrado")
    formulario.addEventListener("submit", (event) =>{
        event.preventDefault();
        let descipcion = document.getElementById("formulario-filtrado-descripcion").value;
        let valorMin = Number(document.getElementById("formulario-filtrado-valor-minimo").value);
        let valorMax = Number(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value;
        let fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etiquetasTiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        if (etiquetasTiene.length > 0){
            etiquetasTiene = Js1.transformarListadoEtiquetas(etiquetasTiene);
        }
        let arrGastos = Js1.filtrarGastos({
            fechaDesde:fechaDesde,
            fechaHasta: fechaHasta,
            valorMinimo: valorMin,
            valorMaximo: valorMax,
            descripcionContiene: descipcion,
            etiquetasTiene: etiquetasTiene
        })
        mostrarGastoWeb("listado-gastos-completo", arrGastos);
    })
}

function guardarGastosWeb(){
    let boton = document.getElementById("guardar-gastos");
    boton.addEventListener("click", (event) =>{
        let gastos = Js1.listarGastos();
        localStorage.setItem('GestorGastosDWEC', JSON.stringify(gastos));
    })
}

function cargarGastosWeb(){
    let boton = document.getElementById("cargar-gastos");
    boton.addEventListener("click", (event) =>{
        if(localStorage.getItem('GestorGastosDWEC') === null)
            Js1.cargarGastos([])
        else{
            let gastos = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
            Js1.cargarGastos(gastos);
        }
        repintar();
    })
}

function cargarGastosApi() {
    const boton = document.getElementById("cargar-gastos-api");

    boton.addEventListener("click", async () => {
        try {
            const nombreUsuario = document.getElementById("nombre_usuario").value.trim();
            if (nombreUsuario === "") {
                alert("Debes introducir un nombre de usuario");
                return;
            }
            const url = "https://gestion-presupuesto-api.onrender.com/api/" + nombreUsuario;
            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error("Error al acceder a la API");
            }
            const gastosApi = await respuesta.json();
            console.log(gastosApi);
            Js1.cargarGastos(gastosApi);
            repintar();
        }
        catch (error) {
            alert("No se han podido cargar los gastos");
        }
    });
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi
}