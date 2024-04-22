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
  async function fetchData(login) {
  const client = await pool.connect();
  const query = {
    text: 'SELECT password_hash FROM public.login WHERE login = $1',
    values: [login],
  };

  try {
    const result = await client.query(query);
    return (result.rows)[0];
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    throw err;
  } finally {
    client.release();
  }
}

// Пример использования функции fetchData
export async function getUser(login){
    const data = await fetchData(login);   
    return data;
  }
  
