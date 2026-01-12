// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.error("Error: el valor debe de ser positivo o 0.");
        return -1;
    }
}
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
    this.id = null; 
    this.descripcion = String(descripcion);
    this.valor = (typeof valor === "number" && valor >= 0) ? valor : 0;
    this.fecha = (fecha && !isNaN(Date.parse(fecha))) ? Date.parse(fecha) : Date.now();
    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(et => {
            if (!this.etiquetas.includes(et)) this.etiquetas.push(et);
        });
    };

    if (etiquetas.length > 0) this.anyadirEtiquetas(...etiquetas);

  this.mostrarGastoCompleto = function() {
    const fechaLocal = new Date(this.fecha).toLocaleString();
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
    texto += `Fecha: ${fechaLocal}\n`;
    texto += `Etiquetas:\n`;

    if (this.etiquetas.length > 0) {
        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }
    }

    return texto;
};


    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = String(nuevaDescripcion);
    };

    this.actualizarFecha = function(nuevaFecha) {
        if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(et => !etiquetasABorrar.includes(et));
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
    this.obtenerPeriodoAgrupacion = function(periodo){
        const fecha = new Date(this.fecha)

        const anyo = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        let dia = fecha.getDate();

        if(mes < 10){
            mes = "0" + mes;
        }
        if(dia < 10){
            dia = "0" + dia
        }
    if (periodo === "dia") {
        return `${anyo}-${mes}-${dia}`;
    } else if (periodo === "mes") {
        return `${anyo}-${mes}`;
    } else if (periodo === "anyo") {
        return `${anyo}`;
    } 
        return;
    
    }
}


function listarGastos(){
    return gastos
}
function anyadirGasto(gasto) {
    if (!gasto){
        return;
    }        
    gasto.id = idGasto;           
    idGasto++;                     
    gastos.push(gasto);           
}
function borrarGasto(id) {
       for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
            break; 
        }
    }
}


function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos(filtros = {}) {
    return gastos.filter(g => {

        if (filtros.fechaDesde && g.fecha < Date.parse(filtros.fechaDesde)) {
            return false;
        }

        if (filtros.fechaHasta && g.fecha > Date.parse(filtros.fechaHasta)) {
            return false;
        }

        if (filtros.valorMinimo !== undefined && g.valor < filtros.valorMinimo) {
            return false;
        }

        if (filtros.valorMaximo !== undefined && g.valor > filtros.valorMaximo) {
            return false;
        }

        if (filtros.descripcionContiene) {
            let texto = filtros.descripcionContiene.toLowerCase();
            let descripcion = g.descripcion.toLowerCase();
            let encontrado = false;
            for (let i = 0; i <= descripcion.length - texto.length; i++) {
                if (descripcion.substring(i, i + texto.length) === texto) {
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) return false;
        }

        if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {
            let etiquetasFiltro = filtros.etiquetasTiene.map(e => e.toLowerCase());
            let etiquetasGasto = g.etiquetas.map(e => e.toLowerCase());
            let coincidencias = [];

            for (let i = 0; i < etiquetasFiltro.length; i++) {
                for (let j = 0; j < etiquetasGasto.length; j++) {
                    if (etiquetasGasto[j] === etiquetasFiltro[i]) {
                        coincidencias.push(etiquetasGasto[j]);
                    }
                }
            }

            if (coincidencias.length === 0) return false;
        }

        
        return true;
    });
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    let filtros = {};

    if (etiquetas && etiquetas.length > 0) {
        filtros.etiquetasTiene = etiquetas;
    }

    if (fechaDesde) {
        filtros.fechaDesde = fechaDesde;
    }

    if (fechaHasta) {
        filtros.fechaHasta = fechaHasta;
    }

    let gastosFiltrados = filtrarGastos(filtros);

    let agrupado = gastosFiltrados.reduce((acc, gasto) => {
        let clave = gasto.obtenerPeriodoAgrupacion(periodo);

        if (!acc[clave]) {
            acc[clave] = 0;
        }

        acc[clave] += gasto.valor;

        return acc;
    }, {});

    return agrupado;
}

function transformarListadoEtiquetas(etiquetasString) {
  let etiquetas = etiquetasString.split(/[,.:;\s]+/);
  etiquetas = etiquetas.filter(etiqueta => etiqueta !== "");
  return etiquetas;
}


function cargarGastos(gastosAlmacenamiento) {
    
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}
    
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    CrearGasto,
    transformarListadoEtiquetas,
    cargarGastos
    
}
