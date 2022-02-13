// Pemanggilan package express
const express = require('express');

// Menggunakan package express
const app = express();

// set template engine
app.set('view engine', 'hbs');

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const isLogin = true;

// Set endpoint
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/home', function (req, res) {
  res.render('home');
});

//memanipulasi data atau menambahkan data ke list blog apabila ada blog baru yg diinput
app.get('/home', function (req, res) {
  console.log(blogs);

  let dataBlogs = blogs.map(function (data) {
    return {
      ...data,
      isLogin: isLogin,
    };
  });

  res.render('home', { isLogin: isLogin, blogs: dataBlogs });
});

//DELETE list blog
app.get('/delete-project/:index', function (req, res) {
  let index = req.params.index;

  console.log(`Index Data : ${index}`);

  blogs.splice(index, 1);
  res.redirect('/home');
});

app.get('/add-project', function (req, res) {
  res.render('add-project');
});
//mengambil data dari inputan blog agar bisa di tambahkan di list blog
app.post('/add-project', function (req, res) {
  let project = req.body.projectName;
  let start = req.body.startDate;
  let end = req.body.endDate;
  let description = req.body.description;

  console.log(`Nama Project: ${project}, 
            Tanggal Mulai: ${start},
            Berakhir Pada: ${end},
            Descripsi: ${description}`);
});

app.get('/home/:id', function (req, res) {
  let id = req.params.id;
  console.log(`Id dari client : ${id}`);

  res.render('blog-project-detail', { id: id });
});

app.get('/contact', function (req, res) {
  res.render('contact');
});

//konfigurasi port aplikasi
const port = 5000;
app.listen(port, function () {
  console.log(`server running on port ${port}`);
});
