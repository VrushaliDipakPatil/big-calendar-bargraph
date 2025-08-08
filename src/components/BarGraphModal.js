import { Modal, Box, Typography, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const style = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)', width: 400,
  bgcolor: 'background.paper', boxShadow: 24, p: 4,
};

function BarGraphModal({ open, onClose }) {
  const { selectedDate, data } = useSelector(state => state.calendar);
  const selectedData = data[selectedDate] || [];

  const chartData = selectedData.map(item => {
    const [key, value] = Object.entries(item)[0];
    return { name: key, value };
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">{selectedDate}</Typography>
        {chartData.length ? (
          <BarChart width={350} height={300} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        ) : (
          <Alert severity="warning">No data found for the selected date.</Alert>
        )}
      </Box>
    </Modal>
  );
}

export default BarGraphModal;
