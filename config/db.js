const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'user1',
    password: 'patito123',
    database: 'librosdb'
});

connection.connect(error => {
    if (error){
        console.error('Error de conexion' , error);
        return;
    }else{
        console.log('Conexión establecida!!!');
    }
});


module.exports = connection;