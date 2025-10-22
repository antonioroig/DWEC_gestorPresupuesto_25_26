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
        divFec.textContent = gasto.fecha
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
            let bre = document.createElement("br")
            divEti.append(bre)
        }
    }
}
function  mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}