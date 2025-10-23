function mostrarDatoEnId(id, valor) {
    let tag = document.getElementById(id);
    tag.textContent = valor;
}

function mostrarGastoWeb(id, gasto) {
    let idElement = document.getElementById(id);
    let body = document.body;

    for (let obj of gasto) {
        let mainDiv = document.createElement("div")
        mainDiv.setAttribute("class", "gasto")
        idElement.append(mainDiv);

        let desc = document.createElement("div")
        desc.setAttribute("class", "gasto-descripcion")
        desc.textContent = obj.descripcion;
        mainDiv.append(desc)

        let fecha = document.createElement("div")
        fecha.setAttribute("class", "gasto-fecha")
        fecha.textContent = obj.fecha;
        mainDiv.append(fecha)

        let valor = document.createElement("div")
        valor.setAttribute("class", "gasto-valor")
        valor.textContent = obj.valor;
        mainDiv.append(valor)

        let etiqueta = document.createElement("div")
        etiqueta.setAttribute("class", "gasto-etiquetas")
        mainDiv.append(etiqueta);
        for (let tag of obj.etiquetas) {
            let element = document.createElement("span")
            element.setAttribute("class", "gasto-etiquetas-etiqueta")
            element.textContent = tag;
            etiqueta.append(element);
            let br = document.createElement("br");
            etiqueta.append(br)
        }

        idElement.append(mainDiv)
    }
}


function mostrarGastosAgrupadosWeb(id, agrup, periodo) {
    let element = document.getElementById(id)

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`
    let div = document.createElement("div");
    div.setAttribute("class", "agrupacion")
    element.append(div)
    div.append(h1);


    for (let [key, value] of Object.entries(agrup)) {
        let agrupDiv = document.createElement("div")
        agrupDiv.setAttribute("class", "agrupacion-dato")
        let clave = document.createElement("span")
        clave.setAttribute("class", "agrupacion-dato-clave")
        clave.textContent = key;
        
        let valor = document.createElement("span")
        valor.setAttribute("class", "agrupacion-dato-valor")
        valor.textContent = value;
        agrupDiv.append(clave);
        agrupDiv.append(valor);
        div.append(agrupDiv);
    }
}



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
