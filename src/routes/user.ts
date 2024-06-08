import { Request, Response, Router } from 'express';
import { createCabin, deleteCabin, getCabinData } from '../controllers/cabin';
export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json('Hello from user!');
});

router.get('/cabins', getCabinData);
router.delete('/cabin/:id', deleteCabin);
router.post('/cabins', createCabin);
