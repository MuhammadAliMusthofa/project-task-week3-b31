// Pemanggilan package express
const express = require('express');
const { is, get } = require('express/lib/request');

// import db connection
const db = require('./connection/db');

// const multer = reqire('multer');
// Menggunakan package express
const app = express();

// //setup multer file
// const fileStorage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().getTime() + '-' + file.originalname);
//   },
// });

// //memfilter extensi image yg di upload
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image.jpeg') {
//     cb(null, true); //jika errornya null, maka terima(true)
//   } else {
//     cb(null, false);
//   }
// };
// set template engine
app.set('view engine', 'hbs');

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

// true => sudah login
// false => belum login
const isLogin = true;

//Membuat Array Object yg akan menyimpan Data blog list
const blogs = [
  {
    projectName: 'Judul',
    startDate: 'statrt',
    endDate: 'end',
    duration: 'durasi',
    description: 'Judul',

    // differenceTime,
    // differenceDay,
    // differenceMonth: '1 bulan',
  },
];
// //bulan
// let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];

// Set endpoint
app.get('/', function (req, res) {
  res.send('Hello World');
});

//memanipulasi data atau menambahkan data ke list blog apabila ada blog baru yg diinput
app.get('/home', function (req, res) {
  let query = 'SELECT * FROM tb_projects';
  console.log(blogs);
  db.connect((err, client, done) => {
    if (err) throw err;

    client.query(query, (err, result) => {
      done();

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

//add
app.get('/add-project', function (req, res) {
  res.render('add-project');
});

//DELETE list blog
app.get('/delete-project/:index', function (req, res) {
  let index = req.params.index;

  // console.log(`Index Data : ${index}`);

  blogs.splice(index, 1);
  res.redirect('/home');
});

//mengambil data dari inputan blog agar bisa di tambahkan di list blog
app.post('/home', function (req, res) {
  let projectName = req.body.projectName;
  let startDate = new Date(req.body.startDate);
  let endDate = new Date(req.body.endDate);
  let description = req.body.description;
  // let image = req.file.path;
  // image = URL.createObjectURL(image.files[index]);
  let duration = new Date(endDate) - new Date(startDate);

  let blog = {
    projectName,
    startDate,
    endDate,
    duration: getDurationTime(duration),
    description,
    // image,
  };

  blogs.push(blog);
  res.redirect('/home');
});

// //UPDATE PROJECT
// app.get('/edit-project/:index', function (req, res) {
//   let dataUpdate = req.params.index;
//   blogs.indexOf(dataUpdate, 1);
//   res.render('update-project');
//   //blom selesai
//   app;
// });

// app.post('/edit-project', function (req, res) {
//   let projectName = req.body.projectName;
//   let startDate = new Date(req.body.startDate);
//   let endDate = new Date(req.body.endDate);
//   let description = req.body.description;
//   // let image = req.file.path;
//   // image = URL.createObjectURL(image.files[index]);
//   let duration = new Date(endDate) - new Date(startDate);

//   let blog = {
//     projectName,
//     startDate,
//     endDate,
//     duration: getDurationTime(duration),
//     description,
//     // image,
//   };

//   blogs.fill(blog, 1);
//   res.redirect('/home');
// });

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

function getDurationTime(duration) {
  const miliseconds = 1000;
  const secondsInMinutes = 60;
  const minutesInHours = 60;
  const secondsInHours = secondsInMinutes * minutesInHours;
  const hoursInDay = 24;

  let timeDuration = new Date(duration);

  let dayDuration = timeDuration / (miliseconds * secondsInHours * hoursInDay);

  if (dayDuration >= 30) {
    return Math.floor(dayDuration / 30) + ' Months';
  } else {
    return Math.floor(dayDuration) + ' Days';
  }
}
