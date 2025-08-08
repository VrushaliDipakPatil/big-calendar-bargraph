import { Modal, Box, Typography, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, LabelList } from 'recharts';

const style = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)', width: 450,
  bgcolor: 'background.paper', boxShadow: 24, p: 4,
  borderRadius: 3
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
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
          {selectedDate || 'No Date Selected'}
        </Typography>
        {chartData.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="value" fill="#1976d2" radius={[8, 8, 0, 0]}>
                <LabelList dataKey="value" position="top" style={{ fill: '#333', fontWeight: 500 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Alert severity="warning" sx={{ mt: 2 }}>No data found for the selected date.</Alert>
        )}
      </Box>
    </Modal>
  );
}

export default BarGraphModal;
