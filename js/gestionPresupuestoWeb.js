import * as gp from './gestionPresupuesto.js'

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento)
    
    if(elem){
        let etiquetasHTML = "";
        if(Array.isArray(gasto.etiquetas)){
            for(let i = 0; i < gasto.etiquetas.length; i++){
                etiquetasHTML += `<span class="gasto-etiquetas-etiqueta">${gasto.etiquetas[i]}</span><br>`;
            }
        } 
     let gastoHTML = 
     `<div class="gasto">
      <div class="gasto-descripcion">${gasto.descripcion}</div>
      <div class="gasto-fecha">${gasto.fecha}</div>
      <div class="gasto-valor">${gasto.valor}</div>
      <div class="gasto-etiquetas">
        ${etiquetasHTML}
      </div>
    </div><br>`;
        elem.innerHTML += gastoHTML;
    }
    else{
        alert(`El elemento ${idElemento} no existe`);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elem = document.getElementById(idElemento)

    if (elem){
        let agrupacionHTML = 
        `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>`
        
        for (let claves in agrup) {
            
            agrupacionHTML += 
            `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${claves}</span>
            <span class="agrupacion-dato-valor">${agrup[claves]}</span>
            </div>`
        }
        agrupacionHTML += "</div>"
        elem.innerHTML = agrupacionHTML;
    }
    else{
        alert(`El elemento ${idElemento} no existe`);
    }
}

function repintar(){
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let totalGastos = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", totalGastos);

    let balance = gp.calcularBalance();
    mostrarDatoEnId("balance-total", balance);

    let lGastosComp = document.getElementById("listado-gastos-completo");
    lGastosComp.innerHTML = "";

    let lGastos = gp.listarGastos();
    for(let gasto of lGastos){
        mostrarGastoWeb("listado-gastos-completo", gasto)
    }
}
function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduce un presupuesto:")
    Number(presupuesto);
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}
let btnActPresu = document.getElementById("actualizarpresupuesto");
btnActPresu.addEventListener("click", actualizarPresupuestoWeb);
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}