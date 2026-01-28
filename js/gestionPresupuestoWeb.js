import * as GP from "./gestionPresupuesto.js";

function mostrarDatoenId(valor, id){ 
    document.getElementById(id).innerHTML = valor;
}
function mostrarGastoWeb(gastos, id){
    let contenedor = document.getElementById(id);
    contenedor.innerHTML = "";
    for(let j = 0; j < gastos.length; j++)
    {
        let des = document.createElement("div");
        des.innerHTML = gastos[j].descripcion;
        des.classList.add("gasto-descripcion");
        let fec = document.createElement("div");
        fec.innerHTML = new Date(gastos[j].fecha).toLocaleString();
        fec.classList.add("gasto-fecha");
        let val = document.createElement("div");
        val.innerHTML = gastos[j].valor;
        val.classList.add("gasto-valor");
        let eti = document.createElement("div");
        for(let i = 0; i < gastos[j].etiquetas.length; i++)
        {
            let etiqueta = document.createElement("span");
            let handleDel2 = new BorrarEtiquetasHandle();
            handleDel2.gasto = gastos[j];
            handleDel2.etiqueta = gastos[j].etiquetas[i];
            etiqueta.addEventListener("click", handleDel2)
            etiqueta.innerHTML = gastos[j].etiquetas[i];
            etiqueta.classList.add("gasto-etiquetas-etiqueta");
            eti.appendChild(etiqueta);
        }
        eti.classList.add("gasto-etiquetas");
        let div = document.createElement("div");
        div.classList.add("gasto");
        let btnEdit = document.createElement("button");
        let btnDel = document.createElement("button");
        let btnFormulario = document.getElementById("anyadirgasto-formulario");
        btnEdit.classList.add("gasto-editar-formulario");
        btnDel.classList.add("gasto-borrar");
        btnEdit.innerHTML = "Editar"
        btnDel.innerHTML = "Borrar"
        let handleEdit = new EditarHandleFormulario();
        let handleDel = new BorrarHandle();
        handleEdit.gasto = gastos[j];
        handleDel.gasto = gastos[j];
        btnEdit.addEventListener("click", handleEdit);
        btnDel.addEventListener("click", handleDel);
        btnFormulario.addEventListener("click", nuevoGastoWebFormulario);
        div.appendChild(des);
        div.appendChild(fec);
        div.appendChild(val);
        div.appendChild(eti);
        div.appendChild(btnEdit);
        div.appendChild(btnDel);
        contenedor.appendChild(div);
    }
}
function mostrarGastosAgrupadosWeb(id, agrup, periodo){
    let granContenedor = document.getElementById(id);
    let contenedor = document.createElement("div");
    contenedor.classList.add("agrupacion");
    let h1 = document.createElement("h1");
    h1.innerHTML = `Gastos agrupados por ${periodo}`;
    contenedor.appendChild(h1);
    for(let values of Object.values(agrup))
    {
        let dato = document.createElement("div");
        dato.classList.add("agrupacion-dato");
        contenedor.appendChild(dato);
        let nombre = document.createElement("span")
        let valor = document.createElement("span")
        nombre.classList.add("agrupacion-dato-clave");
        valor.classList.add("agrupacion-dato-valor");
        nombre.innerHTML = values[0];
        valor.innerHTML = values[1];
        dato.appendChild(nombre);
        dato.appendChild(valor);
        contenedor.appendChild(dato)
    }
    granContenedor.appendChild(contenedor);
}
function repintar(){
    mostrarDatoenId(GP.mostrarPresupuesto(), "presupuesto");
    mostrarDatoenId(GP.calcularTotalGastos(), "gastos-totales");
    mostrarDatoenId(GP.calcularBalance(), "balance-total");
    let div = document.getElementById("listado-gastos-completo");
    div.innerHTML = "";
    mostrarGastoWeb(GP.listarGastos(), "listado-gastos-completo");
}
let btnActualizar = document.getElementById("actualizarpresupuesto")
btnActualizar.addEventListener("click", actualizarPresupuestoWeb)
function actualizarPresupuestoWeb(){
    let actualizar = prompt("Introduce el nuevo presupuesto:");
    let presupuesto = parseInt(actualizar)
    let presAct = document.getElementById("presupuesto");
    presAct.innerHTML = `Tu presupuesto actual es de ${presupuesto} €`
}
let btnAñadir = document.getElementById("anyadirgasto");
btnAñadir.addEventListener("click", nuevoGastoWeb);
function nuevoGastoWeb(){
    let des = prompt("Introduce la descripción que quieras:");
    let val = prompt("Introduce el valor que desees:");
    let fech = prompt("Introduce la fecha en formato year-month-day:");
    let eti = prompt("Introduce las etiquetas que quieras, separadas por comas:");
    val = Number(val);
    fech = Date.parse(fech);
    let etiArray = eti.split(",");
    let newGasto = new GP.CrearGasto(des, val, fech, ...etiArray);
    GP.anyadirGasto(newGasto);
    repintar();
}
function EditarHandle(){
    this.handleEvent = function(event){
        let des = prompt("Introduce la descripción que quieras:");
        let val = prompt("Introduce el valor que desees:");
        let fech = prompt("Introduce la fecha en formato year-month-day:");
        let eti = prompt("Introduce las etiquetas que quieras, separadas por comas:");
        this.gasto.descripcion = des;
        this.gasto.valor = Number(val);
        this.gasto.fecha = Date.parse(fech);
        this.gasto.etiquetas = eti.split(",");
        repintar();
    }
}
function BorrarHandle(){
    this.handleEvent = function(event){
        let id = this.gasto.id; 
        GP.borrarGasto(id);
        repintar();   
    }
}
function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}
function CancelarFormularioHandle() {
    this.handleEvent = function(event){
        this.formulario.remove();
        this.botonPrincipal.removeAttribute("disabled");
    }
}
function nuevoGastoWebFormulario(event){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    formulario.addEventListener("submit", function(event){
        event.preventDefault();
        let form = event.currentTarget;
        let des = form.elements["descripcion"].value;
        let val = Number(form.elements["valor"].value);
        let fech = form.elements["fecha"].value;
        let eti = form.elements["etiquetas"].value.split(",");
        let nuevoGasto = new GP.CrearGasto(des, val, fech, ...eti);
        GP.anyadirGasto(nuevoGasto);
        repintar();
        let botonPrincipal = document.getElementById("anyadirgasto-formulario");
        if(botonPrincipal){
            botonPrincipal.removeAttribute("disabled")
        }
    });
    let btnCancelar = formulario.querySelector("button.cancelar");
    let cancelarHandler = new CancelarFormularioHandle();
    cancelarHandler.formulario = formulario;
    cancelarHandler.botonPrincipal = event.currentTarget;
    btnCancelar.addEventListener("click", cancelarHandler);
    event.currentTarget.setAttribute("disabled", true);
    document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
}
function GuardarEdicionHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let form = event.currentTarget;
        this.gasto.descripcion = form.elements["descripcion"].value;
        this.gasto.valor = Number(form.elements["valor"].value);
        this.gasto.fecha = Date.parse(form.elements["fecha"].value);
        this.gasto.etiquetas = form.elements["etiquetas"].value.split(",");
        repintar();
        form.remove();
    }
}
function EditarHandleFormulario(){
    this.handleEvent = function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var form = plantillaFormulario.querySelector("form");
        form.elements["descripcion"].value = this.gasto.descripcion;
        form.elements["valor"].value = this.gasto.valor;
        form.elements["fecha"].value = this.gasto.fecha;
        form.elements["etiquetas"].value = this.gasto.etiquetas.join(",");
        let enviarHndle = new GuardarEdicionHandle();
        enviarHndle.gasto = this.gasto;
        form.addEventListener("submit", enviarHndle)
        let btnCancelar = form.querySelector(".cancelar");
        let cancelHandel = new CancelarFormularioHandle(); 
        cancelHandel.formulario = form;
        cancelHandel.botonPrincipal = event.currentTarget;
        btnCancelar.addEventListener("click", cancelHandel);
        event.currentTarget.setAttribute("disabled", true);
        let divGasto = event.currentTarget.parentNode;
        divGasto.appendChild(form);
    }
}
function filtrarGastosWeb(){
    let form = document.getElementById("formulario-filtrado")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let des = form.elements["formulario-filtrado-descripcion"].value;
        let minVal = Number(form.elements["formulario-filtrado-valor-minimo"].value);
        let maxVal = Number(form.elements["formulario-filtrado-valor-maximo"].value);
        let  fechaDesde = form.elements["formulario-filtrado-fecha-desde"].value;
        let  fechaHasta = form.elements["formulario-filtrado-fecha-hasta"].value;
        let  etis = form.elements["formulario-filtrado-etiquetas-tiene"].value;
        if(etis.length > 0)
        {
            etis = GP.transformarListadoEtiquetas(form.elements["formulario-filtrado-etiquetas-tiene"].value)
        }
        let resul = GP.filtrarGastos({fechaDesde : fechaDesde, fechaHasta : fechaHasta, valorMinimo : minVal, valorMaximo : maxVal, 
                            descripcionContiene : des, etiquetasTiene : etis})
        
        mostrarGastoWeb(resul, "listado-gastos-completo")  
    })
}
function guardarGastoWeb(){
    let btn = document.getElementById("guardar-gastos");
    btn.addEventListener("click", (event) => {
        let datos = GP.listarGastos();
        localStorage.setItem("GestorGastosDWEC", JSON.stringify(datos));
    })
}
function cargarGastosWeb(){
    let btn = document.getElementById("cargar-gastos")
    btn.addEventListener("click", (event) => {
        let gastos = localStorage.getItem("GestorGastosDWEC"); 
        let newGastos = JSON.parse(gastos);
        if(newGastos === null)
            newGastos = [];
        GP.cargarGastos(newGastos);
        repintar();
    })
}
export{
    mostrarDatoenId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    filtrarGastosWeb,
    guardarGastoWeb,
    cargarGastosWeb
}