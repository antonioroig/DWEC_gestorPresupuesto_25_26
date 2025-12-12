// TODO: Crear las funciones, objetos y variables indicadas en el enunciado



        // Variables globales
        let presupuesto = 0;
        let gastos = [];
        let idGasto = 0;

                        // CONSTRUCTOR

        function CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevaEtiqueta) {
        
            this.descripcion = nuevaDescripcion;
            this.id = 0;
        
            if (nuevoValor < 0 || nuevoValor == undefined || isNaN(nuevoValor)){
                this.valor = 0;
            }
            else {
                this.valor = nuevoValor;
            }
        
            if (nuevaFecha == undefined || nuevaFecha == null || isNaN(Date.parse(nuevaFecha)))
            {
                this.fecha = Date.now();
            }
        
            else {
                this.fecha = Date.parse(nuevaFecha);
            }
        
            if (nuevaEtiqueta == null || nuevaEtiqueta == undefined){
                this.etiquetas = [];
            }
            else
                this.etiquetas = [...nuevaEtiqueta];
        
        
        
                            //MÉTODOS
        
            this.mostrarGasto = function() {
                return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            };
        
            this.actualizarDescripcion = function(newDescription) {
                this.descripcion = newDescription;
            },
        
            this.actualizarValor = function (newValue){
                if (newValue < 0 || newValue == undefined || isNaN(newValue)){
                    return;
                    }
                else {
                    this.valor = newValue;
                }
            }
        
            this.anyadirEtiquetas = function (...nuevasEtiquetas){
                if(nuevasEtiquetas.length == 0 || nuevasEtiquetas == null ||nuevasEtiquetas == undefined)
                    return;
                for(let i = 0; i < nuevasEtiquetas.length; i++)
                    {
                        if(this.etiquetas.indexOf(nuevasEtiquetas[i]) == -1)
                            this.etiquetas.push(nuevasEtiquetas[i])
                    }   
                }
        
            this.actualizarFecha = function(fechaActualizada){
                if(fechaActualizada == null || fechaActualizada == undefined || isNaN(Date.parse(fechaActualizada)))
                {
                    return;
                }
                else
                {
                    this.fecha = Date.parse(fechaActualizada); 
                }
            }
        
            this.borrarEtiquetas = function(...etiquetasBorrado){
        
                for(let i = 0; i < etiquetasBorrado.length; i++)
                {
                    for(let j = 0; j < this.etiquetas.length; j++)
                    {
                        if(this.etiquetas[j] == etiquetasBorrado[i])
                            this.etiquetas.splice(j, 1);
                    }
                }
            }
        
            this.mostrarGastoCompleto = function(){
        
                let nuevaFecha = new Date (this.fecha);
                let fechaFormateada = nuevaFecha.toLocaleString();
                let desplegable = "";
                for (let i = 0; i < this.etiquetas.length; i++)
                {   
                    desplegable +=`- ${this.etiquetas[i]}\n`
                };
                return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${fechaFormateada}
Etiquetas:\n${desplegable}`)
            }

            this.obtenerPeriodoAgrupacion = function(parametro){
                let fechaFormateada = new Date(this.fecha);
                let anyo = fechaFormateada.getFullYear();
                let mes = fechaFormateada.getMonth()+1;
                let dia = fechaFormateada.getDate();
                if (mes < 10)
                {
                    mes = "0" + mes;
                }
                if (dia < 10)
                {
                    dia = "0" + dia
                }
                if(parametro == "anyo")
                    return anyo;
                if(parametro == "mes")
                {
                    return `${anyo}-${mes}`
                }
                if(parametro == "dia")
                {
                    return `${anyo}-${mes}-${dia}`
                }
            }
                            //FIN DEL CONSTRUCTOR
            }
        
                            //FUNCIONES
        
            function actualizarPresupuesto(nuevoPresupuesto) 
            {
                if (nuevoPresupuesto < 0 || nuevoPresupuesto == undefined || isNaN(nuevoPresupuesto))
                {
                    return-1;
                }
                else
                { 
                    presupuesto = nuevoPresupuesto;
                }
                return presupuesto;
            }
        
            function mostrarPresupuesto() 
            {   
                return (`Tu presupuesto actual es de ${presupuesto} €`)
            }
        
        
            function listarGastos()
            {
                return gastos;
            }
        
            function anyadirGasto(nuevoGasto)
            {
                nuevoGasto.id = idGasto;
                gastos.push(nuevoGasto);
                ++idGasto;
            }
        
            function borrarGasto(idGastoBorrado)
            {
                if (idGastoBorrado < 0 || idGastoBorrado > idGasto)
                    return;
                for(let i = 0; i < gastos.length; i++)
                {
                    if (gastos[i].id == idGastoBorrado)
                        {
                            gastos.splice(i, 1);
                            break;
                        }
                }
            }
        
            function calcularTotalGastos()
            {
                let valorTotal = 0;
                for (let i = 0; i < gastos.length; i++)
                {
                    valorTotal += gastos[i].valor
                }
                return (valorTotal);
            }
            function calcularBalance()
            {
                return (presupuesto - calcularTotalGastos())
            }
            
            function filtrarGastos(filtro)
            {
                if(Object.keys(filtro).length == 0)
                    return gastos;

                let resultados = [...gastos];

                let fechaDesdeFiltro = new Date(filtro.fechaDesde);
                let fechaHastaFiltro = new Date(filtro.fechaHasta); 
                fechaDesdeFiltro = Date.parse(fechaDesdeFiltro);
                fechaHastaFiltro = Date.parse(fechaHastaFiltro);
                let minValue = filtro.valorMinimo;
                let maxValue = filtro.valorMaximo;
                let description = filtro.descripcionContiene;
                let tags = [];
                
                if('fechaDesde' in filtro)
                {
                    resultados = resultados.filter(item => item.fecha >= fechaDesdeFiltro)
                }
                if(('fechaHasta' in filtro))
                {
                    resultados = resultados.filter(item => item.fecha <= fechaHastaFiltro)
                }
                if('valorMinimo' in filtro)
                {
                    resultados = resultados.filter(item => item.valor >= minValue)
                }
                if('valorMaximo' in filtro)
                    {
                    resultados = resultados.filter(item => item.valor <= maxValue)

                }
                if('descripcionContiene' in filtro)
                    {
                    for(let i = 0; i < resultados.length; i++)
                        {
                            if(resultados[i].descripcion != undefined)
                            resultados[i].descripcion = resultados[i].descripcion.toLowerCase();
                    }
                    description = description.toLowerCase();
                    resultados = resultados.filter(item => item.descripcion.includes(description))
                }
                if('etiquetasTiene' in filtro)
                    {
                    for(let i = 0; i < filtro.etiquetasTiene.length; i++)
                    {
                        tags.push(filtro.etiquetasTiene[i].toLowerCase());
                    }
                    for(let i = 0; i < resultados.length; i++)
                        {
                            if(resultados[i].etiquetas != undefined && resultados[i].etiquetas != [])
                                for(let j = 0; j < resultados[i].etiquetas.length; j++)
                                {
                                    resultados[i].etiquetas[j] = resultados[i].etiquetas[j].toLowerCase();
                                }
                            }
                            resultados = resultados.filter(item => item.etiquetas.some(etiqueta => tags.includes(etiqueta)));
                        }
                        return resultados;

                    }

            function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta)
            {
                if(periodo == undefined || periodo == null || periodo == "")
                    periodo = "mes";
                let filtro = {};
                if (etiquetas && etiquetas.length > 0)
                {
                    filtro.etiquetasTiene = etiquetas;
                }
                if (fechaDesde) 
                {
                    filtro.fechaDesde = fechaDesde;
                }
                if (fechaHasta) 
                {
                    filtro.fechaHasta = fechaHasta;
                }

                let conjuntoGastos = filtrarGastos(filtro);
                
                let value = conjuntoGastos.reduce(function(acumulador, gastosFiltrados)
                {
                    let clave = gastosFiltrados.obtenerPeriodoAgrupacion(periodo); 
                    if (!(clave in acumulador))
                    {
                        acumulador[clave] = 0;
                    }
                    acumulador[clave] += gastosFiltrados.valor;
                    return acumulador;
                } , {})
                return value;
            }

        function transformarListadoEtiquetas(stringFormulario){
            let filtroReg = /[.,;: ]/gm
            let arrayEtiquetas = stringFormulario.split(filtroReg)
            return arrayEtiquetas.filter(palabra => palabra != "")
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