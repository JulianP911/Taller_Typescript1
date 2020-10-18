// Importar los recursos Course y dataCourses de los archivos respectivos
import { Course } from "./course.js";
import { dataCourses } from "./dataCourses.js"

// Obtener el elemento con id courses
const coursesTBody: HTMLElement = document.getElementById('courses')!; // Nodo tbody que tiene el id="courses", el ! sirve para quitar la posibilidad de resivir un null o undifined
// Obtener el elementocon id button-filterByName
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
// Obtner el valor que enetra en el inpu con nombre search-box
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
// Obtener elemento con el id total-credits
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`;

// La función renderCoursesInTable lee los datos de un arreglo de objetos curso y finalmente lo despliega en la tabla de cursos actuales (DOM).
function renderCoursesInTable(courses: Course[]): void {
    console.log('Desplegando cursos');
    courses.forEach(c => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${c.name}</td>
                            <td>${c.professor}</td>
                            <td class="text-center">${c.credits}</td>`;
        coursesTBody.appendChild(trElement);
    });
}

// La función getTotalCredits recorre todos los cursos actuales para obtener el total de créditos del estudiante.
function getTotalCredits(courses: Course[]): number {
    let totalCredits = 0;
    courses.forEach(c => {
        totalCredits += c.credits;
    });
    return totalCredits;
}

// La funcion applyFilterByName para obtener el texto de búsqueda, limpiar la tabla y llamar a la búsqueda
function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null)? '' : text;
    clearCoursesInTable();
    let coursesFilteres: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFilteres);
}

// La funcion searchCourseByName que se encarga de ejecutar la búsqueda mediante el uso de filter.
function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
}

// La funcion clearCoursesInTable se encarga de limpiar las celdas de la tablas cuando se hace un filtro
function clearCoursesInTable() {
    while (coursesTBody.hasChildNodes()) {
      if (coursesTBody.firstChild != null) {
        coursesTBody.removeChild(coursesTBody.firstChild);
      }
    }
}