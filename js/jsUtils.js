function divWithClass(clase){
    if (clase == "")
        return
    if(typeof clase === `string`)
    {
        let newDiv = document.createElement("div")
        newDiv.setAttribute("class",`${clase}`)
        return newDiv
    }
}
function elementWithClass(element, clase){
    if (clase == "" || element == "")
        return
    if(typeof clase === `string` || typeof element === `string`)
    {
        let newDiv = document.createElement(`${element}`)
        newDiv.setAttribute("class",`${clase}`)
        return newDiv
    }
}
function buttonWithClass(clase){
    if (clase == "")
        return
    if(typeof clase === `string`)
    {
        let boton = document.createElement("button")
        boton.setAttribute("type", "button")
        boton.setAttribute("class", `${clase}`)
        return boton
    }
}
function formatDate(date){
    let fecha = new Date(date).toISOString()
    let fechaConGuiones = fecha.replaceAll("/", "-")
    let fechaSinT = fechaConGuiones.split("T")[0]
    return fechaSinT
}
export{
    divWithClass,
    elementWithClass,
    formatDate,
    buttonWithClass
}