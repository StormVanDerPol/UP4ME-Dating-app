import React, { useRef, useState } from 'react';
import { DATA_STORE } from '../../stored/dataStore';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import InputCriteria from '../../components/bigComponents/InputCriteria';
import { View, StyleSheet } from 'react-native';
import { registParams, RegistStyles } from '../../styles/RegistStyles';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../components/waitIndicator';
import postCriteria from '../../requests/postCriteria';
import UpForMeButton from '../../components/UpForMeButton';

const EditCriteria = () => {

    console.log(DATA_STORE.userCriteria);

    const newCriteria = useRef(DATA_STORE.userCriteria);

    const [newGender, setNewGender] = useState(DATA_STORE.userCriteria.gender);

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    return (
        <Body>
            <NavBar route={nbroutes.filter} />

            <FlexSection>
                <View style={styles.container}>
                    <InputCriteria initValues={DATA_STORE.userCriteria} onChange={(output) => {
                        // newCriteria.current = output;

                        // setNewGender(output.gender)
                    }} />
                </View>

            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'Opslaan'} enabled={(newGender != -1 && !netFeedback.busy)} onPress={async () => {

                    console.log(newCriteria.current);

                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    })

                    await postCriteria(
                        DATA_STORE.userID,
                        newCriteria.current,
                        () => {
                            setNetFeedback({
                                busy: false,
                                message: '',
                            });
                        },
                        () => {
                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err
                            })
                        })
                }} />
            </View>

        </Body>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: registParams.xMargin,
    }
})

export default EditCriteria;