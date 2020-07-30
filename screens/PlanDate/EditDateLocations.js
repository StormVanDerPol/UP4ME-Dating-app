import React, { useState } from 'react';
import Body from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import { ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import { navigationProxy } from '../../navigation/navigationProxy';
import BigLocationList from '../../components/bigComponents/BigLocationList';
import UpForMeIcon, { iconIndex } from '../../components/UpForMeIcon';
import { View, StyleSheet } from 'react-native';
import TextQuicksand from '../../components/TextQuicksand';
import { DATA_STORE } from '../../stored/dataStore';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const EditDateLocations = () => {

    const data = DATA_STORE.plannedDate.locationData;

    const [active, setActive] = useState(true);

    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <ArrowButtonTop
                icon={iconIndex.heart}
                header={'Date wijzigen'} onPress={() => {
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
                            }

                        ]
                    })
                }} />

            <TapGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                        setActive((active) ? false : true);
                    }
                }}
            >
                <View style={styles.selectedLocation}>
                    <TextQuicksand style={{ ...styles.header, fontSize: (active) ? 16 : 14, }}>Geselecteerde locatie {(!active) ? `- ${data.naam}` : ''}</TextQuicksand>
                    {(!active) ? <></> :
                        <View style={styles.infoWrapper}>
                            <UpForMeIcon style={styles.icon} icon={iconIndex.location} />
                            <View>
                                <TextQuicksand >{data.naam}</TextQuicksand>
                                <TextQuicksand >{data.straat} {data.huisnummer}</TextQuicksand>
                                <TextQuicksand >{data.Postcode} {data.stad} {(data.stadsdeel != null) ? '- ' + data.stadsdeel : ''}</TextQuicksand>
                            </View>

                        </View>
                    }
                    <TextQuicksand style={styles.hideText}>{(active) ? 'Hide' : 'Show'}</TextQuicksand>
                </View>
            </TapGestureHandler>

            <BigLocationList
                heightSubtract={(active) ? 165 : 90}
                onPressItem={(resid) => {
                    navigationProxy.navigate('EditDateLocationProfile', {
                        resid,
                    })
                }} />
        </Body>
    );
}

const styles = StyleSheet.create({
    selectedLocation: {
        margin: 6,
        marginLeft: 12,
    },
    header: {

        color: '#333',
        marginBottom: 6,
    },
    infoWrapper: {
        flexDirection: "row",
    },
    icon: {
        marginRight: 20,
        width: 20,
        height: 20,
    },
    hideText: {
        fontSize: 10,
        position: "absolute",
        right: 2,
        top: 2,
    }
})

export default EditDateLocations;