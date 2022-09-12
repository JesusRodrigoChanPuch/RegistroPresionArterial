import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, VirtualizedList } from 'react-native'
import CustomBotton from '../components/CustomBotton';
import { useForm } from 'react-hook-form';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomBoxOutputList from '../components/CustomBoxOutputList';
import { getData, getDbConnection } from '../utils/dbLocal';

const HomeScreen = () => {
    // Creamos variabe para poder usuar la libreria de validacioones y rescatar loso datos del input, como tambien para poder marcar errores
    const { control, handleSubmit, formState: { errors } } = useForm();
    //variable para poder guardar los datos resicibidos de la bdlocal
    const [isData, setIsData] = useState(null);
    /* Setting the initial state of the error to an empty string. */
    const [error,setError] = useState('')

    // declaramos una variable para poder usar la navigacion
    const navigation = useNavigation();
    const getItem = (data, index) => {// esto es algo que necesita el  VirtualizedList para saber el tamaño
        return data[index]
    }; // esto es algo que necesita el  VirtualizedList F

    const RedirectionScreen = () => {
        navigation.navigate('RegisterData')

    }
    // hacemos uso del coponete useFocusEffect para que cada ves que se posicionen en esa vista se ejecute el la llamada a los datos
    const focusEffect = useCallback(function () {
        async function fetchDb() {
            try {
                const db = await getDbConnection();
                console.log("se hizo la peticion")
                // usamos el la metodo para obtener todos los datos
                const ListDataFromDatabase = await getData(db);
                // guardamos los datos obtenidos en un array para poder mandarselo al componente que renderizara la lista de datos
                setIsData(ListDataFromDatabase);
                db.close();
            } catch (e) {
                setError(e);
                console.log(e)
            }
        }
        // hacemos que se ejecute el metodo
        fetchDb();
    }, []);
    useFocusEffect(focusEffect);
    if (!isData) { // esto es si el array de datos se encuentra sin datos carge esta vista
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <CustomBotton text={"Registrar información"} onPress={handleSubmit(RedirectionScreen)} />
                <Text>Aun no se a Registrado Información </Text>
            </View>
        ); //para saber si se resivio los datos
    }

    /* A conditional statement that checks if there is an error. If there is an error, it will render a
    view with a text component that displays the error. */
    if(error){
        <View>
            <Text>
                A ocurrido un error al mostar la Información: {error}
            </Text>
        </View>
        console.log(error)
    }
    return (
        <ScrollView>
            <CustomBotton text={"Agregar Nuevo Dato"} onPress={handleSubmit(RedirectionScreen)} />
            <VirtualizedList
                // haceos uso de un for de react o listado de informacion 
                data={isData}
                initialNumToRender={4}
                renderItem={({ item }) => <CustomBoxOutputList text={item} />}
                keyExtractor={item => item.id}
                getItemCount={data => data.length}
                getItem={getItem}
                inverted={true}
            />
        </ScrollView>
    )
}

export default HomeScreen