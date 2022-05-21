const inquirer = require('inquirer');
require('colors');

/**
 * Se crea el objeto que requiere inquirer para funcionar, en donde se le asigna el tipo list para hacer un listad,
 * se le da el nombre de opcion (Con este podras traer el input del usuario), se imprime un mensaje en este caso
 * de tipo pregunta y en choices se dan las opciones disponibles para que seleccione el usuario, estas son objetos
 * que incluyen un value que es el valor que se va a almacenar con la seleccion del usuario y un name que es la
 * opcion que aparecera en la vista del mismo.
 */
const menuOptions = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer? \n',
    choices: [
      {
        value : '1',
        name: `${'1.'.green} Crear tarea`
      },
      {
        value : '2',
        name: `${'2.'.green} Listar tareas`
      },
      {
        value : '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value : '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value : '5',
        name: `${'5.'.green} Completar tarea(s)`
      },
      {
        value : '6',
        name: `${'6.'.green} Borrar tarea`
      },
      {
        value : '0',
        name: `${'0.'.green} Salir`
      },
    ]
  }
];


//Imprime titulo de selecciona una opcion, imprime el listado que se creo anteriormente y retorna la seleccion del usuario.
const inquirerMenu = async () => {

  console.clear();

  console.log('=============================='.green);
  console.log('     Seleccione una opcion'.white);
  console.log('==============================\n'.green);

  const { opcion } = await inquirer.prompt(menuOptions);
  return opcion
}

//Es un inquirer de tipo input el cual sirve para pausar hasta que el usuario de un input o solo seleccione enter.
const pausa = async () => {
  const pausaPrompt = [{
      type: 'input',
      name: 'pausa',
      message: `Presione ${'Enter'.green } para continuar \n`,
  }]

  await inquirer.prompt(pausaPrompt)
}

/**
 * Es un inquirer de tipo pregunta el cual envia un mensaje al usuario, este puede validar el input del usuario sin
 * dejarlo avanzar hasta que cumpla con lo requerido, al final se retorna el input del usuario.
*/
const leerInput = async ( message ) => {
  const questions = [
    {
      type: 'question',
      name: 'descripcion',
      message,
      validate(value) {
        if(value.length === 0) {
          return 'Por favor inserte un valor'
        }
        return true;
      }
    }
  ]

  const { descripcion } = await inquirer.prompt(questions);
  return { descripcion };
}

//Despliga listado de todas las tareas disponibles, toma el id de la que selecciones y lo retorna.
const listadoTareaBorrar = async ( lista = [] ) => {
  let idx= 0;
  choices = lista.map( ({ id, descripcion, completadoEn }) => {
    idx++;
    return {
      value : id, 
      name : `${ (idx + '.').green } ${ descripcion }`
    }; 
  })
  choices.unshift({value : 0, name : `${ (0 + '.').green } Cancelar`})
  let prompt = [{
    type: 'list',
    name: 'id',
    message: '¿Qué tarea desea eliminar?',
    choices
  }];

  const { id } = await inquirer.prompt(prompt);
  return id;

} 

//Mensaje de confirmacion para eliminar una tarea
const confirmar = async ( message ) => {
  const question =[ {
    type: 'confirm',
    name: 'ok',
    message
  }]

  const { ok } = await inquirer.prompt(question);
  return ok;
}

//Se muestra listado de tipo checklist para listado de completar tareas
const mostrarListadoChecklist = async ( lista = [] ) => {
  let idx= 0;

  choices = lista.map( ({ id, descripcion, completadoEn }) => {
    idx++;
    return {
      value : id, 
      name : `${ (idx + '.').green } ${ descripcion }`,
      checked : completadoEn ? true : false
    }; 
  });

  let pregunta = [{
    type: 'checkbox',
    name: 'ids',
    message: '¿Selecciones',
    choices
  }];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;

} 

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  mostrarListadoChecklist
}