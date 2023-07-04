const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3200
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})