import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native';
// importamos la libreria para hacer validacionoes locales
import { Controller } from "react-hook-form";

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry, keyboardType }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <View style={[styles.containerI, { borderColor: error ? 'red' : '#e8e8e8' }]}>
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {/* validamos si hay un error para poder habilitar esta mensaje */}

                    {error && (
                        <Text style={styles.MessageError} >{error.message || 'error'}</Text>
                    )}

                </> //no me se para que sirve esto por el momento solo espara que pueda madar mensaje del error
            )}
        />
    )
}

export const styles = StyleSheet.create({
    //para darle estilos alos Inputs
    containerI: {
        width: 300,
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1.5,
        borderRadius: 5,
        paddingHorizontal: 35,
        marginTop: 20,
        marginHorizontal:50
        
    },
    MessageError: {
        color: 'red',
        alignSelf: 'stretch',
        marginHorizontal: 50,
        marginBottom: 20


    }
})

export default CustomInput