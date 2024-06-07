import { Request, Response, Router } from 'express';
import { deleteCabin, getCabinData } from '../controllers/user';
export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json('Hello from user!');
});

router.get('/cabins', getCabinData);
router.delete('/cabin/:id', deleteCabin);
