let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function listarGastos() {
    return gastos;
}

function anyadirGasto(obj) {
    if (obj == null || obj == undefined)
        return;
    obj.id = idGasto++;
    gastos.push(obj);
}

function borrarGasto(id) {
    if (isNaN(id))
        return;
    
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id == id) {
            gastos.splice(i, 1);
            return;
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    if (gastos.length > 0) {
        for (let gasto of gastos) {
            total += gasto.valor;
        }
    }
    return total;
}

function calcularBalance() {
    let totalGasto = calcularTotalGastos();
    return presupuesto - totalGasto;
}

function agruparGastos(...values) {
    if (values[0])
        values[0].toLowerCase();

    let copyGastos;
    if (!values[1]) {
        copyGastos = [...gastos]
    } else {
        copyGastos = filtrarGastos({etiquetasTiene: values[1]})
    }

    if (values[2]) {
        copyGastos = filtrarGastos({etiquetasTiene: values[1], fechaDesde: values[2]})
    }

    if (values[3]) {
        copyGastos = filtrarGastos({etiquetasTiene: values[1], fechaDesde: values[2], fechaHasta: values[3]})
    }

    let fechas = {}

    if (values[0] == 'dia' || values[0] == 'mes' || values[0] == 'anyo') {
        for (let gasto of copyGastos) {
            let agr = gasto.obtenerPeriodoAgrupacion(values[0]);
            // Como "gasto" ya está declarado, declaro "expense" para el siguiente punto
            // Una vez obtengo el periodo de agrupación, asigno una variable al reduce.
            // Reduce tiene acumulador y el gasto, y dentro devuelvo un "if"
            // El cual, si coincide con el periodo obtenido previamente, le meta el acumulador
            const total = copyGastos.reduce((acum, expense) => {
                if (expense.obtenerPeriodoAgrupacion(values[0]) === agr) {
                    acum += expense.valor;
                }
                return acum;
                }, 0);
            fechas = {...fechas, [agr]: total}
            
        }
    }
    return fechas;
}


function filtrarGastos(values = {}) {
    const fechaDesde = values.fechaDesde ? new Date(values.fechaDesde) : null;
    const fechaHasta = values.fechaHasta ? new Date(values.fechaHasta) : null;
    const valorMaximo = values.valorMaximo ?? null;
    const valorMinimo = values.valorMinimo ?? null;
    const descripcionContiene = values.descripcionContiene?.toLowerCase() ?? null;
    const etiquetasTiene = values.etiquetasTiene ?? null;

    if (!values || Object.keys(values).length === 0) {
        return gastos;
    }

    let response = [...gastos];

    if (fechaDesde) {
        response = response.filter(gasto => new Date(gasto.fecha) >= fechaDesde)
    }
    if (fechaHasta) {
        response = response.filter(gasto => new Date(gasto.fecha) <= fechaHasta)
    }
    if (valorMinimo) {
        response = response.filter(gasto => gasto.valor >= valorMinimo)
    }
    if (valorMaximo) {
        response = response.filter(gasto => gasto.valor <= valorMaximo)
    }
    if (descripcionContiene) {
        response = response.filter(gasto =>
            gasto.descripcion?.toLowerCase().includes(descripcionContiene)
        );
    }

    // Some devuelve true o false si se cumple la condición
    // Primero filtro los gastos, y accedo a etiquetas, aplicando "some" para ver si cumplen la condición
    // Dentro de some, cada etiqueta (tag) confirmo que tenga incluida la lista de etiquetasTiene
    if (etiquetasTiene && etiquetasTiene.length > 0) {
        response = response.filter(gasto =>
            gasto.etiquetas.some(tag =>
                etiquetasTiene.some(etiqueta => etiqueta.toLowerCase() === tag.toLowerCase())
            )
        );
    }

    return response;
}


function actualizarPresupuesto(value) {
    const num = Number(value);
    if (isNaN(num) || num < 0) {
        return -1;
    }
    presupuesto = value;
    return value;
}

function mostrarPresupuesto() {
    const text = `Tu presupuesto actual es de ${presupuesto} €`;
    return text;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(value) {
        this.descripcion = value;
    }
    
    this.actualizarValor = function(value) {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
            return;
        }
        this.valor = num;
    }


    //codigo duplicado, esto se debería de refactorizar
    this.validarValor = function(value) {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
            return 0;
        }
        return num;
    }

    // Función personalizada. Formatea y devuelve el texto en el formato indicado
    this.formatearGastos = function() {
        return "\n" + this.etiquetas.map(tag => `- ${tag}`).join("\n") + "\n";
    }


    // Función personalizada. Formatea la fecha en el formato indicado.
    this.formatearFecha = function() {
        return new Date(this.fecha).toLocaleString();
    }

    this.mostrarGastoCompleto = function() {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${this.formatearFecha()}
Etiquetas:${this.formatearGastos()}`
    }


    this.actualizarFecha = function(fecha) {
        if (!fecha || isNaN(Date.parse(fecha))) {
            return;
        } else {
            this.fecha = Date.parse(fecha);
        }
    }

    this.validarFecha = function(fecha) {
        if (!fecha || isNaN(Date.parse(fecha))) {
            return Date.now();
        } else {
            return Date.parse(fecha);
        }
    }
    
    this.anyadirEtiquetas = function(...values) {
        if (values == null || values == undefined)
            return;

        for (let tag of values) {
            if (this.etiquetas.indexOf(tag) == -1) {
                this.etiquetas.push(tag);
            }
        }
    }

    this.validarEtiquetas = function(...values) {
        let arr = [];
        if (values == null || values == undefined) {
            return arr;
        } else {
            for (let tag of values) {
                arr.push(tag);
            }
            return arr;
        }
    }


    this.borrarEtiquetas = function(...values) {
        if (values == null || values == undefined || values.length == 0)
            return;

        for (let tag of values) {
            let index = this.etiquetas.indexOf(tag);
            if (index != -1) {
                this.etiquetas.splice(index, 1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(filter) {
        let fecha = new Date(this.fecha)
        let year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let day = fecha.getDate();

        if (month < 10) {
            month = `0${month}`
        }
        if (day < 10) {
            day = `0${day}`
        }
        
        if (filter == "dia") {
            return `${year}-${month}-${day}`
        }
        if (filter == "mes") {
            return `${year}-${month}`
        }
        if (filter == "anyo") {
            return `${year}`
        }
    }

    this.descripcion = descripcion;
    this.valor = this.validarValor(valor); // DEBERIA SER ACTUALIZAR VALOR NO VALIDARLO
    this.fecha = this.validarFecha(fecha);
    this.etiquetas = this.validarEtiquetas(...etiquetas);
    this.id = null;
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,    
    calcularBalance,
    agruparGastos,
    filtrarGastos
}
