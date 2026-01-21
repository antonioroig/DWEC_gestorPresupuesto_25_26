import * as gP from "./gestionPresupuesto.js"

function mostrarDatoEnId(idElemento, valor)
{
    let elemento = document.getElementById(idElemento);
    if (!elemento)
        return;
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento)
    if (!elemento)
        return;
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.className = "gasto-descripcion";
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion);

    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    let fecha = new Date(gasto.fecha);
    divGastoFecha.textContent = fecha.toISOString().slice(0, 10);
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className = "gasto-etiquetas";

    if (gasto.etiquetas.length > 0)
    {
        for(let i = 0; i < gasto.etiquetas.length; i++)
        {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = `${gasto.etiquetas[i]} `;
            if(idElemento === "listado-gastos-completo")
            {
                let borrarEtiquetas = new BorrarEtiquetasHandle();
                borrarEtiquetas.gasto = gasto;
                spanEtiqueta.addEventListener("click", borrarEtiquetas);            
            }
            divGastoEtiquetas.append(spanEtiqueta);
        }
    }
    divGasto.append(divGastoEtiquetas);

    if (idElemento === "listado-gastos-completo")
    {
        let botonEditar = document.createElement("button");
        botonEditar.setAttribute("type", "button");
        botonEditar.className = "gasto-editar"
        botonEditar.textContent = "Editar Gasto";
        let editarGasto = new EditarHandle();
        editarGasto.gasto = gasto;
        botonEditar.addEventListener("click", editarGasto);
        divGasto.append(botonEditar);  
        
        let botonBorrar = document.createElement("button");
        botonBorrar.setAttribute("type", "button");
        botonBorrar.className = "gasto-borrar";
        botonBorrar.textContent = "Borrar Gasto"
        let borrarGasto = new BorrarHandle();
        borrarGasto.gasto = gasto;
        botonBorrar.addEventListener("click", borrarGasto);
        divGasto.append(botonBorrar);

        let btnBorrarGastosApi = document.createElement("button");
        btnBorrarGastosApi.setAttribute("type", "button");
        btnBorrarGastosApi.setAttribute("class", "gasto-borrar-api");
        btnBorrarGastosApi.textContent = "Borrar (API)";
        let borrarGastoApi = new BorrarGastoApi();
        borrarGastoApi.gasto = gasto;
        btnBorrarGastosApi.addEventListener("click", borrarGastoApi)
        divGasto.append(btnBorrarGastosApi);



        let btnEditarForm = document.createElement("button");
        btnEditarForm.setAttribute("type", "button");
        btnEditarForm.className = "gasto-editar-formulario";
        btnEditarForm.textContent = "Editar (formulario)";
        let editarForm = new EditarHandleFormulario();
        editarForm.gasto = gasto;
        btnEditarForm.addEventListener("click", editarForm);
        divGasto.append(btnEditarForm);
    }
    elemento.append(divGasto);
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento)
    if (!elemento)
    {
        return;
    }
    periodo = periodo.toLowerCase()
    if (periodo === "dia")
        periodo = "día";
    if (periodo === "anyo")
        periodo = "año";
    if (periodo === "día" || periodo === "mes" || periodo === "año")
    {
        let htmlArgup = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>`
        for (let [clave, valor] of Object.entries(agrup))
        {
            htmlArgup += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${clave}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>`;
        }
        htmlArgup += `
            </div>`;
        
        elemento.insertAdjacentHTML('beforeend', htmlArgup);
    }
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());
    let divListadoGastosCompleto = document.getElementById("listado-gastos-completo");
    divListadoGastosCompleto.innerHTML = "";
    let listaGastos = gP.listarGastos();
    for (let i = 0; i < listaGastos.length; i++)
    {
        mostrarGastoWeb("listado-gastos-completo", listaGastos[i]);
    }
}

