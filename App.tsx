import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { initDataBase } from './src/utils/dbLocal';
import Navigation from './src/navigator/Navigation';

const App = () => {
  useEffect(function(){
    // funcion para que se incie o cree la bd con las tablas al ejecutar la app
    async function init() {
      await initDataBase();
    }
    init();
  },[]);
  return (
    <Navigation/>
  )
}

export default App