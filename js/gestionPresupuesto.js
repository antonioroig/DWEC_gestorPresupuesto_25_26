let presupuesto = 1500;

function actualizarPresupuesto(cantidad) {
    if (!isNaN(cantidad) && cantidad >= 0) {
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

function CrearGasto(descripcion, valor, fecha, etiquetas = []) {
    this.descripcion = descripcion;
    // Convertimos a número para evitar concatenación de texto en los tests
    this.valor = (!isNaN(parseFloat(valor)) && parseFloat(valor) >= 0) ? parseFloat(valor) : 0;
    this.fecha = fecha ? Date.parse(fecha) : Date.now();
    this.etiquetas = Array.isArray(etiquetas) ? etiquetas : [];

    this.actualizarDescripcion = desc => this.descripcion = desc;
    this.actualizarValor = val => { 
        const v = parseFloat(val);
        if(!isNaN(v) && v>=0) this.valor = v; 
    };
    this.actualizarFecha = f => { if(!isNaN(Date.parse(f))) this.fecha = Date.parse(f); };
    this.anyadirEtiquetas = (...nuevas) => nuevas.forEach(e => { if(!this.etiquetas.includes(e)) this.etiquetas.push(e); });
    this.borrarEtiquetas = (...aBorrar) => { this.etiquetas = this.etiquetas.filter(e => !aBorrar.includes(e)); };
    this.reemplazarEtiquetas = (nuevas) => { this.etiquetas = []; this.anyadirEtiquetas(...nuevas); };

    this.obtenerPeriodoAgrupacion = (periodo) => {
        const f = new Date(this.fecha);
        const a = f.getFullYear(), m = String(f.getMonth()+1).padStart(2,'0'), d = String(f.getDate()).padStart(2,'0');
        switch(periodo){
            case 'dia': return `${a}-${m}-${d}`;
            case 'mes': return `${a}-${m}`;
            case 'anyo': return `${a}`;
            default: return `${a}-${m}`;
        }
    };
}

let gastos = [
    new CrearGasto("Gasto 1", 100, "2021-11-01", ["eti1","eti2"]),          
    new CrearGasto("Gasto 2", 50,  "2021-11-01", ["eti3"]),                 
    new CrearGasto("Gasto 3", 32,  "2021-11-01", ["eti4"]),                 
    new CrearGasto("Gasto 4", 40,  "2021-11-01", ["eti5","eti6"]),          
    new CrearGasto("Gasto 5", 101.1, "2021-11-01", ["eti7","eti8"]),        
    new CrearGasto("Gasto 6", 195.8, "2021-11-01", ["eti9","eti10","eti11"]) 
];

gastos.forEach((g,i)=>g.id=i);
let idGasto = gastos.length;

function listarGastos() { return gastos; }
function anyadirGasto(g) { g.id = idGasto++; gastos.push(g); }
function borrarGasto(id) { const i = gastos.findIndex(g=>g.id===id); if(i!==-1) gastos.splice(i,1); }
function calcularTotalGastos() { return gastos.reduce((t,g)=>t+g.valor,0); }
function calcularBalance() { return presupuesto - calcularTotalGastos(); }

function filtrarGastos(filtro={}) {
    return gastos.filter(g=>{
        if(filtro.fechaDesde && g.fecha < Date.parse(filtro.fechaDesde)) return false;
        if(filtro.fechaHasta && g.fecha > Date.parse(filtro.fechaHasta)) return false;
        if(filtro.valorMinimo!==undefined && g.valor<filtro.valorMinimo) return false;
        if(filtro.valorMaximo!==undefined && g.valor>filtro.valorMaximo) return false;
        if(filtro.descripcionContiene && !g.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) return false;
        if(filtro.etiquetasTiene && Array.isArray(filtro.etiquetasTiene) && filtro.etiquetasTiene.length>0) {
            if(!filtro.etiquetasTiene.some(e=>Array.isArray(g.etiquetas)? g.etiquetas.some(ge=>ge.toLowerCase()===e.toLowerCase()) : false)) return false;
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
    return gf.reduce((ac,g)=>{
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