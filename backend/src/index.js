import express from 'express';

const app = express();

app.listen(50001, () => {
  console.log('Server is running on port 50001');
});