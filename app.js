import express from 'express'
const app = express()
import {getAllUsers, getUserByID, insertUser, updateUser, deleteUser, deleteAllUsers, 
  getCategoryByID, getaAllCategories, insertCategory, updateCategory, deleteCategory, deleteAllCategories,
getReminderByID, getCompromiseByID, getaAllReminders, getaAllCompromises, insertReminder,
insertCompromise, updateReminder, updateCompromise,deleteReminder, deleteCompromise, deleteAllReminders, 
deleteAllCompromises} from './database.js'

app.use(express.json())
const port = process.env.PORT


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


app.get ('/users', async(req, res) => {
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
    const {name, email, password} = req.body
    const user = await updateUser(id, name, email, password)
    console.log(user)
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
});





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