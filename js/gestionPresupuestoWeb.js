import * as gestionPre from "./gestionPresupuesto.js"

const base_url = `https://gestion-presupuesto-api.onrender.com/api`

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);

    if (elemento) {
        elemento.textContent = valor;
    } else {
        console.warn(`No se encontró ningún elemento con id: ${idElemento}`);
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    let fecha = gasto.obtenerPeriodoAgrupacion("dia")
    divFecha.textContent = fecha;
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");
    gasto.etiquetas.forEach(etiqueta => {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
        spanEtiqueta.textContent = etiqueta;
        //Eventos span
        let manejadorEtiquetas = new BorrarEtiquetasHandle()
        manejadorEtiquetas.etiqueta = etiqueta
        manejadorEtiquetas.gasto = gasto
        spanEtiqueta.addEventListener("click", manejadorEtiquetas)
        divEtiquetas.appendChild(spanEtiqueta);
      });
    divGasto.appendChild(divEtiquetas);
    //Boton editar Gasto
    let btnEditar = document.createElement("button")
    btnEditar.classList.add("gasto-editar")
    btnEditar.textContent = "Editar"
    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto
    btnEditar.addEventListener("click", manejadorEditar)
    divGasto.appendChild(btnEditar);
    //Botón editar formulario
    let btnEditarForm = document.createElement("button")
    btnEditarForm.classList.add("gasto-editar-formulario")
    btnEditarForm.textContent = "Editar (formulario)"
    let manejadorEditarForm = new EditarHandleFormulario()
    manejadorEditarForm.gasto = gasto;
    btnEditarForm.addEventListener("click", manejadorEditarForm)
    divGasto.appendChild(btnEditarForm)
    //Botón borrar Gasto
    let btnBorrar = document.createElement("button")
    btnBorrar.classList.add("gasto-borrar")
    btnBorrar.textContent = "Borrar"
    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto
    btnBorrar.addEventListener("click", manejadorBorrar)
    divGasto.appendChild(btnBorrar);
    //Botón borrar API 
    let btnBorrarApi = document.createElement("button")
    btnBorrarApi.classList.add("gasto-borrar-api")
    btnBorrarApi.textContent = "Borrar (API)"
    let manejadorBorrarApi = new BorrarAPI()
    manejadorBorrarApi.gasto = gasto
    btnBorrarApi.addEventListener('click', manejadorBorrarApi)
    divGasto.appendChild(btnBorrarApi)
    contenedor.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);

    let divAgrup = document.createElement("div");
    divAgrup.classList.add("agrupacion");
    let titulo = document.createElement('h1');
    let textoPeriodo = '';
    if (periodo === 'mes') {
        textoPeriodo = 'mes';
    } else if (periodo === 'dia') {
        textoPeriodo = 'día';
    } else if (periodo === 'anyo') {
        textoPeriodo = 'año';
    }
    titulo.textContent = `Gastos agrupados por ${textoPeriodo}`;
    divAgrup.appendChild(titulo);
    Object.entries(agrup).forEach(([clave, valor]) => {
        let divDato = document.createElement('div');
        divDato.classList.add('agrupacion-dato');
    
        let spanClave = document.createElement('span');
        spanClave.classList.add('agrupacion-dato-clave');
        spanClave.textContent = clave;
    
        let spanValor = document.createElement('span');
        spanValor.classList.add('agrupacion-dato-valor');
        spanValor.textContent = valor;
        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);
    
        divAgrup.appendChild(divDato);
      });
    contenedor.appendChild(divAgrup);
}

function repintar() {
    let presupuesto = gestionPre.mostrarPresupuesto()
    mostrarDatoEnId("presupuesto", presupuesto);
    let gastosTotales = gestionPre.calcularTotalGastos()
    mostrarDatoEnId("gastos-totales", gastosTotales)
    let balance = gestionPre.calcularBalance()
    mostrarDatoEnId("balance-total", balance)
    document.getElementById("listado-gastos-completo").innerHTML = ""
    let listaGastos = gestionPre.listarGastos()
    listaGastos.forEach(elemento => {
        mostrarGastoWeb("listado-gastos-completo", elemento)
    })
}

function actualizarPresupuestoWeb () {
        let presupuesto = prompt("Indica un presupuesto", "");
        presupuesto = Number(presupuesto)
        gestionPre.actualizarPresupuesto(presupuesto);
        repintar();    
}

