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

let botonBorrarApi = document.createElement("button");
botonBorrarApi.type = 'button';
botonBorrarApi.textContent = "Borrar (API)";
botonBorrarApi.classList.add("gasto-borrar-api");

let manejadorBorrarApi = new BorrarApiHandle(gasto);
botonBorrarApi.addEventListener("click", manejadorBorrarApi);
divGasto.appendChild(botonBorrarApi);

contenedor.appendChild(divGasto);

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);

    contenedor.innerHTML= "";
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

    // Estilos
    contenedor.style.width = "33%";
    contenedor.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) {
    case "anyo":
        unit = "year";
        break;
    case "mes":
        unit = "month";
        break;
    case "dia":
    default:
        unit = "day";
        break;
    }

    // Creación de la gráfica
    // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
    const myChart = new Chart(chart.getContext("2d"), {
        // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
        type: 'bar',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#555555",
                    // Datos de la gráfica
                    // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    // El eje X es de tipo temporal
                    type: 'time',
                    time: {
                        // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                        unit: unit
                    }
                },
                y: {
                    // Para que el eje Y empieza en 0
                    beginAtZero: true
                }
            }
        }
    });
    // Añadimos la gráfica a la capa
    contenedor.append(chart);
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
    let tituloAgrupaciones = document.getElementById("agrupaciones");

    if (!tituloAgrupaciones) {
        tituloAgrupaciones = document.createElement("h1");
        tituloAgrupaciones.id = "agrupaciones";
        tituloAgrupaciones.textContent = "Agrupaciones";
        contenedorListado.insertAdjacentElement("afterend", tituloAgrupaciones);
    }

    mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "dia");
    mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "anyo");
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

    let botonEnviarApi = formulario.querySelector(".gasto-enviar-api");
    botonEnviarApi.addEventListener("click", async function() {
        let nombreUsuario = document.getElementById("nombre_usuario").value.trim();
        let datosGasto = {
            descripcion: formulario.elements.descripcion.value,
            valor: parseFloat(formulario.elements.valor.value),
            fecha: formulario.elements.fecha.value,
            etiquetas: formulario.elements.etiquetas.value
        };

        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        try {
            let respuesta = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosGasto)
            });

            if (respuesta.ok){
                formulario.remove();
                botonForm.disabled = false;
                await cargarGastosApi();
                console.log("Se ha enviado el gasto.");
            }
            else {
                console.log("No se ha enviado el gasto.")
            }
        } catch (error) {
            console.error("Error API:", error);
            alert("No se pudo guardar en el servidor.");
        }
    });
    
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

        let botonEnviarApi = formulario.querySelector(".gasto-enviar-api");
        botonEnviarApi.addEventListener("click", async () => {
            let nombreUsuario = document.getElementById("nombre_usuario").value.trim();
            let idGasto = this.gasto.id; 
            let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${idGasto}`;

            let datosActualizados = {
                descripcion: formulario.elements.descripcion.value,
                valor: parseFloat(formulario.elements.valor.value),
                fecha: formulario.elements.fecha.value,
                etiquetas: formulario.elements.etiquetas.value
            };

            try {
                let respuesta = await fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosActualizados)
                });

                if (respuesta.ok){
                    console.log("Gasto actualizado");
                    formulario.remove();
                    botonEditor.disabled = false;
                    if (botonAnyadirFormulario){
                        botonAnyadirFormulario.disabled = false;
                    }
                    await cargarGastosApi();
                }
                else{
                    console.log("No se ha actualizado el gasto.")
                }
            } catch (error) {
                console.error("Error PUT API:", error);
            }
        });

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

async function cargarGastosApi() {
    let nombreUsuario = document.getElementById("nombre_usuario").value.trim();
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;
    
    try{
        let respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error en la API");

        let datosAPI = await respuesta.json();
        console.log("Datos recibidos de la API:", datosAPI);

        let datosFormateados = datosAPI.map(g => {
            return {
                ...g,
                etiquetas: typeof g.etiquetas === 'string' 
                    ? g.etiquetas.split(',').map(e => e.trim()) 
                    : (g.etiquetas || []),
                id: g.gastoId || g.id
            };
        });

        gestionPresupuesto.cargarGastos(datosFormateados);
        repintar();
    }
    catch (error)
    {
        console.error("Error:", error);
    }
}
document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi);

function BorrarApiHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = async function(event) {
        let nombreUsuario = document.getElementById("nombre_usuario").value.trim();
        let idGasto = this.gasto.id || this.gasto.gastoId;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${idGasto}`;
        
        try {
            let respuesta = await fetch(url, {
                method: 'DELETE'
            });
            if (respuesta.ok){
                console.log("Se ha borrado el gasto");
                await cargarGastosApi();
            }
            else {
                console.log("No se ha borrado el gasto");
            }
        } catch (error) {
            console.error("Error al borrar:", error);
        }
    };
}

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
    cargarGastosWeb,
    cargarGastosApi,
    BorrarApiHandle
};