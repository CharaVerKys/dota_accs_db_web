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
    text: 'SELECT extra, screenshot, create_date, provide_date, acc_id, contrib, mmr, "match",behavior,cost, login, mmr_rate FROM public.accs WHERE id = $1',
    values: [id],
  };








  try {
    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    throw err;
  } finally {
    client.release();
  }
}

// Пример использования функции fetchData
export async function getExtra(id){
    const data = await fetchData(id);   
    return data;
  }
  

