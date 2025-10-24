function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento)
    if( elem != null)
        elem.textContent = valor
}
function mostrarGastoWeb(idElemento, gastos){
    let elem = document.getElementById(idElemento)

    for(let gasto of gastos)
    {
        let divGasto = document.createElement("div")
        divGasto.setAttribute("class", "gasto")
        elem.append(divGasto)
        let divDes = document.createElement("div")
        divDes.setAttribute("class", "gasto-descripcion")
        divDes.textContent = gasto.descripcion;
        divGasto.append(divDes)
        let divFec = document.createElement("div")
        divFec.setAttribute("class", "gasto-fecha")
        let fechaFormateada = new Date(gasto.fecha).toLocaleDateString()
        divFec.textContent = fechaFormateada
        divGasto.append(divFec)
        let divVal = document.createElement("div")
        divVal.setAttribute("class", "gasto-valor")
        divVal.textContent = gasto.valor
        divGasto.append(divVal)
        let divEti = document.createElement("div")
        divEti.setAttribute("class", "gasto-etiquetas")
        divGasto.append(divEti)
        for(let eti of gasto.etiquetas)
        {
            let span = document.createElement("span")
            span.setAttribute("class", "gasto-etiquetas-etiqueta")
            span.textContent = eti
            divEti.append(span)
            let br = document.createElement("br")
            divEti.append(br)
        }
    }
}
function  mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
    let elem = document.getElementById(idElemento)
    let divAgrup = document.createElement("div")
    divAgrup.setAttribute("class", "agrupacion")
    elem.append(divAgrup)
    let titulo = document.createElement("h1")
    titulo.textContent = `Gastos agrupados por ${periodo}`
    divAgrup.append(titulo)

    for(const [clave, valor] of Object.entries(agrup))
    {
        let divAgrupGasto = document.createElement("div")
        divAgrupGasto.setAttribute("class", "agrupacion-dato")

        let spanClave = document.createElement("span")
        spanClave.setAttribute("class", "agrupacion-dato-clave")
        divAgrupGasto.append(spanClave)
        spanClave.textContent = clave

        let spanValor = document.createElement("span")
        spanValor.setAttribute("class", "agrupacion-dato-valor")
        divAgrupGasto.append(spanValor)
        spanValor.textContent = valor

        divAgrup.append(divAgrupGasto)
    }

}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}