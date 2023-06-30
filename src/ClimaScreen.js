import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet} from 'react-native';
import axios from 'axios';


const ClimaScreen = () => {

  const [climaData, setClimaData] = useState(null);
  // Lista de países que deseo mostrar
  const countries = ['Nicaragua', 'Costa Rica','Panama',];

  useEffect(() => {
    const fetchClimaData = async () => {
      try {
        const responsePromises = countries.map(country =>
          axios.get(`https://api.weatherapi.com/v1/current.json?key=a59fc64afc414ddcb3822353233006&q=${country}&lang=es`)
        );
        const responses = await Promise.all(responsePromises);
        const climaDataArray = responses.map(response => response.data);
        setClimaData(climaDataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClimaData();
  }, []);

  if (!climaData) {
    return (
      <View style={styles.container}>
        <Text style={styles.Cargando}>Cargando...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {climaData.map((clima, index) => (
        <View key={index} style={styles.weatherContainer}>
          <Text style={styles.text}>Ubicación: {clima.location.name}, {clima.location.region}, {clima.location.country} </Text>
          <Text style={styles.text}>Temperatura: {clima.current.temp_c}°C</Text>
          <Text style={styles.text}>Condición: {clima.current.condition.text}</Text>
          <Text style={styles.text}>Presión atmosférica: {clima.current.pressure_mb} mb</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2E6F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cargando: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  weatherContainer: {
    marginBottom: 50,
    padding: 40,
    backgroundColor: '#D7BDE2',
    borderRadius: 20,
    shadowColor: '#AC00F4',
    shadowOpacity: 0.5,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
});

export default ClimaScreen;
