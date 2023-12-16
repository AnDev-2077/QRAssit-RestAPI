const { request, response } = require("express");
const { marcAttendance ,databaseService } = require ('./services/databaseService');

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


    app.put('/estado/:idAlumno', async (request, response) => {
        try {
          const marcar = request.body;
          console.log(marcar);
          await databaseService.marcAttendance(marcar.idAlumno, marcar.idestado); //aca esta el error nota: cambiar el idAlumno por qr_alumno y idestado por id_estado
          response.json({ "mensaje": "Asistencia registrada" });
        } catch (error) {
          response.status(500).json({ mensaje: "Ha ocurrido un error al procesar la solicitud" });
        }
    });

};