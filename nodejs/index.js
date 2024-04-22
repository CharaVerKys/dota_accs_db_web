import express from 'express';
import { getTable } from './getTable.js';
import cors from 'cors';
import { getExtra } from './getExtra.js';
import multer from 'multer';
import { add_acc } from './add_acc.js';
import { deleteById } from './deleteById.js';
import { changeActive } from './changeActive.js';
import authenticateToken from './authenticateToken.js';
import resetpassword from './resetpassword.js';
import cookieParser from 'cookie-parser';
import { hostname, port } from './consts.js';
import { getUser } from './getUser.js';
import jwt from 'jsonwebtoken';
import addUser from './addUser.js';

const upload = multer();
const app = express();

app.use(cors({ origin: ['https://' + hostname, 'http://' + hostname, 'http://' + hostname + ':8080'],credentials: true }));

app.use(cookieParser());






app.get('/table',async (req, res) => {
  try {

    //   const limit = req.query.limit || 100;






    const data = await getTable(); // Получаем массив JSON из функции getTable
    res.json(data); // Отправляем массив JSON клиенту
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});





app.post('/changeActive', authenticateToken, express.json(), async (req, res) => {

  const { id } = req.body;


  try {
    await changeActive(id);
    res.json({ log: 'logged' });
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});


app.post('/add_acc', authenticateToken, upload.none(), async (req, res) => {


  try {
    await add_acc(req.body);
    res.json({ data: 'Данные успешно вставленны!' });
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});


app.post('/extra', express.json(), async (req, res) => {
  const { id } = req.body;
  try {
    const data = await getExtra(id); // Получаем массив JSON из функции getTable
    res.json(data); // Отправляем массив JSON клиенту
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});


app.post('/login', express.json(), async (req, res) => {
  const { login, password_hash } = req.body;

  // Проверка наличия пользователя в базе данных
  const user = await getUser(login);

  if (!user || !(password_hash === user.password_hash)) {
    return res.status(401).json({ success: false });
  }

  // Генерация JWT токена
  const token = jwt.sign({ login: login }, 'mysecretkey', { expiresIn: '30d' });


  // Сохранение токена в куки
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  console.log(res.getHeaders());

  res.json({ success: true});
});



app.post('/resetpassword', express.json(), async (req, res) => {
  const { login, oldPassword, newPassword } = req.body;
// Проверка наличия пользователя в базе данных
  const user = await getUser(login);
  

  if (!user || !(oldPassword === user.password_hash)) {
    return res.status(401).json({ success: false });
  }

await resetpassword(login,newPassword);


  res.json({ success: res.getHeaders() });
});





app.post('/adduser', express.json(), async (req, res) => {
  const { login, password,master_key } = req.body;

  if(!login || !password || !(master_key==="powered_by_Chara_VerKys")){
    return res.status(401).json({ success: false });
  }
  res.status(200).send();



await addUser(login,password);


});













app.post('/delete', authenticateToken, express.json(), async (req, res) => {
  const { id } = req.body;


  try {
    await deleteById(id);
    res.json({ log: 'notlogged' });

  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});



// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});



/*

const privateKey = fs.readFileSync('путь/файл.key', 'utf8');
const certificate = fs.readFileSync('путь/файл.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => {
  console.log('start');
});

*/
