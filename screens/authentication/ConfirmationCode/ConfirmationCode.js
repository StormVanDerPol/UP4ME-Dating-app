import React, { useRef } from 'react';
import Body, { FlexSection } from '../../../components/Body';
import KeyboardDismiss from '../../../components/KeyboardDismiss';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import { View, Keyboard, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { RegistStyles } from '../../../styles/RegistStyles';

const ConfirmationCode = () => {

    const numberRefs = useRef([0, 1, 2, 3, 4, 5]);

    const confCode = useRef([0, 1, 2, 3, 4, 5]);

    return (
        <KeyboardDismiss>
            <Body>
                <FlexSection>
                    <RegistUp4MeLogo />
                    <RegistHeader>Mijn code</RegistHeader>

                    <View style={[RegistStyles.container, styles.codeContainer]}>
                        {numberRefs.current.map((ref, i) => {
                            return (
                                <TextInput
                                    key={i}
                                    style={[RegistStyles.inputText, styles.inputText]}
                                    ref={(elem) => { numberRefs.current[i] = elem }}
                                    // placeholder={`${i}`}
                                    onFocus={() => {
                                        numberRefs.current[i].clear();
                                    }}
                                    onChangeText={(input) => {
                                        if (numberRefs.current[i + 1]) {
                                            numberRefs.current[i + 1].focus();
                                        }

                                        confCode.current[i] = input;

                                        console.log(confCode.current.join(''));

                                        if (numberRefs.current.length - 1 == i) {
                                            Keyboard.dismiss();
                                        }
                                    }}
                                />
                            );
                        })}

                    </View>

                </FlexSection>
            </Body>
        </KeyboardDismiss>
    );
}

const styles = StyleSheet.create({
    codeContainer: {
        flexDirection: "row",
    },

    inputText: {
        flex: 1,
        marginHorizontal: 5,
        textAlign: "center",
        fontSize: 24,
    },
});

export default ConfirmationCode;