function actualizarPresupuestoWeb()
{
    let presupuestoNuevo = prompt("Introduzca un presupuesto", 0);
    presupuestoNuevo = parseFloat(presupuestoNuevo);
    if (!isNaN(presupuestoNuevo) && presupuestoNuevo !== undefined)
    {
        gP.actualizarPresupuesto(presupuestoNuevo);
    }
    else
    {
        alert("Formato incorrecto");
        return;
    }
    repintar();
}

let btnactualizarpresupuesto = document.getElementById("actualizarpresupuesto");
btnactualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    
    let descripcion = prompt("Introduzca un descripcion de gasto");
    if (descripcion === null || descripcion === "")
    {    
        alert("Introduzca un descripción de gasto");
        return; 
    }
    let valor = prompt("Introduzca un valor de gasto");
    valor = parseFloat(valor);        
    if (isNaN(valor) || valor < 0)
    {
        alert("Formato Incorrecto");
        return;
    } 
    let fecha = prompt("Introduzca una fecha de gasto con formato yyyy-mm-dd");
    let fechaNueva = Date.parse(fecha);
        
    if (isNaN(fechaNueva)) 
    {
        alert("Formato de fecha Incorrecto");
        return;
    }

    let etiquetas = prompt("Introduzca etiquetas de gasto con formato etiqueta1,etiqueta2,etiqueta3");
    let listaEtiquetas = etiquetas.split(",");
    if(listaEtiquetas.length === 1 && listaEtiquetas[0] === "")
    {
        alert("Introduzca por lo menos una etiqueta de gasto");
        return; 
    }
    let gastoNuevo = new gP.CrearGasto(descripcion, valor, fecha, ...listaEtiquetas);
    gP.anyadirGasto(gastoNuevo);
    repintar();
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function(event)
    {
        let descripcion = prompt("Introduzca un descripcion de gasto", this.gasto.descripcion);
        if (descripcion === null || descripcion === "")
        {    
            alert("Introduzca un descripción de gasto");
            return; 
        }
        let valor = prompt("Introduzca un valor de gasto", this.gasto.valor);
        valor = parseFloat(valor);        
        if (isNaN(valor) || valor < 0)
        {
            alert("Formato Incorrecto");
            return;
        } 
        let fechaGasto = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        let fecha = prompt("Introduzca una fecha de gasto con formato yyyy-mm-dd", fechaGasto);
        let fechaNueva = Date.parse(fecha);
        
        if (isNaN(fechaNueva)) 
        {
             alert("Formato de fecha Incorrecto");
             return;
        }

        let etiquetasGasto = this.gasto.etiquetas.join(',');
        let etiquetas = prompt("Introduzca etiquetas de gasto con formato etiqueta1,etiqueta2,etiqueta3", etiquetasGasto);

        let listaEtiquetas = etiquetas.split(",");
        if(listaEtiquetas.length === 1 && listaEtiquetas[0] === "")
        {
            alert("Introduzca por lo menos una etiqueta de gasto");
            return; 
        }

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas); 
        this.gasto.anyadirEtiquetas(...listaEtiquetas);
    
        repintar();
    }   
}

