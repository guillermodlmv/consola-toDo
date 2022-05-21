require('colors');

console.clear();
const { 
  inquirerMenu, 
  pausa, 
  leerInput,
  listadoTareaBorrar,
  confirmar,
  mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDb, leerDb } = require('./helpers/guardarArchivo')



const main = async () => {

  let opcion = '';
  //Se crea una nueva constante basado en la clase Tareas
  const tareas = new Tareas();

  //Trae las tareas de nuestra DB
  const tareasDB = leerDb();

  if( tareasDB ){
    tareas.cargarTareasArray( tareasDB );
  }

  do{
    //Imprime el menu de opciones y la pregunta
    opcion = await inquirerMenu();
    
    //Switch para los casos de preguntas y distintas funcionalidades
    switch(opcion) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTareas(desc);

      break;

      case '2':
        tareas.listadoCompleto();
      break;

      case '3':
        tareas.listarPendientesCompletadas(true);
      break;

      case '4':  
      tareas.listarPendientesCompletadas(false);
      break;

      case '5':
        const ids = await mostrarListadoChecklist( tareas.listadoArray );
        tareas.toggleCompletadas(ids);
      break;

      case '6':
        const id = await listadoTareaBorrar( tareas.listadoArray );
        if( id !== 0){
          const ok = await confirmar(' ¿En verdad quieres eliminar esta tarea?')
          if( ok  ){
            tareas.borrarTarea( id );
            console.log('La tarea ha sido eliminada.')
          }
        }
      break;

      case '0':
        
      break;
    }

    //Almacena en nuestra db las tareas creadas
    guardarDb(tareas.listadoArray);

    console.log('\n');

    //Pausa la app imprimiento "Presiona Enter para continuar"
    await pausa( opcion );
    
  //Se detiene el while cuando el usuario selecciona la opcion 0
  }while(opcion !== '0');
}

main();