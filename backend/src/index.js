import express from 'express'
import cors from 'cors'
import auth from './routes/auth.router.js'
import game from './routes/game.routes.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express()

app.use(cors())
app.use(express.json()) 

const PORT = process.env.PORT || 5000;

app.use('/', auth);
app.use('/', game);

app.listen(PORT, () => {
    console.log(` Server is successfully running on http://localhost:${PORT}`);
});