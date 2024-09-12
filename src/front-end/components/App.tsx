import React from 'react';
import Header from './Header';
import Footer from './Footer';
import VacationList from './VacationList';
import VacationDetails from './VacationDetails';

interface AppState {
  currentVacationId: number | null;
}

const App: React.FC = () => {
  const [state, setState] = React.useState<AppState>({
    currentVacationId: null,
  });

  const handleVacationSelect = (id: number) => {
    setState({ currentVacationId: id });
  };

  return (
    <div>
      <Header title="Vacation Planner" />
      {state.currentVacationId ? (
        <VacationDetails id={state.currentVacationId} />
      ) : (
        <VacationList onVacationSelect={handleVacationSelect} />
      )}
      <Footer />
    </div>
  );
};

export default App;