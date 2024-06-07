import express from 'express';
import { router } from './routes';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({}));
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
