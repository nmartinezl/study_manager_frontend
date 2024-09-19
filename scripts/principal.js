document.addEventListener('DOMContentLoaded', function() {
    // Desactivar la función de retroceso del navegador para evitar el cierre de sesión accidental
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };

    // Obtener la lista de carreras al cargar la página
    fetchCarreras();

    // Función para actualizar el título según la vista
    function updateTitle(carrera, anio, materia) {
        document.getElementById('carrera-title').style.display = carrera ? 'block' : 'none';
        document.getElementById('anio-title').style.display = anio ? 'block' : 'none';
        document.getElementById('materia-title').style.display = materia ? 'block' : 'none';
    }

    // Función para obtener las carreras desde el backend
    function fetchCarreras() {
        fetch('https://backendstudymanager-production.up.railway.app/carreras')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las carreras');
                }
                return response.json();
            })
            .then(data => {
                const carreraList = document.getElementById('carrera-list');
                carreraList.innerHTML = ''; // Limpiar la lista

                data.forEach(carrera => {
                    const li = document.createElement('li');
                    li.textContent = carrera.nombre;
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', () => fetchAnios(carrera.id));  // Agregar manejador de eventos
                    carreraList.appendChild(li);
                });

                // Mostrar el contenedor de carreras y ocultar los demás
                updateTitle(true, false, false);  // Mostrar título de carreras
                document.getElementById('anio-container').style.display = 'none';
                document.getElementById('materia-container').style.display = 'none';
                document.getElementById('matriculacion-container').style.display = 'none';
                document.getElementById('carrera-list').style.display = 'block';
                document.getElementById('backToCarreras').style.display = 'none';
                document.getElementById('backToAnios').style.display = 'none';
            })
            .catch(error => console.error('Error al obtener carreras:', error));
    }

    // Función para obtener los años de una carrera
    function fetchAnios(carreraId) {
        fetch(`https://backendstudymanager-production.up.railway.app/anios/${carreraId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los años');
                }
                return response.json();
            })
            .then(data => {
                const anioContainer = document.getElementById('anio-container');
                const anioList = document.getElementById('anio-list');
                anioList.innerHTML = ''; // Limpiar la lista de años

                data.forEach(anio => {
                    const li = document.createElement('li');
                    li.textContent = `Año ${anio}`;
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', () => fetchMaterias(carreraId, anio));  // Agregar manejador de eventos
                    anioList.appendChild(li);
                });

                // Mostrar el contenedor de años y ocultar el de carreras
                updateTitle(false, true, false);  // Mostrar título de años
                anioContainer.style.display = 'block';
                document.getElementById('carrera-list').style.display = 'none';
                document.getElementById('materia-container').style.display = 'none';
                document.getElementById('matriculacion-container').style.display = 'none';
                document.getElementById('backToCarreras').style.display = 'block';
                document.getElementById('backToAnios').style.display = 'none';
            })
            .catch(error => console.error('Error al obtener años:', error));
    }

    // Función para obtener las materias de un año específico de una carrera
    function fetchMaterias(carreraId, anio) {
        fetch(`https://backendstudymanager-production.up.railway.app/materias/${carreraId}/${anio}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las materias');
                }
                return response.json();
            })
            .then(data => {
                const materiaContainer = document.getElementById('materia-container');
                const materiaList = document.getElementById('materia-list');
                materiaList.innerHTML = ''; // Limpiar la lista de materias

                data.forEach(materia => {
                    const li = document.createElement('li');
                    li.textContent = `${materia.nombre} (${materia.cuatrimestre} Cuat.)`;
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', () => showEnrollment(materia.nombre)); // Matricularse en la materia
                    materiaList.appendChild(li);
                });

                // Mostrar el contenedor de materias y ocultar los de carreras y años
                updateTitle(false, false, true);  // Mostrar título de materias
                materiaContainer.style.display = 'block';
                document.getElementById('carrera-list').style.display = 'none';
                document.getElementById('anio-container').style.display = 'none';
                document.getElementById('matriculacion-container').style.display = 'none';
                document.getElementById('backToCarreras').style.display = 'none';
                document.getElementById('backToAnios').style.display = 'block';
            })
            .catch(error => console.error('Error al obtener materias:', error));
    }

    // Función para mostrar la matriculación en una materia
    function showEnrollment(materiaNombre) {
        const matriculacionContainer = document.getElementById('matriculacion-container');
        matriculacionContainer.style.display = 'block';
        document.getElementById('carrera-list').style.display = 'none';
        document.getElementById('anio-container').style.display = 'none';
        document.getElementById('materia-container').style.display = 'none';
        document.getElementById('backToCarreras').style.display = 'none';
        document.getElementById('backToAnios').style.display = 'none';
        alert(`Estás a punto de matricularte en: ${materiaNombre}`);
    }

    // Manejador para cerrar sesión
    document.getElementById('logoutButton').addEventListener('click', function() {
        window.location.href = 'login.html';
    });

    // Manejadores para los botones "Volver"
    document.getElementById('backToCarreras').addEventListener('click', function() {
        fetchCarreras(); // Volver a la lista de carreras
    });

    document.getElementById('backToAnios').addEventListener('click', function() {
        document.getElementById('anio-container').style.display = 'block';
        document.getElementById('materia-container').style.display = 'none';
        document.getElementById('backToAnios').style.display = 'none';
        updateTitle(false, true, false);  // Mostrar título de años al volver
    });
});


// Función para matricularse en una materia
function enrollInMateria(materiaId) {
    fetch('https://backendstudymanager-production.up.railway.app/matricular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuarioId, materiaId })  // Enviar usuarioId y materiaId al backend
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al matricularse en la materia');
        }
        return response.text();
    })
    .then(data => {
        alert('Has sido matriculado con éxito en la materia seleccionada.');  // Mostrar un mensaje de éxito
        fetchCarreras();  // Volver a la lista de carreras
    })
    .catch(error => console.error('Error al matricularse:', error));
}