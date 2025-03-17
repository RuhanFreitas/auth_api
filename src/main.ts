import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/routes'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/user', authRouter.router)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
