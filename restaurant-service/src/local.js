const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

port = process.env.PORT;
host = process.env.HOST;

app.listen(port, host, () => {
  console.log(`Server on port http://${host}:${port}`);
});
