

  import pkg from 'pg';
const { Pool } = pkg;




// Параметры подключения к базе данных
const pool = new Pool({
  user: 'skiesgames',
  host: 'localhost',
  database: 'BDforskiesgames',
  password: 'skiesgames',
  port: 5432, // Порт по умолчанию для PostgreSQL
});

// Функция для выполнения запроса к базе данных и возврата данных в виде массива JSON
  async function fetchData(login,passwordHash) {
  const client = await pool.connect();
  const query = {
    text: 'INSERT INTO public.login (login, password_hash) VALUES ($1, $2)',
    values: [login, passwordHash],
  };

  try {
    await client.query(query);
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    throw err;
  } finally {
    client.release();
  }
}

// Пример использования функции fetchData
export default async function addUser(login,passwordHash){
    const data = await fetchData(login,passwordHash);   
    return data;
  }
  
