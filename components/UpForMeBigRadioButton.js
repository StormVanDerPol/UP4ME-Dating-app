import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import up4meColours from '../res/data/colours';
import LinearGradient from 'react-native-linear-gradient';
import TextQuicksand from './TextQuicksand';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UpForMeBigRadioButton = ({
    active: act = -1,
    headers = [''],
    onChange = (active) => { }
}) => {

    const [active, setActive] = useState(act);

    return (
        <>
            <View style={styles.container}>
                {headers.map((header, i) => {
                    return (
                        <LinearGradient
                            key={i}
                            style={styles.button}
                            colors={(active == i) ? [up4meColours.gradOrange, up4meColours.gradPink] : ['#fffff000', '#fffff000']}
                        >
                            <TouchableOpacity


                                onPress={() => {
                                    setActive(i);
                                    onChange(i);
                                }}
                            >
                                <TextQuicksand style={{
                                    ...styles.header,
                                    color: (active == i) ? '#fff' : '#000',
                                }}>
                                    {header}
                                </TextQuicksand>
                            </TouchableOpacity>
                        </LinearGradient>
                    );
                })}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        flexDirection: "row",
        backgroundColor: up4meColours.picGray,
    },

    header: {
        textAlign: "center",
        paddingVertical: 16,
    },

    button: {

        borderRadius: 100,
        flex: 1,
    }
});

export default UpForMeBigRadioButton;