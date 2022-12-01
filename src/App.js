import logo from './logo.svg';
import './App.css';
import React from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';
import {Tab, Tabs} from '@mui/material';
import Customers from './components/Customers';
import Trainings from './components/Trainings';

function App() {
  const [value, setValue]= React.useState(0)
  const handleTabs = (event, value) => {
    setValue(value)
  }
  return (
    <div className="App">
      <AppBar position ="static">
        
        <Toolbar>
    <Typography variant="h6">
     Personal Trainer
    </Typography>
        </Toolbar>
      </AppBar>
      <Tabs value={value} onChange={handleTabs}>
          <Tab label="Customers 👤"/>
          <Tab label="Trainings 🚴"/>
        </Tabs>
      <TabPanel value={value} index={0}>
      <Customers />
      </TabPanel>

      <TabPanel value={value} index={1}>
      <Trainings />
      </TabPanel>
    </div>
  );
}
  function TabPanel(props){
    const {children, value, index} = props
    return (
    <div>
      {value===index &&(
        <h1>{children}</h1>
      )}
    </div>
    );
  }
export default App;
