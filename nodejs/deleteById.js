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
  async function fetchData(id) {
  const client = await pool.connect();


  const query = {
    text: 'DELETE FROM public.accs WHERE id = $1',
    values: [id],
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
export async function deleteById(id){
    const data = await fetchData(id);   
    return data;
  }
  

