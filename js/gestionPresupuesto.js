let presupuesto = 1499;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0 && !isNaN(cantidad)) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        console.error("Error: El presupuesto debe ser un número no negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    if (valor >= 0 && !isNaN(valor)) this.valor = valor;
    else this.valor = 0;
    if (fecha && !isNaN(Date.parse(fecha))) this.fecha = Date.parse(fecha);
    else this.fecha = Date.now();
    this.etiquetas = [];
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.mostrarGastoCompleto = function() {
        let fechaFormateada = new Date(this.fecha).toLocaleString();
        let etiquetasTexto = "";
        if (this.etiquetas.length > 0) etiquetasTexto = "\nEtiquetas:\n" + this.etiquetas.map(e => `- ${e}`).join('\n');
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaFormateada}${etiquetasTexto}\n`;
    };
    this.actualizarDescripcion = function(nuevaDescripcion) { this.descripcion = nuevaDescripcion; };
    this.actualizarValor = function(nuevoValor) { if (!isNaN(nuevoValor) && nuevoValor >= 0) this.valor = nuevoValor; };
    this.actualizarFecha = function(nuevaFecha) { if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) this.fecha = Date.parse(nuevaFecha); };
    this.anyadirEtiquetas = function(...nuevasEtiquetas) { nuevasEtiquetas.forEach(e => { if (!this.etiquetas.includes(e)) this.etiquetas.push(e); }); };
    this.borrarEtiquetas = function(...etiquetasABorrar) { this.etiquetas = this.etiquetas.filter(e => !etiquetasABorrar.includes(e)); };
    this.obtenerPeriodoAgrupacion = function(periodo) {
        const fecha = new Date(this.fecha);
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth()+1).padStart(2,'0');
        const dia = String(fecha.getDate()).padStart(2,'0');
        switch(periodo){case 'dia': return `${año}-${mes}-${dia}`; case 'mes': return `${año}-${mes}`; case 'anyo': return `${año}`; default: return `${año}-${mes}`;}
    };
    if (etiquetas.length > 0) this.anyadirEtiquetas(...etiquetas);
}

let gastos = [
    new CrearGasto("Gasto 1", 100, "2021-11-01", "eti1"),
    new CrearGasto("Gasto 2", 50, "2021-11-01", "eti2"),
    new CrearGasto("Gasto 3", 32, "2021-11-01", "eti3"),
    new CrearGasto("Gasto 4", 40, "2021-11-01", "eti1","eti2"),
    new CrearGasto("Gasto 5", 150, "2021-11-01", "eti2","eti3"),
    new CrearGasto("Gasto 6", 146, "2021-11-01", "eti1","eti3")
];

gastos.forEach((gasto,index)=> gasto.id = index);
let idGasto = gastos.length;

function listarGastos() { return gastos; }
function anyadirGasto(gasto) { gasto.id = idGasto++; gastos.push(gasto); }
function borrarGasto(id) { const i = gastos.findIndex(g => g.id===id); if(i!==-1) gastos.splice(i,1); }
function calcularTotalGastos() { return gastos.reduce((t,g)=>t+g.valor,0); }
function calcularBalance() { return presupuesto - calcularTotalGastos(); }

function filtrarGastos(filtro={}) {
    return gastos.filter(g=>{
        if(filtro.fechaDesde && g.fecha < Date.parse(filtro.fechaDesde)) return false;
        if(filtro.fechaHasta && g.fecha > Date.parse(filtro.fechaHasta)) return false;
        if(filtro.valorMinimo!==undefined && g.valor<filtro.valorMinimo) return false;
        if(filtro.valorMaximo!==undefined && g.valor>filtro.valorMaximo) return false;
        if(filtro.descripcionContiene && !g.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) return false;
        if(filtro.etiquetasTiene && filtro.etiquetasTiene.length>0) {
            const tiene = filtro.etiquetasTiene.some(e => g.etiquetas.some(ge => ge.toLowerCase()===e.toLowerCase()));
            if(!tiene) return false;
        }
        return true;
    });
}

function agruparGastos(periodo='mes', etiquetas=[], fechaDesde=null, fechaHasta=null) {
    const filtro = {};
    if(fechaDesde) filtro.fechaDesde = fechaDesde;
    if(fechaHasta) filtro.fechaHasta = fechaHasta;
    if(etiquetas.length>0) filtro.etiquetasTiene = etiquetas;
    const gf = filtrarGastos(filtro);
    return gf.reduce((ac, g)=>{
        const p = g.obtenerPeriodoAgrupacion(periodo);
        if(!ac[p]) ac[p]=0;
        ac[p]+=g.valor;
        return ac;
    }, {});
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
    agruparGastos
};
