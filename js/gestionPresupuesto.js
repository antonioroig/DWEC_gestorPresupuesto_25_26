// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(val) {
    if(val >= 0)
    {
        presupuesto = val
        return presupuesto
    }
    else
    {
        console.log("Valor introducido erroneo")
        return -1
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`)
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
        this.descripcion = descripcion;
        this.valor = (valor > 0) ? valor:0;
        this.fecha = (fecha == null) ? new Date() : Date.parse(fecha);
        this.etiquetas = etiquetas;
        this.mostrarGasto = function(){
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
        }
        this.actualizarDescripcion = function(descripcion2){
            this.descripcion = descripcion2
        }
        this.actualizarValor = function(value){
            if(value > 0)
                this.valor = value
        }
        this.mostrarGastoCompleto = function(){
            let fechaFinal = new Date(this.fecha)
            let text = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${fechaFinal.toLocaleString()}
Etiquetas:
`
            for(let i = 0; i < etiquetas.length; i++)
            {
                text += `- ${etiquetas[i]}
`
            }
            return text
        }
        this.actualizarFecha = function(fecha){
            let fechaParseada = Date.parse(fecha)
            if(!isNaN(fechaParseada))
            {
                this.fecha = fechaParseada
            }  
        }
        this.anyadirEtiquetas = function(...etiqueta){
            for(let i = 0; i < etiqueta.length; i++)
            {
                if(!this.etiquetas.includes(etiqueta[i], 0))
                    this.etiquetas.push(etiqueta[i])
            }
        }
        this.borrarEtiquetas = function(...etiqueta){
            for(let i = 0; i < etiqueta.length; i++)
            {
                let num = this.etiquetas.indexOf(etiqueta[i], 0)
                if(num >= 0)
                {
                    this.etiquetas.splice(num, 1)
                }
            }
        }
        this.obtenerPeriodoAgrupacion = function(periodo){
            let fechaFinal = new Date(this.fecha)
            if(periodo == "dia")
            {
                let result = `${fechaFinal.getFullYear()}`
                if(fechaFinal.getMonth() + 1 < 10)
                    result += `-0${fechaFinal.getMonth() + 1}`;
                else
                    result += `-${fechaFinal.getMonth() + 1}`;

                if(fechaFinal.getDate() < 10)
                    result += `-0${fechaFinal.getDate()}`;
                else
                    result += `-${fechaFinal.getDate()}`
                return result;
            }
            else if(periodo == "mes")
            {
                if(fechaFinal.getMonth() + 1 < 10)
                    return(`${fechaFinal.getFullYear()}-0${fechaFinal.getMonth() + 1}`)
                return(`${fechaFinal.getFullYear()}-${fechaFinal.getMonth() + 1}`)
            }
            else
            {
                return(fechaFinal.getFullYear())
            }
        }
}

function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto ++;
    gastos.push(gasto)
}
function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++)
    {
        if(id === gastos[i].id)
        {
            gastos.splice(i,1)
        }
    }
}
function calcularTotalGastos(){
    let suma = 0;
    gastos.forEach(gasto => {
        suma += gasto.valor
    });
    return suma
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos(){
    
}
function agruparGastos(){

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
    agruparGastos
}
