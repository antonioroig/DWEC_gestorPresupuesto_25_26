"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";

const API_BASE = "https://gestion-presupuesto-api.onrender.com/api";

/* ================= UTILIDADES ================= */

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = String(valor);
    }
}

function obtenerUsuarioApi() {
    const input = document.getElementById("nombre_usuario");
    if (!input) return "";
    // enunciado: nombre+primer apellido sin espacios ni caracteres especiales
    // aquí solo quitamos espacios por si acaso
    return input.value.trim().replace(/\s+/g, "");
}

function esGastoApi(gasto) {
    // En local, el id es numérico incremental.
    // En API, el id es un UUID (string).
    return gasto && typeof gasto.id === "string" && gasto.id.length > 0;
}

function limpiarContenedor(idElemento) {
    const el = document.getElementById(idElemento);
    if (el) el.innerHTML = "";
}

/* ================= PINTADO ================= */

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    limpiarContenedor("listado-gastos-completo");

    const lista = gestionPresupuesto.listarGastos();
    for (let i = 0; i < lista.length; i++) {
        mostrarGastoWeb("listado-gastos-completo", lista[i]);
    }
}

/* ================= MOSTRAR GASTO ================= */

function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    const divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    // descripción
    const divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    // fecha
    const divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    // valor
    const divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    const numValor = Number(gasto.valor);
    divValor.textContent = isNaN(numValor) ? String(gasto.valor) : numValor.toFixed(2);
    divGasto.appendChild(divValor);

    // etiquetas
    const divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    if (Array.isArray(gasto.etiquetas)) {
        gasto.etiquetas.forEach(et => {
            const span = document.createElement("span");
            span.classList.add("gasto-etiquetas-etiqueta");
            span.textContent = et;

            const manejadorEtiqueta = new BorrarEtiquetasHandle();
            manejadorEtiqueta.gasto = gasto;
            manejadorEtiqueta.etiqueta = et;
            span.addEventListener("click", manejadorEtiqueta);

            divEtiquetas.appendChild(span);
        });
    }

    divGasto.appendChild(divEtiquetas);

    // Botón editar (prompt)
    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.classList.add("gasto-editar");
    btnEditar.textContent = "Editar";
    const manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;
    btnEditar.addEventListener("click", manejadorEditar);

    // Botón borrar (local)
    const btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.classList.add("gasto-borrar");
    btnBorrar.textContent = "Borrar";
    const manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    btnBorrar.addEventListener("click", manejadorBorrar);

    // Botón borrar (API)
    const btnBorrarApi = document.createElement("button");
    btnBorrarApi.type = "button";
    btnBorrarApi.classList.add("gasto-borrar-api");
    btnBorrarApi.textContent = "Borrar (API)";
    const manejadorBorrarApi = new BorrarGastoApiHandle();
    manejadorBorrarApi.gasto = gasto;
    btnBorrarApi.addEventListener("click", manejadorBorrarApi);

    // Botón editar (formulario)
    const btnEditarForm = document.createElement("button");
    btnEditarForm.type = "button";
    btnEditarForm.classList.add("gasto-editar-formulario");
    btnEditarForm.textContent = "Editar (formulario)";
    const manejadorEditarFormulario = new EditarHandleFormulario();
    manejadorEditarFormulario.gasto = gasto;
    btnEditarForm.addEventListener("click", manejadorEditarFormulario);

    // añadir botones
    divGasto.appendChild(btnEditar);
    divGasto.appendChild(btnBorrar);
    divGasto.appendChild(btnBorrarApi);
    divGasto.appendChild(btnEditarForm);

    contenedor.appendChild(divGasto);
}

/* ================= AGRUPADOS ================= */

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    // NO limpiamos aquí para no borrar otras agrupaciones si se llama varias veces
    const divAgrup = document.createElement("div");
    divAgrup.classList.add("agrupacion");

    const h = document.createElement("h1");
    h.textContent = `Gastos agrupados por ${periodo}`;
    divAgrup.appendChild(h);

    for (const clave in agrup) {
        const valor = agrup[clave];

        const divDato = document.createElement("div");
        divDato.classList.add("agrupacion-dato");

        const spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        const spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = String(valor);

        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);
        divAgrup.appendChild(divDato);
    }

    contenedor.appendChild(divAgrup);
}

/* ================= MANEJADORES LOCALES ================= */

function actualizarPresupuestoWeb() {
    let entrada = prompt("Introduce el nuevo presupuesto:");
    entrada = Number(entrada);
    gestionPresupuesto.actualizarPresupuesto(entrada);
    repintar();
}

