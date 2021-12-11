import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";

function App() {
  const [nav, setNav] = React.useState("traininglist");

  const handleChange = (event, value) => {
    setNav(value);
  };

  return (
    <div>
      {/* tähän vaihtaa värin */}
      <AppBar position="static" style={{ background: '#8456b3' }}>
        <Tabs
          value={nav}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab value="customerlist" label="Customers" />
          <Tab value="traininglist" label="Trainings" />
        </Tabs>
      </AppBar>
      {nav === "customerlist" && <Customerlist />}
      {nav === "traininglist" && <Traininglist />}
    </div>
  );
}

export default App;
