import React, { useState, useEffect } from 'react';
import { getVacations } from 'src/front-end/services/vacationService.ts';

interface Vacation {
  id: number;
  name: string;
  description: string;
}

const VacationList: React.FC = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVacations() {
      try {
        const result = await getVacations();
        setVacations(result);
        setError(null);
      } catch (err) {
        setError(`Error fetching vacations: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchVacations();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {vacations.map((vacation) => (
        <li key={vacation.id}>{vacation.name}</li>
      ))}
    </ul>
  );
};

export default VacationList;