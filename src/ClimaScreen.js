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

}

export default ClimaScreen;