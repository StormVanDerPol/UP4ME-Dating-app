
import React, { useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';

import { gs, deviceWidth, pallette } from '../../globals';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../logo';
import BigButton from '../bigbutton';

const Gender = ({ navigation }) => {

    const [radioBtnSelected, setRadioBtnSelected] = useState(0);
    const [genNotif, setGenNotif] = useState('');


    const onPressRadioBtnSelected = (id) => {
        setRadioBtnSelected(id);
        toggleGenNotif(id);
    };

    const onPressRadioBtnSelectedCanReset = (id) => {
        if (radioBtnSelected == id) {
            setRadioBtnSelected(0);
        }
        else {
            setRadioBtnSelected(id);
        }
        toggleGenNotif(id);
    };

    const gradient = (id, colors) => {
        if (id == radioBtnSelected) {
            return [colors[0], colors[1]];
        }
        else {
            return [colors[2], colors[3]];
        }
    };

    const slideCheckboxStyle = (id) => {
        if (id == radioBtnSelected) {
            return {
                justifyContent: "flex-end",
            }
        }
        else {
            return {
                justifyContent: "flex-start"
            }
        }
    };

    const toggleGenNotif = (id) => {
        if (id == 4) {
            setGenNotif('Let op, indien je er voor kiest om het liever niet te zeggen, zul je alleen zichtbaar zijn voor de personen die gefilterd hebben op zowel mannen als vrouwen.');
        }
        else {
            setGenNotif('');
        }
    };

    const canContinue = () => {
        if (radioBtnSelected == 0)
            return true
        else
            return false
    };

    // const slideCheckboxGrad = (id) => {
    //     if (id == radioBtnSelected) {
    //         return [pallette[0], pallette[1]]
    //     }
    //     else {
    //         return ['#FFFFFF', '#FFFFFF']
    //     }
    // }

    // const radioBtnGrad = (id) => {

    //     if (id == radioBtnSelected) {
    //         return [pallette[0], pallette[1]]
    //     }
    //     else {
    //         return ['#DDDDDD', '#DDDDDD']
    //     }
    // }

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Ik ben een</Text>
                </View>

                <LinearGradient colors={gradient(1, [pallette[0], pallette[1], '#FFFFFF', '#FFFFFF'])} style={[s.radioBtnOuter]}>
                    <TouchableOpacity style={[s.radioBtnInner]} onPress={() => { onPressRadioBtnSelected(1) }}><Text>Man</Text></TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={gradient(2, [pallette[0], pallette[1], '#FFFFFF', '#FFFFFF'])} style={[s.radioBtnOuter]}>
                    <TouchableOpacity style={[s.radioBtnInner]} onPress={() => { onPressRadioBtnSelected(2) }}><Text>Vrouw</Text></TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={gradient(3, [pallette[0], pallette[1], '#FFFFFF', '#FFFFFF'])} style={[s.radioBtnOuter]}>
                    <TouchableOpacity style={[s.radioBtnInner]} onPress={() => { onPressRadioBtnSelected(3) }}><Text>Non-binair</Text></TouchableOpacity>
                </LinearGradient>

                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text>Ik zeg het liever niet</Text>
                    <TouchableWithoutFeedback onPress={() => { onPressRadioBtnSelectedCanReset(4) }}>
                        <LinearGradient colors={gradient(4, [pallette[0], pallette[1], '#DDDDDD', '#DDDDDD'])} style={[s.slideCheckbox, slideCheckboxStyle(4)]}>
                            <View style={[s.slideCheckboxBall]}></View>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </View>

                <Text>{genNotif}</Text>

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="" text="doorgaan" disabled={canContinue()} />
                </View>
            </View>

        </>
    );
}


// class Gender extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             radioBtnSelected: 0
//         }

//         this.radioBtnActive = this.radioBtnActive.bind(this);
//         this.radioBtnActiveCanReset = this.radioBtnActiveCanReset.bind(this);
//         this.radioBtnStyle = this.radioBtnGrad.bind(this);
//         this.canContinue = this.canContinue.bind(this);
//     }

