import * as Js1 from "./gestionPresupuesto.js";


function mostrarDatoEnId(id, valor){
    document.getElementById(id).innerHTML = valor;
}
function mostrarGastoWeb(idElemento, gasto) {
   const contenedor = document.getElementById(idElemento);

   if(Array.isArray(gasto)) {
      contenedor.innerHTML = "";
       gasto.forEach(g => mostrarGastoWeb(idElemento, g));
       return;
 }

   const divGasto = document.createElement("div");
   divGasto.className = "gasto";

   const divDescripcion = document.createElement("div");
   divDescripcion.className = "gasto-descripcion";
   divDescripcion.textContent = `${gasto.descripcion}`;

   const divFecha = document.createElement("div");
   divFecha.className = "gasto-fecha";
   divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

   const divValor = document.createElement("div");
   divValor.className = "gasto-valor";
   divValor.textContent = `${gasto.valor}`;

   const divEtiquetas = document.createElement("div");
   divEtiquetas.className = "gasto-etiquetas";

 
   const etiquetas = Array.isArray(gasto.etiquetas) ? gasto.etiquetas : [];
   for (let i = 0; i < etiquetas.length; i++) {
      let objBorrarEtiqueta = new BorrarEtiquetashandle();
      objBorrarEtiqueta.gasto = gasto;
      const span = document.createElement("span");
      span.className = "gasto-etiquetas-etiqueta";
      span.textContent = `${gasto.etiquetas[i]}`;
      objBorrarEtiqueta.etiqueta = gasto.etiquetas[i];
      span.addEventListener("click", objBorrarEtiqueta);
      divEtiquetas.appendChild(span);
   }
   const buttonEdicion = document.createElement("button");
   buttonEdicion.className = "gasto-editar";
   buttonEdicion.type = "button";
   buttonEdicion.textContent = "Editar";
   let objEditar = new EditarHandle();
   objEditar.gasto = gasto;
   buttonEdicion.addEventListener("click", objEditar);
    const buttonBorrar = document.createElement("button");
    buttonBorrar.className = "gasto-borrar";
    buttonBorrar.type = "button";
    buttonBorrar.textContent = "Borrar";
    let objBorrar = new BorrarHandle();
    objBorrar.gasto = gasto;
    buttonBorrar.addEventListener("click", objBorrar);
    const buttonEditarformualrio = document.createElement("button");
    buttonEditarformualrio.className = "gasto-editar-formulario";
    buttonEditarformualrio.type = "button";
    buttonEditarformualrio.textContent = "Editar (formulario)";
    let objEditarForm = new EditarHandleformulario();
    objEditarForm.gasto = gasto;
    buttonEditarformualrio.addEventListener("click",objEditarForm);
    const buttonBorrarApi = document.createElement("button");
    buttonBorrarApi.className = "gasto-borrar-api";
    buttonBorrarApi.type = "button";
    buttonBorrarApi.textContent = "Borrar (API)";
    let objBorrarGastoApi = new BorrarGastoHandleApi();
    objBorrarGastoApi.gasto = gasto;
    buttonBorrarApi.addEventListener("click", objBorrarGastoApi);
   divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas,buttonEdicion,buttonBorrar,buttonBorrarApi,buttonEditarformualrio);
   contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor || !agrup) return;

    var divP = document.getElementById(idElemento);
    divP.innerHTML = "";

  
    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
  
    const h1Periodo = document.createElement("h1");
    h1Periodo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1Periodo);
  
    for (const clave of Object.keys(agrup)) {
      const valor = agrup[clave];
  
      const divAgrupacionDato = document.createElement("div");
      divAgrupacionDato.className = "agrupacion-dato";
  
      const spanClave = document.createElement("span");
      spanClave.className = "agrupacion-dato-clave";
      spanClave.textContent = clave;
  
      const spanValor = document.createElement("span");
      spanValor.className = "agrupacion-dato-valor";
      spanValor.textContent = ` ${valor}`;
  
      divAgrupacionDato.appendChild(spanClave);

      divAgrupacionDato.appendChild(spanValor);
      divAgrupacion.appendChild(divAgrupacionDato);
    }
  
    contenedor.appendChild(divAgrupacion);

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
  
  function repintar(){
    mostrarDatoEnId("presupuesto",Js1.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales",Js1.calcularTotalGastos());
    mostrarDatoEnId("balance-total",Js1.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo",Js1.listarGastos());    

    mostrarGastosAgrupadosWeb("agrupacion-dia",Js1.agruparGastos("dia"), "Día")
    mostrarGastosAgrupadosWeb("agrupacion-mes",Js1.agruparGastos("mes"), "Mes")
    mostrarGastosAgrupadosWeb("agrupacion-anyp",Js1.agruparGastos("anyo"), "Año")
  }

  function actualizarPresupuestoWeb(){
    let presupuesto = +prompt("Introduce un presupuesto");
    Js1.actualizarPresupuesto(presupuesto);
    repintar();
  }

  function nuevoGastoWeb(){
    let descripcion = prompt("Introdice la descripción");
    let valor = +prompt("Introduce el valor");
    let fecha = prompt("Introduce la fecha en formato (yyyy-mm-dd)");
    let etiquetas = prompt("Introduce las etiquetas y sepralas por comas");
    let ArrayEtiquetas = etiquetas.split(',');

    let gasto = new Js1.CrearGasto(descripcion,valor,fecha,...ArrayEtiquetas);
    Js1.anyadirGasto(gasto);
    repintar();
  }

  function EditarHandle(){
    this.handleEvent = function(evento){
      let descripcion = prompt("Introduce la descripcion", this.gasto.descripcion);
      let valor = +prompt("Introduce el valor", this.gasto.valor);
      let fecha = prompt("Introduce la fecha en formato (yyyy-mm-dd)", new Date(this.gasto.fecha).toISOString().slice(0,10));
      let etiquetas = prompt("Introduce las etiquetas y sepralas por comas", this.gasto.etiquetas);

      let ArrayEtiquetas = etiquetas.split(',');

      this.gasto.actualizarValor(valor);
      this.gasto.actualizarDescripcion(descripcion);
      this.gasto.actualizarFecha(fecha);
        
      this.gasto.anyadirEtiquetas(ArrayEtiquetas);

      repintar();
      }
  }
function BorrarHandle(){
  this.handleEvent = function(evento){
    let idGasto = this.gasto.id;
    Js1.borrarGasto(idGasto);
    repintar();
  }
}
function BorrarEtiquetashandle(){
  this.handleEvent = function(evento){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
  }
}
function BorrarGastoHandleApi(){
  this.handleEvent =  async function(evento){
    evento.preventDefault();
    const imputNombre = document.getElementById("nombre_usuario");
    const nombreUsuario = imputNombre.value;

    const url = `https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}/${this.gasto.gastoId}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    };
    try{
      const response = await fetch(url,options);
      if(!response.ok)
        throw new Error('Error al obtener los datos')
      const data = await response.json();
      await cargarGastosApi();
      console.log(data)
    }
    catch(error){
      console.log(error);

    }
  }
}
function BotonCancelarhandle(){
  this.handleEvent = function(evento){
      let formulario = evento.currentTarget.closest("form");
      formulario.remove();
      document.getElementById("anyadirgasto-formulario").disabled = false;
      document.querySelectorAll(".gasto-editar-formulario").forEach(b => b.disabled = false);
  }
}
function BotonEviarHandle(){
  this.handleEvent = function(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const descripcion = data.get("descripcion");
    const valor = +data.get("valor");
    const fecha = data.get("fecha");
    const etiquetas = data.get("etiquetas");
    let ArrayEtiquetas = etiquetas.split(',');    
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
        if(etiquetas.length > 0)
      this.gasto.anyadirEtiquetas(ArrayEtiquetas);
    repintar();
  }
}

async function ActualizarGastoApi(formulario, gasto){
  const imputNombre = document.getElementById("nombre_usuario");
  const nombreUsuario = imputNombre.value;
  if(!gasto.gastoId){
    const gastoActualizado = {
      Id : gasto.id,
      descripcion: formulario.querySelector('#descripcion').value,
      valor: +formulario.querySelector('#valor').value,
      fecha: formulario.querySelector('#fecha').value,
      etiquetas: gasto.etiquetas
    };
      await BotonEnviarHandle(gastoActualizado);
      repintar();
  }
  const url = `https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}/${gasto.gastoId}`;

  const gastoActualizado = {
    gastoId: gasto.gastoId,
    descripcion: formulario.querySelector('#descripcion').value,
    valor: +formulario.querySelector('#valor').value,
    fecha: formulario.querySelector('#fecha').value,
    etiquetas: gasto.etiquetas
  };

  const options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"      
    },
    body: JSON.stringify(gastoActualizado) 
  };
  try{
    const response = await fetch(url,options);
    if(!response.ok)
      throw new Error('Error al obtener los datos')

    const data = await response.json();
    await cargarGastosApi();
    console.log(data);
  }
  catch(error){
    console.log(error);

  }

}

function EditarHandleformulario(){
  this.handleEvent = function(event){ 
    const gasto = this.gasto;

      console.log(gasto)
      let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
      let formulario = plantillaFormulario.querySelector("form");
      const btnEnviarApi = formulario.querySelector("button.gasto-enviar-api");


      let descripcion = formulario.querySelector('#descripcion');
      let valor = formulario.querySelector('#valor');
      let fecha = formulario.querySelector('#fecha');

      descripcion.value = gasto.descripcion;
      valor.value = gasto.valor;
      fecha.value = new Date(gasto.fecha).toISOString().slice(0,10);

      btnEnviarApi.addEventListener("click", async function () {
        await ActualizarGastoApi(formulario, gasto);
      });

      const btnCancelar = formulario.querySelector("button.cancelar");

      const bottonEnviar = new BotonEviarHandle();
      bottonEnviar.gasto = gasto
      formulario.addEventListener("submit",bottonEnviar);

      const objCancelar = new BotonCancelarhandle();
      btnCancelar.addEventListener("click",objCancelar);
      event.currentTarget.disabled = true;
      
      event.currentTarget.parentElement.appendChild(formulario);
  }
}

async function BotonEnviarHandle(gasto){
    const imputNombre = document.getElementById("nombre_usuario");
    const nombreUsuario = imputNombre.value;
    const url = `https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}`;
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"      
      },
      body: JSON.stringify(gasto) 
    };
    try{
      const response = await fetch(url,options);
      if(!response.ok)
        throw new Error('Error al obtener los datos')

      const data = await response.json();
      await cargarGastosApi();
      console.log(data);
    }
    catch(error){
      console.log(error);

    }
}

function obtenerGastoDesdeFormulario(formulario){
    const data = new FormData(formulario);
    const descripcion = data.get("descripcion");
    const valor = +data.get("valor");
    const fecha = data.get("fecha");
    const etiquetas = data.get("etiquetas");
    let ArrayEtiquetas = etiquetas.split(',');
    return new Js1.CrearGasto(descripcion,valor,fecha,...ArrayEtiquetas);
}


function nuevoGastoWebFormulario(){

  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  let formulario = plantillaFormulario.querySelector("form");
  const btnCancelar = formulario.querySelector("button.cancelar");
  const btnEnviarApi = formulario.querySelector("button.gasto-enviar-api");
  const botonDesactivado = document.getElementById("anyadirgasto-formulario");
  botonDesactivado.disabled = true;
  formulario.addEventListener("submit", function(event){
    event.preventDefault();
    const gasto = obtenerGastoDesdeFormulario(formulario);
    Js1.anyadirGasto(gasto);
    botonDesactivado.disabled = false;
    repintar();
  })
console.log(btnEnviarApi);

  const objCancelar = new BotonCancelarhandle();
  btnCancelar.addEventListener("click",objCancelar);

  btnEnviarApi.addEventListener("click", async function () {
    const gasto = obtenerGastoDesdeFormulario(formulario);
    await BotonEnviarHandle(gasto);
  });
  
  let base = document.getElementById("controlesprincipales");
  base.append(plantillaFormulario)
}
function filtrarGastosWeb(event){
    event.preventDefault();
        
    const data = new FormData(event.currentTarget);

    const descripcion = data.get("formulario-filtrado-descripcion");
    const valorMin = data.get("formulario-filtrado-valor-minimo");
    const valorMax = data.get("formulario-filtrado-valor-maximo");
    const fechaDesde = data.get("formulario-filtrado-fecha-desde");
    const fechaHasta = data.get("formulario-filtrado-fecha-hasta");
    const etiquetasTexto = data.get("formulario-filtrado-etiquetas-tiene");

    let filtro = {};

    if (descripcion !== "")
      filtro.descripcionContiene = descripcion;

    if (valorMin !== "")
      filtro.valorMinimo = Number(valorMin);

    if (valorMax !== "")
      filtro.valorMaximo = Number(valorMax);

    if (fechaDesde !== "")
      filtro.fechaDesde = fechaDesde;

    if (fechaHasta !== "")
      filtro.fechaHasta = fechaHasta;

    if (etiquetasTexto !== "") {
      filtro.etiquetasTiene =
        Js1.transformarListadoEtiquetas(etiquetasTexto);
    }

    const filtrado = Js1.filtrarGastos(filtro)
    mostrarGastoWeb("listado-gastos-completo",filtrado);
}

function guardarGastosWeb(event){
  let gastos = Js1.listarGastos();
  localStorage.setItem("GestorGastosDWEC",JSON.stringify(gastos)); 
}
function cargarGastosWeb(event) {
  let datos = localStorage.getItem("GestorGastosDWEC");

  if (datos === null) {
    Js1.cargarGastos([]);
  } else {
    Js1.cargarGastos(JSON.parse(datos));
  }

  repintar();
}



async function cargarGastosApi() {
  const imputNombre = document.getElementById("nombre_usuario");
  const nombreUsuario = imputNombre.value;

  //console.log('evento se llama' + event)
  const url = `https://gestion-presupuesto-api.onrender.com/api/${nombreUsuario}`;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };
  try{
    const response = await fetch(url,options);
    if(!response.ok)
      throw new Error('Error al obtener los datos')
    const data = await response.json();
    Js1.cargarGastos(data);
    repintar();
    console.log(data);
  }
  catch(error){
    console.log(error);
}
}

async function cargarGastosApiClick(event){
  event.preventDefault();
  cargarGastosApi();
}

let botonAyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAyadirGastoFormulario.addEventListener('click',nuevoGastoWebFormulario);

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

let botonAyadirGasto = document.getElementById("anyadirgasto");
botonAyadirGasto.addEventListener('click',nuevoGastoWeb);

export {
   mostrarDatoEnId,
   mostrarGastoWeb,
   mostrarGastosAgrupadosWeb,
   repintar,
   actualizarPresupuestoWeb,
   nuevoGastoWeb,
   EditarHandle,
   BorrarHandle,
   filtrarGastosWeb,
   guardarGastosWeb,
   cargarGastosWeb,
   cargarGastosApi,
   BorrarGastoHandleApi,
   cargarGastosApiClick
}