/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/
const input = document.querySelector(".input");
const listaTareas = document.querySelector(".listaTareas");
const tareasCompletadas = document.querySelector(".tareasCompletadas");
const tareasPendientes = document.querySelector(".tareasPendientes");
const incompletas = document.querySelector("#inconpletas");
const todas = document.querySelector("#all");
const completadas = document.querySelector("#completadas");
const descripcion = document.querySelector(".descripcion");
const btnDelete = document.querySelector(".btnDelete");
const addButton = document.querySelector(".btnAdd");

let ultimoId = 0;
todas.addEventListener("click", filterTodas, obtenerTareas);
incompletas.addEventListener("click",filterUncompleted,obtenerTareas );
completadas.addEventListener("click", filterCompleted ,obtenerTareas);
addButton.addEventListener("click", addTask );
btnDelete.addEventListener("click", deleteAll);

// Función para añadir una nueva tarea

function addTask(i) {
  let inputValor = input.value;
  let id = ultimoId;
  let tarea = {
    titulo: inputValor,
    id: id,
    completed: false,
  };

  if (localStorage.getItem("listaTareas") === null) {
    let listaTareas = [];
    listaTareas.push(tarea);
    localStorage.setItem("listaTareas", JSON.stringify(listaTareas));
  } else {
    let listaTareas = JSON.parse(localStorage.getItem("listaTareas"));
    listaTareas.push(tarea);
    localStorage.setItem("listaTareas", JSON.stringify(listaTareas));
  }
 
  obtenerTareas()
  input.value = "";
}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask(event) {
  const checkbox = event.target;
  const taskId = parseInt(checkbox.parentElement.getAttribute("data-id"));
  let tareas = JSON.parse(localStorage.getItem("listaTareas"));

  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].id === taskId) {
      tareas[i].completed = checkbox.checked;
      break;
    }
  }

  localStorage.setItem("listaTareas", JSON.stringify(tareas));
  obtenerTareas() 
}

// Función para borrar una tarea

 function deleteTask(event) {
  
    const erease = event.target
    const taskId = parseInt(erease.parentElement.getAttribute("data-id"));
    let tareas = JSON.parse(localStorage.getItem("listaTareas"));
  
    for (let i = 0; i < tareas.length; i++) {
      if (tareas[i].id == taskId) {
        tareas.splice(i, 1);
        break;
      }
    } 

    localStorage.setItem("listaTareas", JSON.stringify(tareas));
    obtenerTareas() 
  } 
  
 


// Funcion para borrar todas las tareas 
function deleteAll() {
  localStorage.removeItem("listaTareas");
  listaTareas.innerHTML = ``;
}

// Función para filtrar tareas completadas
function filterCompleted() {

  if (completadas.classList.value == "activo") {
    completadas.classList.add("activo");
    
  } else {
    completadas.classList.add("activo");
    todas.classList.remove("activo");
    incompletas.classList.remove("activo");
    btnDelete.classList.remove("oculto");
    descripcion.classList.add("oculto");
    listaTareas.classList.add("oculto");
    tareasCompletadas.classList.remove("oculto");
    tareasPendientes.classList.add("oculto");


  }

  let tareas = JSON.parse(localStorage.getItem("listaTareas"));

  tareasCompletadas.innerHTML = "";
  let tareasCompleted= tareas.filter(tareas=>tareas.completed==true)

  
  for (let i = 0; i < tareasCompleted.length; i++) {
  let titulo = tareasCompleted[i].titulo;
  let marcada = tareasCompleted[i].completed;
  let id= tareasCompleted[i].id
  

 
  tareasCompletadas.innerHTML += `<li class=${marcada?"tachado":""}  data-id="${id}"><input type="checkbox" ${marcada ? "checked" : ""}>${titulo}
  <i class="fa-regular fa-trash-can"></i> </li>`;
  const checkboxes = document.querySelectorAll(".tareasCompletadas input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", completeTask);
  });
   const eliminarUno = document.querySelectorAll(".tareasCompletadas i");
  eliminarUno.forEach((i) => {
    i.addEventListener("click", deleteTask);
  }); 
}
obtenerTareas()

}

// Función para filtrar tareas incompletas
function filterUncompleted() {
  if (incompletas.classList.value == "activo") {
    incompletas.classList.add("activo");
    tareasPendientes.classList.remove("oculto")
    
  } else {
    todas.classList.remove("activo");
    completadas.classList.remove("activo");
    incompletas.classList.add("activo");
    btnDelete.classList.add("oculto");
    descripcion.classList.remove("oculto");
    listaTareas.classList.add("oculto");
    tareasCompletadas.classList.add("oculto")
    tareasPendientes.classList.remove("oculto")
  }

  let tareas = JSON.parse(localStorage.getItem("listaTareas"));

    tareasPendientes.innerHTML = "";
    let tareasUncompleted= tareas.filter(tareas=>tareas.completed==false)
    
    for (let i = 0; i < tareasUncompleted.length; i++) {
    let titulo = tareasUncompleted[i].titulo;
    let marcada = tareasUncompleted[i].completed;
    let id= tareasUncompleted[i].id
    

    tareasPendientes.innerHTML += `<li  data-id="${id}"><input type="checkbox"${marcada ? "checked" : ""}>${titulo}</li>`;
        
    const checkboxes = document.querySelectorAll(".tareasPendientes input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", completeTask , obtenerTareas);
    });
          
  }
  obtenerTareas()
  
  }




function filterTodas() {
  if (todas.classList.value == "activo") {
    todas.classList.add("activo");
    
  } else {
    todas.classList.add("activo");
    completadas.classList.remove("activo");
    incompletas.classList.remove("activo");
    descripcion.classList.remove("oculto");
    btnDelete.classList.add("oculto");
    listaTareas.classList.remove("oculto");
    tareasCompletadas.classList.add("oculto")
    tareasPendientes.classList.add("oculto")
    

  }
}



function obtenerTareas() {
  let tareas = JSON.parse(localStorage.getItem("listaTareas"));

  listaTareas.innerHTML = "";

  for (let i = 0; i < tareas.length; i++) {
    let titulo = tareas[i].titulo;
    let marcada = tareas[i].completed;
    let id = tareas[i].id;
    ultimoId++

    listaTareas.innerHTML += `<li class=${marcada?"tachado":""} id="tarea-${id}" data-id="${id}"><input type="checkbox"${marcada ? "checked" : ""}  >${titulo}</li>`;
  }

  const checkboxes = document.querySelectorAll(".listaTareas input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", completeTask);
  });
  
}

obtenerTareas() 


