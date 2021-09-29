const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', (req, res, next) => {
  res.send('You should log in to enter!');
});

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', upload.single('file'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const { fieldname, filename } = req.file;
  console.log(req.body, req.file);

  if (author && sender && title && message && fieldname) {
    res.render('contact', { isSent: true, fileName: filename });
  } else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname + `/public/404.png`));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
