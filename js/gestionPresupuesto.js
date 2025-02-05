
// TODO: Variable global


"use strict";

let presupuesto = 0;
 let gastos=[];
 let idGasto = 0;

function actualizarPresupuesto(dinero)
{
   if (typeof dinero ==="number" && dinero > 0 ){
 
        return presupuesto = dinero;
 
    }else
    {
       console.log("-1");
       return -1;
    }
    // TODO
    
}
 
function mostrarPresupuesto()
{
    return (`Tu presupuesto actual es de ${presupuesto} €`);
    // TODO
}


function CrearGasto(descripcion,valor ,fecha= Date.now(), ...etiquetas )
 { 
    

    this.descripcion = descripcion;
    this.etiquetas=[...etiquetas]
    

    if (typeof fecha ==="string" && !isNaN(Date.parse(fecha)))
    {
        this.fecha =Date.parse(fecha);

    }else  {
        this.fecha=fecha;
    }
      
        if (typeof valor ==="number" && valor >= 0)
        {
            this.valor =valor;
        }else{
            this.valor=0;
        }

        this.mostrarGasto = function() 
        {
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
        }

        this.actualizarDescripcion =function(nuevaDescripcion)
        {
            this.descripcion = nuevaDescripcion
        }

        this.actualizarValor =function(nuevoValor)
        {
            if (typeof nuevoValor ==="number" && nuevoValor >= 0){
                this.valor=nuevoValor
            }
        }

         this.mostrarGastoCompleto = function()
         {
            let fechaAuxiliar1;
            let auxiliar="";

            for(let etiqueta of this.etiquetas) 
            {
                auxiliar += `- ${etiqueta}\n`;
            };

            if(typeof this.fecha === 'string')
            {
                fechaAuxiliar1 = Date.parse(this.fecha);
                
            }else{

                fechaAuxiliar1=this.fecha;
            }

            let fechaAuxiliar2 =new Date(fechaAuxiliar1);

            let mensaje = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fechaAuxiliar2.toLocaleString())}\nEtiquetas:\n`+ auxiliar);
            return mensaje;
        }

        this.actualizarFecha=function(fechaDada)
        {
            let fechaActual=Date.parse(fechaDada);
            this.fecha =(!isNaN(fechaActual)) ? fechaActual : this.fecha;
        }

        this.anyadirEtiquetas = function(...etiquetas) 
        {
            
            let value=[];
            for (let i = 0; i < etiquetas.length; i++)
            {
                value.push(etiquetas[i]);

               if (this.etiquetas.includes(etiquetas[i])) 
                {
                  value.pop();
                }

            }

            this.etiquetas.push(...value);
        }

        this.borrarEtiquetas = function(...etiquetas) 
        {
            for (let i = 0; i < etiquetas.length; i++)
            {
                for (let j = 0; j < this.etiquetas.length; j++) 
                {
                    if (this.etiquetas[j] === etiquetas[i]) 
                    {
                        this.etiquetas.splice(j, 1);
                    }
                }
            }
        }

        this.obtenerPeriodoAgrupacion = function (periodo)
        {
            let fecha=new Date(this.fecha);
            let mesSumado=(fecha.getMonth()+1)
            if (typeof periodo ==="string") 
            {
                if(periodo == "dia")
                {
                    if( fecha.getDate()< 10)
                    {
                        if(fecha.getMonth() <9)
                        {
                            return (fecha.getFullYear()+"-0"+mesSumado+"-0"+fecha.getDate());

                        }else{
                            return (fecha.getFullYear()+"-"+mesSumado+"-0"+fecha.getDate());
                        }
                      
                    }else{

                        if(fecha.getMonth() <9){
                            return (fecha.getFullYear()+"-0"+mesSumado+"-"+fecha.getDate());
                        }else{
                            return (fecha.getFullYear()+"-"+mesSumado+"-"+fecha.getDate());
                        }
                        
                    }
                 
                }
                if(periodo =="mes"){
                    if(mesSumado < 10){
                        return (fecha.getFullYear()+"-0"+mesSumado);
                    }else{
                        return (fecha.getFullYear()+"-"+mesSumado);
                    }
                }

                if(periodo == "anyo"){
                    return (fecha.getFullYear());
                }
            }
           

        }


    // TODO
}

function listarGastos(){
    return gastos; 
}



function anyadirGasto(gasto) 
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
    for (let i =0 ; i< gastos.length ; i++){

        if (gastos[i].id== id)
        {
            gastos.splice(i,1);
        
        }
    }
    
}

function calcularTotalGastos(){
    let totalGasto =0;
    for (let i =0 ; i< gastos.length ; i++)
    {
            totalGasto += gastos[i].valor
        
    }
    return totalGasto;
}



function calcularBalance(){
    let totalGasto= calcularTotalGastos();
    let balance = presupuesto - totalGasto;
    return balance;
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene})
{
   
   
    let gastosCorrectos = gastos.filter(function(gasto)
    {
        let valido = true;
     if(fechaDesde)
     {
         if(gasto.fecha < Date.parse(fechaDesde))
         {
            valido = false;
         }
     }
 
     if(fechaHasta)
     {
         if(gasto.fecha > Date.parse(fechaHasta))
         {
            valido = false;
         }
     }
 
     if(valorMinimo)
     {
         if(gasto.valor < valorMinimo)
         {
            valido = false;
         }
     }
 
     if(valorMaximo)
     {
         if(gasto.valor > valorMaximo)
          {
            valido = false;
          }
     }
 
     if(descripcionContiene)
     {
             if(!gasto.descripcion.includes(descripcionContiene))
             {
                valido = false;
             }
 
     }
 
     if(etiquetasTiene)
     {
           
         let tiene = false;
        for (let i = 0; i < gasto.etiquetas.length; i++)
        {                  
            for (let j= 0; j < etiquetasTiene.length; j++)
            {
                if(gasto.etiquetas[i] == etiquetasTiene[j])
                {
                    tiene = true;          
                }      
            }
        }
 
        if(tiene == false)
        {
            valido = false;
        }
     }
         return valido;
 
    });
 
 
return gastosCorrectos;  
 
}




function agruparGastos(periodo = "mes" , etiquetas, fechaDesde, fechaHasta) //Pasamos funci
{
    let gastoAfiltrar= {fechaHasta : fechaHasta, fechaDesde : fechaDesde,etiquetasTiene : etiquetas};

    let gastosFiltrados = filtrarGastos(gastoAfiltrar);

    let reducido = gastosFiltrados.reduce((acc, item) => 
    {
                let fechaObtenida = item.obtenerPeriodoAgrupacion(periodo);

                if (acc[fechaObtenida] == null)
                {
                    acc[fechaObtenida] = item.valor;
                } else 
                {
                    acc[fechaObtenida] += item.valor;
                }

                return acc;
            
    }, {});
    
    return reducido;
}


function transformarListadoEtiquetas(etiquetas) {

    let arrayetiquetas = etiquetas.match(/[a-z0-9]+/gi);
    return arrayetiquetas;
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
    calcularTotalGastos ,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos

   
}