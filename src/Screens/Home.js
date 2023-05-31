import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'



export default function Home() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { console.log('abc'); navigation.navigate('Profile') }} style={styles.button}>
                <Text>Go To</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: "green"
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})