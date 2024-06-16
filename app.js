import express from 'express'
const app = express()
import {getAllUsers, getUserByID, insertUser, updateUser, deleteUser, deleteAllUsers, 
  getCategoryByID, getaAllCategories, insertCategory, updateCategory, deleteCategory, deleteAllCategories,
getReminderByID, getCompromiseByID, getaAllReminders, getaAllCompromises, insertReminder,
insertCompromise, updateReminder, updateCompromise,deleteReminder, deleteCompromise, deleteAllReminders, 
deleteAllCompromises} from './database.js'

app.use(express.json())
const port = process.env.PORT


// CRUD DOS USUARIOS
app.post ('/users/', async(req, res) => {
  try {
    const {name, email, password} = req.body
    const user = await insertUser(name, email, password)
    console.log(user)
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
});


app.get ('/users/', async(req, res) => {
    try {
      const users = await getAllUsers()
      res.status(200).send(users)
    } catch (error) {
      res.status(500).send(error.message)
    }
});

app.get ('/users/:id', async(req, res) => {
  try {
    const id = req.params.id
    const user = await getUserByID(id)
    if (user == false) res.status(404).send('User not found')
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.patch ('/users/:id', async(req, res) => {
  try {
    const id = req.params.id
    const check = await getUserByID(id)
    if (check == false) res.status(404).send('User not found')
    const {name, email, password} = req.body
    const user = await updateUser(id, name, email, password)
    console.log(user)
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.delete ('/users/:id', async(req, res) => {
  try {
    const id = req.params.id
    const check = await getUserByID(id)
    if (check == false) res.status(404).send('User not found')
    await deleteUser(id)
    res.status(200).send('usuario deletado com sucesso')
  } catch (error) {
    res.status(500).send(error.message)
  }
});



//CRUD DAS CATEGORIAS
app.post ('/categories/', async(req, res) => {
  try {
    const {nome} = req.body
    const category = await insertCategory(nome)
    console.log(category)
    res.status(200).send(category)
  } catch (error) {
    res.status(500).send(error.message)
  }
});


app.get ('/categories/', async(req, res) => {
    try {
      const categories = await getaAllCategories()
      res.status(200).send(categories)
    } catch (error) {
      res.status(500).send(error.message)
    }
});

app.get ('/categories/:id', async(req, res) => {
  try {
    const id = req.params.id
    const category = await getCategoryByID(id)
    if (category == false) res.status(404).send('Category not found')
    res.status(200).send(category)
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.patch ('/categories/:id', async(req, res) => {
  try {
    const id = req.params.id
    const check = await getCategoryByID(id)
    if (check == false) res.status(404).send('Category not found')
    const {nome} = req.body
    const category = await updateCategory(id, nome)
    console.log(category)
    res.status(200).send(category)
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.delete ('/categories/:id', async(req, res) => {
  try {
    const id = req.params.id
    const check = await getCategoryByID(id)
    if (check == false) res.status(404).send('Category not found')
    await deleteCategory(id)
    res.status(200).send('categoria deletada com sucesso')
  } catch (error) {
    res.status(500).send(error.message)
  }
});


//CRUD COMPROMISES
app.post ('/compromises/', async(req, res) => {
  try {
    const {id_usuario, id_categoria, titulo, descricao, data_inicio, data_fim} = req.body
    const compromise = await insertCompromise(id_usuario, id_categoria, titulo, descricao, data_inicio, data_fim)
    console.log(compromise)
    res.status(200).send(compromise)
  } catch (error) {
    res.status(500).send(error.message)
  }
});


app.get ('/compromises/', async(req, res) => {
    try {
      const compromises = await getaAllCompromises()
      res.status(200).send(compromises)
    } catch (error) {
      res.status(500).send(error.message)
    }
});

app.get ('/compromises/:id', async(req, res) => {
  try {
    const id = req.params.id
    const compromise = await getCompromiseByID(id)
    if (compromise == false) res.status(404).send('Compromise not found')
    res.status(200).send(compromise)
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.patch ('/compromises/:id', async(req, res) => {
  try {
    const id = req.params.id
    const check = await getCompromiseByID(id)
    if (check == false) res.status(404).send('Compromise not found')
    const {id_usuario, id_categoria, titulo, descricao, data_inicio, data_fim} = req.body
    const compromise = await updateCompromise(id, id_usuario, id_categoria, titulo, descricao, data_inicio, data_fim)
    console.log(compromise)
    res.status(200).send(compromise)
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.delete ('/compromises/:id', async(req, res) => {
  try {
    const id = req.params.id
    const check = await getCompromiseByID(id)
    if (check == false) res.status(404).send('Compromise not found')
    await deleteCompromise(id)
    res.status(200).send('compromisso deletado com sucesso')
  } catch (error) {
    res.status(500).send(error.message)
  }
});


//CRUD REMINDERS
app.post ('/reminders/', async(req, res) => {
  try {
    const {id_compromisso,data_notificacao, som_notificacao} = req.body
    const reminder = await insertReminder(id_compromisso,data_notificacao, som_notificacao)
    console.log(reminder)
    res.status(200).send(reminder)
  } catch (error) {
    res.status(500).send(error.message)
  }
});


app.get ('/reminders/', async(req, res) => {
    try {
      const reminders = await getaAllReminders()
      res.status(200).send(reminders)
    } catch (error) {
      res.status(500).send(error.message)
    }
});

app.get ('/reminders/:id', async(req, res) => {
  try {
    const id = req.params.id
    const reminder = await getReminderByID(id)
    if (reminder == false) res.status(404).send('Reminders not found')
    res.status(200).send(reminder)
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.patch ('/reminders/:id', async(req, res) => {
  try {
    const id = req.params.id
    const check = await getReminderByID(id)
    if (check == false) res.status(404).send('Reminder not found')
    const {id_compromisso,data_notificacao, som_notificacao} = req.body
    const reminder = await updateReminder(id, id_compromisso,data_notificacao, som_notificacao)
    console.log(reminder)
    res.status(200).send(reminder)
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.delete ('/reminders/:id', async(req, res) => {
  try {
    const id = req.params.id
    const check = await getReminderByID(id)
    if (check == false) res.status(404).send('Reminder not found')
    await deleteReminder(id)
    res.status(200).send('lembrete deletado com sucesso')
  } catch (error) {
    res.status(500).send(error.message)
  }
});


//DEFAULT CONFIGS

app.use((err, req, resp, next) => {
  console.error(err.stack)
  resp.status(500).send('Something broke!')
});

app.listen(port, () => {
  try {
      console.log(`Server running at http://localhost:${port}`) 
  } catch (error) {
    res.status(500).send(error.message)
  }
});