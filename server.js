const IP = 'localhost'
const PORT = 80

const app = require('./src/app')

app.listen(PORT, IP, () => console.log(`Server listening request on http://${IP}:${PORT}`))