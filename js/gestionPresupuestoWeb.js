function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML += valor
}
function mostrarGastoWeb(idElemento, listaGastos) {
    listaGastos.forEach(element => {
        let contenido = "<div class=gasto>"
        let gastoFiltrado = Object.fromEntries(Object.entries(element).filter(([k, v]) => typeof v !== "function"))

        for (let gasto in gastoFiltrado) {
            if (gasto === "etiquetas") {
                contenido += `<div class = gasto-${gasto}>${gasto}:<br>`
                gastoFiltrado[gasto].forEach(element => {
                    contenido += `<span class = gasto-etiquetas-etiqueta>${element}</span><br>`
                });
                contenido += `</div>`
            }
            else if (gasto !== "fecha") {
                contenido += `<div class = gasto-${gasto}>${gasto}: ${gastoFiltrado[gasto]}</div>`
            }

            else {
                contenido += `<div class = gasto-${gasto}>${gasto}: ${(new Date(gastoFiltrado[gasto])).toISOString().slice(0, 10)}</div>`
            }

        }
        contenido += "</div>"
        mostrarDatoEnId(idElemento, contenido)
    });
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento)
    if (!contenedor) {
        console.log(`El elemento ${idElemento} no existe o no se encuentra en este documento`)
    }
    else {
        const divAgrupacion = document.createElement("div")
        divAgrupacion.className = "agrupacion"

        const h1 = document.createElement("h1")
        h1.textContent = "Gastos agrupados por "+ periodo

       contenedor.appendChild(divAgrupacion)
        divAgrupacion.appendChild(h1)
        

        for (let clave in agrup) {
                const divDato = document.createElement("div")
                divDato.className = "agrupacion-dato"

                const spanClave = document.createElement("span")
                spanClave.className = "agrupacion-dato-clave"
                spanClave.innerHTML = clave + ": "

                const spanValor = document.createElement("span")
                spanValor.className = "agrupacion-dato-valor"
                spanValor.innerHTML = agrup[clave] + "<br>"

                divDato.appendChild(spanClave)
                divDato.appendChild(spanValor)
                divAgrupacion.appendChild(divDato)   
        }
    }
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}