import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './ContentTabs.css'
import wunderground from '../services/wunderground';
import location from '../services/location';
import foreman from '../services/foreman';

class ContentTabs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current: {
        temp: '',
        feelsLike: '',
        icon: ''
      },
      tenDay: {
        day: '',
        low: '',
        high: '',
        icon: ''
      }
    }
    foreman.getCurrent()
      .then((response) => {
        this.setState({
          current: {
            temp: response.temp + '°',
            feelsLike: response.feelLike + '°',
            icon: response.icon
          }
        })
      })
    
  }

  render(){
    return ( 
      <Tabs className="Tabs"  >
        <h1>{ this.state.location }</h1>
        <TabList>
          <Tab>Current Temperature</Tab>
          <Tab>10 Day Temperatures</Tab>
        </TabList>
        <TabPanel>
          <h2>Current Conditions</h2>
          <h1 className="temp">{ this.state.current.temp }</h1>
          <img src={this.state.current.icon} />
          <h3>Feels like: { this.state.current.feelsLike }</h3>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
          <button onClick= { () => console.log(wunderground.get10DayForecast()) } >Click for More Stuff</button>
        </TabPanel>
      </Tabs>
    )
  }
}

export default ContentTabs;
