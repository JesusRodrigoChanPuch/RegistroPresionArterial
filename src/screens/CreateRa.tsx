import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import CustomBotton from '../components/CustomBotton';
import { getDate, getDbConnection, insertData } from '../utils/dbLocal';
import { useNavigation } from '@react-navigation/native';

const CreateRa = () => {
  // creamos una variable para usar la navegacion 
  const navigation = useNavigation();

  // Creamos variabe para poder usuar la libreria de validacioones y rescatar loso datos del input, como tambien para poder marcar errores
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('')
  const SaveData = data => {
    console.log(data)
    RegisterInfo(data.ps, data.pd, data.pm)
  }
  async function RegisterInfo(ps, pd, pm) {
    if (ps == '' || pd == '' || pm == '') {
      setError('Los compos estan vacios porfavor de rellenarlos');
      return;
    }
    try {
      const db = await getDbConnection();
      const date = await getDate();
      console.log(date)
      await insertData(db, ps, pd, pm, date)
      db.close();
      Alert.alert(
        "En hora buena!",
        "Guardado exitosamente",
        [
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ]
      );
    } catch (e) {
      console.log(e)
      setError(`Un error a ocurrido el intentar Guardar la informcion: ${e}`)
    }
  }
  if (error) {
    console.log(error)
  }

  return (
    <View>
      <CustomInput
        name="ps"
        placeholder={"Ingrese La Presion Sistolica"}
        control={control}
        rules={{ required: "La presion sistolica es Requerida" }}
        keyboardType={"numeric"}
        secureTextEntry={false}
      />
      <CustomInput
        name="pd"
        placeholder={"Ingrese La Presion Distolica"}
        control={control}
        rules={{ required: "La presion diastolica es Requerida" }}
        keyboardType={"numeric"}
        secureTextEntry={false}
      />
      <CustomInput
        name="pm"
        placeholder={"Ingrese La Presion Por Minuto"}
        control={control}
        rules={{ required: "La presion por minuto es Requerida" }}
        keyboardType={"numeric"}
        secureTextEntry={false}
      />

      <CustomBotton text={"Guardar"} onPress={handleSubmit(SaveData)} />
    </View>
  )
}

export default CreateRa