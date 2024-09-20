document.addEventListener('DOMContentLoaded', function () {
    // Datos estáticos de ejemplo (nombre de materia y calificación)
    const calificaciones = [
        { materia: 'Programación I', calificacion: 8 },
        { materia: 'Base de Datos I', calificacion: 9 },
        { materia: 'Estadística', calificacion: 7 },
        { materia: 'Ingeniería de Software I', calificacion: 6 },
        { materia: 'Matemática', calificacion: 5 }
    ];

    const recomendaciones = [
        { materia: 'Programación II', prerequisito: 'Programación I' },
        { materia: 'Base de Datos II', prerequisito: 'Base de Datos I' },
        { materia: 'Investigación Operativa', prerequisito: 'Estadística' },
        { materia: 'Ingeniería de Software II', prerequisito: 'Ingeniería de Software I' }
    ];

    // Función para generar recomendaciones basadas en las calificaciones
    function generarRecomendaciones() {
        const listaRecomendaciones = document.getElementById('lista-recomendaciones');
        listaRecomendaciones.innerHTML = ''; // Limpiar la lista

        // Recorrer las recomendaciones
        recomendaciones.forEach(recomendacion => {
            // Verificar si el estudiante tiene una calificación mayor a 6 en la materia previa
            const calificacion = calificaciones.find(c => c.materia === recomendacion.prerequisito);
            if (calificacion && calificacion.calificacion >= 6) {
                const li = document.createElement('li');
                li.textContent = `Te recomendamos matricularte en ${recomendacion.materia} (Prerequisito: ${recomendacion.prerequisito}, Calificación: ${calificacion.calificacion})`;
                listaRecomendaciones.appendChild(li);
            }
        });
    }

    // Generar recomendaciones al cargar la página
    generarRecomendaciones();
});