//     radioBtnGrad(id) {
//         if (id == this.state.radioBtnSelected) {
//             return [pallette[0], pallette[1]]
//         }
//         else {
//             return ['#DDDDDD', '#DDDDDD']
//         }
//     }


//     slideCheckboxGrad(id) {
//         if (id == this.state.radioBtnSelected) {
//             return [pallette[0], pallette[1]]
//         }
//         else {
//             return ['#FFFFFF', '#FFFFFF']
//         }
//     }

//     slideCheckboxStyle(id) {
//         if (id == this.state.radioBtnSelected) {
//             return {
//                 justifyContent: "flex-end",
//             }
//         }
//         else {
//             return {
//                 justifyContent: "flex-start"
//             }
//         }
//     }

//     radioBtnActive(id) {

//         this.setState({
//             radioBtnSelected: id
//         });
//     }

//     radioBtnActiveCanReset(id) {
//         if (id == this.state.radioBtnSelected) {
//             this.setState({
//                 radioBtnSelected: 0
//             });

//         }
//         else {
//             this.setState({
//                 radioBtnSelected: id
//             });
//         }
//     }

//     noGenderNotification;

//     canContinue() {
//         if (this.state.radioBtnSelected == 0)
//             return true
//         else
//             return false
//     }

//     render() {


//         if (this.state.radioBtnSelected == 4) {
//             this.noGenderNotification = "Let op, indien je er voor kiest om het liever niet te zeggen, zul je alleen zichtbaar zijn voor de personen die gefilterd hebben op zowel mannen als vrouwen."
//         }

//         else {
//             this.noGenderNotification = ""
//         }

//         return (
//             <>

//                 <View style={gs.screenWrapper}>

//                     <View>
//                         <Logo />
//                         <Text style={[s.header, gs.mainHeader]}>Ik ben een</Text>
//                     </View>

//                     <LinearGradient colors={this.radioBtnGrad(1)} style={[s.radioBtnOuter]}>
//                         <TouchableOpacity style={[s.radioBtnInner]} onPress={() => this.radioBtnActive(1)}><Text>Man</Text></TouchableOpacity>
//                     </LinearGradient>
//                     <LinearGradient colors={this.radioBtnGrad(2)} style={[s.radioBtnOuter]}>
//                         <TouchableOpacity style={[s.radioBtnInner]} onPress={() => this.radioBtnActive(2)}><Text>Vrouw</Text></TouchableOpacity>
//                     </LinearGradient>
//                     <LinearGradient colors={this.radioBtnGrad(3)} style={[s.radioBtnOuter]}>
//                         <TouchableOpacity style={[s.radioBtnInner]} onPress={() => this.radioBtnActive(3)}><Text>Non-binair</Text></TouchableOpacity>
//                     </LinearGradient>

//                     <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
//                         <Text>Ik zeg het liever niet</Text>
//                         <TouchableWithoutFeedback onPress={() => this.radioBtnActiveCanReset(4)}>
//                             <LinearGradient colors={this.slideCheckboxGrad(4)} style={[s.slideCheckbox, this.slideCheckboxStyle(4)]}>
//                                 <View style={[s.slideCheckboxBall]}></View>
//                             </LinearGradient>
//                         </TouchableWithoutFeedback>
//                     </View>
//                     <Text>{this.noGenderNotification}</Text>


//                     <View style={gs.bottom}>
//                         <BigButton text="doorgaan" disabled={this.canContinue()} />
//                     </View>

//                 </View>

//             </>
//         );
//     }
// };

const s = StyleSheet.create({

    radioBtnOuter: {
        marginVertical: 10,
        width: deviceWidth - 34,
        borderRadius: 100,
        padding: 4
    },

    radioBtnInner: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 100,
        width: deviceWidth - 40,
        alignSelf: "center",
    },

    slideCheckbox: {
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "flex-start",
        width: 80,
    },

    slideCheckboxBall: {

        borderRadius: 100,
        backgroundColor: "white",
        height: 40,
        width: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

});

export default Gender;