let botonActPresupuesto = document.getElementById("actualizarpresupuesto")
botonActPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del gasto:", "");
    let valor = prompt("Introduce el valor del gasto:", "");
    valor = Number(valor);
    let fecha = prompt("Introduce la fecha del gasto (formato yyyy-mm-dd):", "");
    let etiquetasTexto = prompt("Introduce las etiquetas (separadas por comas):", "");
    let etiquetas = etiquetasTexto.split(",").map(e => e.trim());
    let gasto = new gestionPre.CrearGasto(descripcion, valor, fecha, ...etiquetas)
    gestionPre.anyadirGasto(gasto)
    repintar();
}

let botonAnyPre = document.getElementById("anyadirgasto")
botonAnyPre.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent  = function(event) {
        let descripcion = prompt("Introduce la descripción del gasto:", this.gasto.descripcion);
        let valor = prompt("Introduce el valor del gasto:", this.gasto.valor);
        valor = Number(valor);
        let fecha = prompt("Introduce la fecha del gasto (formato yyyy-mm-dd):", this.gasto.obtenerPeriodoAgrupacion("dia"));
        let etiquetasTexto = prompt("Introduce las etiquetas (separadas por comas):", this.gasto.etiquetas);
        let etiquetas = etiquetasTexto.split(",").map(e => e.trim());
        this.gasto.actualizarValor(valor)
        this.gasto.actualizarDescripcion(descripcion)
        this.gasto.actualizarFecha(fecha)
        this.gasto.anyadirEtiquetas(...etiquetas)
        repintar()
    }
}

function BorrarHandle() {
    this.handleEvent  = function(event) {
        gestionPre.borrarGasto(this.gasto.id)
        repintar()
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function(event) {
        event.target.disabled = true;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var form = plantillaFormulario.querySelector("form")
        form.elements["descripcion"].value = this.gasto.descripcion;
        form.elements["valor"].value = this.gasto.valor;
        form.elements["etiquetas"].value = this.gasto.etiquetas;
        form.elements["fecha"].value = this.gasto.fecha;
        let manejadorEnviar = new EnviarHandle();
        manejadorEnviar.gasto = this.gasto
        form.addEventListener("submit", manejadorEnviar)
        let btnCancelar = form.querySelector("button.cancelar")
        let manejadorCancelar = new handleCancelar()
        manejadorCancelar.formulario = form
        manejadorCancelar.referencia = event.currentTarget
        btnCancelar.addEventListener("click", manejadorCancelar)
        let btnEnviarApi = form.querySelector("button.gasto-enviar-api")
        let manejdorEditarAPI = new HandleEnviarPUTAPI()
        manejdorEditarAPI.gasto = this.gasto;
        manejdorEditarAPI.formulario = form;
        btnEnviarApi.addEventListener("click", manejdorEditarAPI)
        event.target.insertAdjacentElement("afterend", form);
    }
}

function EnviarHandle() {
    this.handleEvent = function(event) {
        event.preventDefault();
        let form = event.currentTarget;
        let des = form.elements["descripcion"].value.trim();
        let valor = Number(form.elements["valor"].value);
        let fecha = form.elements["fecha"].value;
        let etiquetas = form.elements["etiquetas"].value.split(",");
        this.gasto.actualizarValor(valor)
        this.gasto.actualizarDescripcion(des)
        this.gasto.actualizarFecha(fecha)
        this.gasto.anyadirEtiquetas(...etiquetas)
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent  = function(event) {
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();
    }
}

function BorrarAPI() {
        this.handleEvent = async function(event) {
            const id = this.gasto.gastoId
            const nombre = document.getElementById("nombre_usuario").value           
            const url = `${base_url}/${nombre}/${id}`
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
            
            try {
                const response = await fetch(url, options)
                if(!response.ok) throw new Error('Error al eliminar')
                cargarGastosApi()
            } catch (error){
                console.error(error)
            }
        }
}

async function EnviarPOSTAPI(gasto) {
    const nombre = document.getElementById("nombre_usuario").value
    const url = `${base_url}/${nombre}`
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gasto)
    }
    try {
        const response = await fetch(url, options)
        if(!response.ok) throw new Error('Error al enviar')
        cargarGastosApi()
    } catch (error){
        console.error(error)
    }
}

function HandleEnviarPUTAPI() {
    this.handleEvent = async function(event) {
        const nombre = document.getElementById("nombre_usuario").value
        const id = this.gasto.gastoId
        const url = `${base_url}/${nombre}/${id}`
        const form = this.formulario;
        const gastoActualizado = {
            descripcion: form.elements["descripcion"].value.trim(),
            valor: Number(form.elements["valor"].value),
            fecha: form.elements["fecha"].value,
            etiquetas: form.elements["etiquetas"].value.split(",")
        };
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gastoActualizado)
        }
        try {
            const response = await fetch(url, options)
            if(!response.ok) throw new Error('Error al enviar')
            cargarGastosApi()
        } catch (error){
            console.error(error)
    }
    }
}

