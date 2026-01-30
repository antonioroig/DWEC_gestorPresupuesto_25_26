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

        let botonBorrarApi = document.createElement("button");
        botonBorrarApi.setAttribute("type", "button");
        botonBorrarApi.className = "gasto-borrar-api";
        botonBorrarApi.innerHTML = "Borrar (API)";
        let objBorrarApi = new BorrarApiHandle();
        objBorrarApi.gasto = gasto[i];
        botonBorrarApi.addEventListener("click", objBorrarApi);
        divgasto.appendChild(botonBorrarApi);

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
            formulario.elements["etiquetas"].value = gasto[i].etiquetas;
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


            let objEditarApi = new EditarApiHandleFormulario();
            objEditarApi.gasto = gasto[i];
            objEditarApi.formulario = formulario;

            let botonEnviarApi = formulario.getElementsByClassName("gasto-enviar-api")[0];
            botonEnviarApi.addEventListener("click", objEditarApi);
        });
        divgasto.appendChild(botonEditarFormulario);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
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
    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
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
    divP.append(chart);
}

function repintar (){
    document.getElementById("presupuesto").innerHTML = "";
    document.getElementById("gastos-totales").innerHTML = "";
    document.getElementById("balance-total").innerHTML = "";
    document.getElementById("listado-gastos-completo").innerHTML = "";
    document.getElementById("agrupacion-dia").innerHTML = "";
    document.getElementById("agrupacion-mes").innerHTML = "";
    document.getElementById("agrupacion-anyo").innerHTML = "";

    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());
    mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());
    
    mostrarGastosAgrupadosWeb("agrupacion-dia", gP.agruparGastos("dia"), "dia");
    mostrarGastosAgrupadosWeb("agrupacion-mes", gP.agruparGastos("mes"), "mes");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gP.agruparGastos("anyo"), "año");
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

function BorrarApiHandle(){
    this.handleEvent = function(evento){
        let idGasto = this.gasto.gastoId;
        let nombreUsuario = document.getElementById("nombre_usuario").value;
        if (nombreUsuario.length <= 0)
            throw new Error("No has cargado los gastos de un usuario.");
        let options = {
            method: "DELETE"
        };
        fetch(`https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}/${idGasto}`, options)
        .then(respuesta => {
            if (!respuesta.ok)
                throw new Error(this.gasto.descripcion + " no está en la API de " +  nombreUsuario);
            cargarGastosApi();
            console.log(this.gasto.descripcion + " borrado de la API");
        })
        .catch(error => console.error(error));
        
        
        repintar();
        cargarGastosApi();
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

function EditarApiHandleFormulario(){
    this.handleEvent = function(event){ 
        let descripcion = this.formulario.descripcion.value;
        let valor = Number(this.formulario.valor.value);
        let fecha = this.formulario.fecha.value;
        let etiquetas = this.formulario.etiquetas.value.split(",");
        let nombreUsuario = document.getElementById("nombre_usuario").value;
        if (nombreUsuario.length == 0)
            throw new Error("No has escrito un nombre de usuario.");
        let gastoModificado = {
            descripcion: descripcion,
            valor: valor,
            fecha: fecha,
            etiquetas: etiquetas
        }
        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gastoModificado)
        }
        fetch(`https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}/${this.gasto.gastoId}`, options)
        .then(respuesta => {
            if (respuesta.ok)
                return respuesta.json();
            else
                throw new Error("Error con la API");
        })
        .then(gasto => {
            console.log(gasto.descripcion + " modificado");
            repintar();
            cargarGastosApi();
        })
        .catch(error => console.error("ERROR: ", error));
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

    formulario.getElementsByClassName("gasto-enviar-api")[0].addEventListener("click", function(){
        let gasto = {
            "gastoId": "x",
            "descripcion": formulario.descripcion.value,
            "valor": formulario.valor.value,
            "etiquetas": formulario.etiquetas.value.split(","),
            "fecha": formulario.fecha.value 
        }
        añadirGasto(gasto);
    })
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
        document.getElementById("listado-gastos-completo").innerHTML = "";
        let form = event.target;
        let descripcion = form.elements["formulario-filtrado-descripcion"].value;
        let valMinimo = form.elements["formulario-filtrado-valor-minimo"].value;
        let valMaximo = form.elements["formulario-filtrado-valor-maximo"].value;
        let fechaInicial = form.elements["formulario-filtrado-fecha-desde"].value;
        let fechaFinal = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetas = form.elements["formulario-filtrado-etiquetas-tiene"].value;

        let obj = {descripcionContiene: descripcion, fechaDesde: fechaInicial, fechaHasta: fechaFinal};

        if (valMinimo.length > 0)
            obj.valorMinimo = Number(valMinimo); 

        if (valMaximo.length > 0)
            obj.valorMaximo = Number(valMaximo);

        if (etiquetas.length > 0)
            obj.etiquetasTiene = gP.transformarListadoEtiquetas(etiquetas);

        let gastos;
        if (obj.length == 0) {
            gastos = gP.listarGastos();
        } else {
            gastos = gP.filtrarGastos(obj);
        }

        mostrarGastoWeb("listado-gastos-completo", gastos);
    }
}

document.getElementById("formulario-filtrado").addEventListener("submit", new filtrarGastosWeb());

function guardarGastosWeb(){
    localStorage.setItem("GestorGastosDWEC", JSON.stringify(gP.listarGastos()));
}

function cargarGastosWeb(){
    let gastos = localStorage.getItem("GestorGastosDWEC");
    if (gastos != null)
        gastos = JSON.parse(gastos);
    else 
        gastos = [];
    gP.cargarGastos(gastos);
    repintar();
}

function cargarGastosApi(){
    let nombreUsuario = document.getElementById("nombre_usuario").value;
    if (nombreUsuario.length == 0)
        throw new Error("No has escrito un nombre de usuario.");
    let options = {
        method: "GET"
    }
    fetch(`https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}`, options)
    .then(respuesta => {
        if (respuesta.ok)
            return respuesta.json();
        else
            throw new Error("Error con la API");
    })
    .then(gastos => {
        if (gastos.length > 0){
            gP.cargarGastos(gastos);
            repintar();
        }
        else
            console.log("No hay gastos con ese nombre de usuario.");
    })
    .catch(error => console.error("ERROR: ", error));
}

function añadirGasto(gastos){
    let nombreUsuario = document.getElementById("nombre_usuario").value;
    let gasto = {
        usuario: nombreUsuario,
        gastoId: gastos.id,
        descripcion: gastos.descripcion,
        valor: gastos.valor,
        etiquetas: gastos.etiquetas,
        fecha: gastos.fecha
    };
    if (nombreUsuario.length <= 0)
        throw new Error("No has escrito un nombre de usuario.");
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gasto)
    }
    fetch(`https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}`, options)
    .then(respuesta => {
        if (respuesta.ok)
            return respuesta.json();
        else
            throw new Error("Error con la API");
    })
    .then(gastos => {
        cargarGastosApi();
        console.log(gasto.descripcion + " añadido a la API");
    })
    .catch(error => console.error("ERROR: ", error));
}

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
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi,
    añadirGasto
}