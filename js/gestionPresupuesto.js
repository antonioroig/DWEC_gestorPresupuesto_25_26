// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(value) {
    if(value > 0){
        presupuesto = value;
        return value;
    }
        return -1;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion,valor,fecha, ...etiquetas){
    this.descripcion = descripcion;
    this.valor = (valor > 0) ? valor : 0;
    this.etiquetas = (etiquetas.length === 0) ? [] : etiquetas;
    this.fecha = isValidDate(fecha)? Date.parse(fecha) : new Date();


    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
    }
    
    this.mostrarGastoCompleto = function(){
        let str =`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`+"\n"; 
        str += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        str += `Etiquetas:`+"\n";
        for(let i = 0; i < etiquetas.length; i++){
            str += "- "+etiquetas[i]+"\n";
        }
        return str;
    }
    this.actualizarFecha = function(fecha){
        if(isValidDate(fecha))
            this.fecha = Date.parse(fecha);
    }
    this.anyadirEtiquetas = function(...etiquetas) {
        this.etiquetas.push(...etiquetas);
        this.etiquetas = [...new Set(this.etiquetas)];
    }
    this.borrarEtiquetas = function(...etiquetas){
        for(let i = this.etiquetas.length; i >= 0; i--){
            for(let j = 0; j < etiquetas.length; j++){
                if(this.etiquetas[i] === etiquetas[j])
                {
                    this.etiquetas.splice(i,1);
                }
            }
        }
    }
    this.actualizarDescripcion = function(value){
        this.descripcion = value;
    }
    this.actualizarValor = function(value){
        this.valor = (value > 0) ? value : this.valor;
    }
    this.obtenerPeriodoAgrupacion = function(value){
        let date = new Date(this.fecha);
        if(value === "mes")
            return date.toISOString().slice(0,7);
        if(value === "anyo")
            return date.toISOString().slice(0,4);
        if(value === "dia")
            return date.toISOString().slice(0,10);
        return date.toISOString();
    }
}   

function isValidDate(dateStr){
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}


function listarGastos(){
    return gastos;
}

function borrarGasto(id){

    for(let i = gastos.length - 1; i >= 0; i--){
        if(gastos[i].id === id)
        {
            gastos.splice(i, 1);
            break;
        }
    }
}
function calcularTotalGastos(){
    let count = 0;
    for(let i = 0; i < gastos.length; i++){
        count += gastos[i].valor;
    }
    return count;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function filtrarGastos(value = {}){

    if(value === undefined || value === null)
        return gastos;

    if(Object.keys(value).length === 0)
        return gastos;

    const {
        fechaDesde,
        fechaHasta,
        valorMinimo,
        valorMaximo,
        descripcionContiene,
        etiquetasTiene
    } = value;

    return gastos.filter(gasto => {

        let fechaDesde = isValidDate(value.fechaDesde) ? Date.parse(value.fechaDesde) : null;
        let fechaHasta = isValidDate(value.fechaHasta) ? Date.parse(value.fechaHasta) : null;
        let valorMinimo = Number.isInteger(value.valorMinimo) ? value.valorMinimo : null;
        let valorMaximo = Number.isInteger(value.valorMaximo) ? value.valorMaximo : null;
        let descripcionContiene = value.descripcionContiene;
        let etiquetasGasto = (gasto.etiquetas.length === 0) ? [] : gasto.etiquetas.map(v => v.toUpperCase());
        let etiquetasFiltro = (Array.isArray(value.etiquetasTiene) ? value.etiquetasTiene.map(v => v.toUpperCase()) : null);


        if(fechaDesde && fechaDesde > gasto.fecha){
            return false;
        }
        if(fechaHasta && fechaHasta < gasto.fecha){
            return false;
        }
        if(valorMinimo && valorMinimo > gasto.valor){
            return false    
        }
        if(valorMaximo && valorMaximo < gasto.valor){
            return false;
        }
        if (descripcionContiene && !gasto.descripcion.toUpperCase().includes(descripcionContiene.toUpperCase())) {
            return false;
        }
        if (etiquetasFiltro && (!etiquetasGasto.some(v => etiquetasFiltro.includes(v))))
            return false;
        return true;
    });
    
}
function agruparGastos(periodo = "mes",etiquetas,fechaDesde,fechaHasta){
    let etiquetasAg = Array.isArray(etiquetas) && etiquetas.length > 0 ? etiquetas : null;
    let fechaDesdeAg = isValidDate(fechaDesde) ? fechaDesde : null;
    let fechaHastaAg = isValidDate(fechaHasta) ? fechaHasta : new Date().toISOString().slice(0,10);
    let grupoFiltrado = filtrarGastos({ fechaDesde: fechaDesdeAg, fechaHasta: fechaHastaAg, etiquetasTiene: etiquetasAg });

    return grupoFiltrado.reduce((acum, item) => {
        let p = item.obtenerPeriodoAgrupacion(periodo);
        acum[p] = ((acum[p] || 0) + item.valor); 
        return acum;
    },{});

}
function transformarListadoEtiquetas(str){
    var result = str.split(/[,.:; ]+/);
    result.forEach((v, i) => result[i] = v.trim());
    return result;  
  }

  function cargarGastos(gastosAlmacenamiento) {
    gastos = [];
    for (let g of gastosAlmacenamiento) {
        let gastoRehidratado = new CrearGasto();
        Object.assign(gastoRehidratado, g);
        gastos.push(gastoRehidratado)
    }
}
    
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
//
//
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
