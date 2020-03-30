
import React, { useState } from 'react';

import {
    StyleSheet, Text, View, TextInput,
} from 'react-native';

import Slider from '@react-native-community/slider';

import { gs } from '../../globals';
import Logo from '../logo';
import BigButton from '../bigbutton';

import thumbSlider from '../../res/sliderThumb.png'


const UserData = ({ navigation }) => {

    const [height, setHeight] = useState(1.75);

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn gegevens</Text>
                </View>

                <Text style={s.subheader}>Mijn naam</Text>
                <TextInput style={s.input} />

                <Text style={s.subheader}>Mijn geboortedatum</Text>
                <View style={s.center}>
                    <TextInput keyboardType='numeric' style={s.input} placeholder={'DAG'} />
                    <TextInput keyboardType='numeric' style={s.input} placeholder={'MAAND'} />
                    <TextInput keyboardType='numeric' style={s.input} placeholder={'JAAR'} />
                </View>


                <View style={s.spaceBetween}>
                    <Text style={s.subheader}>Mijn lengte</Text>
                    <Text style={s.heightIndicator}>{height}</Text>
                </View>

                <Slider style={s.slider}
                    onValueChange={(height) => setHeight(parseFloat(height.toFixed(2)))}
                    minimumValue={1.20}
                    maximumValue={2.50}
                    minimumTrackTintColor="#888888"
                    thumbImage={thumbSlider}
                    value={height}
                />

                <Text style={s.subheader}>Mijn beroep</Text>
                <TextInput style={s.input} />

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="Location" text="doorgaan" />
                </View>
            </View>
        </>
    );

}

// class UserData extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             height: 1.75
//         }
//     }

//     updateHeight(height) {
//         this.setState({
//             height: parseFloat(height.toFixed(2))
//         });
//     }

//     render() {
//         return (
//             <>
//                 <View style={gs.screenWrapper}>

//                     <View>
//                         <Logo />
//                         <Text style={[s.header, gs.mainHeader]}>Mijn gegevens</Text>
//                     </View>

//                     <Text style={s.subheader}>Mijn naam</Text>
//                     <TextInput style={s.input} />

//                     <Text style={s.subheader}>Mijn geboortedatum</Text>
//                     <View style={s.center}>
//                         <TextInput keyboardType='numeric' style={s.input} placeholder={'DAG'} />
//                         <TextInput keyboardType='numeric' style={s.input} placeholder={'MAAND'} />
//                         <TextInput keyboardType='numeric' style={s.input} placeholder={'JAAR'} />
//                     </View>


//                     <View style={s.spaceBetween}>
//                         <Text style={s.subheader}>Mijn lengte</Text>
//                         <Text style={s.heightIndicator}>{this.state.height}</Text>
//                     </View>

//                     <Slider style={s.slider}
//                         onValueChange={(height) => this.updateHeight(height)}
//                         minimumValue={1.20}
//                         maximumValue={2.50}
//                         minimumTrackTintColor="#888888"
//                         thumbImage={thumbSlider}
//                         value={this.state.height}
//                     />

//                     <Text style={s.subheader}>Mijn beroep</Text>
//                     <TextInput style={s.input} />

//                     <View style={gs.bottom}>
//                         <BigButton text="doorgaan" />
//                     </View>
//                 </View>
//             </>
//         );
//     }
// };

const s = StyleSheet.create({

    slider: {
        marginTop: 15
    },

    input: {
        // marginBottom: 25,
        borderBottomColor: "gray",
        borderBottomWidth: 1
    },

    inputSlash: {
        alignItems: "center"
    },

    header: {
        marginTop: 20
    },

    subheader: {
        marginTop: 25
    },

    heightIndicator: {
        marginTop: 25,
        color: "gray"
    },

    center: {
        flexDirection: "row",
        justifyContent: "center"
    },

    spaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between"
    }

});

export default UserData;
