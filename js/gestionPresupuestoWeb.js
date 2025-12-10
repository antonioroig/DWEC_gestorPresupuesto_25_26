import * as gP from './gestionPresupuesto.js'


function mostrarDatoEnId(valor,idElemento){
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elem = document.getElementById(idElemento);
    
    if (elem) {
        let gastoDiv = document.createElement("div");
        gastoDiv.className = "gasto";

        let descripcionDiv = document.createElement("div");
        descripcionDiv.className = "gasto-descripcion";
        descripcionDiv.textContent = gasto.descripcion;
        gastoDiv.appendChild(descripcionDiv);

        let fechaDiv = document.createElement("div");
        fechaDiv.className = "gasto-fecha";
        fechaDiv.textContent = gasto.fecha;
        gastoDiv.appendChild(fechaDiv);

        let valorDiv = document.createElement("div");
        valorDiv.className = "gasto-valor";
        valorDiv.textContent = gasto.valor;
        gastoDiv.appendChild(valorDiv);

        let divEtiquetas = document.createElement("div");
        divEtiquetas.className = "gasto-etiquetas";

             if (Array.isArray(gasto.etiquetas)) {
      for (let i = 0; i < gasto.etiquetas.length; i++) {
          let span = document.createElement("span");
          span.className = "gasto-etiquetas-etiqueta";
          span.textContent = gasto.etiquetas[i];
          let borrarEtiquetas = new BorrarEtiquetasHandle();
          borrarEtiquetas.gasto = gasto;
          borrarEtiquetas.etiqueta = gasto.etiquetas[i];
          span.addEventListener("click", borrarEtiquetas);

          divEtiquetas.appendChild(span);
          let br = document.createElement("br");
          divEtiquetas.appendChild(br);
        }
      }
    
  
        gastoDiv.appendChild(divEtiquetas);

        elem.appendChild(gastoDiv);
        elem.appendChild(document.createElement("br"));
          let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";

    let editarHandle = new EditarHandle();
    editarHandle.gasto = gasto;
    btnEditar.addEventListener("click", editarHandle);
    gastoDiv.appendChild(btnEditar);

     let btnEditarForm = document.createElement("button");
    btnEditarForm.className = "gasto-editar-formulario";
    btnEditarForm.type = "button";
    btnEditarForm.textContent = "Editar (formulario)";

      let editarHandleForm = new EditarHandleFormulario();
    editarHandleForm.gasto = gasto;
    btnEditarForm.addEventListener("click", EditarHandleFormulario);
    gastoDiv.appendChild(btnEditarForm);

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";

    let borrarHandle = new BorrarHandle();
    borrarHandle.gasto = gasto;
    btnBorrar.addEventListener("click", borrarHandle);
    gastoDiv.appendChild(btnBorrar);

    } else {
        alert(`El elemento ${idElemento} no existe`);
    }
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
      let elem = document.getElementById(idElemento);
    if (elem) {
        elem.innerHTML = "";

        let agrupacionDiv = document.createElement("div");
        agrupacionDiv.className = "agrupacion";

        let titulo = document.createElement("h1");
        titulo.textContent = `Gastos agrupados por ${periodo}`;
        agrupacionDiv.appendChild(titulo);

        for (let clave in agrup) {
            let datoDiv = document.createElement("div");
            datoDiv.className = "agrupacion-dato";

            let spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.textContent = clave;

            let spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.textContent = agrup[clave];

            datoDiv.appendChild(spanClave);
            datoDiv.appendChild(spanValor);

            agrupacionDiv.appendChild(datoDiv);
        }

        elem.appendChild(agrupacionDiv);
    }
    else {
        alert(`El elemento ${idElemento} no existe`);
    }


  
}
 function repintar(){

    let presupuesto = gP.mostrarPresupuesto();
    mostrarDatoEnId(presupuesto,"presupuesto");

    let totalGastos = gP.calcularTotalGastos();
    mostrarDatoEnId(totalGastos,"gastos-totales")

    let balanceActual = gP.calcularBalance();
    mostrarDatoEnId(balanceActual,"balance-total")

    let lGastosDatos = document.getElementById("listado-gastos-completo");
    lGastosDatos.innerHTML = "";

    let lCompGastos = gP.listarGastos();
    for(let gasto of lCompGastos){
        mostrarGastoWeb("listado-gastos-completo",gasto)
    }


 }
 function nuevoGastoWeb(){
    let descripcion
    let valor
    let fecha
    let etiquetas

    descripcion = prompt("Introduce una descripcion")
    valor = Number(prompt("introduce un valor"));
    fecha = prompt("Introduce una fecha válida yyyy-mm-dd")
    etiquetas = prompt("Introduce las etiquetas deseadas separadas por comas")
    etiquetas = etiquetas.split(",")

    let GastoNuevo = new gP.CrearGasto(descripcion,valor,fecha,...etiquetas)
    gP.anyadirGasto(GastoNuevo);
    repintar();

    
 }

 let btnAnyadirGasto = document.getElementById("anyadirgasto");
 btnAnyadirGasto.addEventListener("click",nuevoGastoWeb);

