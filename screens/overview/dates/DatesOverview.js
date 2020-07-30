import React, { useEffect, useState } from 'react';
import Body, { FlexSection } from '../../../components/Body';
import NavBar, { nbroutes } from '../../../components/navBar/NavBar';
import UpForMeBigRadioButton from '../../../components/UpForMeBigRadioButton';
import { navigationProxy } from '../../../navigation/navigationProxy';
import { DATA_STORE } from '../../../stored/dataStore';
import TextQuicksand from '../../../components/TextQuicksand';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { dodoFlight } from '../../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import LinearGradient from 'react-native-linear-gradient';
import UpForMeIcon, { iconIndex } from '../../../components/UpForMeIcon';
import { convertDateAPI, convertApiTime, writtenMonths } from '../../../res/data/time';
import up4meColours from '../../../res/data/colours';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const DatesOverview = () => {
    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <FlexSection>
                <View style={{
                    margin: 12,
                }}>
                    <UpForMeBigRadioButton active={1} headers={['Matches', 'Dates']} onChange={(active) => {
                        if (active == 0) {
                            navigationProxy.reset({
                                index: 1,
                                routes: [
                                    {
                                        name: 'Home',
                                        params: {},
                                    },
                                    {
                                        name: 'LoadMatchOverview',
                                        params: {},
                                    },
                                ]
                            });
                        }
                    }} />
                </View>

                {(DATA_STORE.dates == false) ? <TextQuicksand style={{
                    fontSize: 16,
                    textAlign: 'center',
                }}>No dates!</TextQuicksand> : DATA_STORE.dates.map((date, i) => {
                    return (
                        <DateItem data={date} key={i} />
                    )
                })}

            </FlexSection>
        </Body>
    );
}

const DateItem = ({ data }) => {

    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);

    const [resData, setResData] = useState(null);

    const date = convertDateAPI(data.datum);

    const time = convertApiTime(data.tijd);

    useEffect(() => {
        dodoFlight({
            method: 'get',
            url: getEndpoint(endpoints.get.smallProfPic) + data.userid2,

            thenCallback: (res) => {
                setImage(res.data.foto);
            }
        });

        dodoFlight({
            method: 'get',
            url: getEndpoint(endpoints.get.profileTo) + data.userid2,

            thenCallback: (res) => {
                setName(res.data.naam);
            }
        })

        dodoFlight({
            method: 'get',
            url: getEndpoint(endpoints.get.resProfileTo) + data.resid,

            thenCallback: (res) => {
                setResData(res.data[0]);
            }
        })
    }, [])

    return (
        <TapGestureHandler onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
                navigationProxy.navigate('LoadDateDetails', {
                    dateData: {
                        userid: data.userid2,
                        dateData: data,
                        resData: resData,
                        date: date,
                        time: time,
                    }
                })
            }
        }}>
            <View style={styles.dateItemContainer}>

                <View style={styles.imageSection} >
                    {(!image) ? <TextQuicksand style={{ height: 250 }}>Loading</TextQuicksand> : <FastImage
                        style={{ height: 250 }}
                        source={{
                            uri: image,
                        }}
                    />}
                </View>


                <View style={styles.infoSection}>
                    {(!name) ? <TextQuicksand>Loading...</TextQuicksand> : <TextQuicksand style={styles.infoSectionHeader} type={'Bold'}>Date met {name}</TextQuicksand>}

                    <View style={styles.infoSectionItem}>
                        <UpForMeIcon icon={iconIndex.calendar} style={styles.iconWrapper} />
                        <TextQuicksand> {date.day}, {writtenMonths[date.month - 1]}, {date.year}</TextQuicksand>
                    </View>

                    <View style={styles.infoSectionItem}>
                        <UpForMeIcon icon={iconIndex.clock} style={styles.iconWrapper} />
                        <TextQuicksand>{time}</TextQuicksand>
                    </View>

                    <View style={styles.infoSectionItem}>
                        <UpForMeIcon icon={iconIndex.location} style={styles.iconWrapper} />
                        {
                            (!resData) ? <></> : <View>
                                <TextQuicksand>{resData.naam}</TextQuicksand>
                                <TextQuicksand>{resData.straat} {resData.huisnummer}</TextQuicksand>
                                <TextQuicksand>{resData.Postcode} {resData.stad}</TextQuicksand>
                            </View>
                        }
                    </View>
                </View>

                {(data.notisent == -1) ? <LinearGradient
                    style={styles.statusMsg}
                    colors={[up4meColours.gradYellow1, up4meColours.gradYellow2]} >
                    <TextQuicksand style={styles.statusMsgStr} >{getStatusDescription(data.status, data.status2, name)}</TextQuicksand>
                </LinearGradient> : <></>}

            </View>
        </TapGestureHandler>
    )
}

const styles = StyleSheet.create({

    dateItemContainer: {
        flexDirection: "row",
        margin: 20,

        // height: 250,

        borderRadius: 10,
        backgroundColor: "white",
        overflow: "hidden",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5
    },

    imageSection: {
        flex: 2,
    },

    image: {
        // width: '100%',
        // height: '100%',
    },

    infoSection: {
        flex: 3,
        padding: 10,
        paddingTop: 50,
    },

    infoSectionHeader: {
        fontSize: 20,
    },

    infoSectionItem: {
        flexDirection: "row",
        marginVertical: 5,
    },

    iconWrapper: {
        marginTop: 5,
        width: 20,
        height: 20,
        marginRight: 10,
    },

    statusMsg: {
        position: "absolute",
        right: 10,
        top: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
    },

    statusMsgStr: {
        color: "white"
    }
});

export const getStatusDescription = (yourStatus, otherStatus, otherName) => {

    let desc = '';

    const steinsGate = `You've reached Steins;Gate - yours: ${yourStatus}, other: ${otherStatus}`;

    switch (otherStatus) {

        case 60:
            desc = `${otherName} has reserved!`
            break;

        //He's reserving
        case 6:
            desc = `${otherName} is reserving...`
            break;

        //He counter proposed
        case 4 || 40 || 5 || 50:
            desc = `${otherName} proposed something else!`
            break;
        //He canceled
        case 3:
            desc = `${otherName} canceled`
            break;
        //He accepted
        case 2:
            desc = `${otherName} proposed a date!`
            break;
        //he declined
        case 1:
            desc = `${otherName} declined`
            break;
        default:
            desc = steinsGate;
    }

    return desc;
}

export default DatesOverview;