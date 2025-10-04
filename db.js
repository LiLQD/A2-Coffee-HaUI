const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',      
  user: 'myuser',          
  password: 'mypassword', 
  database: 'A2-Coffee-HaUI'        
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối:', err.message);
  } else {
    console.log('Kết nối thành công');
  }
});

module.exports = connection;


