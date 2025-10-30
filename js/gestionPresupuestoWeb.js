function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    const elem = document.getElementById(idElemento)
    if(elem){
        let etiquetasHTML = "";
        if(Array.isArray(gasto.etiquetas)){
            for(let i = 0; i < gasto.etiquetas.length; i++){
                etiquetasHTML += `<span class="gasto-etiquetas-etiqueta">${gasto.etiquetas[i]}</span>`;
            }
        } 
     const gastoHTML = `
    <div class="gasto">
      <div class="gasto-descripcion">${gasto.descripcion}</div>
      <div class="gasto-fecha">${gasto.fecha}</div>
      <div class="gasto-valor">${gasto.valor}</div>
      <div class="gasto-etiquetas">
        ${etiquetasHTML}
      </div>
    </div>
  `;
        elem.innerHTML += gastoHTML;
    }
    else{
        alert(`El elemento ${idElemento} no existe`);
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb
}