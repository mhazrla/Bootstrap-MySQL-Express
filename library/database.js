const mysql = require('mysql')

const connection = mysql.createConnection({
    host:        'localhost',
    user:        'root',
    password:    '',
    database:    'simak'
})

connection.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Koneksi Berhasil!');
      console.log('Listening at http://localhost:3001');
    }
  })
 
 module.exports = connection; 