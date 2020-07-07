import React, { useState } from 'react';
import TextQuicksand from './TextQuicksand';
import up4meColours from '../res/data/colours';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const UpForMeRadioButton = ({
    defaultValue = -1,
    active: act = defaultValue,
    headers = [''],
    onChange = (active) => { }
}) => {

    const [active, setActive] = useState(act);

    return (
        <>
            <View style={styles.container}>
                {
                    headers.map((header, i) => {
                        return (
                            <View
                                key={i}
                                style={styles.btn}
                            >
                                <TouchableOpacity
                                    onPress={() => {

                                        let _active = (active == i) ? defaultValue : i
                                        setActive(_active);
                                        onChange(_active);

                                        // console.log('onchange rad but', _active)
                                    }}>
                                    <LinearGradient
                                        style={[styles.btnGrad, { borderColor: (active == i) ? '#fffff000' : up4meColours.darkGray }]}
                                        colors={(active == i) ? [up4meColours.gradPink, up4meColours.gradOrange] : ['#FFFFFF', '#FFFFFF']} >
                                        <TextQuicksand
                                            style={{
                                                ...styles.btnInner,
                                                color: (active == i) ? '#fff' : '#666',
                                            }}
                                        >
                                            {header}
                                        </TextQuicksand>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center"
    },

    btn: {
        flex: 1,
        // flex
    },

    btnGrad: {
        borderRadius: 100,
        paddingVertical: 16,
        marginHorizontal: 10,
        borderWidth: 2,
        // borderColor: up4meColours.darkGray,
    },

    btnInner: {
        textAlign: "center",
        // color: "black"
    },
});
export default UpForMeRadioButton;