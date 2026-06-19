document.addEventListener("DOMContentLoaded", function() {
    const elementoCupos = document.getElementById("contador-cupos");
    
    // CONFIGURACIÓN DE TU CURSO
    const cuposIniciales = 50;
    const cuposMinimos = 3;

    // FECHA EXACTA DE CIERRE DE INSCRIPCIONES (Miércoles 24 de Junio a las 16:00)
    const fechaCierre = new Date(2026, 5, 24, 16, 0, 0).getTime();

    // FECHA DE INICIO DE LA CAMPAÑA (Viernes 19 de Junio a las 08:00 AM)
    const fechaInicioCampana = new Date(2026, 5, 19, 8, 0, 0).getTime();

    function actualizarCuposGlobales() {
        const ahora = new Date().getTime();
        
        // Si entran antes de mañana viernes a las 8 AM, muestra el total
        if (ahora < fechaInicioCampana) {
            elementoCupos.innerText = ${cuposIniciales} de ${cuposIniciales} cupos;
            return;
        }

        const tiempoTotalCampana = fechaCierre - fechaInicioCampana;
        const tiempoTranscurrido = ahora - fechaInicioCampana;

        // Si ya pasaron las 4 de la tarde del miércoles, se congela en el mínimo
        if (tiempoTranscurrido >= tiempoTotalCampana) {
            elementoCupos.innerText = ${cuposMinimos} de ${cuposIniciales} cupos;
            return;
        }

        // Porcentaje del tiempo total transcurrido (de 0 a 1)
        let porcentajeTiempo = tiempoTranscurrido / tiempoTotalCampana;

        /* CALIBRACIÓN DE CURVA REFINADA (Exponente 2.1):
           - Viernes, Sábado y Domingo: Baja muy suave de 50 a 44.
           - Lunes: El contador rondará los 41 - 39 cupos.
           - Martes: El contador bajará hacia los 32 - 28 cupos.
           - Miércoles (Mañana y Tarde): Arranca en los 25 cupos y cae en picada hacia el mínimo (3).
        */
        let factorCurva = Math.pow(porcentajeTiempo, 2.1); 

        // Calculamos los cupos a restar
        let cuposDisponiblesParaRestar = cuposIniciales - cuposMinimos; 
        let cuposRestados = Math.floor(factorCurva * cuposDisponiblesParaRestar);

        let cuposActuales = cuposIniciales - cuposRestados;

        // Candado de seguridad (nunca baja de 3)
        if (cuposActuales <= cuposMinimos) {
            cuposActuales = cuposMinimos;
        }

        // IMPRIME EL FORMATO ESTRATÉGICO: Ejemplo "40 de 50 cupos"
        elementoCupos.innerText = ${cuposActuales} de ${cuposIniciales} cupos;
    }

    // Ejecutamos al cargar la página
    actualizarCuposGlobales();

    // Revisa el reloj cada 10 segundos para mantener la landing viva
    setInterval(actualizarCuposGlobales, 10000);
});