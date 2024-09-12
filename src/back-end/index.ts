import express, { Application } from 'express';
import { vacationsRouter } from './api/vacations';

const app: Application = express();
app.use(express.json());

app.use('/api/vacations', vacationsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});