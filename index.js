// Pemanggilan package express
const express = require('express');

// Menggunakan package express
const app = express();

// set template engine
app.set('view engine', 'hbs');

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// true => sudah login
// false => belum login
const isLogin = true;

//Membuat Array Object yg akan menyimpan Data blog list
const blogs = [
  {
    projectName: 'Judul',
    startDate: '11 feb',
    endDate: '11 des',
    description: 'Judul',
  },
];
// //bulan
// let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];

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

//add
app.get('/add-project', function (req, res) {
  res.render('add-project');
});

//DELETE list blog
app.get('/delete-project/:index', function (req, res) {
  let index = req.params.index;

  console.log(`Index Data : ${index}`);

  blogs.splice(index, 1);
  res.redirect('/home');
});

//mengambil data dari inputan blog agar bisa di tambahkan di list blog
app.post('/home', function (req, res) {
  let projectName = req.body.projectName;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let description = req.body.description;

  let blog = {
    projectName,
    startDate,
    endDate,
    description,
  };

  blogs.push(blog);
  res.redirect('/home');
});

app.get('/home/:id', function (req, res) {
  let id = req.params.id;
  console.log(`Id dari client : ${id}`);

  res.render('blog-detail', { id: id });
});

app.get('/contact-me', function (req, res) {
  res.render('contact');
});

//konfigurasi port aplikasi
const port = 5000;
app.listen(port, function () {
  console.log(`server running on port ${port}`);
});
