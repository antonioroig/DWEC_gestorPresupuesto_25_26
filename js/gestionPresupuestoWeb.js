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

        let etiquetasDiv = document.createElement("div");
        etiquetasDiv.className = "gasto-etiquetas";

        if (Array.isArray(gasto.etiquetas)) {
            gasto.etiquetas.forEach(etiqueta => {
                let span = document.createElement("span");
                span.className = "gasto-etiquetas-etiqueta";
                span.textContent = etiqueta;
                etiquetasDiv.appendChild(span);
                etiquetasDiv.appendChild(document.createElement("br"));
            });
        }

        gastoDiv.appendChild(etiquetasDiv);

        elem.appendChild(gastoDiv);
        elem.appendChild(document.createElement("br"));

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
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}