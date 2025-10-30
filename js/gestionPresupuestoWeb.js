function mostrarDatoEnId(valor, idElemento) {
    let elem = document.getElementById(idElemento);
    elem.textContent = valor;
};

function mostrarGastoWeb(idElemento, gastos) {
    let elem = document.getElementById(idElemento);
    for (let j = 0; j < gastos.length; j++) {
        let g = document.createElement("div");
        g.classList.add("gasto");
        elem.appendChild(g);
        let gd = document.createElement("div");
        gd.classList.add("gasto-descripcion");
        gd.textContent = gastos[j].descipcion;
        g.appendChild(gd);
        let gf = document.createElement("div");
        gf.classList.add("gasto-fecha");
        gf.textContent = gastos[j].fecha;
        g.appendChild(gf);
        let gv = document.createElement("div");
        gv.classList.add("gasto-valor");
        gv.textContent = gastos[j].valor;
        g.appendChild(gv);
        let ge = document.createElement("div");
        ge.classList.add("gasto-etiquetas");
        for (let i = 0; i < gastos[j].etiquetas.length; i++) {
            let gee = document.createElement("span");
            gee.classList.add("gasto-etiquetas-etiqueta");
            gee.textContent = gastos[j].etiquetas[i];
            ge.appendChild(gee);
        }
        g.appendChild(ge);
    }
};

function mostrarGastosAgrupadosWeb(idElemento, gasto, periodo) {

};

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}