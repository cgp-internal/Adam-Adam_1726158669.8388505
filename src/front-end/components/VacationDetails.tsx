import React, { useState, useEffect } from 'react';
import { getVacation } from '../services/vacationService.ts';

interface VacationDetailsProps {
  id: number;
}

const VacationDetails: React.FC<VacationDetailsProps> = ({ id }) => {
  const [vacation, setVacation] = useState(null);

  useEffect(() => {
    const fetchVacation = async () => {
      try {
        const vacation = await getVacation(id);
        setVacation(vacation);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVacation();
  }, [id]);

  if (!vacation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{vacation.name}</h2>
      <p>{vacation.description}</p>
    </div>
  );
};

export default VacationDetails;