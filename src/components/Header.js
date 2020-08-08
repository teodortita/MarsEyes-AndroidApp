import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = (props) => {
    return (
        <Text style={styles.container}> {props.roverSelectIcon} {props.headerText}</Text>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        paddingTop: 10,
        fontSize: 25,
        fontFamily: 'roboto',
        color: '#000'
    }
});