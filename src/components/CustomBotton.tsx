import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react'


export default function CustomBotton({ onPress, text }) {
  return (
    <Pressable onPress={onPress} style={styles.cotainerBotton} >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}
export const styles = StyleSheet.create({
  cotainerBotton: {
    backgroundColor: '#63CAA7',
    width: 250,
    color: 'white',
    borderRadius: 50,
    padding: 14,
    marginVertical: 15,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  }
})
