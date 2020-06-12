import React, { useState, useRef, useEffect } from 'react';
import ProfileLayout from '../userprofile/profilelayout';
import { Text, View } from 'react-native';
import Axios from 'axios';
import { endpointGetProfile } from '../../endpoints';
import { userPropStringSelector } from '../matching/MatchScreenUserPropStringSelector';
import { calcAgeHet } from '../../globals';
import { debugMode } from '../../debugmode';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BigButtonRedux, { ButtonTypes } from '../bigbuttonRedux';
import TopButton from '../topButton';
import RNSVG_edit from '../../res/ui/rnsvg/rnsvg_edit';
import ModalUp4me from '../modalup4me';

const InviteMatch = ({ route }) => {

    const userid = route.params.userid;

    const [loaded, setLoaded] = useState(false)

    const _init = useRef(false);

    const _userData = useRef({});

    if (!_init.current) {
        Axios.get(
            `${endpointGetProfile}${userid}`
        )
            .then((res) => {

                let fetchedData = {};

                let fetchedImages = [
                    res.data.foto1,
                    res.data.foto2,
                    res.data.foto3,
                    res.data.foto4,
                    res.data.foto5,
                    res.data.foto6,
                ];

                let fetchedUserProps = {
                    sport: res.data.sporten,
                    party: res.data.feesten,
                    smoking: res.data.roken,
                    alcohol: res.data.alcohol,
                    politics: res.data.stemmen,
                    work: res.data.uur40,
                    kids: res.data.kids,
                    kidWish: res.data.kidwens
                };

                console.log(userPropStringSelector(fetchedUserProps));

                fetchedData = {
                    profilePictures: fetchedImages,
                    name: res.data.naam,
                    placeName: res.data.zoektin,
                    height: res.data.lengte / 100,
                    job: res.data.beroep,
                    desc: res.data.profieltext,
                    age: calcAgeHet(res.data.geboortedatum),
                    dist: 0,
                    userProperties: fetchedUserProps,
                    userPropertiesDesc: userPropStringSelector(fetchedUserProps),
                }

                _userData.current = { ...fetchedData };

            })
            .catch((err) => {
                if (debugMode.networkRequests) {
                    console.log('Network Error', err)
                }
            })
            .finally(() => {
                setLoaded(true);
            })
        _init.current = false;
    }

    var toRender = (loaded) ? <MatchProfile userData={_userData.current} /> : <LoadingScreen />

    return (
        <>
            {toRender}
        </>
    );
}

const MatchProfile = ({ userData }) => {

    const [modalActive, setModalActive] = useState(false);

    const [modal, setModal] = useState(<></>)

    useEffect(() => {

        setModal(

            (modalActive) ? <ModalUp4me

                duration={300}

                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 50,
                }}>
                <BigButtonRedux onPress={() => { }} title={'Match opheffen'} style={{ marginTop: 12 }} />
                <BigButtonRedux onPress={() => { }} title={'Match raporteren'} style={{ marginTop: 12 }} />
                <BigButtonRedux onPress={() => { setModalActive(false) }} title={'annuleren'} style={{ marginTop: 12 }} buttonType={ButtonTypes.cancel} />
            </ModalUp4me> : <></>
        )

    }, [modalActive])

    return (
        <>
            <ScrollView>
                <TopButton route={'Overview'} header={'Match'} />

                <View style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    width: 40,
                    height: 40,
                }}>
                    <TouchableOpacity onPress={() => {
                        setModalActive(true)
                    }}>
                        <RNSVG_edit />
                    </TouchableOpacity>
                </View>

                <ProfileLayout userData={userData} layout={1} />
                <BigButtonRedux title={'Uitnodigen'} />
            </ScrollView>

            {modal}
        </>
    )
}


const LoadingScreen = () => {
    return (
        <>
            <Text>Loading</Text>
        </>
    )
}

export default InviteMatch;