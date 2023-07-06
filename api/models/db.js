const Pool = require('pg').Pool

const pool = new Pool({
    connectionString: "postgres://default:7W4hVkYSUIHn@ep-twilight-dream-887691-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb" + "?sslmode=require",
})

module.exports = pool