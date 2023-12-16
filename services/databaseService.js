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
    return knex(table).select();
  };

  // const marcarAsistencia = (qr_alumno, id_estado) =>{
  //   return knex(table)
  //   .insert({
  //     qr_alumno: qr_alumno,
  //     id_estado: id_estado
  //   }); //retorna una promesa
  // };

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
    // marcarAsistencia,
    leerAsistencia,
    marcAttendance
  }
};

module.exports = {
  databaseService,
};


module.exports;
