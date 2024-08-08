const { request, response } = require("express");
const { marcAttendance , marcarAsistencia,databaseService } = require ('./services/databaseService');

module.exports = function(app, databaseService) {
    app.get('/',(request, response) =>{
        response.json({"mensaje":"Todo bien con el servidor"})
    });

    app.get('/estado', async (request,response) => {
        databaseService.leerAsistencia()
        .then(resultado => {
            response.json(resultado);
        }).catch(e => {
            response.status(500).json({ mensaje: "Ha ocurrido un error al procesar la solicitud" });
        });
    });
    

    // app.post('/postestado', async (request, response) => {
    //     try {
    //       const qralumno = 
          
          
    //       console.log(estado);
      
    //       await databaseService.marcarAsistencia(estado);
      
    //       response.json({ mensaje: "Asistencia registrada" });
    //     } catch (error) {
    //       console.error('Error al marcar asistencia:', error);
    //       response.status(500).json({ mensaje: "Ha ocurrido un error al procesar la solicitud" });
    //     }
    // });


    app.post('/estados', async (request, response) => {
        try {
            const marcar = request.body;
            console.log(marcar);
    
            if (!marcar || !marcar.qr_alumno || !marcar.id_estado) {
                return response.status(400).json({ mensaje: "Se requieren 'qr_alumno' e 'id_estado' en el cuerpo de la solicitud." });
            }
            if (typeof marcar.qr_alumno !== 'number' || typeof marcar.id_estado !== 'number') {
                return response.status(400).json({ mensaje: "'qr_alumno' e 'id_estado' deben ser números." });
            }
    
            // Verificar si ya existe una asistencia para el alumno en la fecha actual
            const asistenciaExistente = await databaseService.verificarAsistenciaExistente(marcar.qr_alumno);
            if (asistenciaExistente) {
                return response.status(400).json({ mensaje: "La asistencia para el alumno ya ha sido marcada hoy." });
            }
    
            await databaseService.marcarAsistencia(marcar.qr_alumno, marcar.id_estado);
    
            response.json({ "mensaje": "Asistencia registrada" });
        } catch (error) {
            response.status(500).json({ mensaje: "Ha ocurrido un error al procesar la solicitud" });
        }
    });
    // <<<<<<<<<<<<<<<<<<Este codigo Funciona>>>>>>>>>>>>>>>>>>>>>>>>>
    // app.post('/estados', async (request, response) => {
    //     try {
    //         const marcar = request.body;
    //         console.log(marcar);

    //         if (databaseService.leerAsistencia()){}

    //         if (!marcar || !marcar.qr_alumno || !marcar.id_estado) {
    //             return response.status(400).json({ mensaje: "Se requieren 'qr_alumno' e 'id_estado' en el cuerpo de la solicitud." });
    //         }
    //         if (typeof marcar.qr_alumno !== 'number' || typeof marcar.id_estado !== 'number') {
    //             return response.status(400).json({ mensaje: "'qr_alumno' e 'id_estado' deben ser números." });
    //         }
        
    //         await databaseService.marcarAsistencia(marcar.qr_alumno, marcar.id_estado);
    
            
    //         response.json({ "mensaje": "Asistencia registrada" });
    //     } catch (error) {
            
    //         response.status(500).json({ mensaje: "Ha ocurrido un error al procesar la solicitud" });
    //     }
    // });
    // <<<<<<<<<<<<<<<<<<Este codigo Funciona>>>>>>>>>>>>>>>>>>>>>>>>>


    // app.post('/estado', (request,response) => {


    //     const estado = request.body;
    //     console.log(estado);
    //     databaseService.marcarAsistencia(estado)
    //     .then(() =>{
    //         response.json({"mensaje": "Asitencia registrada"});
    //     }).catch(e => {
    //         response.status(500).json({ mensaje: "Ha ocurrido un error al procesar la solicitud" });
    //     });
    // }); 

    // app.put('/estado/:idAlumno', async (request, response) => {
    //     try {
    //       const marcar = request.body;
    //       console.log(marcar);
    //       await databaseService.marcAttendance(marcar.idAlumno, marcar.idestado); //aca esta el error nota: cambiar el idAlumno por qr_alumno y idestado por id_estado
    //       response.json({ "mensaje": "Asistencia registrada" });
    //     } catch (error) {
    //       response.status(500).json({ mensaje: "Ha ocurrido un error al procesar la solicitud" });
    //     }
    // });

};