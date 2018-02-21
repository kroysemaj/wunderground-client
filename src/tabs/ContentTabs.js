import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './ContentTabs.css'
import wunderground from '../services/wunderground';

export default () => ( 
  <Tabs className="Tabs">
    <TabList>
      <Tab>Current Temperature</Tab>
      <Tab>10 Day Temperatures</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
      <button onClick= { () => console.log(wunderground.getCurrentForecast()) } >Click for Stuff</button>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
      <button onClick= { () => console.log(wunderground.get10DayForecast()) } >Click for More Stuff</button>
    </TabPanel>
  </Tabs>
);