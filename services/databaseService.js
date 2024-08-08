//creando el servicio
const databaseService = () => {
    const knex = require('knex')({
        client: 'mysql2',
        connection: {
        host : process.env.DB_HOST,
        port : 3306,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB,
    }
  });


  const table = 'asistencia';


  const leerAsistencia = () => {
    return knex(table)
    .select();
  };

  const marcarAsistencia = (qr_alumno, id_estado) =>{
    return knex(table)
    .insert({
      qr_alumno: qr_alumno,
      id_estado: id_estado
    }); //retorna una promesa
  };

  const verificarAsistenciaExistente = (qr_alumno) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Convertir la fecha actual a una cadena en el formato 'YYYY-MM-DD'
    const todayString = today.toISOString().split('T')[0];
    return knex(table)
        .where('qr_alumno', qr_alumno)
        .andWhere('fecha', 'like', `${todayString}%`)
        .then(rows => {
            
            if (rows.length > 0) {
                return true;
            }
         
            return false;
        });
  };
  
  const marcAttendance = (qr_alumno, id_estado) => {
     return knex(table)
    .where({
      qr_alumno: qr_alumno
    })
    .update({
      id_estado: id_estado
    });
  };

  return {
    marcarAsistencia,
    leerAsistencia,
    verificarAsistenciaExistente
    // marcAttendance
  }
};

module.exports = {
  databaseService,
};


module.exports;
