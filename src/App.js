import { useEffect } from 'react';
import CalendarView from './components/CalendarView';
import { useDispatch } from 'react-redux';
import dummyData from './data/dummyData';
import { setData } from './redux/calendarSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setData(dummyData));
  }, [dispatch]);

  return <CalendarView />;
}

export default App;
