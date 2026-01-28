let presupuesto = 1500;

function actualizarPresupuesto(cantidad) {
    if (!isNaN(cantidad) && cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetasArgs) {
    this.descripcion = descripcion;
    this.valor = (!isNaN(parseFloat(valor)) && parseFloat(valor) >= 0) ? parseFloat(valor) : 0;
    this.fecha = fecha ? Date.parse(fecha) : Date.now();
    
    let tags = etiquetasArgs.flat();
    if (tags.length === 1 && Array.isArray(tags[0])) {
        tags = tags[0];
    }
    
    this.etiquetas = tags
        .filter(e => e !== null && e !== undefined && typeof e === 'string')
        .map(e => e.trim())
        .filter(e => e.length > 0);

    this.actualizarDescripcion = desc => this.descripcion = desc;
    
    this.actualizarValor = val => { 
        const v = parseFloat(val);
        if(!isNaN(v) && v >= 0) this.valor = v; 
    };
    
    this.actualizarFecha = f => { 
        if(!isNaN(Date.parse(f))) this.fecha = Date.parse(f); 
    };
    
    this.anyadirEtiquetas = (...nuevas) => nuevas.forEach(e => { 
        const nuevaEtiqueta = String(e).trim();
        if(nuevaEtiqueta.length > 0 && !this.etiquetas.includes(nuevaEtiqueta)) {
            this.etiquetas.push(nuevaEtiqueta);
        }
    });
    
    this.borrarEtiquetas = (...aBorrar) => { 
        const tagsToDelete = aBorrar.map(t => String(t).trim());
        this.etiquetas = this.etiquetas.filter(existingTag => {
            return !tagsToDelete.includes(existingTag); 
        });
    };
    
    this.reemplazarEtiquetas = (nuevas) => { 
        this.etiquetas = []; 
        this.anyadirEtiquetas(...nuevas); 
    };

    this.obtenerPeriodoAgrupacion = (periodo) => {
        const f = new Date(this.fecha);
        const a = f.getFullYear();
        const m = String(f.getMonth()+1).padStart(2,'0');
        const d = String(f.getDate()).padStart(2,'0');
        
        switch(periodo){
            case 'dia': return `${a}-${m}-${d}`;
            case 'mes': return `${a}-${m}`;
            case 'anyo': return `${a}`;
            default: return `${a}-${m}`;
        }
    };
}

let gastos = [
    new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];

gastos.forEach((g, i) => g.id = i);
let idGasto = gastos.length;

function listarGastos() { 
    return gastos; 
}

function anyadirGasto(g) { 
    g.id = idGasto++; 
    gastos.push(g); 
}

function borrarGasto(id) { 
    const i = gastos.findIndex(g => g.id === id); 
    if(i !== -1) gastos.splice(i, 1); 
}

function calcularTotalGastos() { 
    return gastos.reduce((t, g) => t + g.valor, 0); 
}

function calcularBalance() { 
    return presupuesto - calcularTotalGastos(); 
}

function filtrarGastos(filtro = {}) {
    return gastos.filter(g => {
        if(filtro.fechaDesde && g.fecha < Date.parse(filtro.fechaDesde)) return false;
        if(filtro.fechaHasta && g.fecha > Date.parse(filtro.fechaHasta)) return false;
        if(filtro.valorMinimo !== undefined && g.valor < filtro.valorMinimo) return false;
        if(filtro.valorMaximo !== undefined && g.valor > filtro.valorMaximo) return false;
        if(filtro.descripcionContiene && !g.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) return false;
        
        if(filtro.etiquetasTiene && Array.isArray(filtro.etiquetasTiene) && filtro.etiquetasTiene.length > 0) {
            const tieneEtiqueta = filtro.etiquetasTiene.some(e => 
                Array.isArray(g.etiquetas) ? g.etiquetas.some(ge => ge.toLowerCase() === e.toLowerCase()) : false
            );
            if(!tieneEtiqueta) return false;
        }
        return true;
    });
}

function agruparGastos(periodo = 'mes', etiquetas = [], fechaDesde = null, fechaHasta = null) {
    const filtro = {};
    if(fechaDesde) filtro.fechaDesde = fechaDesde;
    if(fechaHasta) filtro.fechaHasta = fechaHasta;
    if(etiquetas.length > 0) filtro.etiquetasTiene = etiquetas;
    
    const gf = filtrarGastos(filtro);
    
    return gf.reduce((ac, g) => {
        const p = g.obtenerPeriodoAgrupacion(periodo);
        if(!ac[p]) ac[p] = 0;
        ac[p] += g.valor;
        return ac;
    }, {});
}

function transformarListadoEtiquetas(etiquetasTiene){
    if(etiquetasTiene == null || etiquetasTiene.length == 0)
        return [];

    return etiquetasTiene.split(/[,.:;\s]+/).filter(e => e.length > 0);
}

function cargarGastos(gastosAlmacenamiento) {
    gastos = [];

    for (let g of gastosAlmacenamiento) {
        let gastoRehidratado = new CrearGasto();

        Object.assign(gastoRehidratado, g);
        
        gastos.push(gastoRehidratado)
    }
}
    



export {
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
    cargarGastos,
};