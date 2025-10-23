function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.innerHTML = valor;
    elemento.append(parrafo);
}

function mostrarGastoWeb(idElemento, ...gasto){
    let elemento = document.getElementById(idElemento);
    let box0 = document.createElement("div");
    box0.classList.add("gasto");
    let box1 = document.createElement("div");
    box1.classList.add("gasto-descripcion");
    box1.innerHTML = gasto.descripcion;
    box0.append(box1);
    let box2 = document.createElement("div");
    box2.classList.add("gasto-fecha");
    box2.innerHTML = gasto.fecha;
    box0.append(box2);
    let box3 = document.createElement("div");
    box3.classList.add("gasto-valor");
    box3.innerHTML = gasto.valor;
    box0.append(box3);
    let box4 = document.createElement("div");
    box4.classList.add("gasto-etiquetas");
    let etiquetas = gasto.etiquetas;
    for(let i = 0; i < etiquetas.length; i++)
    {
        let etiqueta = etiquetas[i];
        let span = document.createElement("span");
        span.classList.add("gasto-etiquetas-etiqueta");
        span.innerHTML = etiqueta;
        box4.append(span);
    }
    box0.append(box4);
    elemento.append(box0);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}