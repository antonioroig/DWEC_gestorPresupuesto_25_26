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
        mostrarGastoWeb(gasto,"listado-gastos-completo")
    }


 }
 function nuevoGastoWeb(){

 }
function actualizarPresupuestoWeb(){

}
function EditarHandle(){

}
function BorrarEtiquetasHandle(){

}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarEtiquetasHandle
}