let coches = [
    {matricula:"ABC1", color:"RoJo"},
    {matricula:"ABC2", color:"verde"},
    {matricula:"ABC3", color:"azul"},
    {matricula:"ABC4", color:"rOjO"},
]

function agruparPorColor(coches)
{
    let result =  coches.reduce(function(acumulador, coche)
    {
        coche.color = coche.color.toLowerCase()
        let valor = coche.color
        acumulador["total"] = coches.length;
        if(!acumulador[valor])
        {
            acumulador[valor] = {cuenta : 1, listado : [coche]}
        }
        else
        {
            acumulador[valor].cuenta += 1;
            acumulador[valor].listado.push(coche);
        }
        return acumulador
    }, {})
    return result;
}

let prueba = agruparPorColor(coches);
console.log(JSON.stringify(prueba, null, 4))