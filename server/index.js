const app = require('./server');

app.listen(port, host, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});