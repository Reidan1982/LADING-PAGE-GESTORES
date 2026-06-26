document.addEventListener("DOMContentLoaded", function() {
    const elementoCupos = document.getElementById("contador-cupos");
    
    // CONFIGURACIÓN DE TU CURSO
    const cuposIniciales = 50;
    const cuposMinimos = 3;

    // FECHA EXACTA DE CIERRE (Miércoles 01 de Julio a las 15:30)
    const fechaCierre = new Date(2026, 6, 01, 15, 3, 0).getTime();

    // FECHA DE INICIO DE LA CAMPAÑA (Viernes 19 de Junio a las 08:00 AM)
    const fechaInicioCampana = new Date(2026, 5, 26, 8, 0, 0).getTime();

    function actualizarCuposGlobales() {
        if (!elementoCupos) return; // Seguridad por si no encuentra el ID

        const ahora = new Date().getTime();
        
        // Antes de la campaña
        if (ahora < fechaInicioCampana) {
            elementoCupos.innerText = `${cuposIniciales} de ${cuposIniciales} cupos`;
            return;
        }

        const tiempoTotalCampana = fechaCierre - fechaInicioCampana;
        const tiempoTranscurrido = ahora - fechaInicioCampana;

        // Después del cierre
        if (tiempoTranscurrido >= tiempoTotalCampana) {
            elementoCupos.innerText = `${cuposMinimos} de ${cuposIniciales} cupos`;
            return;
        }

        let porcentajeTiempo = tiempoTranscurrido / tiempoTotalCampana;
        let factorCurva = Math.pow(porcentajeTiempo, 2.1); 

        let cuposDisponiblesParaRestar = cuposIniciales - cuposMinimos; 
        let cuposRestados = Math.floor(factorCurva * cuposDisponiblesParaRestar);

        let cuposActuales = cuposIniciales - cuposRestados;

        if (cuposActuales <= cuposMinimos) {
            cuposActuales = cuposMinimos;
        }

        // AQUÍ ESTABA EL ERROR: Usamos backticks (`) para que las variables funcionen
        elementoCupos.innerText = `${cuposActuales} de ${cuposIniciales} cupos`;
    }

    actualizarCuposGlobales();
    setInterval(actualizarCuposGlobales, 10000);
});
