let presupuesto = 0;
let valor = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(num) {
    if (typeof num != "number" || num < 0){
        console.log("Introduzca un presupuesto válido");
        return -1   ;
    }
    presupuesto = num;
    return presupuesto;
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, value, fecha, ...etiquetas) {
    if (!isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = new Date();
    }
    if (typeof value != "number" || value < 0)
    {
        this.valor = 0;
        this.descripcion = descripcion;
    } 
    else {
        this.valor = value;
        this.descripcion = descripcion;
    }
    this.etiquetas = etiquetas;
    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };

    this.actualizarDescripcion = function(des){
        this.descripcion = des;
    };

    this.actualizarValor = function(value){
        if (typeof value == "number" && value >= 0)
            this.valor = value;
    };

    this.mostrarGastoCompleto = function(){
        let fechaFormateada = new Date(this.fecha);
        let fecha = fechaFormateada.toLocaleString();
        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n";
        texto += "Fecha: " + fecha + "\n";
        texto += "Etiquetas:\n";
        for (let i = 0; i < this.etiquetas.length; i++)
            texto += "- " + this.etiquetas[i] + "\n";
        return texto;
    }

    this.actualizarFecha = function(date){ 
        if (!isNaN(Date.parse(date))) 
            this.fecha = Date.parse(date); 
    }

    this.anyadirEtiquetas = function(...nuevas){
        for (let i = 0; i < nuevas.length; i++){
            if (!existeEtiqueta(nuevas[i], this.etiquetas))
                this.etiquetas.push(nuevas[i]);
        }
    }

    this.borrarEtiquetas = function(...borrar){
        for (let i = 0; i < borrar.length; i++){
            if(existeEtiqueta(borrar[i], this.etiquetas)){
                this.etiquetas.splice(this.etiquetas.indexOf(borrar[i]), 1);
                i--;
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date(this.fecha);
        let $mes;
        let $dia;
        if (fecha.getMonth() < 9)
            $mes = "0" + (fecha.getMonth()+1);
        else 
            $mes = (fecha.getMonth()+1);
        if (fecha.getDate() < 10)
            $dia = "0" + fecha.getDate();
        else 
            $dia = fecha.getDate();
        if(periodo == "anyo")
            return fecha.getFullYear();
        else if(periodo == "mes")
            return fecha.getFullYear() + "-" + $mes;
        else if(periodo == "dia")
            return fecha.getFullYear() + "-" + $mes + "-" + $dia;
        else
            return "Fecha no definida";
    }
}

function listarGastos(){
    if (gastos.length == 0){
        console.log("No hay gastos registrados.");
        return [];
    }
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(gasto){
    for (let i = 0; i < gastos.length; i++){
        if (gastos[i].id == gasto)
            gastos.splice(i, 1);
    }
}

function calcularTotalGastos(){
    let resultado = 0;
    for (let i = 0; i < gastos.length; i++){
        resultado += gastos[i].valor;
    }
    return resultado;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}

function existeEtiqueta(e, etiquetas){
    return etiquetas.includes(e);
}

function filtrarGastos(objeto){ 
    if (Object.keys(objeto).length == 0)
        return gastos;
    let copiaGastos = copiarArray(gastos);
    if (objeto.fechaDesde != undefined && !isNaN(Date.parse(objeto.fechaDesde))){
        copiaGastos = copiaGastos.filter(function(gasto){
            return gasto.fecha >= Date.parse(objeto.fechaDesde);
        })
    }
    if (objeto.fechaHasta != undefined && !isNaN(Date.parse(objeto.fechaHasta))){
        copiaGastos = copiaGastos.filter(function(gasto){
            return gasto.fecha <= Date.parse(objeto.fechaHasta);
        })
    }
    if (objeto.valorMinimo != undefined){
        copiaGastos = copiaGastos.filter(function(gasto){
            return gasto.valor >= objeto.valorMinimo;
        })
    }
    if (objeto.valorMaximo != undefined){
        copiaGastos = copiaGastos.filter(function(gasto){
            return gasto.valor <= objeto.valorMaximo;
        })
    }
    if (objeto.descripcionContiene != undefined){
        let buscar = String(objeto.descripcionContiene).toLowerCase();
        copiaGastos = copiaGastos.filter(function(gasto){
            return gasto.descripcion.toLowerCase().includes(buscar);
        })
    }
    if (objeto.etiquetasTiene != undefined){
        copiaGastos = copiaGastos.filter(function(gasto){
            for (let i = 0; i < objeto.etiquetasTiene.length; i++){
                for (let j = 0; j < gasto.etiquetas.length; j++){
                    if (objeto.etiquetasTiene[i].toLowerCase() == gasto.etiquetas[j].toLowerCase())
                        return true;
                }
            }
            return false;
        })
    }
    return copiaGastos;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){
    let objeto = {};
    if (fechaDesde != undefined) // sino todos los gastos
        objeto.fechaDesde = fechaDesde;
    if (fechaHasta == undefined) // fecha actual
        fechaHasta = (new Date().toISOString().split("T")[0]);
    objeto.fechaHasta = fechaHasta;
    if (periodo == undefined) // por defecto mes
        periodo = "mes";
    if (etiquetas != undefined && etiquetas.length > 0) // sino todos los gastso
        objeto.etiquetasTiene = etiquetas;
    let gastosFiltrados = filtrarGastos(objeto);
    let resultado = gastosFiltrados.reduce(function(acu, gasto){
        let peri = gasto.obtenerPeriodoAgrupacion(periodo);
        if (fechaDesde == undefined || (gasto.fecha >= Date.parse(fechaDesde) && gasto.fecha <= Date.parse(fechaHasta)))
            acu[peri] = (acu[peri] || 0) + gasto.valor;
        return acu;
    }, {});
    return resultado;
}

function copiarArray(array){
    let resultado = [];
    for (let i = 0; i < array.length; i++)
        resultado.push(array[i]);
    return resultado;
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
    existeEtiqueta,
    filtrarGastos,
    agruparGastos,
    copiarArray
}