document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    // Inicializar FullCalendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Muestra el calendario mensual
        locale: 'es', // Cambiar idioma a español
        events: [
            {
                title: 'Examen de Matemáticas',
                start: '2024-09-25'
            },
            {
                title: 'Entrega de Proyecto',
                start: '2024-09-28'
            },
            {
                title: 'Reunión con el profesor',
                start: '2024-09-30'
            }
        ]
    });

    // Renderizar el calendario
    calendar.render();

    // Mostrar el formulario para agregar una tarea
    document.getElementById('btn-agregar-tarea').addEventListener('click', function () {
        document.getElementById('agregar-tarea-form').style.display = 'block';
    });

    // Manejar la creación de una nueva tarea
    document.getElementById('agregar-tarea-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar el envío del formulario

        const tarea = document.getElementById('tarea').value;
        const fecha = document.getElementById('fecha').value;

        if (tarea && fecha) {
            // Agregar la nueva tarea al calendario
            calendar.addEvent({
                title: tarea,
                start: fecha
            });

            // Limpiar el formulario
            document.getElementById('tarea').value = '';
            document.getElementById('fecha').value = '';
            document.getElementById('agregar-tarea-form').style.display = 'none';
        }
    });
});


