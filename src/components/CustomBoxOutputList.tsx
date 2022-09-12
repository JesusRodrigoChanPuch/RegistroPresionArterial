import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomBoxOutputList = ({ text}) => {
  // con el parametro text podemos hacer que este boton dinamico a lo que se le quera escibir
  return (
    <View style={styles.container}>
      <Text style={styles.textformat}> Fecha: {text.time}  </Text>
      <Text style={styles.textformat2}> Presión sistolica: <Text>{text.ps}</Text></Text>
      <Text style={styles.textformat2}>Presión diastolica: {text.pd}  </Text>
      <Text style={styles.textformat2}> Pulsaciones por minuto:{text.pm}  </Text>
    </View>
  )
}
export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    borderColor: '#DFE2E5',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 3,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginHorizontal: 20,
    marginVertical:5,
  },
  textformat: {
    fontSize: 18,
    color: '#585858',

  }, textformat2: {
    fontSize: 18,
    color: '#63CAA7',
    fontWeight: 'bold',
    padding: 5,
    alignContent: 'flex-end'
  },

});

export default CustomBoxOutputList