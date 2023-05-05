import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Moment from 'moment';
import { ImageBackground } from 'react-native';
import 'moment-timezone';
import { createStackNavigator } from '@react-navigation/stack';
import Flag from 'react-native-flags';
const Stack = createStackNavigator();

const COUNTRY_LIST = [
  { name: 'United States', code: 'America/New_York', flag: 'US' },
  { name: 'India', code: 'Asia/Kolkata', flag: 'IN' },
  { name: 'United Kingdom', code: 'Europe/London', flag: 'GB' },
  { name: 'Canada', code: 'America/Toronto', flag: 'CA' },
  { name: 'Australia', code: 'Australia/Sydney', flag: 'AU' },
  { name: 'China', code: 'Asia/Shanghai', flag: 'CN' },
  { name: 'Japan', code: 'Asia/Tokyo', flag: 'JP' },
  { name: 'South Korea', code: 'Asia/Seoul', flag: 'KR' },
  { name: 'Russia', code: 'Europe/Moscow', flag: 'RU' },
  { name: 'Brazil', code: 'America/Sao_Paulo', flag: 'BR' },
  { name: 'Mexico', code: 'America/Mexico_City', flag: 'MX' },
  { name: 'Argentina', code: 'America/Argentina/Buenos_Aires', flag: 'AR' },
  { name: 'France', code: 'Europe/Paris', flag: 'FR' },
  { name: 'Germany', code: 'Europe/Berlin', flag: 'DE' },
  { name: 'Italy', code: 'Europe/Rome', flag: 'IT' },
  { name: 'Spain', code: 'Europe/Madrid', flag: 'ES' },
  { name: 'Portugal', code: 'Europe/Lisbon', flag: 'PT' },
  { name: 'Netherlands', code: 'Europe/Amsterdam', flag: 'NL' },
  { name: 'Belgium', code: 'Europe/Brussels', flag: 'BE' },
  { name: 'Switzerland', code: 'Europe/Zurich', flag: 'CH' },
  { name: 'Sweden', code: 'Europe/Stockholm', flag: 'SE' },
  { name: 'Norway', code: 'Europe/Oslo', flag: 'NO' },
  { name: 'Denmark', code: 'Europe/Copenhagen', flag: 'DK' },
  { name: 'Finland', code: 'Europe/Helsinki', flag: 'FI' },
  { name: 'Greece', code: 'Europe/Athens', flag: 'GR' },
  { name: 'Turkey', code: 'Europe/Istanbul', flag: 'TR' },
  { name: 'Egypt', code: 'Africa/Cairo', flag: 'EG' },
  { name: 'South Africa', code: 'Africa/Johannesburg', flag: 'ZA' },
  { name: 'Nigeria', code: 'Africa/Lagos', flag: 'NG' },
];


const CountryListScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryPress = (country) => {
    setSelectedCountry(country);
    navigation.navigate('Timezone', { timezone: country.code, country });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={COUNTRY_LIST}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.countryItem} onPress={() => handleCountryPress(item)}>
            <Flag code={item.flag} size={32} />
            <Text style={styles.countryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.code}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const TimezoneScreen = ({ route }) => {
  const { timezone, country } = route.params;
  const [isDay, setIsDay] = useState(Moment().tz(timezone).format('A') === 'AM');
  
  const handleTimezonePress = () => {
    setIsDay(!isDay);
  };
  const backgroundImage = isDay ? require('./assets/day.png') : require('./assets/night.png');
  return (
    <ImageBackground source={backgroundImage} style={isDay ? styles.dayBackground : styles.nightBackground}>
    <TouchableOpacity style={styles.timezoneContainer} onPress={handleTimezonePress}>
      <Text style={styles.timezoneText}>{Moment().tz(timezone).format('h:mm A')}</Text>
      <Text style={styles.countryText}>{country.name}</Text>
      <Text style={styles.timezoneText}>{Moment().tz(timezone).format('z')}</Text>
    </TouchableOpacity>
  </ImageBackground>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CountryList">
        <Stack.Screen name="Country List" component={CountryListScreen} />
        <Stack.Screen name="Timezone" component={TimezoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    width: 400,
  },
  countryName: {
    fontSize: 20,
    marginLeft: 10,
  },
  timezoneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timezoneText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  countryText: {
    fontSize: 30,
    color: '#fff',
    marginTop: 10,
    marginBottom: 30,
  },
  dayBackground: {
    flex: 1,
    backgroundColor: '#87cefa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nightBackground: {
    flex: 1,
    backgroundColor: '#3d3d3d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
