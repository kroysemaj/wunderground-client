import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './ContentTabs.css'
import foreman from '../services/foreman';

class ContentTabs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current: {
        temp: '',
        feelsLike: '',
        icon: '',
        iconText: ''
      },
      tenDay: {
        day: '',
        low: '',
        high: '',
        icon: '',
        iconText: ''
      }
    }
    foreman
      .getCurrent()
      .then((response) => {
        this.setState({
          current: {
            temp: response.temp + '°',
            feelsLike: response.feelLike + '°',
            icon: response.icon,
            iconText: response.iconText
          }
        })
      });

    foreman
      .get10Day()
      .then( (response) => {
        const tenDayListItems = this.renderListItem(response); 
        this.setState({
          tenDay: tenDayListItems
        });
      });
    
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
          <img alt={ this.state.current.iconText } src={this.state.current.icon} />
          <h3>Feels like: { this.state.current.feelsLike }</h3>
        </TabPanel>
        <TabPanel>
          <h2>10 Day Forecast</h2>
          <ul>
            { this.state.tenDay }
          </ul>
        </TabPanel>
      </Tabs>
    )
  }

  renderListItem(forecasts){
    return forecasts.map( (forecast, i) => {
      return (
        <li key={ `${forecast.period}-${forecast.epoch}` } className="ten-day-forecast" >
          <span className="ten-day-day">{ forecast.day }</span>
          <span className="ten-day-low">{ forecast.low }</span>
          <span className="ten-day-high">{ forecast.high }</span>
          <img alt={ forecast.iconText } src={forecast.icon} />
        </li>
      );
    });
  }
}



export default ContentTabs;
