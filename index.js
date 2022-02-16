// Pemanggilan package express
const express = require('express');
const { is, get } = require('express/lib/request');

// import db connection
const db = require('./connection/db');

// Menggunakan package express
const app = express();

// set template engine
app.set('view engine', 'hbs');

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// true => sudah login
// false => belum login
const isLogin = true;

// //bulan
// let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];

// Set endpoint
app.get('/', function (req, res) {
  res.send('Hello World');
});

//add
app.get('/add-project', function (req, res) {
  if (!isLogin) {
    res.redirect('/home');
  }

  res.render('add-project');
});

//memanipulasi data atau menambahkan data ke list blog apabila ada blog baru yg diinput
app.get('/home', function (req, res) {
  let query = 'SELECT * FROM tb_project ORDER BY id DESC';

  //menghubungkan dengan database,jika err kirim pesan err, jika tidak maka lanjut query
  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (err, result) => {
      done(); //done artinya melepas atau merilis

      if (err) throw err;
      let data = result.rows;

      data = data.map((blog) => {
        return {
          ...blog,

          isLogin: isLogin,
        };
      });

      res.render('home', { isLogin: isLogin, blogs: data });
    });
  });
});

//mengambil data dari inputan blog agar bisa di tambahkan di list blog
app.post('/home', function (req, res) {
  let { projectName, startDate, endDate, description } = req.body;

  // let duration = new Date(endDate) - new Date(startDate);

  let blog = {
    projectName,
    startDate,
    endDate,
    // duration: getDurationTime(duration),
    description,
    image: 'image.jpg',
  };
  db.connect((err, client, done) => {
    if (err) throw err;

    let query = `INSERT INTO tb_project(projectName, startDate, endDate, description, image) VALUES
    ('${blog.projectName}', ${blog.startDate}, ${blog.endDate}, '${blog.image}')`;

    client.query(query, (err, result) => {
      done();
      if (err) throw err;

      res.redirect('/home');
    });
  });
});

//nampilin blog-detail nya
app.get('/home/:id', function (req, res) {
  // let id = req.params.id
  let { id } = req.params;

  db.connect((err, client, done) => {
    if (err) throw err;

    let query = `SELECT * FROM tb_project WHERE id=${id}`;
    client.query(query, (err, result) => {
      done();
      if (err) throw err;

      result = result.rows[0];
      res.render('blog-project-detail', { blog: result });
    });
  });
});

//DELETE list blog
app.get('/delete-project/:id', function (req, res) {
  let { id } = req.params;

  db.connect((err, client, done) => {
    if (err) throw err;

    let query = `DELETE FROM tb_project WHERE id=${id}`;

    client.query(query, (err, result) => {
      done();
      if (err) throw err;

      res.redirect('/home');
    });
  });
});

//UPDATE PROJECT, tahap get:mendapatkan id mana dari project yg mau di update
app.get('/update-project/:id', function (req, res) {
  let { id } = req.params;

  //koneksi gengan database
  db.connect((err, client, done) => {
    //jika ada error maka berikan error
    if (err) throw err;

    //jalankan query database
    let query = `SELECT * FROM tb_project WHERE id=${id}`;

    client.query(query, (err, result) => {
      done();
      if (err) throw err;

      result = result.rows[0];

      res.render('project-update', { blog: result });
    });
  });
});

//UPDATE PROJECT, tahap post:mengembalikan data yang telah diupdate ke halaman home
app.post('/update-project/:id', function (req, res) {
  let { id } = req.params;
  let { projectName, startDate, endDate, description } = req.body;

  let query = `UPDATE tb_project SET title='${projectName}', Start=${startDate}, end=${endDate}, description='${description}' WHERE id=${id}`;

  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (err, result) => {
      done();
      if (err) throw err;

      res.redirect('/home');
    });
  });
});

app.get('/contact-me', function (req, res) {
  res.render('contact');
});

//konfigurasi port aplikasi
const port = 5000;
app.listen(port, function () {
  console.log(`server running on port ${port}`);
});

// function getDurationTime(duration) {
//   const miliseconds = 1000;
//   const secondsInMinutes = 60;
//   const minutesInHours = 60;
//   const secondsInHours = secondsInMinutes * minutesInHours;
//   const hoursInDay = 24;

//   let timeDuration = new Date(duration);

//   let dayDuration = timeDuration / (miliseconds * secondsInHours * hoursInDay);

//   if (dayDuration >= 30) {
//     return Math.floor(dayDuration / 30) + ' Months';
//   } else {
//     return Math.floor(dayDuration) + ' Days';
//   }
// }
