import * as gp from './gestionPresupuesto.js'

function nuevoGastoWebFormulario() {
    let boton = document.getElementById("anyadirgasto-formulario")
    boton.addEventListener("click", function(e) {
        boton.setAttribute("disabled", true)
        let form = cloneTemplate();
        let cancel = form.querySelector(".cancelar");
        
        let manejarCancelar = new ManejarCancelar();
        manejarCancelar.element = form;
        manejarCancelar.anyadir = true
        cancel.addEventListener("click", manejarCancelar);
        
        let nuevoGasto = new NuevoGastoFormulario()
        form.addEventListener("submit", nuevoGasto)

        let div = document.getElementById("controlesprincipales");
        div.append(form);
    })
}

function NuevoGastoFormulario() {
    this.handleEvent = function(e) {
        e.preventDefault();
        let desc = document.getElementById("descripcion").value
        let valor = document.getElementById("valor").value
        valor = Number(valor);
        let fecha = document.getElementById("fecha").value
        let etiquetas = document.getElementById("etiquetas").value

        let gasto = new gp.CrearGasto(desc, valor, fecha, etiquetas)
        gp.anyadirGasto(gasto)
        let boton = document.getElementById("anyadirgasto-formulario")
        boton.disabled = false
        boton.removeAttribute("disable")
        repintar()
    }
}

function EditarHandleFormulario() {
    this.handleEvent = (e) => {      
        this.element.setAttribute("disabled", true)  
        let form = cloneTemplate()
        let cancel = form.querySelector(".cancelar");
        let manejarCancelar = new ManejarCancelar();
        manejarCancelar.element = form;
        manejarCancelar.edit = this.element;
        cancel.addEventListener("click", manejarCancelar);

        form.querySelector("#descripcion").value = this.gasto.descripcion

        form.querySelector("#valor").value = this.gasto.valor

        let newDate = new Date(this.gasto.fecha);
        let day   = String(newDate.getDate()).padStart(2, '0');
        let month = String(newDate.getMonth() + 1).padStart(2, '0');
        let year  = newDate.getFullYear();
        
        form.querySelector("#fecha").value = `${year}-${month}-${day}`;
        form.querySelector("#etiquetas").value = this.gasto.etiquetas;
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let desc = form.querySelector("#descripcion").value;
            let valor = form.querySelector("#valor").value;
            valor = Number(valor);
            let fecha = form.querySelector("#fecha").value;
            let etiquetas = form.querySelector("#etiquetas").value;

            this.gasto.actualizarDescripcion(desc);
            this.gasto.actualizarValor(valor)
            this.gasto.actualizarFecha(fecha);
            let tags = etiquetas.split(",")
            this.gasto.anyadirEtiquetas(...tags);
            repintar()
        })

        this.div.append(form)
    }
}


function ManejarCancelar() {
    this.handleEvent = function(e) {
        if (this.anyadir) {
            let boton = document.getElementById("anyadirgasto-formulario");
            boton.disabled = false;
            boton.removeAttribute("disable")
            this.element.remove();
        }
        if (this.edit) {
            this.edit.disabled = false
            this.edit.removeAttribute("disable")
        }
        this.element.remove();
    }
}



function EditarHandle() {
    this.handleEvent = function(e) {
        let desc = prompt(`Inserta el concepto general del gasto:`, this.gasto.descripcion);
        this.gasto.actualizarDescripcion(desc)
        let precio = Number(prompt(`Inserta el precio`, this.gasto.valor));
        this.gasto.actualizarValor(precio)
        let oldFecha = new Date(this.gasto.fecha).toISOString().replace("/", "-").split("T")[0]
        let fecha = prompt(`Inserta la fecha`, oldFecha);
        fecha = new Date(fecha)
        this.gasto.actualizarFecha(fecha)
        let etiquetas = prompt(`Inserta las etiquetas (separadas por coma)`, this.gasto.etiquetas);
        if (etiquetas === "") {
            this.gasto.borrarEtiquetas(...this.gasto.etiquetas)
            repintar();
            return;
        }
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas)
        etiquetas = etiquetas.split(',')
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    }
}

// Función propia para clonar rápido el template
function cloneTemplate() {
    let template = document.getElementById("formulario-template");
    let clone = template.content.cloneNode(true);
    let form = clone.firstElementChild;
    return form;
}


function repintar() {
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto())
    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos())
    mostrarDatoEnId("balance-total", gp.calcularBalance())

    let divListadoGastosCompleto = document.getElementById("listado-gastos-completo")
    divListadoGastosCompleto.innerHTML = ""
    mostrarGastoWeb("listado-gastos-completo", gp.listarGastos())
}

function ActualizarPresupuestoWeb() {
    this.handleEvent = function(e) {
        let newPresupuesto = prompt("¿Qué nuevo presupuesto quieres?")
        if (isNaN(newPresupuesto)) {
            alert("Intruduce sólo números!")
        }
        else {
            newPresupuesto = parseInt(newPresupuesto)
            gp.actualizarPresupuesto(newPresupuesto)
            repintar()
        }
    }
}

