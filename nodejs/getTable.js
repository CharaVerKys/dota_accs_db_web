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
  async function fetchData() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT id, active, mmr, match, behavior, login, mmr_rate, cost, contrib FROM public.accs');
    return result.rows;
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err);
    throw err;
  } finally {
    client.release();
  }
}

// Пример использования функции fetchData
export async function getTable(){
    const data = await fetchData();   
    return data;
  }
  

