import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import {colors} from './utils/index'
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
// import { WEATHER_API_KEY } from '@env';

const WEATHER_API_KEY = '3b5c796b9dd3b1d1e0558727feba7eab';
const BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric')
  useEffect(() => {
    load();
  }, [unitSystem])
  async function load() {
    setCurrentWeather(null);
    setErrorMessage
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to acces the location is denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;
      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
      //       alert(`Your Recent Latitude is: ${latitude},
      // & Your Recent longitude is: ${longitude}`)
      const response = await fetch(weatherURL);
      const result = await response.json()
      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (currentWeather) {
    // const { main: { temp } } = currentWeather;
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem}></UnitsPicker>
          <ReloadIcon load={load}></ReloadIcon>
          <WeatherInfo currentWeather={currentWeather} ></WeatherInfo>
        </View>
        <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem}></WeatherDetails>
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else{
    return(
      <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
      <StatusBar style="auto" />
    </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
