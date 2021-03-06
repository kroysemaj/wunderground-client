import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './ContentTabs.css'
import controller from '../controller';

class ContentTabs extends React.Component{
  constructor(props){
    super(props);

    console.log(props);

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

    controller
      .geoLookup()
      .then( (response) => {
        this.setState({
          location: response.city + ", " + response.state
        })
      });

    // controller
    //   .getCurrent()
    //   .then((response) => {
    //     this.setState({
    //       current: {
    //         temp: response.temp + '°',
    //         feelsLike: response.feelLike + '°',
    //         icon: response.icon,
    //         iconText: response.iconText,
    //         umbrella: this.doINeedAnUmbrella(response.umbrellaNeeded)
    //       }
    //     })
    //   });

    controller
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
        <TabList>
          <Tab>Current Temperature</Tab>
          <Tab>10 Day Temperatures</Tab>
        </TabList>
        <TabPanel>
          <h1>{ this.props.location }</h1>
          <h2>Current Conditions</h2>
          <h1 className="temp">{ this.props.current.temp }</h1>
          <img alt={ this.props.current.iconText } src={this.props.current.icon} />
          <h3>Feels like: { this.props.current.feelsLike }</h3>
          <h3>Do I need an umbrella? { this.props.current.umbrella }</h3>
        </TabPanel>
        <TabPanel>
          <h1>{ this.state.location }</h1>
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

  // doINeedAnUmbrella(precipInInches){
  //   return precipInInches > 0 ? "Yes" : "No";
  // }
}



export default ContentTabs;
