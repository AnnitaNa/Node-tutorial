import express from 'express'
import * as UserController from './src/controllers/UserController.js';
import {db} from './src/models/index.js'; 

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

app.get('/', UserController.getAll)
app.get('/:id', UserController.getById)
app.post('/', UserController.create)
app.put('/:id', UserController.update)
app.delete('/:id', UserController.remove)



// db.sequelize.sync() //creates table if it doesn't already exists
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   })



app.listen('3000', () => {
    console.log('listening...')
})



