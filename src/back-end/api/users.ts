import express, { Router } from 'express';
import { userService } from '../services/userService';

const router: Router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await userService.registerUser(username, password, email);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.loginUser(username, password);
    if (user) {
      res.send(user);
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to login user' });
  }
});

export { router as usersRouter };