function NuevoGastoWeb() {
    this.handleEvent = function(e) {
        let desc = prompt("Descripción del nuevo gasto")
        let precio = parseInt(prompt("Precio"))
        let fecha = prompt("Introduce la fecha de gasto (YYYY-MM-DD)")
        let etiqueta = prompt("Introduce las etiquetas, separadas por coma")
        etiqueta = etiqueta.split(',')
        let newGasto = new gp.CrearGasto(desc, precio, fecha, ...etiqueta)
        gp.anyadirGasto(newGasto)
        repintar();
    }
}


function BorrarHandle() {
    this.handleEvent = function(e) {
        gp.borrarGasto(this.gasto.id)
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(e) {
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();
    }
}

function mostrarDatoEnId(id, valor) {
    let tag = document.getElementById(id);
    tag.textContent = valor;
}

function mostrarGastoWeb(id, gasto) {
    let idElement = document.getElementById(id);

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
        let fechaFinal = new Date(obj.fecha).toLocaleDateString();
        fecha.textContent = fechaFinal;
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

            let objManejadorTags = new BorrarEtiquetasHandle();
            objManejadorTags.gasto = obj
            objManejadorTags.etiqueta = tag;
            element.addEventListener("click", objManejadorTags)

            etiqueta.append(element);

            let br = document.createElement("br");
            etiqueta.append(br)
        }

        let btn = document.createElement("button")
        btn.setAttribute("class", "gasto-editar")
        btn.setAttribute("type", "button")
        btn.setAttribute("id", obj.id)
        btn.textContent = "Editar"
    
        let objManejador = new EditarHandle();
        objManejador.gasto = obj;
        objManejador.div = mainDiv

        btn.addEventListener("click", objManejador)
        mainDiv.append(btn);

        let btnDel = document.createElement("button")
        btnDel.setAttribute("class", "gasto-borrar")
        btnDel.setAttribute("type", "button")
        btnDel.setAttribute("id", obj.id)
        btnDel.textContent = "Borrar"

        let objManejadorDelete = new BorrarHandle();
        objManejadorDelete.gasto = obj;
        btnDel.addEventListener("click", objManejadorDelete)
        mainDiv.append(btnDel);

        // Nuevo botón para editar
        let btnEditNew = document.createElement("button")
        btnEditNew.setAttribute("class", "gasto-editar-formulario")
        btnEditNew.setAttribute("type", "button")
        btnEditNew.textContent = "Editar (formulario)"


        let newHandleEdit = new EditarHandleFormulario();
        newHandleEdit.gasto = obj;
        newHandleEdit.div = mainDiv;
        newHandleEdit.element = btnEditNew
        btnEditNew.addEventListener("click", newHandleEdit)

        mainDiv.append(btnEditNew)
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


// document.addEventListener("DOMContentLoaded", filtrarGastosWeb);
function filtrarGastosWeb() {
    let form = document.getElementById("formulario-filtrado")
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let obj = {}
        let desc = document.getElementById("formulario-filtrado-descripcion").value || null
        if (desc) {
            obj.descripcionContiene = desc;
        }

        let fechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value || null
        if (fechaDesde) {
            obj.fechaDesde = fechaDesde
        }

        let fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value || null
        if (fechaHasta) {
            obj.fechaHasta = fechaHasta
        }

        let valorMaximo = document.getElementById("formulario-filtrado-valor-maximo").value || null
        if(valorMaximo) {
            obj.valorMaximo = valorMaximo
        }

        let valorMinimo = document.getElementById("formulario-filtrado-valor-minimo").value || null
        if (valorMinimo) {
            obj.valorMinimo = valorMinimo
        }

        let etiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value || null
        if (etiquetas) {
            etiquetas = gp.transformarListadoEtiquetas(etiquetas)
            obj.etiquetasTiene = etiquetas;
        }

        console.log(gp.filtrarGastos(obj));
        let gastosFiltrados = gp.filtrarGastos(obj)
        let div = document.getElementById("listado-gastos-completo")
        div.textContent = ''
        mostrarGastoWeb("listado-gastos-completo", gastosFiltrados)
    })
}


function guardarGastosWeb() {
    const button = document.getElementById("guardar-gastos");
    button.addEventListener("click", () => {
        const gastos = gp.listarGastos()
        localStorage.setItem("GestorGastosDWEC", JSON.stringify(gastos))
    })

}

function cargarGastosWeb() {
    const button = document.getElementById("cargar-gastos")
    button.addEventListener("click", ()=> {
        const gastos = localStorage.getItem("GestorGastosDWEC")
        console.log(gastos);
        if (gastos == null || gastos == undefined || gastos == []) {
            let getGastos = gp.listarGastos()
            for (let g of getGastos) {
                gp.borrarGasto(g.id)
            }
            repintar()
            return;
        }
        gp.cargarGastos(JSON.parse(gastos))
        repintar()
    })

}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    ActualizarPresupuestoWeb,
    NuevoGastoWeb,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb
}
