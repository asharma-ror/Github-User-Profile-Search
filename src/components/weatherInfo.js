import React, {Component} from 'react';
import {connect} from 'react-redux';

import moment from 'moment';
import momentTZ from 'moment-timezone';
import _ from 'lodash';

import {Card} from 'antd';
import {getWeather} from '../actions';

class WeatherInfo extends Component {
  interval;

  getDate(date, timezone) {
    return moment(date).tz(timezone).format('LT');
  }

  getTemp(weather) {
    return (weather && (weather[0]['the_temp'] + '°C')) || ''
  }

  componentWillReceiveProps(nextProps) {
    const {weatherInfo} = nextProps;
    if (!_.isEmpty(weatherInfo) && _.isEmpty(this.props.weatherInfo)) {
      const {getWeather} = this.props;
      this.interval = setInterval(() => {
        getWeather(weatherInfo.woeID);
      }, 60000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {weatherInfo, width} = this.props;

    if (!_.isEmpty(weatherInfo)) {
      var {
        sun_rise,
        sun_set,
        time,
        timezone,
        consolidated_weather,
      } = weatherInfo
    }

    return (
      <Card 
        style={{width}} 
        bodyStyle={{padding: 0}}
      >
        <div className="custom-card"> 
        {
          !_.isEmpty(weatherInfo) 
          ? <div> 
              <h3>{`Sun Rise - ${this.getDate(sun_rise, timezone)}`}</h3>
              <h3>{`Sun Set - ${this.getDate(sun_set, timezone)}`}</h3>
              <h3>{`Time Zone - ${timezone}`}</h3>
              <h3>{`Time - ${this.getDate(time, timezone)}`}</h3>
              <h3>{`Temprature - ${this.getTemp(consolidated_weather)}`}</h3>
            </div> 
          : <h3> Location info not available </h3>  
        }
        </div>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getWeather: (woeID) => dispatch(getWeather(null, woeID)),
});

export default connect(null, mapDispatchToProps) (WeatherInfo);