function ayadirGastoWeb() {
    const descripcion = prompt("Introduce la descripción del gasto:");
    const valor = Number(prompt("Introduce el valor del gasto:"));
    const fecha = prompt("Introduce la fecha del gasto (YYYY-MM-DD):");
    let etiquetas = prompt("Introduce las etiquetas del gasto (separadas por comas):");

    if (typeof etiquetas === "string") {
        etiquetas = etiquetas.split(",").map(e => e.trim());
    } else {
        etiquetas = [];
    }

    const nuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevo);
    repintar();
}

function EditarHandle() {
    this.handleEvent = function () {
        const gasto = this.gasto;

        const nuevaDescripcion = prompt("Nueva descripcion", gasto.descripcion);
        if (nuevaDescripcion !== null && nuevaDescripcion !== "") {
            gasto.actualizarDescripcion(nuevaDescripcion);
        }

        const nuevoValor = prompt("Nuevo valor", gasto.valor);
        if (nuevoValor !== null && nuevoValor !== "") {
            gasto.actualizarValor(Number(nuevoValor));
        }

        const fechaActual = new Date(gasto.fecha).toISOString().slice(0, 10);
        const nuevaFecha = prompt("Nueva fecha (YYYY-MM-DD)", fechaActual);
        if (nuevaFecha !== null && nuevaFecha !== "") {
            gasto.actualizarFecha(nuevaFecha);
        }

        const entradaEtiquetas = prompt(
            "Etiquetas (coma separadas). Déjalo vacío para no cambiar.",
            Array.isArray(gasto.etiquetas) ? gasto.etiquetas.join(",") : ""
        );

        if (entradaEtiquetas !== null && entradaEtiquetas !== "") {
            const nuevas = entradaEtiquetas.split(",").map(e => e.trim()).filter(e => e !== "");
            gasto.etiquetas = [];
            gasto.anyadirEtiquetas(...nuevas);
        }

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function () {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

/* ================= FORMULARIO NUEVO ================= */

function nuevoGastoWebFormulario() {
    const template = document.getElementById("formulario-template");
    if (!template) return;

    const frag = template.content.cloneNode(true);
    const form = frag.querySelector("form");
    if (!form) return;

    const cont = document.getElementById("controlesprincipales");
    if (!cont) return;

    cont.appendChild(form);

    const btnPrincipal = document.getElementById("anyadirgasto-formulario");
    if (btnPrincipal) btnPrincipal.setAttribute("disabled", "true");

    // Enviar (LOCAL)
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const descripcion = form.elements.descripcion.value.trim();
        const valor = Number(form.elements.valor.value);
        const fecha = form.elements.fecha.value;
        const etiquetas = form.elements.etiquetas.value
            .split(",")
            .map(e => e.trim())
            .filter(e => e !== "");

        const gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPresupuesto.anyadirGasto(gasto);

        cerrarFormularioNuevo(form);
        repintar();
    });

    // Cancelar
    const btnCancelar = form.querySelector(".cancelar");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", function () {
            cerrarFormularioNuevo(form);
        });
    }

    // Enviar (API) -> POST
    const btnEnviarApi = form.querySelector(".gasto-enviar-api");
    if (btnEnviarApi) {
        btnEnviarApi.addEventListener("click", async function () {
            const usuario = obtenerUsuarioApi();
            if (!usuario) {
                alert("Introduce un nombre de usuario");
                return;
            }

            const descripcion = form.elements.descripcion.value.trim();
            const valor = Number(form.elements.valor.value);
            const fecha = form.elements.fecha.value;
            const etiquetas = form.elements.etiquetas.value
                .split(",")
                .map(e => e.trim())
                .filter(e => e !== "");

            if (!descripcion || isNaN(valor) || !fecha) {
                alert("Rellena descripción, valor y fecha");
                return;
            }

            const url = `${API_BASE}/${usuario}`;

            try {
                const resp = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ descripcion, valor, fecha, etiquetas })
                });

                if (!resp.ok) {
                    // Intentamos leer mensaje del servidor
                    let msg = "Error al crear el gasto en la API";
                    try {
                        const txt = await resp.text();
                        if (txt) msg += `\n${txt}`;
                    } catch {}
                    alert(msg);
                    return;
                }

                // cerramos el formulario y recargamos desde API para traer el UUID
                cerrarFormularioNuevo(form);
                await cargarGastosApi();
            } catch (err) {
                console.error(err);
                alert("Error de red al conectar con la API");
            }
        });
    }
}

function cerrarFormularioNuevo(form) {
    form.remove();
    const btnPrincipal = document.getElementById("anyadirgasto-formulario");
    if (btnPrincipal) btnPrincipal.removeAttribute("disabled");
}

