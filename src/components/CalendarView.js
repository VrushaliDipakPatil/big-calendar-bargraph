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
    allDay: true
  }));

  const handleSelect = (slotInfo) => {
    const selected = moment(slotInfo.start).format("DD-MM-YYYY");
    dispatch(setSelectedDate(selected));
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

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelect}
        views={['month', 'week', 'day']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: '50px' }}
        dayPropGetter={dayPropGetter}
      />
      <BarGraphModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default CalendarView;
