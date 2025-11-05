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

function mostrarGastosAgrupadosWeb(idElemento, agroup, periodo) {
    let elem = document.getElementById(idElemento);
    let d = document.createElement("div");
    d.classList.add("agrupacion");
    elem.appendChild(d);
    let h = document.createElement("h1");
    h.textContent = 'Gastos agrupados por ' + periodo;
    d.appendChild(h);
    for (let value of Object.values(agroup)){
        let div = document.createElement("div");
        div.classList.add("agrupacion-dato");
        d.appendChild(div);
        let span1 = document.createElement("span");
        span1.classList.add("agrupacion-dato-clave");
        span1.textContent = value[0];
        div.appendChild(span1);
        let span2 = document.createElement("span");
        span2.classList.add("agrupacion-dato-valor");
        span2.textContent = value[1];
        div.appendChild(span2);
    }
};

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}