/* ================= EDITAR CON FORMULARIO ================= */

function EditarHandleFormulario() {
    this.handleEvent = function (event) {
        const gasto = this.gasto;
        const template = document.getElementById("formulario-template");
        if (!template) return;

        const frag = template.content.cloneNode(true);
        const form = frag.querySelector("form");
        if (!form) return;

        const divGasto = event.currentTarget.closest(".gasto");
        if (!divGasto) return;

        // insertamos el formulario dentro del gasto
        divGasto.appendChild(form);

        // desactivar botón editar mientras está abierto
        const botonEditar = event.currentTarget;
        botonEditar.setAttribute("disabled", "true");

        // rellenar valores actuales
        form.elements.descripcion.value = gasto.descripcion;
        form.elements.valor.value = gasto.valor;
        form.elements.fecha.value = new Date(gasto.fecha).toISOString().slice(0, 10);
        form.elements.etiquetas.value = Array.isArray(gasto.etiquetas) ? gasto.etiquetas.join(",") : "";

        // Enviar (LOCAL)
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            gasto.actualizarDescripcion(form.elements.descripcion.value.trim());
            gasto.actualizarValor(Number(form.elements.valor.value));
            gasto.actualizarFecha(form.elements.fecha.value);

            const etiquetas = form.elements.etiquetas.value
                .split(",")
                .map(e => e.trim())
                .filter(e => e !== "");

            gasto.etiquetas = [];
            gasto.anyadirEtiquetas(...etiquetas);

            cerrarEdicion();
            repintar();
        });

        // Cancelar
        const btnCancelar = form.querySelector(".cancelar");
        if (btnCancelar) {
            btnCancelar.addEventListener("click", function () {
                cerrarEdicion();
            });
        }

        // Enviar (API) -> PUT
        const btnEnviarApi = form.querySelector(".gasto-enviar-api");
        if (btnEnviarApi) {
            btnEnviarApi.addEventListener("click", async function () {
                const usuario = obtenerUsuarioApi();
                if (!usuario) {
                    alert("Introduce un nombre de usuario");
                    return;
                }

                if (!esGastoApi(gasto)) {
                    alert("Este gasto no existe en la API. Solo los creados con 'Enviar (API)' se pueden editar en la API.");
                    return;
                }

                const descripcion = form.elements.descripcion.value.trim();
                const valor = Number(form.elements.valor.value);
                const fecha = form.elements.fecha.value;
                const etiquetas = form.elements.etiquetas.value
                    .split(",")
                    .map(e => e.trim())
                    .filter(e => e !== "");

                if (!descripcion || isNaN(valor) || !fecha) {
                    alert("Rellena descripción, valor y fecha");
                    return;
                }

                const url = `${API_BASE}/${usuario}/${gasto.id}`;

                try {
                    const resp = await fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ descripcion, valor, fecha, etiquetas })
                    });

                    if (!resp.ok) {
                        let msg = "Error al actualizar el gasto en la API";
                        try {
                            const txt = await resp.text();
                            if (txt) msg += `\n${txt}`;
                        } catch {}
                        alert(msg);
                        return;
                    }

                    cerrarEdicion();
                    await cargarGastosApi();
                } catch (err) {
                    console.error(err);
                    alert("Error de red al conectar con la API");
                }
            });
        }

        function cerrarEdicion() {
            form.remove();
            botonEditar.removeAttribute("disabled");
        }
    };
}

/* ================= API ================= */

async function cargarGastosApi() {
    const usuario = obtenerUsuarioApi();
    if (!usuario) {
        alert("Introduce un nombre de usuario");
        return;
    }

    const url = `${API_BASE}/${usuario}`;

    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            let msg = `Error al cargar gastos (${resp.status})`;
            try {
                const txt = await resp.text();
                if (txt) msg += `\n${txt}`;
            } catch {}
            alert(msg);
            return;
        }

        const datos = await resp.json();

        const adaptados = (Array.isArray(datos) ? datos : []).map(g => {
            const id = g.id ?? g._id ?? g.uuid ?? g.gastoId;
            const descripcion = g.descripcion ?? "";

            const valor = (typeof g.valor === "number") ? g.valor : Number(g.valor);

            let fechaMs;
            if (typeof g.fecha === "number") {
                fechaMs = g.fecha;
            } else {
                const parsed = Date.parse(g.fecha);
                fechaMs = isNaN(parsed) ? Date.now() : parsed;
            }

            let etiquetas = [];
            if (Array.isArray(g.etiquetas)) {
                etiquetas = g.etiquetas;
            } else if (typeof g.etiquetas === "string") {
                etiquetas = g.etiquetas.split(",").map(e => e.trim()).filter(e => e !== "");
            }

            return { id, descripcion, valor: isNaN(valor) ? 0 : valor, fecha: fechaMs, etiquetas };
        });

        // IMPORTANTE: sustituye el listado actual por el de la API
        gestionPresupuesto.cargarGastos(adaptados);
        repintar();
    } catch (err) {
        console.error(err);
        alert("Error de red al conectar con la API");
    }
}

