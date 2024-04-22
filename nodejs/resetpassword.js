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
  async function fetchData(login,newpassword) {
  const client = await pool.connect();
  const query = {
    text: 'UPDATE public.login SET password_hash = $1 WHERE login = $2',
    values: [newpassword, login],
};
console.log(login+ ' ' + newpassword);

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
export default async function resetpassword(login,newpassword){
    const data = await fetchData(login,newpassword);   
    return data;
  }
  
