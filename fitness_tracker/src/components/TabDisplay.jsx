import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RoutinesDisplay from './RoutinesDisplay';
import ExercisesDisplay from './ExercisesDisplay';
import styles from '../module_CSS/TabDisplay.module.css';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Todo: need to add swipe for mobile
function TabDisplay() {
  const [value, setValue] = useState(0);
  const [todayWorkout, setTodayWorkout] = useState([]); // State to hold today's workout, init empty array

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to add a routine to today's workout and switch to the "Today's Workout" tab
  const handleAddToTodayWorkout = (routine) => {
    setTodayWorkout(routine.exercises); // Add routine exercises to today's workout
    setValue(1); // Switch to "Today's Workout" tab
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#121212' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{ indicator: styles.tabIndicator }}
          aria-label="Routines and Today's Workout Tab"
          centered={true}
        >
          <Tab
            className={`${styles.tabRoot} ${value === 0 ? styles.selectedTab : styles.unselectedTab} ${styles.hoverTab}`}
            label="Routines"
            {...a11yProps(0)}
          />
          <Tab
            className={`${styles.tabRoot} ${value === 1 ? styles.selectedTab : styles.unselectedTab} ${styles.hoverTab}`}
            label="Today's Workout"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <RoutinesDisplay onAddToTodayWorkout={handleAddToTodayWorkout} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <ExercisesDisplay exercises={todayWorkout} />
      </CustomTabPanel>
    </Box>
  );
}

export default TabDisplay