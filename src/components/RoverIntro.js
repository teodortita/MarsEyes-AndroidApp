import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RoverIntro = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                <Icon name="ios-rocket" size={30} color="#000"/> Name: {props.name} </Text>
            <Text style={styles.text}> Landed on Mars: {props.landing_date} </Text>
            <Text style={styles.text}> Launched from Earth: {props.launch_date} </Text>
            <Text style={styles.text}> Status: {props.status}</Text>
            <Text style={styles.text}> Total Photos Taken: {props.total_photos} </Text>
            <Image
                style={styles.image}
                source={{uri: props.image}}
            /> 
        </View>
    );
};

export default RoverIntro;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: '#000',
        backgroundColor: '#ba5536',
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 10
    },

    text: {
        fontSize: 18,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#000'
    },

    image: {
        width: '90%', 
        height: 200,
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: '#000',
        marginTop: 20,
    }
});