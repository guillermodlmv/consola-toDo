const Tarea = require("./tarea");
require('colors');

// Se crea la clase Tareas
class Tareas {

  _listado = {};

  //Se crea constructor y se inicializa _listado como objeto vacio.
  constructor() {
    this._listado = {};
  }

  borrarTarea = ( id ) => {
    if(this._listado[id]){
      delete this._listado[id];
    }
  }

  //Recibe array con tareas y las mapea para almacenarlas en _listado
  cargarTareasArray = ( tareas = [] ) => {
    tareas.forEach( tarea => {
      this._listado[tarea.id] = tarea;
    })
  }

  //Se crea metodo get para los datos, estos se iteran basados en su key y este almacena en un array las tareas existentes y las retorna.
  get listadoArray() {
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      listado.push(this._listado[key]);
    });
    return listado;
  }

  /*
  Funcion dentro de la clase que sirve para crear una nueva tarea basada en la clase "Tarea", esta tarea
  posteriormente es almacenada en el objeto de "_listado" utilizando su id como clave.
  */
  crearTareas( descripcion = '' ) {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  //Envia console log de todas las actividades con su estado completada o pendiente.
  listadoCompleto = () => {
    console.log();
    this.listadoArray.forEach( ( tarea , id ) => {
      const { descripcion, completadoEn }= tarea;
      let estado = completadoEn 
                ? 'Completada'.green
                : 'Pendiente'.red;
      let idx = id + 1;
      console.log(` ${ idx }. ${ descripcion } :: ${ estado }`)
    })

  }

  /*Recibe parametro booleano para retornar en caso de true las tareas Completades 
  y false las Pendientes
  */
  listarPendientesCompletadas = ( completadas = true ) => {
    console.log();
    let id = 1;
    this.listadoArray.forEach( tarea => {
      const { descripcion, completadoEn }= tarea;
      let estado = completadoEn 
                ? 'Completada'.green
                : 'Pendiente'.red;
      
      if( completadoEn ){
        if( completadas ) {
          console.log(` ${ (id+ '.').green } ${ descripcion } :: ${ completadoEn.green }`);
          id++
        };
      }else{
        if(!completadas ) {
          console.log(` ${ (id + '.').green } ${ descripcion } :: ${ estado }`);
          id++
      };
      }
      
    })
  }

  //Recibe un arreglo de id, lo recorre y setea completada/pendiente la acitivdad segun sea el caso
  toggleCompletadas( ids = []){

    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArray.forEach( tarea => {
      if( !ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null;
      }
    })

  }
}

module.exports = Tareas;