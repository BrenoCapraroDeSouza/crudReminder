import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export async function getAllUsers(){
    
    const [rows] = await pool.query('SELECT * FROM usuario');
    return rows;
}

export async function getUserByID(id){
    
    const [rows] = await pool.query(`
    SELECT * 
    FROM usuario
    where id = ?`, [id]);
    if (rows.length == 0) return false
    return rows[0];
}

export async function insertUser(name, email, password){
    
    const [result] = await pool.query(`
    INSERT INTO usuario 
    (name, email, password)
    VALUES (?, ?, ?)`, [name, email, password]);
    return getUserByID(result.insertId);
}

export async function updateUser(id, name, email, password){
        
    await pool.query(`
    UPDATE usuario 
    SET name = ?, email = ?, password = ?
    WHERE id = ?`, [name, email, password, id]);
    return getUserByID(id);
}

export async function deleteUser(id){
    
    console.log(await getUserByID(id))
    await pool.query(`
    DELETE FROM usuario 
    WHERE id = ?`, [id]);
    return true;
}

export async function deleteAllUsers(){
    
    await pool.query(`
    DELETE FROM usuario`);
    return true;
}

export async function checkUserAndPassword(email, password){
        
    const [rows] = await pool.query(`
    SELECT * 
    FROM usuario
    where email = ? and password = ?`, [email, password]);
    console.log(rows);
    return (rows.length > 0) ? true : false; 
}

export async function getaAllCategories(){
    
    const [result] = await pool.query(`
    SELECT * 
    FROM categoria`);
    return result;
}

export async function getCategoryByID(id){
    
    const [result] = await pool.query(`
    SELECT * 
    FROM categoria 
    WHERE id = ?`, [id]);
    if (result.length == 0) return false
    return result[0];
}

export async function insertCategory(name){
    
    const [result] = await pool.query(`
    INSERT INTO categoria 
    (nome)
    VALUES (?)`, [name]);
    return getCategoryByID(result.insertId);
}

export async function updateCategory(id, name){
        
    await pool.query(`
    UPDATE categoria 
    SET nome = ?
    WHERE id = ?`, [name, id]);
    return getCategoryByID(id);
}

export async function deleteCategory(id){
    
    if(getCategoryByID(id) == null) return false;  
    await pool.query(`
    DELETE FROM categoria 
    WHERE id = ?`, [id]);
    return true;
}

export async function deleteAllCategories(){
    
    await pool.query(`
    DELETE FROM categoria`);
    return true;
}



export async function getaAllCompromises(){
    
    const [result] = await pool.query(`
    SELECT * 
    FROM compromisso`);
    return result;
}

export async function getCompromiseByID(id){
    
    const [result] = await pool.query(`
    SELECT * 
    FROM compromisso 
    WHERE id = ?`, [id]);
    if (result.length == 0) return false
    return result[0];
}

export async function insertCompromise(id_user, id_category, title, description, init_date, end_date){
    
    const [result] = await pool.query(`
    INSERT INTO compromisso 
    (id_usuario, id_categoria, titulo, descricao, data_inicio, data_fim)
    VALUES (?, ?, ?, ?, ?, ?)`, [id_user, id_category, title, description, init_date, end_date]);
    return getCompromiseByID(result.insertId);
}

export async function updateCompromise(id, id_user, id_category, title, description, init_date, end_date){
        
    await pool.query(`
    UPDATE compromisso 
    SET id_usuario = ?, id_categoria = ?, titulo = ?, descricao = ?, data_inicio = ?, data_fim = ?
    WHERE id = ?`, [id_user, id_category, title, description, init_date, end_date, id]);
    return getCompromiseByID(id);
}

export async function deleteCompromise(id){
    
    if(getCompromiseByID(id) == null) return false;  
    await pool.query(`
    DELETE FROM compromisso 
    WHERE id = ?`, [id]);
    return true;
}

export async function deleteAllCompromises(){
    
    await pool.query(`
    DELETE FROM compromisso`);
    return true;
}




export async function getaAllReminders(){
    
    const [result] = await pool.query(`
    SELECT * 
    FROM lembrete`);
    return result;
}

export async function getReminderByID(id){
    
    const [result] = await pool.query(`
    SELECT * 
    FROM lembrete 
    WHERE id = ?`, [id]);
    if (result.length == 0) return false
    return result[0];
}

export async function insertReminder(id_compromise, init_date, sound){
    
    const [result] = await pool.query(`
    INSERT INTO lembrete 
    (id_compromisso, data_notificacao, som_notificacao)
    VALUES (?, ?, ?)`, [id_compromise, init_date, sound]);
    return getReminderByID(result.insertId);
}

export async function updateReminder(id,id_compromise, init_date, sound){
        
    await pool.query(`
    UPDATE lembrete 
    SET id_compromisso = ?, data_notificacao = ?, som_notificacao = ?
    WHERE id = ?`, [id_compromise, init_date, sound, id]);
    return getReminderByID(id);
}

export async function deleteReminder(id){
    
    if(getReminderByID(id) == null) return false;  
    await pool.query(`
    DELETE FROM lembrete 
    WHERE id = ?`, [id]);
    return true;
}

export async function deleteAllReminders(){
    
    await pool.query(`
    DELETE FROM lembrete`);
    return true;
}

