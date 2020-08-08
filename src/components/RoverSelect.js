import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, SectionList, TouchableNativeFeedback, Button} from 'react-native';
import Header from './Header';
import RoverIntro from './RoverIntro';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AdMobBanner} from 'react-native-admob';

const roverImages = {
    opportunity: 'https://spacenews.com/wp-content/uploads/2015/03/opportunity-illus-879x485.jpg',
    spirit: 'https://cdn.mos.cms.futurecdn.net/EYoiusNmH87rrMTCMaBZbH-970-80.jpg',
    curiosity: 'http://www.spaceanswers.com/wp-content/uploads/2013/01/Curiosity-Power.jpg'
};

const roverNames = ['opportunity', 'spirit', 'curiosity'];

class RoverSelect extends Component {
    static navigationOptions = {
        headerTitle: <Header headerText={'Select a Rover'} roverSelectIcon={<Icon name="label-variant-outline" size={30} color="#000"/>}/>,
    };

    constructor(props){
        super(props);
        this.state = {
            opportunityIntro: [],
            spiritIntro: [],
            curiosityIntro: [],
            selectedRover: []
        };
    }

    componentDidMount() {
        Promise.all([
            fetch('https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity/?api_key=51KC1H8dpeJHAtX1vijmDgDPxCN529veonMYzbgv'),
            fetch('https://api.nasa.gov/mars-photos/api/v1/manifests/spirit/?api_key=51KC1H8dpeJHAtX1vijmDgDPxCN529veonMYzbgv'),
            fetch('https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/?api_key=51KC1H8dpeJHAtX1vijmDgDPxCN529veonMYzbgv')
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) => this.setState({
            opportunityIntro: data1.photo_manifest, 
            spiritIntro: data2.photo_manifest,
            curiosityIntro: data3.photo_manifest
        }));
    }

    renderRovers() {
        return (
            <View style={styles.view}>
               <AdMobBanner
                    adSize="smartBanner"
                    adUnitID="ca-app-pub-4715607051465976/3910168465"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.log(error)}
                />
                <TouchableNativeFeedback
                    onPress={() => {
                        this.props.navigation.navigate('DateSelect', {
                            selectedRover: roverNames[0]
                        });
                    }}>
                    <View>
                        <RoverIntro 
                            name={this.state.opportunityIntro.name}
                            landing_date={this.state.opportunityIntro.landing_date}
                            launch_date={this.state.opportunityIntro.launch_date}
                            status={this.state.opportunityIntro.status}
                            total_photos={this.state.opportunityIntro.total_photos}
                            image={roverImages.opportunity}>
                        </RoverIntro>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback 
                    onPress={() => {
                        this.props.navigation.navigate('DateSelect', {
                            selectedRover: roverNames[1]
                        });
                    }}>
                    <View>
                        <RoverIntro 
                            name={this.state.spiritIntro.name}
                            landing_date={this.state.spiritIntro.landing_date}
                            launch_date={this.state.spiritIntro.launch_date}
                            status={this.state.spiritIntro.status}
                            total_photos={this.state.spiritIntro.total_photos}
                            image={roverImages.spirit}>
                        </RoverIntro>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback 
                    onPress={() => {
                        this.props.navigation.navigate('DateSelect', {
                            selectedRover: roverNames[2]
                        });
                    }}>
                    <View>
                        <RoverIntro 
                            name={this.state.curiosityIntro.name}
                            landing_date={this.state.curiosityIntro.landing_date}
                            launch_date={this.state.curiosityIntro.launch_date}
                            status={this.state.curiosityIntro.status}
                            total_photos={this.state.curiosityIntro.total_photos}
                            image={roverImages.curiosity}>
                        </RoverIntro>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderRovers()}
            </ScrollView>
        );
    };
}

export default RoverSelect;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'stretch',
        fontSize: 25
    },

    view: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        backgroundColor: '#cc9f88'
    }
});