function BorrarHandle()
{
    this.handleEvent = function()
    {
        gP.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function(event)
    {
        let etiqueta = event.target.textContent.trim();
        this.gasto.borrarEtiquetas(etiqueta);
        repintar();
    }
}
let btnAnyadirgastoFormulario = document.getElementById("anyadirgasto-formulario");
function subHand(event)
{
    event.preventDefault();
    let form = event.currentTarget;
    let descripcion = form.elements["descripcion"].value.trim();
    let valor = form.elements["valor"].value.trim();
    valor = parseFloat(valor);
    let fecha = form.elements["fecha"].value;
    let etiquetas = form.elements["etiquetas"].value.trim();
    let listaEtiquetas = etiquetas.split(",");
    let gastoNuevo = new gP.CrearGasto(descripcion, valor, fecha, ...listaEtiquetas);
    gP.anyadirGasto(gastoNuevo);
    repintar();
    form.remove();
    btnAnyadirgastoFormulario.disabled = false;
}

function CancelarHandle()
{
    this.handleEvent = function(event){
        let form = event.currentTarget.form;
        form.remove();
        if (this.btnCancelar)
        {
            this.btnCancelar.disabled = false;
        }
        
    }
}

function nuevoGastoWebFormulario(event)
{
    btnAnyadirgastoFormulario.disabled = true;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    document.getElementById("controlesprincipales").append(plantillaFormulario);  
    formulario.addEventListener("submit", subHand);
    let btnCancelar = formulario.querySelector("button.cancelar");
    let cancelar = new CancelarHandle();
    cancelar.btnCancelar = btnAnyadirgastoFormulario;
    btnCancelar.addEventListener("click", cancelar);
    let btnEnviarApi = formulario.getElementsByClassName("gasto-enviar-api");
    for (let boton of btnEnviarApi){
        boton.addEventListener("click", enviarGastoApi)
    }
}

btnAnyadirgastoFormulario.addEventListener("click", nuevoGastoWebFormulario)

function EditarHandleFormulario(){
    this.handleEvent = function(event){
        let btnEditarForm = event.target;
        btnEditarForm.disabled = true;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");
        formulario.elements["descripcion"].value = this.gasto.descripcion;
        formulario.elements["valor"].value = this.gasto.valor;
        formulario.elements["fecha"].value = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        formulario.elements["etiquetas"].value = this.gasto.etiquetas.join(",");
        btnEditarForm.insertAdjacentElement("afterend", formulario);
        let gasto = this.gasto;
        formulario.addEventListener("submit", function(event){
            event.preventDefault();
            let descripcion = formulario.elements["descripcion"].value.trim();
            let valor = formulario.elements["valor"].value.trim();
            valor = parseFloat(valor);
            let fecha = formulario.elements["fecha"].value;
            let etiquetas = formulario.elements["etiquetas"].value;
            let listaEtiquetas = etiquetas.split(",");
            gasto.actualizarDescripcion(descripcion);
            gasto.actualizarValor(valor);
            gasto.actualizarFecha(fecha);
            gasto.borrarEtiquetas(...gasto.etiquetas); 
            gasto.anyadirEtiquetas(...listaEtiquetas);      
            repintar();
            btnEditarForm.disabled = false;
            formulario.remove();
        });
        let btnEditarApi = formulario.getElementsByClassName("gasto-enviar-api");
        for (let boton of btnEditarApi){
            boton.addEventListener("click", async (event)=>{
                let nombreUsuario = document.getElementById("nombre_usuario").value.trim();
                if(!nombreUsuario || nombreUsuario === ""){
                    alert("Introduce un nombre de usuario");
                    return;
                }
                event.preventDefault();
                let descripcion = formulario.elements["descripcion"].value.trim();
                let valor = formulario.elements["valor"].value.trim();
                valor = parseFloat(valor);
                let fecha = formulario.elements["fecha"].value;
                let etiquetas = formulario.elements["etiquetas"].value;
                let listaEtiquetas = etiquetas.split(",");
                let gastoEditado = {
                    descripcion: descripcion,
                    valor: valor,
                    fecha: fecha,
                    etiquetas: listaEtiquetas
                }
                let url = `https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}/${this.gasto.gastoId}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(gastoEditado)
                }
                try{
                    let response = await fetch(url, options);
                    if (!response.ok) throw new Error("Error en la petición");
                    cargarGastosApi();
                    formulario.remove();
                }
                catch(error){
                    console.error(error);
                    alert("No se pudo actualizar el gasto");
                }
            })
        } 


        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelar = new CancelarHandle();
        cancelar.btnCancelar = btnEditarForm;
        btnCancelar.addEventListener("click", cancelar);
    }
}

function filtrarGastosWeb()
{
    let listadoGastosCompleto = document.getElementById("listado-gastos-completo");
    let form = document.getElementById("formulario-filtrado");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        let descripcion = form.elements["formulario-filtrado-descripcion"].value.trim();
        let valorMin = form.elements["formulario-filtrado-valor-minimo"].value;
        valorMin = parseFloat(valorMin);
        let valorMax = form.elements["formulario-filtrado-valor-maximo"].value;
        valorMax = parseFloat(valorMax);
        let fechaDesde = form.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetas = form.elements["formulario-filtrado-etiquetas-tiene"].value.trim();
        let filtro = {};

        if (descripcion !== "") {
            filtro.descripcionContiene = descripcion;
        }

        if (!isNaN(valorMin)) {
            filtro.valorMinimo = valorMin;
        }

        if (!isNaN(valorMax)) {
            filtro.valorMaximo = valorMax;
        }

        if (fechaDesde !== "") {
            filtro.fechaDesde = fechaDesde;
        }

        if (fechaHasta !== "") {
            filtro.fechaHasta = fechaHasta;
        }

        if (etiquetas !== "") {
            let listaEtiq = gP.transformarListadoEtiquetas(etiquetas);
            filtro.etiquetasTiene = listaEtiq;
        }

        let gastosFiltrados = gP.filtrarGastos(filtro);

        listadoGastosCompleto.innerHTML = "";
        for (let gasto of gastosFiltrados) 
        {
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }         
    })
    
}
filtrarGastosWeb();

function guardarGastosWeb(){
    let listaGastos = gP.listarGastos();
    
    localStorage.setItem("GestorGastosDWEC", JSON.stringify(listaGastos));
}

document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);

function cargarGastosWeb(){

    let gastosRecuperados = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
    if (gastosRecuperados === null) {
        gastosRecuperados = [];
    }
    gP.cargarGastos(gastosRecuperados);
    repintar();
}

document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);

async function cargarGastosApi(){
    let nombreUsuario = document.getElementById("nombre_usuario").value.trim();
    if(!nombreUsuario || nombreUsuario === ""){
        alert("Introduce un nombre de usuario");
        return;
    }
    let url = `https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }

    try{
        let response = await fetch(url, options);
        if (!response.ok) throw new Error('Error en la petición');
        let gastos = await response.json();
        gP.cargarGastos(gastos);
        repintar();
    }
    catch(error){
        console.error(error);
        alert("No se pudieron cargar los gastos");
    }
}

let btnCargarGastosApi = document.getElementById("cargar-gastos-api");
btnCargarGastosApi.addEventListener("click", cargarGastosApi);

function BorrarGastoApi(){
    this.handleEvent = async function(event){
        let nombreUsuario = document.getElementById("nombre_usuario").value.trim();
        if(!nombreUsuario || nombreUsuario === ""){
            alert("Introduce un nombre de usuario");
            return;
        }
        let idGasto = this.gasto.gastoId;
        let url = `https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}/${idGasto}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        }
        try{
            let response = await fetch(url, options);
            if (!response.ok) throw new Error('Error en la petición');
            cargarGastosApi();
            
        }
        catch(error){
            console.error(error);
            alert("No se pudo borrar el gasto");
        }
    }
}

async function enviarGastoApi(event) {
    event.preventDefault();
    let nombreUsuario = document.getElementById("nombre_usuario").value.trim();
    if(!nombreUsuario || nombreUsuario === ""){
        alert("Introduce un nombre de usuario");
        return;
    }
    let form = event.target.closest("form");
    let descripcion = form.elements["descripcion"].value.trim();
    let valor = form.elements["valor"].value.trim();
    valor = parseFloat(valor);
    let fecha = form.elements["fecha"].value;
    let etiquetas = form.elements["etiquetas"].value.trim();
    let listaEtiquetas = etiquetas.split(",");
    let gastoNuevo = new gP.CrearGasto(descripcion, valor, fecha, ...listaEtiquetas);

    let url = `https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}`;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gastoNuevo)
    };
    
    try{
        let response = await fetch(url, options);
        if (!response.ok) throw new Error('Error en la petición');
        cargarGastosApi();
        form.reset();
    }

    catch(error){
        console.error(error);
        alert("No se pudo crear el gasto");
    }

    btnAnyadirgastoFormulario.disabled = false;
}

export
{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}