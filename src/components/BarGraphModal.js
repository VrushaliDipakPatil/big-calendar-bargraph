// src/components/BarGraphModal.js
import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  Alert,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useSelector } from "react-redux";

const BarGraphModal = ({ open, handleClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { selectedDate, data } = useSelector((state) => state.calendar);

  const chartData = (data[selectedDate] || []).map((item) => {
    const [key, value] = Object.entries(item)[0];
    return { name: key, value };
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : "600px",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 2,
          outline: "none",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
            {selectedDate}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Chart */}
        {chartData.length > 0 ? (
          <Box sx={{ width: "100%", height: isMobile ? 250 : 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#4caf50" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Alert severity="warning">
            No data found for the selected date.
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default BarGraphModal;
