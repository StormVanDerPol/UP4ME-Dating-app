import React from 'react';
import { gs } from '../../globals';


import {
    StyleSheet, View, Image, Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const overview = () => {
    return (
        <View style={[gs.body]}>

            <TouchableOpacity style={[s.container]}>
                <Image
                    style={{
                        width: 40, height: 40, borderRadius: 50,
                    }}
                    source={{ uri: '../../res/pepe.jpg' }}
                />

                {/* <View> */}
                <Text>date name</Text>
                <Text>date age</Text>
                <Text>city</Text>
                {/* </View> */}

                {/* <Image>
                     arrow 
                </Image>  */}

            </TouchableOpacity>

        </View >
    );
}

const s = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
    },

});

export default overview;