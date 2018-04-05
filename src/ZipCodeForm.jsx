import React from 'react';
import ContentTabs from './tabs/ContentTabs';
import controller from './controller';

class ZipCodeForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      zipCode: '48184',
      current: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleChange(event){
    this.setState({
      zipCode: event.target.value
    });
  }

  handleClick(event){
    controller
      .getCurrent(this.state.zipCode)
      .then((response) => {
        console.log('we made it', response);
        this.setState({
          current: {
            temp: response.temp + '°',
            feelsLike: response.feelLike + '°',
            icon: response.icon,
            iconText: response.iconText,
            umbrella: this.doINeedAnUmbrella(response.umbrellaNeeded)
          }
        })
      });
  }


  render(){
    return (
      <div>
        <input type="text" onChange={ this.handleChange }/>
        <button onClick={ this.handleClick }>Submit</button>
        <ContentTabs 
          zipCode={this.state.zipCode}
          current={this.state.current}
        />
      </div>
    );
  }

  doINeedAnUmbrella(precipInInches){
    return precipInInches > 0 ? "Yes" : "No";
  }
}

export default ZipCodeForm;