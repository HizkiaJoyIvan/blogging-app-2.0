const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3200
const authRoutes = require('./routes/authRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})