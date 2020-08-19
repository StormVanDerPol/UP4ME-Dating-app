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

    const ultraHyperTuna = getStatusDescription(data.status, data.status2, name, data.notisent);

    const muriDate = (data.status == 1 || data.status == 3 || data.status2 == 1 || data.status == 3);

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
            <View style={[styles.dateItemContainer]}>

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

                {(ultraHyperTuna.length > 0) ? <LinearGradient
                    style={styles.statusMsg}
                    colors={[up4meColours.gradYellow1, up4meColours.gradYellow2]} >
                    <TextQuicksand style={styles.statusMsgStr} >{ultraHyperTuna}</TextQuicksand>
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

export const getStatusDescription = (yourStatus, otherStatus, otherName, notisent) => {


    const messages = {
        newProposal: `Nieuw voorstel`,
        otherAccept: `${otherName} heeft geaccepteerd`,
    }


    if (yourStatus == 1 || otherStatus == 1) {
        if (notisent == 1) {
            return `afgewezen`;
        } else {
            return `${otherName} heeft afgewezen.`;
        }
    }

    if (yourStatus == 3 || otherStatus == 3) {

        if (notisent == 1) {
            return `cancelled`;

        } else {
            return `${otherName} cancelled`;
        }

    }

    if (yourStatus == -1) {
        if (otherStatus == 2 || otherStatus == 4 || otherStatus == 5) {
            return messages.newProposal;
        }
    }

    if (yourStatus == 2) {
        if (otherStatus == -1) {

            return ``;
        }

        if (otherStatus == 4 || otherStatus == 5) {
            return messages.newProposal;
        }

        if (otherStatus == 20) {
            return messages.otherAccept;
        }
    }

    if (yourStatus == 4 || yourStatus == 5) {
        if (notisent == 1) {
            return ``;
        }
        else {

            if (otherStatus == 20) {
                return messages.otherAccept;
            } else {
                return messages.newProposal;
            }
        }
    }

    if (yourStatus == 6) {
        if (notisent == 1) {
            return messages.otherAccept;
        }
    }

    if (yourStatus == 60) {
        if (otherStatus == 20) {
            return ``;
        }
    }

    if (yourStatus == 20) {
        if (notisent == 1) {
            return ``;
        } else {

            if (otherStatus == 4) {
                return messages.newProposal;
            }

            if (otherStatus == 6) {
                return `${otherName} gaat reserveren!`;
            }
            if (otherStatus == 60) {
                return `${otherName} heeft gereserveerd!`;
            }
        }
    }

    if (yourStatus == 40 || yourStatus == 50) {
        if (notisent == -1) {
            if (otherStatus == 4 || otherStatus == 5) {
                return messages.newProposal;
            }
        }
    }

    return `Steins;gate reached. you: ${yourStatus}, ${otherName}: ${otherStatus}, ${(notisent == -1) ? 'My turn' : otherName + ' turn'}`;
}

export default DatesOverview;