// BASE DE DATOS DE ALMUNOS CON SUS NOTAS EN UN SEMESTRE, TRIMESTRE O CUATRIMESTRE de Jonathan Martinez - Segunda Entrega//


//Funcion encargada de asignarle una letra a la nota final
function calculadorLetra (notas){
    if (notas >= 90){
        return "A";
    }else if ( notas >= 80){
        return "B";
    }else if ( notas >= 70){
        return "C";
    }else if ( notas >= 60){
        return "D";
    }else{
        return "F";
    }
}

//Declaracion de la clase para el objeto que vamos a utilizar
class Alumno {
    constructor(nombre, edad, nota){
        this.nombre = nombre;
        this.edad = edad;
        this.nota = nota;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }
    setEdad(edad){
        this.edad = edad;
    }
    setNota(nota){
        this.nota = nota;
    }
}
function isStudent (estudiante){
    return estudiante.nombre == fieldBusqueda;

}

function elTostyAgregado(){
    Toastify({
        text: "Alumno Agregado!",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style:{
            fontSize:"25px",
            color:"red",
            background:"black"
        }
        }).showToast();
}

// Declaracion del arreglo vacio de objetos

let students = [];

// Declaracion de variables que voy a usar
let opcion = 1;
let fieldBusqueda;
let resultadoBusqueda;
let recuperar_students = localStorage.getItem("students");


//variables de los botones

const btnAgregar = document.getElementById("btn-Agregar");
const btnListaAlumnos = document.getElementById("btn-ListaAlumnos");
const btnFinAgregar = document.getElementById("btn-Finalizar");
const btnSearch = document.getElementById("btn-search");


//variables suplementarias
const agregarContainer = document.getElementById("agregar_wrapper");
const periodosSeleccionados = document.querySelector(".periodos");
const listaAlumnos = document.getElementById("listaAlumnos");
const weather = document.getElementById("weather");
let busquedaForm = document.getElementById("busqueda_wrapper");
let value = periodosSeleccionados.value;
let divActualizar = document.getElementById("divActualizar");
let test = document.getElementById("agregarActualizar");
const agregarPeriodo = document.getElementById("agregar_periodo-wrapper");

//Event listener de los botones

//-------------- Boton de agregar Alumnos --------//
btnAgregar.addEventListener("click", ()=>{
    if (agregarContainer.style.display == 'block'){
        agregarContainer.style.display = 'none';
    } else {
        agregarContainer.style.display = 'block';
    }

});

periodosSeleccionados.addEventListener("change", (e) => {
    value = periodosSeleccionados.value;
    agregarPeriodo.innerHTML = ``;
    for(let i = 0; i <value; i++){
            agregarPeriodo.innerHTML += `
            <div>
                <label for="Nota${i+1}">Nota #${i+1}:</label>
                <input class="notaInput" type="number" placeholder="#" id="nota${i+1}">
            </div>
            `;
    }
})

btnFinAgregar.addEventListener("click", ()=>{
    let name = document.getElementById("task-nombre").value;
    name = name.trim();
    let age = document.getElementById("task-edad").value;
    let todasNotas = document.querySelectorAll(".notaInput");
    let j = 0;
    if(name == "" || age == ""){
        Swal.fire({
            icon: 'error',
            title: 'Valor Incorrecto',
            text: 'Por favor revisar el nombre o la edad',
        });
    }else{
        let notas = 0; 
        for (let [i,nota] of todasNotas.entries()){
            if(nota.value == "" || nota.value < 0 || nota.value > 100){
                //alert("Valor incorrecto en la nota #" + (i+1) );
                Swal.fire({
                    icon: 'error',
                    title: 'Valor Incorrecto',
                    text: 'Por favor revisar la nota #' +(i+1),
                });
                break;
            }else{
                notas+= parseFloat(nota.value);
                j++;
            }
        }
        if(j>=3){
            notas = notas / j;
            recuperar_students = localStorage.getItem("students");
            if(recuperar_students != null){
                students = JSON.parse(recuperar_students);
                let estudiante = new Alumno (name, age, calculadorLetra(notas))
                students.push(estudiante);
                let students_JSON = JSON.stringify(students);
                localStorage.setItem("students", students_JSON);
                elTostyAgregado();
                document.getElementById("task-nombre").value ="";
                document.getElementById("task-edad").value = "";
                for (let nota of todasNotas){
                    nota.value = "";
                }
                agregarContainer.style.display = 'none';
                listaAlumnos.style.display = 'none';
            }else{
                let estudiante = new Alumno (name, age, calculadorLetra(notas))
                students.push(estudiante);
                let students_JSON = JSON.stringify(students);
                localStorage.setItem("students", students_JSON);
                elTostyAgregado();
                document.getElementById("task-nombre").value ="";
                document.getElementById("task-edad").value = "";
                for (let nota of todasNotas){
                    nota.value = "";
                }
                agregarContainer.style.display = 'none';
                listaAlumnos.style.display = 'none';
            }

        }
    }

})

//-------------- Boton de listar Alumnos --------//

btnListaAlumnos.addEventListener("click", ()=>{
    if (listaAlumnos.style.display == 'block'){
        listaAlumnos.style.display = 'none';
    } else {
        recuperar_students = localStorage.getItem("students");
        if(recuperar_students != null){
            listaAlumnos.innerHTML = `
            <div>Nombre --- Edad -- Calificacion</div>`;
            students = JSON.parse(recuperar_students);
            listaAlumnos.style.display = 'block';
            for (let alumno of students){
                listaAlumnos.innerHTML += `
                <div class="alumnoEnLista">
                    <h1>${alumno.nombre}</h1>
                    <h1> --- ${alumno.edad} --- ${alumno.nota}</h1>
                    <button class="borrar_alumno">Borrar</button>
                </div>
                `;
            }
            let btnBorrar = document.querySelectorAll(".borrar_alumno");
            for (let btn of btnBorrar){
                btn.addEventListener("click", (e)=>{
                    Swal.fire({
                        title: 'Esta seguro de borrar este alumno?',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'SI',
                        denyButtonText: 'NO',
                        customClass: {
                        actions: 'my-actions',
                        cancelButton: 'order-1 right-gap',
                        confirmButton: 'order-2',
                        denyButton: 'order-3',
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let padre = e.target.parentNode.children[0].innerText;
                            students = students.filter((person) => person.nombre != padre);
                            let students_JSON = JSON.stringify(students);
                            localStorage.setItem("students", students_JSON);
                            listaAlumnos.style.display = 'none';
                            Swal.fire('Alumno borrado!', '', 'success')
                        } else if (result.isDenied) {
                            listaAlumnos.style.display = 'none';
                            Swal.fire('Alumno no fue borrado!', '', 'error')
                        }
                    })                      
                })
            }
        }
    }

})



//---------------------   Weather   ------------------//

function mostrar_posicion(position){

    let key = "2c15296f7d3dba9fcf5851324432d655";
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=es`)
        .then( response => response.json() )
        .then( data => {
            weather.innerHTML = `<h1>${data.name}</h1>
                                    <p>Temp: ${data.main.temp}</p>
                                    <p>Clima: ${data.weather[0].main} <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></p>`
        })


}
navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state === "granted") {
        geoBtn.style.display = "none";
    }else if (result.state == 'denied') {
        navigator.permissions.query({name:'geolocation'});
    }
});
navigator.geolocation.getCurrentPosition(mostrar_posicion);