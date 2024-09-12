import express, { Router } from 'express';
import { createVacation, getVacations, getVacation, updateVacation, deleteVacation } from '../services/vacationService';

const vacationsRouter = Router();

vacationsRouter.post('/', async (req, res) => {
  const { title, description, startDate, endDate } = req.body;
  try {
    const id = await createVacation(title, description, startDate, endDate);
    res.status(201).send({ id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to create vacation' });
  }
});

vacationsRouter.get('/', async (req, res) => {
  try {
    const vacations = await getVacations();
    res.status(200).send(vacations);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to get vacations' });
  }
});

vacationsRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const vacation = await getVacation(id);
    if (!vacation) {
      res.status(404).send({ message: 'Vacation not found' });
    } else {
      res.status(200).send(vacation);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to get vacation' });
  }
});

vacationsRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, startDate, endDate } = req.body;
  try {
    const changes = await updateVacation(id, title, description, startDate, endDate);
    if (changes === 0) {
      res.status(404).send({ message: 'Vacation not found' });
    } else {
      res.status(200).send({ message: 'Vacation updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to update vacation' });
  }
});

vacationsRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const changes = await deleteVacation(id);
    if (changes === 0) {
      res.status(404).send({ message: 'Vacation not found' });
    } else {
      res.status(200).send({ message: 'Vacation deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to delete vacation' });
  }
});

export { vacationsRouter, getVacations, getVacation };