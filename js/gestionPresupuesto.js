// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(numPresupuesto) {
    if (isNaN(numPresupuesto) || numPresupuesto < 0) {
        console.log("No has introducido un número")
        return -1;
    }
    else {
        presupuesto = numPresupuesto;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(cadena, valorIntroducido, fecha, ...etiquetas) {
    if(isNaN(valorIntroducido) || valorIntroducido < 0)
        valorIntroducido = 0;
    
    
    let fechaParseada = Date.parse(fecha);

    if (isNaN(fechaParseada)) {
        this.fecha = Date.now();     
    } else {
        this.fecha = fechaParseada;  
    }

    this.descripcion = cadena;
    this.valor = valorIntroducido;                                                                                                                                                                                           
    this.etiquetas = etiquetas;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    };
    
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0)
            this.valor = nuevoValor;
    };
    
    this.mostrarGastoCompleto = function() {
        let etiquetaMostrar = this.etiquetas.map(e => "- " + e).join("\n");
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
                `Fecha: ${new Date(this.fecha).toLocaleString()}\n` +
                `Etiquetas:\n` +
                etiquetaMostrar + `\n`;
    };    

    this.actualizarFecha = function(fechaNueva) {
        let fecha = Date.parse(fechaNueva);
        if (!isNaN(fecha)) {
            this.fecha = fecha;
        }
    }
    this.anyadirEtiquetas = function(...etiquetas) {
        for (let etiqueta of etiquetas) {
            if (!(this.etiquetas.includes(etiqueta)))
                this.etiquetas.push(etiqueta);
        }
    }
    this.borrarEtiquetas = function(...etiquetas) {
        for (let etiqueta of etiquetas) {
            let index = this.etiquetas.indexOf(etiqueta);
            if (index >= 0)
                this.etiquetas.splice(index, 1);
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fecha = new Date(this.fecha);
        if(periodo == "mes")
            return `${fecha.getFullYear()}-${String(fecha.getMonth()+1).padStart(2, "0")}`;
        else if(periodo == "anyo")
            return fecha.getFullYear();
        else if(periodo == "dia")
            return `${fecha.getFullYear()}-${String(fecha.getMonth()+1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
        else
            return "Periodo inválido"
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idGasto) {
    let index = gastos.findIndex(gasto => gasto.id == idGasto);
    if(index >= 0)
        gastos.splice(index, 1);       
}

function calcularTotalGastos() {
    let total = 0;
    for(let gasto of gastos) {
       total += gasto.valor;
    }
    return total;
}

function calcularBalance() {
    return (presupuesto - calcularTotalGastos())
}

function filtrarGastos(obj) {
    let copiaGastos = [...gastos];
    if(Object.hasOwn(obj, "fechaDesde")  && !isNaN(Date.parse(obj.fechaDesde)))
        copiaGastos = copiaGastos.filter(gasto => gasto.fecha >= Date.parse(obj.fechaDesde));
    if(Object.hasOwn(obj, "fechaHasta") && !isNaN(Date.parse(obj.fechaHasta)))
        copiaGastos = copiaGastos.filter(gasto => gasto.fecha <= Date.parse(obj.fechaHasta));
    if(Object.hasOwn(obj, "valorMinimo"))
        copiaGastos = copiaGastos.filter(gasto => gasto.valor >= obj.valorMinimo);
    if(Object.hasOwn(obj, "valorMaximo"))
        copiaGastos = copiaGastos.filter(gasto => gasto.valor <= obj.valorMaximo);
    if(Object.hasOwn(obj, "descripcionContiene"))
        copiaGastos = copiaGastos.filter(gasto => gasto.descripcion.toLowerCase().includes(obj.descripcionContiene.toLowerCase()));
    if(Object.hasOwn(obj, "etiquetasTiene"))
        copiaGastos = copiaGastos.filter(gasto => 
            gasto.etiquetas.some(etiquetaGasto => 
                obj.etiquetasTiene.some(etiquetaFiltro => 
                    etiquetaGasto.toLowerCase() === etiquetaFiltro.toLowerCase()
                )
            )
        );          
    return copiaGastos;
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta = Date.now()) {
    let objetoFiltro = {
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    }
    if (etiquetas.length > 0)
        objetoFiltro.etiquetasTiene = etiquetas;
    let gastosFiltrados = filtrarGastos(objetoFiltro);
    let resultado = gastosFiltrados.reduce((acc, gasto) =>{
        let clave =gasto.obtenerPeriodoAgrupacion(periodo);
        acc[clave] =  acc[clave] = (acc[clave] || 0) + gasto.valor;
        return acc;
    }, {});
    return resultado;
}

function transformarListadoEtiquetas(etiquetas) {
    return etiquetas.split(/[.,:;\s]+/)
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
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}