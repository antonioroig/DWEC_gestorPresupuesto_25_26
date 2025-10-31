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

}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}