const { v4: uuidv4 } = require('uuid');

//Se crea la clase Tarea
class Tarea {
  id = '';
  descripcion = '';
  completadoEn = null;

  //Se inicializa la clase asignando un id generado con uuidv4 y una descripcion que recibe el constructor.
  constructor( { descripcion } ){
    this.id = uuidv4();
    this.descripcion = descripcion;
  }
}

module.exports = Tarea;