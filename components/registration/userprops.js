
import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native';

`import UserPropsRadioButton from './userpropsRadiobtn';`
import Logo from '../logo';
import BigButton from '../bigbutton';

import { gs, up4meColours } from '../../globals';
import { endpointSetProperties, endpointGetProfile } from '../../endpoints';
import UserPropsSelections from './userpropsSelections';

const UserProps = () => {

    const _userProperties = useRef({
        sport: 0,
        party: 0,
        smoking: 0,
        alcohol: 0,
        politics: 0,
        work: 0,
        kids: 0,
        kidWish: 0,
        food: 0,
    });

    const [hasLoaded, setHasLoaded] = useState(false);

    const _init = useRef(false);

    if (!_init.current) {

        console.log(`${endpointGetProfile}${global.sessionUserId}`);

        Axios.get(`${endpointGetProfile}${global.sessionUserId}`)
            .then((res) => {

                const propsExist = (res.data.alcohol != undefined);

                if (propsExist) {
                    _userProperties.current = {
                        sport: res.data.sporten,
                        party: res.data.feesten,
                        smoking: res.data.roken,
                        alcohol: res.data.alcohol,
                        politics: res.data.stemmen,
                        work: res.data.uur40,
                        kids: res.data.kids,
                        kidWish: res.data.kidwens,
                        food: res.data.eten,
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setHasLoaded(true);
            })

        _init.current = true;
    }

    const [renderUserPropsSelections, setRenderUserPropsSelections] = useState(<Text>Loading properties</Text>)

    useEffect(() => {
        if (hasLoaded) {

            console.log('filling in props like this: ', _userProperties.current);

            setRenderUserPropsSelections(
                <>
                    <Text>I need to nut</Text>
                    <UserPropsSelections initSelections={_userProperties.current} getSelections={getSelections} />
                </>
            )
        }
    }, [hasLoaded])

    const getSelections = (data) => {
        _userProperties.current = data;
    }

    const postData = () => {

        let toSend = {
            userid: global.sessionUserId,
            sport: _userProperties.current.sport,
            feesten: _userProperties.current.party,
            roken: _userProperties.current.smoking,
            alcohol: _userProperties.current.alcohol,
            stemmen: _userProperties.current.politics,
            werken: _userProperties.current.work,
            kinderen: _userProperties.current.kids,
            kinderwens: _userProperties.current.kidWish,
            eten: _userProperties.current.food
        }

        console.log(toSend);

        Axios.post(endpointSetProperties, toSend
        )
            .then((res) => {
                console.log('success', res);
            })
            .catch((err) => {
                console.log('error', err);
            })

        console.log('saved data: ', global.registData);
    }

    return (
        <View style={[gs.body]}>
            <ScrollView style={gs.screenWrapperScroll}>

                <Logo />
                <Text style={[s.header, gs.mainHeader]}>Eigenschappen</Text>
                <Text style={[s.summary]}>Hoe meer informatie je invult, hoe groter de kans op een match. Je potentiele matchen kunnen hier op filteren.</Text>

                {renderUserPropsSelections}

                <View style={[s.questionContainer]}>
                    <View style={gs.bottom}>
                        <BigButton component={"Filter"} text="Doorgaan"
                            callBack={postData} />
                    </View>
                </View>

            </ScrollView>
        </View >
    );
};

const s = StyleSheet.create({

    questionContainer: {
        marginTop: 15,
        paddingVertical: 15,
        borderColor: up4meColours.lineGray,
        borderTopWidth: 1,
    },

    // questionHeader: {
    //     fontSize: 20,
    //     marginBottom: 10,
    // },

    summary: {
        color: up4meColours.textGray,
    },



});

export default UserProps;
