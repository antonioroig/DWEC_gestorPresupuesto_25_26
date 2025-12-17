// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(valor) {
    // TODO
    if(valor > 0){
        presupuesto = valor;
        return valor;
    }
    else{
        console.log("Valor introducido erroneo");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    this.valor = (valor > 0) ? valor : 0;
    this.fecha = (fecha == null) ? new Date() : Date.parse(fecha);
    this.etiquetas = etiquetas;
    
    this.mostrarGasto = function(){
        return(`Gasto correspondiente a ${descripcion} con valor ${valor} €`);
    }
    
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }
    
    this.actualizarValor = function (valor) {
        this.valor = (valor > 0) ? valor : this.valor;
    }

    this.mostrarGastoCompleto = function(){
        let fechaFinal = new Date(this.fecha);
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${fechaFinal.toLocaleString()}
Etiquetas:
`;
        for (let i = 0; i < etiquetas.length; i++) {
            texto += `- ${etiquetas[i]}
`;
        }
        return texto;
    }

    this.actualizarFecha = function(fecha){
        let check = Date.parse(fecha);
        if(!isNaN(check))
            this.fecha = Date.parse(fecha);
    }
    this.anyadirEtiquetas = function(...etiquetas){
        if(this.etiquetas.length == 0)
            this.etiquetas.push(etiquetas[0])
        for (let i = 0; i < etiquetas.length; i++) {
            for (let j = 0; j < this.etiquetas.length; j++) {
                if(etiquetas[i] != this.etiquetas[j] && j == this.etiquetas.length - 1)
                    this.etiquetas.push(etiquetas[i]);
                if(etiquetas[i] == this.etiquetas[j])
                    break;
            }
        }
    }
    this.borrarEtiquetas = function(...etiquetas){
        for (let i = 0; i < etiquetas.length; i++) {
            for (let j = 0; j < this.etiquetas.length; j++) {
                if(etiquetas[i] === this.etiquetas[j])
                    this.etiquetas.splice(j,1);
            }
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo){
        let dia = String(new Date(this.fecha).getDate()).padStart(2,0);
        let mes = String(new Date(this.fecha).getMonth() + 1).padStart(2,0);
        let año = String(new Date(this.fecha).getFullYear()).padStart(2,0);
        switch (periodo) {
          case 'dia':
            return `${año}-${mes}-${dia}`;
          case 'mes':
            return `${año}-${mes}`;
          case 'anyo':
            return `${año}`;
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
    for (let index = 0; index < gastos.length; index++) {
        if(gastos[index].id === id)
            gastos.splice(index,1);
        
    }
}


function calcularTotalGastos(){
    let gastosTotales = 0;
    for(let gasto of gastos){
        gastosTotales += gasto.valor;
    }
    return gastosTotales;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro){
    return gastos.filter(gasto => (
        (!filtro.fechaDesde || gasto.fecha >= Date.parse(filtro.fechaDesde)) &&
        (!filtro.fechaHasta || gasto.fecha <=  Date.parse(filtro.fechaHasta)) &&
        (!filtro.valorMinimo || gasto.valor >= filtro.valorMinimo) &&
        (!filtro.valorMaximo || gasto.valor <= filtro.valorMaximo) &&
        (!filtro.descripcionContiene || gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) &&
        (!filtro.etiquetasTiene || gasto.etiquetas.some(etiquetaGasto =>
            filtro.etiquetasTiene.some(etiquetaFiltro =>
                etiquetaGasto.toLowerCase() === etiquetaFiltro.toLowerCase()
            )
        ))
    ));
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){
    let gastosFiltrados = filtrarGastos({
        etiquetasTiene: etiquetas, 
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    });
    let result = gastosFiltrados.reduce((acumulador, gasto) => {
        let clave = gasto.obtenerPeriodoAgrupacion(periodo);
        if(acumulador[clave] != null)
            acumulador[clave] += gasto.valor;
        else
            acumulador[clave] = gasto.valor;
        return acumulador
    }, {});
    return result;
}

function transformarListadoEtiquetas(cadena){
    let arrFinal = cadena.split(/[,.;:\s]+/);
    return arrFinal;
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
    transformarListadoEtiquetas
}
