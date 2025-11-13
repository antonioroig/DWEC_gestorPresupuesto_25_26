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
export{
    divWithClass,
    elementWithClass
}