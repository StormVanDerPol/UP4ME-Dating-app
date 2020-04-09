
import React, { useState } from 'react';

import {
    StyleSheet, View, Text, TextInput,
} from 'react-native';
import Logo from '../logo';

import { gs } from '../../globals';
import BigButton from '../bigbutton';

const ConfirmationCode = ({ route, navigation }) => {

    const [data] = useState(route.params);
    const [confcode, setConfcode] = useState('')

    const handleChange = (input) => {
        setConfcode(input);
    }

    return (
        <>
            <View style={gs.screenWrapper}>
                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn code</Text>
                </View>

                <View style={s.inputWrapper}>
                    <TextInput keyboardType='numeric' maxLength={6} onChangeText={(input) => handleChange(input)} style={s.input} />
                </View>

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="UserData" text="doorgaan" disabled={(confcode.length < 6)}
                        data={Object.assign(data, { confirmationCode: confcode })} />
                </View>
            </View>
        </>
    );
}


// class ConfirmationCode extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             code: ''
//         }

//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(str) {

//         var newstr = str;
//         console.log(regexNumerical.test(str));

//         if (regexNumerical.test(str) == false) {
//             newstr = str.replace(/[^0-9]/g, '')
//         }

//         this.setState({
//             code: newstr
//         });
//     }

//     render() {
//         return (
//             <>
//                 <View style={gs.screenWrapper}>
//                     <View>
//                         <Logo />
//                         <Text style={[s.header, gs.mainHeader]}>Mijn code</Text>
//                     </View>
//                     <View style={s.inputWrapper}>
//                         <TextInput keyboardType='numeric' onChangeText={(str) => this.handleChange(str)} style={s.input} />
//                     </View>
//                     <View style={gs.bottom}>
//                         <BigButton text="doorgaan" />
//                     </View>
//                 </View>
//             </>
//         );
//     }
// };

const s = StyleSheet.create({

    input: {
        marginBottom: 50,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        fontSize: 100
    },

    header: {
        marginTop: 20
    },

});

export default ConfirmationCode;