import express from 'express';
import path from 'path';
import cors from 'cors';

import { router } from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({}));

const dataPath = path.join(__dirname, '..', 'data');
console.log(dataPath);
app.use('/data', express.static(dataPath));

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
