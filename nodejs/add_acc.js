import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'skiesgames',
    host: 'localhost',
    database: 'BDforskiesgames',
    password: 'skiesgames',
    port: 5432, // Порт по умолчанию для PostgreSQL
});


function convertToBoolean(value) {
    return value === '1' ? true : false;
}
async function fetchData(data) {


    const client = await pool.connect();

    try {
        const result = await client.query("SELECT MAX(id) AS last_id FROM public.accs;");
        var last_id_var = (result.rows[0].last_id) + 1;

       

        // Преобразовываем строки в объекты Date
let provideDate = new Date(data.provide_date);
let createDate = new Date(data.create_date);

// Добавляем один день к каждой дате
provideDate.setDate(provideDate.getDate() + 1);
createDate.setDate(createDate.getDate() + 1);

// Преобразовываем обратно в формат строки, если это необходимо
let newProvideDate = provideDate.toISOString().split('T')[0];
let newCreateDate = createDate.toISOString().split('T')[0];

        const query = {
            text: 'INSERT INTO public.accs (id, active, mmr, "match", behavior, login, mmr_rate, cost, extra, screenshot, acc_id, provide_date, create_date, login_who_add, contrib) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
            values: [
                last_id_var,
                convertToBoolean(data.active),
                data.mmr,
                data.match,
                data.behavior,
                data.login,
                data.mmr_rate,
                data.cost,
                data.extra,
                data.screenshot,
                data.acc_id,
                newProvideDate,
                newCreateDate,
                data.login_who_add,
                data.contrib
            ],
        };
       const result2 =  await client.query(query);
    } catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        throw err;
    } finally {
        client.release();
    }
}


// Пример использования функции fetchData
export async function add_acc(body) {
    const data = await fetchData(body);
    return data;
}




