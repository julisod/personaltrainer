import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";

import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';

function App() {
  const [nav, setNav] = React.useState("customerlist");

  const handleChange = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    setNav(value);
  };

  return (
    <div>
      {/* Muut hyvät värit: #a16e83, #9b786f, #83677B */}
      <AppBar position="static" style={{ background: '#376e6f' }}>
        <Tabs
          value={nav}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab value="customerlist" label="Customers" icon={<PeopleIcon />} />
          <Tab value="traininglist" label="Trainings" icon={<FitnessCenterIcon />} />
          <Tab value="calendar" label="Calendar" icon={<EventIcon />} />
          <Tab value="statistics" label="Statistics" icon={<BarChartIcon />} />
        </Tabs>
      </AppBar>
      {nav === "customerlist" && <Customerlist />}
      {nav === "traininglist" && <Traininglist />}
      {nav === "calendar" && <Calendar />}
      {nav === "statistics" && <Statistics />}
    </div>
  );
}

export default App;
