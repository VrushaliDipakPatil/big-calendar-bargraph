import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../redux/calendarSlice';
import { useState } from 'react';
import BarGraphModal from './BarGraphModal';

const localizer = momentLocalizer(moment);

function CalendarView() {
  const dispatch = useDispatch();
  const { data, selectedDate } = useSelector(state => state.calendar);
  const [modalOpen, setModalOpen] = useState(false);

  const events = Object.entries(data).map(([date, users]) => ({
    title: `Users: ${users.length}`,
    start: moment(date, "DD-MM-YYYY").toDate(),
    end: moment(date, "DD-MM-YYYY").toDate(),
    allDay: true,
    userCount: users.length
  }));

  const openModalForDate = (date) => {
    const formatted = moment(date).format("DD-MM-YYYY");
    dispatch(setSelectedDate(formatted));
    setModalOpen(true);
  };

  const dayPropGetter = (date) => {
    if (moment(date).format("DD-MM-YYYY") === selectedDate) {
      return {
        style: {
          backgroundColor: '#9a9bed',
          border: '2px solid #9a9bed'
        }
      };
    }
    return {};
  };

  const eventPropGetter = (event) => {
    let backgroundColor = '#3f51b5';
    if (event.userCount >= 5) backgroundColor = '#4caf50';
    else if (event.userCount >= 4) backgroundColor = '#ff9800';
    else backgroundColor = '#f44336';

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        color: 'white',
        border: 'none',
        padding: '2px 6px',
        fontSize: '0.85rem',
        fontWeight: '500',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        cursor: 'pointer' 
      }
    };
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={(slotInfo) => openModalForDate(slotInfo.start)} 
        onSelectEvent={(event) => openModalForDate(event.start)} 
        views={['month', 'week', 'day']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: '50px' }}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
      />
      <BarGraphModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default CalendarView;
