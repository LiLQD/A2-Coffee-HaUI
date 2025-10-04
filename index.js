const express = require('express');
const app = express();
const port = 3000;

const db = require('./db'); 

app.get('/', (req, res) => {
  db.query('SELECT * FROM NGUOI_DUNG', (err, results) => {
    if (err) {
      res.status(500).send('Lỗi truy vấn database: ' + err.message);
    } else {
      res.json(results);
      console.log("Dữ liệu người dùng:", results);
    }
  });
});


app.listen(port, () => {
  console.log(`App chạy ở http://localhost:${port}`);
});
