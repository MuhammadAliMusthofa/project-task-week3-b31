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
// const blogs = [
//   {
//     projectName: 'Judul',
//     startDate: 'Judul',
//     endDate: 'Judul',
//     description: 'Judul',
//   },
// ];
//bulan
// let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];

// Set endpoint
app.get('/', function (req, res) {
  res.send('Hello World');
});

// app.get('/home', function (req, res) {
//   res.send(`<script> alert('Ini adalah halaman home')</script>`);
// });
// app.get('/add-project', function (req, res) {
//   res.send(`<script> alert('Tambahin Project yuk !!')</script>`);
//   // console.log('kamu sedand berada di hLmN add');
// });
// app.get('/contact', function (req, res) {
//   // res.send(`<script> alert('MAu colab?? contact aja aku isi di bawah!!!')</script>`);
//   console.log('kamu sedand berada di hLmN contact');
// });

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

// //add
// app.get('/add-blog', function (req, res) {
//   res.render('form-blog');
// });

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
  // let blog = {
  //   project: project,
  //   start,
  //   end,
  //   description,
  // };

  // blogs.push(blog);
  // res.redirect('/home');
  // res.redirect('/add-project');
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

// function getFullTime(time) {
//   let date = time.getDate();
//   let monthIndex = time.getMonth();
//   let year = time.getFullYear();

//   let hours = time.getHours();
//   let minutes = time.getMinutes();

//   return ` ${date} ${month[monthIndex]}  ${year} ${hours}:${minutes} WIB`;
// }
