import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/user.js'
import postRoutes from './routes/post.js'

dotenv.config();

const app = express();


app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 4000;

app.use('/post', postRoutes)
app.use('/auth', authRoutes)

mongoose.connect(
    process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=> app.listen(PORT, () => console.log(`Server running on ${PORT} and database connected`)))
.catch((error) => console.log(error));

