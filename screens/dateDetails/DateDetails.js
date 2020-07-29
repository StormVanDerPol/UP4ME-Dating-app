import React, { useState } from 'react';
import { DATA_STORE } from '../../stored/dataStore';
import { View, StyleSheet } from 'react-native';
import Body, { FlexSection } from '../../components/Body';
import FastImage from 'react-native-fast-image';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import getDeviceDimensions from '../../functions/dimensions';
import TextQuicksand from '../../components/TextQuicksand';
import { writtenMonths } from '../../res/data/time';
import AlbeitABitLate from '../../components/bigComponents/AlbeitABitLate';
import LinearGradient from 'react-native-linear-gradient';
import up4meColours from '../../res/data/colours';
import UpForMeIcon, { iconIndex } from '../../components/UpForMeIcon';
import { ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import { navigationProxy } from '../../navigation/navigationProxy';

const DateDetails = ({ route }) => {

    const dateData = route.params;

    const data = DATA_STORE.profileCache[dateData.userid];

    console.log('this bs', dateData);

    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <FlexSection>

                <ArrowButtonTop header={'♡ Date'} onPress={() => {
                    navigationProxy.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'Home',
                                params: {}
                            },
                            {
                                name: 'LoadDatesOverview',
                                params: {},
                            }
                        ]
                    })
                }} />

                <FastImage
                    style={styles.image}
                    source={{
                        uri: data.foto1,
                    }}
                />

                {(dateData.dateData.notisent == -1) ? <Notification /> : <></>}

                <TextQuicksand>Date met {data.naam}</TextQuicksand>
                <TextQuicksand>{dateData.date.day} {writtenMonths[dateData.date.month - 1]} {dateData.date.year}</TextQuicksand>
                <TextQuicksand>{dateData.time}</TextQuicksand>
                <TextQuicksand>{dateData.resData.naam}</TextQuicksand>
                <TextQuicksand>{dateData.resData.straat} {dateData.resData.huisnummer}</TextQuicksand>
                <TextQuicksand>{dateData.resData.Postcode} {dateData.resData.stad}</TextQuicksand>


                <AlbeitABitLate title={'yeet'} />
            </FlexSection>
        </Body>
    );
}

const Notification = ({ initActive = true, message = 'Default', type = 'change', onChange = () => { } }) => {

    const [active, setActive] = useState(initActive);

    let colours;

    switch (type) {
        case 'change':
            colours = [
                up4meColours.gradYellow1,
                up4meColours.gradYellow2,
            ]
            break;
    }

    return (
        <LinearGradient colors={colours} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.notification]}>
            <TextQuicksand style={styles.notificationMessage}>{message}</TextQuicksand>
            <View style={styles.notificationIconsContainer}>
                <UpForMeIcon style={{ ...styles.notificationIcons, opacity: (active) ? 1 : 0.5 }} touchable={true} onPress={() => {
                    setActive(true);
                }} icon={iconIndex.photo} />
                <UpForMeIcon style={{ ...styles.notificationIcons, opacity: (!active) ? 1 : 0.5 }} touchable={true} onPress={() => {
                    setActive(false);
                }} icon={iconIndex.phone} />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    image: {
        width: getDeviceDimensions('window', 'width'),
        height: 300,
    },
    notification: {
        padding: 6,
        // height: 50,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    notificationMessage: {
        color: '#fff'
    },
    notificationIconsContainer: {
        flexDirection: "row",
    },
    notificationIcons: {
        marginLeft: 5,
        width: 50,
        height: 50,
    }
})

export default DateDetails;