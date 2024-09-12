import { vacationsRouter, getVacations, getVacation } from 'src/back-end/api/vacations.ts';

class VacationService {
  async getVacations() {
    try {
      const response = await fetch('/api/vacations');
      return await response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getVacation(id: number) {
    try {
      const response = await fetch(`/api/vacations/${id}`);
      return await response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

const vacationService = new VacationService();

export { vacationService as getVacations, vacationService as getVacation };