function nuevoGastoWebFormulario() {
    document.getElementById("anyadirgasto-formulario").disabled = true;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var form = plantillaFormulario.querySelector("form")
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let form = event.currentTarget;
        let des = form.elements["descripcion"].value.trim();
        let valor = Number(form.elements["valor"].value);
        let fecha = form.elements["fecha"].value;
        let etiquetas = form.elements["etiquetas"].value.split(",");
        let gasto = new gestionPre.CrearGasto(des, valor, fecha, ...etiquetas)
        gestionPre.anyadirGasto(gasto);
        document.getElementById("anyadirgasto-formulario").disabled = false;
        repintar();
    })
    let btnCancelar = form.querySelector("button.cancelar")
    let manejadorCancelar = new handleCancelar()
    manejadorCancelar.formulario = form
    manejadorCancelar.referencia = document.getElementById("anyadirgasto-formulario")
    btnCancelar.addEventListener("click", manejadorCancelar)
    let btnEnviarAPI = form.querySelector("button.gasto-enviar-api")
    btnEnviarAPI.addEventListener("click", function(event) {
        event.preventDefault()
        let gastoParaAPI = {
            descripcion: form.elements["descripcion"].value.trim(),
            valor: Number(form.elements["valor"].value),
            fecha: form.elements["fecha"].value,
            etiquetas: form.elements["etiquetas"].value.split(",")
        };
        EnviarPOSTAPI(gastoParaAPI)
    })
    document.getElementById("controlesprincipales").append(plantillaFormulario)
}

let btnformanyadir = document.getElementById("anyadirgasto-formulario");
btnformanyadir.disabled = false;
btnformanyadir.addEventListener("click", nuevoGastoWebFormulario);

function handleCancelar() {
    this.handleEvent = function(event) {
        this.formulario.remove()
        this.referencia.disabled = false
    }
}

function filtrarGastosWeb() {
    event.preventDefault();
    let objeto = {}
    let form = document.getElementById("formulario-filtrado")
    let des = form.elements["formulario-filtrado-descripcion"].value
    let valorMin = form.elements["formulario-filtrado-valor-minimo"].value
    let valorMax = form.elements["formulario-filtrado-valor-maximo"].value
    let fechaDes = form.elements["formulario-filtrado-fecha-desde"].value
    let fechaHas = form.elements["formulario-filtrado-fecha-hasta"].value
    let etiquetas = form.elements["formulario-filtrado-etiquetas-tiene"].value
    if (etiquetas.trim() !== '') {
        let etiquetasArray = gestionPre.transformarListadoEtiquetas(etiquetas)
        objeto.etiquetasTiene = etiquetasArray;
    }
    if (des.trim() !== '')
        objeto.descripcionContiene = des;
    if (valorMin.trim() !== '')
        objeto.valorMinimo = valorMin;
    if (valorMax.trim() !== '')
        objeto.valorMaximo = valorMax;
    if (fechaDes.trim() !== '')
        objeto.fechaDesde = fechaDes;
    if (fechaHas.trim() !== '')
        objeto.fechaHasta = fechaHas;
    let filtrados = gestionPre.filtrarGastos(objeto)
    document.getElementById("listado-gastos-completo").innerHTML = ""
    filtrados.forEach(g => {
        mostrarGastoWeb("listado-gastos-completo", g)
    })
}

document.getElementById("formulario-filtrado").addEventListener("submit",filtrarGastosWeb)


function guardarGastosWeb() {
    localStorage.setItem("GestorGastosDWEC", JSON.stringify(gestionPre.listarGastos()))
}
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb)

function cargarGastosWeb() {
    let datos = JSON.parse(localStorage.getItem("GestorGastosDWEC"))
    if (!Array.isArray(datos) || datos.length == 0)
        datos = []
    gestionPre.cargarGastos(datos)
    repintar()
}
document.getElementById("cargar-gastos").addEventListener("click",cargarGastosWeb)

async function cargarGastosApi() {
    const nombre = document.getElementById("nombre_usuario").value
    const url = `${base_url}/${nombre}`
    const options = {
        method: 'GET'
    }
    try {
        const response = await fetch(url, options);
        const datos = await response.json()
        if (!response.ok) throw new Error('Error en la peticioón')
        gestionPre.cargarGastos(datos)
        repintar()
    } catch {
        console.error(error);
    }
}

document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi)

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}