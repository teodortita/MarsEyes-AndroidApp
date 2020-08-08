import React, {Component} from 'react';
import {ScrollView, Image, View , StyleSheet, Text, TouchableWithoutFeedback, Button} from 'react-native';
import Header from './Header';
import {AdMobBanner} from 'react-native-admob';

class PhotoGallery extends Component {
    static navigationOptions = {
        headerTitle: <Header headerText={'Photo Gallery'}/>,
    };

    constructor(props){
        super(props);
        this.state = {
            imageSource0: '',
            imageSource1: '',
            imageSource2: '',
            imageSource3: '',
            imageSource4: '',
            imageSource5: '',
            imageSource6: '',
            imageSource7: '',
            imageSource8: '',
            imageSource9: '',
            photosArray: []
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        const selectedDate = navigation.state.params.selectedDate;
        const selectedRover = navigation.state.params.selectedRover;
        let beginning = '';

        if (selectedRover == 'opportunity') {
            beginning = 'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=';
        }
        else {
            if (selectedRover == 'spirit') {
                beginning = 'https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=';
            }
            else {
                beginning = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=';
            }
        }
        
        const ending = '&api_key=51KC1H8dpeJHAtX1vijmDgDPxCN529veonMYzbgv';
        const final = `${beginning}${selectedDate}${ending}`;

        Promise.all([
            fetch(`${final}`),
            fetch('https://jsonplaceholder.typicode.com/todos/1')
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
            photosArray: data1.photos
        }));
    }

    render() {
        const {navigation} = this.props;
        const selectedRover = navigation.state.params.selectedRover;

        return (
            <ScrollView style={styles.container}>
                <AdMobBanner
                    adSize="smartBanner"
                    adUnitID="ca-app-pub-4715607051465976/3910168465"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.log(error)}
                />
                    {
                        this.state.photosArray.length
                        ?   this.state.photosArray.map((item, index) => {
                                if (item.camera.full_name) {
                                    return (
                                        <View style={styles.view} key={Math.random()*index}>
                                            <Image
                                            style={styles.image}
                                            source={{uri: item.img_src}}
                                            progressiveRenderingEnabled={true}/>
                                            <Text style={styles.text}>({item.camera.full_name})</Text>
                                        </View>
                                    );
                                }
                            }) 
                        :   <View style={styles.view}>
                                <Text style={styles.specialText}>[{selectedRover} took no photos that day]</Text>
                            </View>
                    }
            </ScrollView>
        );
    }
}

export default PhotoGallery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#cc9f88',
        fontSize: 25
    },

    view: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 15,
        fontSize: 20,
        backgroundColor: '#cc9f88'
    },

    text: {
        fontSize: 17,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#000',
        paddingBottom: 20
    },

    specialText: {  
        textAlign: 'center', 
        padding: 20,
        fontSize: 18,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#000'
    },

    image: {
        width: '100%',
        height: 290,
        marginTop: 5,
        marginBottom: 5,  
        borderWidth: 0.8,
        borderColor: '#000'
    }
});