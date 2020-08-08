import React, {Component} from 'react';
import {DatePickerAndroid, View , StyleSheet, Text, TouchableWithoutFeedback, Button} from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DateSelect extends Component {
    static navigationOptions = {
        headerTitle: <Header headerText={'Select a Date'}/>,
    };

    constructor(props){
        super(props);
        this.state = {
            opportunityMin: [],
            opportunityMax: [],
            spiritMin: [],
            spiritMax: [],
            curiosityMin: [],
            curiosityMax: [],
            AuxMaxDate: [],
            AuxMinDate: [],
            calendarText: 'CALENDAR',
            minDate: [],
            maxDate: []
        };
    }

    componentDidMount() {
        Promise.all([
            fetch('https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity/?api_key=51KC1H8dpeJHAtX1vijmDgDPxCN529veonMYzbgv'),
            fetch('https://api.nasa.gov/mars-photos/api/v1/manifests/spirit/?api_key=51KC1H8dpeJHAtX1vijmDgDPxCN529veonMYzbgv'),
            fetch('https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/?api_key=51KC1H8dpeJHAtX1vijmDgDPxCN529veonMYzbgv')
        ])
        .then(([res1, res2, res3]) => 
            Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) => this.setState({
            opportunityMin: data1.photo_manifest.landing_date,
            opportunityMax: data1.photo_manifest.max_date, 
            spiritMin: data2.photo_manifest.landing_date,
            spiritMax: data2.photo_manifest.max_date,
            curiosityMin: data3.photo_manifest.landing_date,
            curiosityMax: data3.photo_manifest.max_date
        }));
    }


    showPicker = async (stateKey, options) => {
        try {
            const {navigation} = this.props;
            const selectedRover = navigation.state.params.selectedRover;
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open({
                minDate: finalMin,
                maxDate: finalMax
            });

            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'CALENDAR';
            } else {
                var date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;

                monthString = date.toString().substr(4, 3);
                formattedMonth = '';

                switch(monthString) {
                    case 'Jan':
                        formattedMonth = `1`;
                        break;
                    case 'Feb': 
                        formattedMonth = '2';
                        break;
                    case 'Mar': 
                        formattedMonth = '3';
                        break;
                    case 'Apr': 
                        formattedMonth = '4';
                        break;
                    case 'May': 
                        formattedMonth = '5';
                        break;
                    case 'Jun': 
                        formattedMonth = '6';
                        break;
                    case 'Jul': 
                        formattedMonth = '7';
                        break;
                    case 'Aug': 
                        formattedMonth = '8';
                        break;
                    case 'Sep': 
                        formattedMonth = '9';
                        break;
                    case 'Oct': 
                        formattedMonth = '10';
                        break;
                    case 'Nov': 
                        formattedMonth = '11';
                        break;
                    default: formattedMonth = '12';
                }

                dayString = date.toString().substr(8, 2);
                yearString = date.toString().substr(11, 4);

                formattedDate = `${yearString}-${formattedMonth}-${dayString}`;

                this.props.navigation.navigate('PhotoGallery', {
                    selectedDate: formattedDate,
                    selectedRover: selectedRover
                });
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.log(`Error in '${stateKey}': `, message);
        }
    };

    selectedRover() {
        const {navigation} = this.props;
        const selectedRover = navigation.state.params.selectedRover;

        if (selectedRover == 'opportunity') {
            AuxMinDate = this.state.opportunityMin;
            AuxMaxDate = this.state.opportunityMax;
        }
        else {
            if (selectedRover == 'spirit') {
                AuxMinDate = this.state.spiritMin;
                AuxMaxDate = this.state.spiritMax;
            }
            else {
                AuxMinDate = this.state.curiosityMin;
                AuxMaxDate = this.state.curiosityMax;
            }
        }

        MinYear = parseInt(AuxMinDate.toString().substr(0, 4), 10);
        MinMonth = parseInt(AuxMinDate.toString().substr(5, 2), 10);
        MinDay = parseInt(AuxMinDate.toString().substr(8, 2), 10);

        MaxYear = parseInt(AuxMaxDate.toString().substr(0, 4), 10);
        MaxMonth = parseInt(AuxMaxDate.toString().substr(5, 2), 10);
        MaxDay = parseInt(AuxMaxDate.toString().substr(8, 2), 10);

        finalMin = new Date(MinYear, MinMonth-1, MinDay);
        finalMax = new Date(MaxYear, MaxMonth-1, MaxDay);
    }

    randomFact() {
        const facts = [
            'Mars and Earth have approximately the same landmass.',
            'Mars is home to the tallest mountain (25 kilometers high) in the Solar System.',
            'Mars has the wildest dust storms in the Solar System, due to the planet\'s form.',
            'On Mars, the Sun appears about half the size as it does on Earth.',
            'Pieces of Mars have fallen to Earth.',
            'Mars takes its name from the Roman god of war.',
            'There are signs of liquid water, in the form of ice, on Mars.',
            'One day Mars will have a ring, just like Saturn or Jupiter.',
            'Mars has two moons (Phobos and Deimos).',
            'A year on Mars takes 687 Earth days.',
            'Mars is the second smallest planet in the Solar System.',
            'Mars\' reddish appearance is due to its soil containing iron oxide, along with rust particles.',
            'Mars\' sky appears light orange due to the dust in the soil, blown by winds into its thin atmosphere.',
            'The surface temperature on Mars ranges from -153 °C to 20 °C.',
            'Mars was first documented around 2nd millennium BC.',
            'Mars\' gravity on its surface allows leaping nearly 3 times higher compared to Earth.',
            'Evidence of volcano activity has been found on Mars.',
            'Mars is roughly 227 million kilometers away from the Sun.',
            'Mars has two seasons in addition to Earth\'s: Aphelion and Perihelion, due to the planet\'s orbit.',
            'Mars has the least circular orbit path in the Solar System.',
            'The composition of the atmosphere on Mars is extremely similar to the one on Venus.',
            'Mars is home to the largest known canyon (over 4000 kilometers long) in the Solar System.'
        ]

        selectedFact = Math.floor(Math.random() * facts.length);

        return (  
            <Text style={styles.text}>
                <Icon name="comment-question" size={30} color="#000"/> {facts[selectedFact]}
            </Text>
        );
    };

    render() {
        this.selectedRover();

        return (
            <View style={styles.view}>
                
                {this.randomFact()}

                <Button
                    onPress={
                        this.showPicker.bind(this, 'calendar', {date: this.state.calendarDate, mode: 'calendar'})
                    }
                    title={this.state.calendarText}
                    color="#ba5536"
                />
                <Text style={styles.smallText}>
                    The selectable interval in the calendar ranges from the first to the most recent date 
                    from which photos exist.
                </Text>
                <Text style={styles.smallText}>
                    (days without Rover activity do exist)
                </Text>
            </View>
        );
    }
}

export default DateSelect;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#cc9f88',
        padding: 35
    },

    text: {  
        textAlign: 'center', 
        padding: 20,
        fontSize: 18,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#000'
    },

    smallText: {
        textAlign: 'center',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 17,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#000'
    }
});