function actualizarPresupuestoWeb(){
    
    let presupuesto = Number(prompt("introduce el presupuesto"));
    gP.actualizarPresupuesto(presupuesto);

    repintar();

}
let botonActu = document.getElementById("actualizarpresupuesto")
botonActu.addEventListener("click",actualizarPresupuestoWeb);

function EditarHandle(){
     this.handleEvent = function() {
     let descripcion, valor, fecha, etiquetas;
     
     descripcion = prompt("Introduce una descripción nueva para el gasto.", this.gasto.descripcion);
     valor = Number(prompt("Introduce un valor nuevo para el gasto.", this.gasto.valor));
     fecha = prompt("Introduce una fecha nueva con formato yyyy-mm-dd para el gasto.", this.gasto.fecha);
     etiquetas = prompt("Introduce las etiquetas nuevas con formato etiqueta1,etiqueta2,etiqueta3 para para el gasto.", this.gasto.etiquetas.toString());
     etiquetas = etiquetas.split(",");

     this.gasto.actualizarValor(valor);
     this.gasto.actualizarDescripcion(descripcion);
     this.gasto.actualizarFecha (fecha);

    this.gasto.anyadirEtiquetas(...etiquetas)
    repintar();
 }
}
function BorrarHandle(){
  this.handleEvent = function(){
      gP.borrarGasto(this.gasto.id)
      repintar();
  }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();        
    }
}
function CancelarHandle(){
    this.handleEvent = function(){
        this.formulario.remove();
        this.boton.disabled = false;
    }
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
     formulario.addEventListener("submit", function(event){
     event.preventDefault();
     
        let descripcion = event.currentTarget.descripcion.value;
        let valor = Number(event.currentTarget.valor.value);
        let fecha = event.currentTarget.fecha.value;
        let etiquetas = event.currentTarget.etiquetas.value;
        etiquetas = etiquetas.split(",")

        let gastoNuevo = new gP.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gP.anyadirGasto(gastoNuevo)
        repintar()

        document.getElementById("anyadirgasto-formulario").disabled = false
        
       })

       let botonCancelar = formulario.querySelector("button.cancelar")
       let cancelarHandle = new CancelarHandle()
       cancelarHandle.formulario = formulario
       cancelarHandle.boton = event.currentTarget
       botonCancelar.addEventListener("click", cancelarHandle)
    
       event.currentTarget.disabled = true
    
     document.getElementById("controlesprincipales").appendChild(plantillaFormulario)
    

}

let anyadirForm = document.getElementById("anyadirgasto-formulario");
anyadirForm.addEventListener("click", nuevoGastoWebFormulario);



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
    CancelarHandle
    
}