import React, { useState, useEffect } from 'react';
import BigButtonColor from '../BigButtonColor';
import UpForMeSwitch from '../UpForMeSwitch';
import { View, StyleSheet } from 'react-native';
import TextQuicksand from '../TextQuicksand';
import { RegistStyles } from '../../styles/RegistStyles';

const SelectGender = ({ initValue = -1, onChange = () => { } }) => {

    const [selected, setSelected] = useState(initValue);

    const [noSay, setNoSay] = useState(false);

    useEffect(() => {
        if (noSay)
            setSelected(-1)
    }, [noSay])

    const genders = [
        'Man',
        'Vrouw',
        'AH-64 Apache Attack Helicopter',
    ];

    return (
        <>

            <View style={[styles.buttonsContainer, RegistStyles.topMargin, { opacity: (noSay) ? 0.5 : 1 }]}>
                {genders.map((gender, i) => {
                    return (
                        <BigButtonColor
                            style={styles.button}
                            key={i}
                            onPress={() => {
                                if (!noSay) {
                                    setSelected((selected == i) ? -1 : i);
                                    onChange((selected == i) ? -1 : i);
                                }
                            }}
                            active={(selected == i)}
                            header={gender}
                        />
                    )
                })}
            </View>

            <View style={styles.noSayContainer}>

                <TextQuicksand style={styles.noSayHeader}>Zeg ik liever niet</TextQuicksand>

                <UpForMeSwitch onPress={() => {
                    {
                        setNoSay((noSay) ? false : true);
                        onChange((noSay) ? -1 : 3);
                    }
                }}
                    initActive={noSay}
                />

            </View>

            {(noSay) ? <TextQuicksand style={styles.noSayMessage}>
                Let op, indien je er voor kiest om het liever niet te zeggen, zul je alleen zichtbaar zijn voor de personen die gefilterd hebben op zowel mannen als vrouwen.
            </TextQuicksand> : <></>}
        </>
    );
}

const styles = StyleSheet.create({

    buttonsContainer: {

    },

    button: {
        marginBottom: 5,
    },

    noSayContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    noSayHeader: {
        fontSize: 18,
        // fontWeight: "bold",
        color: '#000'
    },

    noSayMessage: {
        fontSize: 16,
    }
})

export default SelectGender;