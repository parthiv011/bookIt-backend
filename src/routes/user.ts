import { Request, Response, Router } from 'express';
import {
  createCabin,
  deleteCabin,
  getCabinData,
  updateCabin,
} from '../controllers/cabin';
import { getSettings, updateSettings } from '../controllers/settings';
import authMiddleware from '../middlewares/auth';
import { getCurrentUser, login, register } from '../controllers/users';
// import {
//   deleteBookings,
//   getBookings,
//   updateBookings,
// } from '../controllers/bookings';
export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json('Hello from user!');
});

// User routes
router.post('/login', login);
router.post('/register', register);
router.get('/me', authMiddleware, getCurrentUser);

// Cabin routes
router.get('/cabins', getCabinData);
router.delete('/cabin/:id', deleteCabin);
router.post('/cabins', createCabin);
router.put('/cabins', updateCabin);

// Setting routes
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Booking routesS
// router.get('/bookings', getBookings);
// router.put('/bookings', updateBookings);
// router.delete('/bookings', deleteBookings);
