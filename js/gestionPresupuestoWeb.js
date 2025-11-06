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

function mostrarGastosAgrupadosWeb(){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}