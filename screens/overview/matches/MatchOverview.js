import React, { useEffect, useState } from 'react';
import { DATA_STORE } from '../../../stored/dataStore';
import Body, { FlexSection } from '../../../components/Body';
import NavBar, { nbroutes } from '../../../components/navBar/NavBar';
import UpForMeBigRadioButton from '../../../components/UpForMeBigRadioButton';
import { navigationProxy } from '../../../navigation/navigationProxy';
import TextQuicksand from '../../../components/TextQuicksand';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import up4meColours from '../../../res/data/colours';
import FastImage from 'react-native-fast-image';
import { calcAgeHet } from '../../../res/data/time';
import UpForMeIcon, { iconIndex } from '../../../components/UpForMeIcon';
import { dodoFlight } from '../../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { planThatDamnDate } from '../../../functions/planThatDamnDate';

const MatchOverview = () => {

    console.log(DATA_STORE)

    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <FlexSection>
                <View style={{
                    margin: 12,
                }}>
                    <UpForMeBigRadioButton active={0} headers={['Matches', 'Dates']} onChange={(active) => {
                        if (active == 1) {
                            navigationProxy.reset({
                                index: 1,
                                routes: [
                                    {
                                        name: 'Home',
                                        params: {},
                                    },
                                    {
                                        name: 'LoadDatesOverview',
                                        params: {},
                                    },
                                ]
                            });
                        }
                    }} />
                </View>

                {
                    (DATA_STORE.matches == false) ? <TextQuicksand>No matches</TextQuicksand> :
                        DATA_STORE.matches.map((match, i) => {
                            return <MatchItem key={i} start={(i == 0) ? true : false} data={match} />
                        })
                }

            </FlexSection>
        </Body>
    );
}

export const MatchItem = ({ goToPlan = false, data, start = false, end = true }) => {


    const [image, setImage] = useState(null)


    useEffect(() => {
        dodoFlight({
            method: 'get',
            url: getEndpoint(endpoints.get.smallProfPic) + data.userid,

            thenCallback: (res) => {
                setImage(res.data.foto);
            }
        });
    }, [])

    return (
        <TouchableOpacity style={[styles.bruh, {
            borderBottomWidth: (end) ? 1 : 0,
            borderTopWidth: (start) ? 1 : 0,
        }]}
            onPress={() => {

                if (!goToPlan)
                    navigationProxy.navigate('LoadInviteMatch', {
                        userid: data.userid,
                    })
                else
                    planThatDamnDate({
                        userid: data.userid
                    }, true);
            }}
        >
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', }}>

                    {(!image) ? <TextQuicksand style={styles.img}>Loading...</TextQuicksand> : <FastImage
                        style={styles.img}
                        source={{
                            uri: image
                        }}
                    />}

                    <View style={styles.infoBox}>
                        <TextQuicksand>{data.naam}, {calcAgeHet(data.geboortedatum)} </TextQuicksand>
                        <TextQuicksand>{data.woonplaats}</TextQuicksand>
                    </View>
                </View>

                <UpForMeIcon style={styles.imgEnd} icon={iconIndex.arrow_right} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        // height: 50,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fff',

    },
    imgEnd: {
        height: 25,
        width: 25,
    },
    underline: {
        borderBottomWidth: 1,
        borderBottomColor: up4meColours.lineGray,
        paddingBottom: 15,
    },
    infoBox: {
        marginLeft: 10,
        width: 150
    },

    bruh: {
        paddingVertical: 10,
        borderColor: up4meColours.lineGray
    },

});

export default MatchOverview;