function BorrarGastoApiHandle() {
    this.handleEvent = async function () {
        const usuario = obtenerUsuarioApi();
        if (!usuario) {
            alert("Introduce un nombre de usuario");
            return;
        }

        if (!esGastoApi(this.gasto)) {
            alert("Este gasto es local. Solo los gastos creados con 'Enviar (API)' se pueden borrar desde la API.");
            return;
        }

        const url = `${API_BASE}/${usuario}/${this.gasto.id}`;

        try {
            const resp = await fetch(url, { method: "DELETE" });
            if (!resp.ok) {
                let msg = "Error al borrar el gasto en la API";
                try {
                    const txt = await resp.text();
                    if (txt) msg += `\n${txt}`;
                } catch {}
                alert(msg);
                return;
            }

            await cargarGastosApi();
        } catch (err) {
            console.error(err);
            alert("Error de red al conectar con la API");
        }
    };
}

/* ================= LOCALSTORAGE ================= */

function guardarGastosWeb() {
    const lista = gestionPresupuesto.listarGastos();
    localStorage.setItem("GestorGastosDWEC", JSON.stringify(lista));
}

function cargarGastosWeb() {
    const raw = localStorage.getItem("GestorGastosDWEC");
    let arr = [];

    if (raw) {
        try {
            arr = JSON.parse(raw);
            if (!Array.isArray(arr)) arr = [];
        } catch {
            arr = [];
        }
    }

    gestionPresupuesto.cargarGastos(arr);
    repintar();
}

/* ================= FILTRADO ================= */

function filtrarGastosWeb(event) {
    event.preventDefault();

    const descripcion = document.getElementById("formulario-filtrado-descripcion")?.value.trim() ?? "";
    const valorMinimoRaw = document.getElementById("formulario-filtrado-valor-minimo")?.value ?? "";
    const valorMaximoRaw = document.getElementById("formulario-filtrado-valor-maximo")?.value ?? "";
    const fechaDesde = document.getElementById("formulario-filtrado-fecha-desde")?.value ?? "";
    const fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta")?.value ?? "";
    const etiquetasTexto = document.getElementById("formulario-filtrado-etiquetas-tiene")?.value.trim() ?? "";

    const filtros = {};

    if (descripcion !== "") filtros.descripcionContiene = descripcion;
    if (valorMinimoRaw !== "") filtros.valorMinimo = Number(valorMinimoRaw);
    if (valorMaximoRaw !== "") filtros.valorMaximo = Number(valorMaximoRaw);
    if (fechaDesde !== "") filtros.fechaDesde = fechaDesde;
    if (fechaHasta !== "") filtros.fechaHasta = fechaHasta;
    if (etiquetasTexto !== "") filtros.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTexto);

    const gastosFiltrados = gestionPresupuesto.filtrarGastos(filtros);

    limpiarContenedor("listado-gastos-completo");
    gastosFiltrados.forEach(g => mostrarGastoWeb("listado-gastos-completo", g));
}

/* ================= EVENTOS PRINCIPALES ================= */

function iniciarEventos() {
    const btnPresupuesto = document.getElementById("actualizarpresupuesto");
    if (btnPresupuesto) btnPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

    const btnAnyadir = document.getElementById("anyadirgasto");
    if (btnAnyadir) btnAnyadir.addEventListener("click", ayadirGastoWeb);

    const btnAnyadirForm = document.getElementById("anyadirgasto-formulario");
    if (btnAnyadirForm) btnAnyadirForm.addEventListener("click", nuevoGastoWebFormulario);

    const btnGuardar = document.getElementById("guardar-gastos");
    if (btnGuardar) btnGuardar.addEventListener("click", guardarGastosWeb);

    const btnCargar = document.getElementById("cargar-gastos");
    if (btnCargar) btnCargar.addEventListener("click", cargarGastosWeb);

    const btnCargarApi = document.getElementById("cargar-gastos-api");
    if (btnCargarApi) btnCargarApi.addEventListener("click", cargarGastosApi);

    const formFiltro = document.getElementById("formulario-filtrado");
    if (formFiltro) formFiltro.addEventListener("submit", filtrarGastosWeb);
}

iniciarEventos();

/* ================= EXPORT ================= */

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
};
