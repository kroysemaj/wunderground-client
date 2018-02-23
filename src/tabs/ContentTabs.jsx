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
      tenDay: [],
      location: ''
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
        { this.state.location }
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
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Low</th>
                <th>High</th>
                <th>Precip.</th>
              </tr>
            </thead>
            <tbody>
              { this.state.tenDay }
            </tbody>
          </table>
        </TabPanel>
      </Tabs>
    )
  }

  renderListItem(forecasts){
    return forecasts.map( (forecast, i) => {
      return (
        <tr key={ `${forecast.period}-${forecast.epoch}` } className="tabs-tr" >
          <td className="tabs-td day">{ forecast.date }</td>
          <td className="tabs-td low">{ forecast.low }</td>
          <td className="tabs-td high">{ forecast.high }</td>
          <td className="tabs-td precip"><img alt={ forecast.iconText } src={forecast.icon} /></td>
        </tr>
      );
    });
  }

  renderLocation(){

  }
}



export default ContentTabs;
