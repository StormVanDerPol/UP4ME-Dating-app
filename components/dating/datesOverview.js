import React, { useRef, useState, useEffect } from 'react';

import { View, StyleSheet, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { gs, up4meColours, toNonRetardDate, getMonthName, toNonRetardTime } from "../../globals";
import Nav from "../nav";
import BlepButton from "../blepButton";
import RNSVG_ruler from '../../res/ui/rnsvg/rnsvg_ruler';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';
import { endpointGetDates } from '../../endpoints';
import { debugMode } from '../../debugmode';

const DatesOverview = () => {

    const [loaded, setLoaded] = useState(false);

    const _init = useRef(false);

    const _dates = useRef([]);

    if (!_init.current) {

        Axios.get(`${endpointGetDates}${global.sessionUserId}`)
            .then((res) => {

                _dates.current = res.data;

            })
            .catch((err) => {

                if (debugMode.networkRequests)
                    console.log('error getting dates', err);

            })
            .finally(() => {
                setLoaded(true);
            })

        _init.current = true;
    }

    const [renderDateItems, setRenderDateItems] = useState(<Text>LOOOOOOOOOADING</Text>)

    useEffect(() => {
        if (loaded) {
            if (_dates.current) {
                setRenderDateItems(
                    _dates.current.map((date, i) => {
                        return (
                            <DateItem
                                name={date.userid2}
                                rawdate={date.datum}
                                rawtime={date.tijd}
                                location={date.resid}
                                status={getStatusDescription(date.status, date.status2, date.userid2)}
                            />
                        )
                    })
                )
            }
            else {
                setRenderDateItems(
                    <Text>REEEEEEEE no dates</Text>
                )
            }
        }
    }, [loaded])

    return (
        <ScrollView style={gs.body}>

            <Nav currentSection={'Matches'} />

            <BlepButton active={1} title={['Matches', 'Dates']} route={['Overview', undefined]} />

            {renderDateItems}

        </ScrollView>
    );

}

const DateItem = (p) => {

    const _date = useRef(toNonRetardDate(p.rawdate));

    _date.current.month = getMonthName(_date.current.month);

    const _time = useRef(toNonRetardTime(p.rawtime));


    return (
        <View style={dateItemStyles.dateItemContainer}>

            <View style={dateItemStyles.imageSection}>
                <Image style={dateItemStyles.image} source={require('../../res/pepe.jpg')} />
            </View>

            <View style={dateItemStyles.infoSection}>
                <Text style={dateItemStyles.infoSectionHeader}>Date met {p.name}</Text>

                <View style={dateItemStyles.infoSectionItem}>
                    <View style={dateItemStyles.iconWrapper} >
                        <RNSVG_ruler />
                    </View>
                    <Text> {_date.current.day}, {_date.current.month}, {_date.current.year}</Text>
                </View>

                <View style={dateItemStyles.infoSectionItem}>
                    <View style={dateItemStyles.iconWrapper}>
                        <RNSVG_ruler />
                    </View>
                    <Text>{_time.current}</Text>
                </View>

                <View style={dateItemStyles.infoSectionItem}>
                    <View style={dateItemStyles.iconWrapper}>
                        <RNSVG_ruler />
                    </View>
                    <Text> {p.location}</Text>
                </View>
            </View>

            <LinearGradient
                style={dateItemStyles.statusMsg}
                colors={[up4meColours.gradYellow1, up4meColours.gradYellow2]} >
                <Text style={dateItemStyles.statusMsgStr} >{p.status}</Text>
            </LinearGradient>

        </View>
    );
}

const getStatusDescription = (yourStatus, otherStatus, otherName) => {

    let desc = '';

    let possibleOtherStatuses;

    switch (yourStatus) {
        case -1:
            switch (otherStatus) {
                case 2:
                    desc = 'new date request!';
                    break;
                default:
                    desc = 'weird result (you 2 other !2)';
                    break;
            }
            break;

        case 1:

            possibleOtherStatuses = [2, 4, 5]

            switch (true) {
                case (possibleOtherStatuses.includes(otherStatus)):
                    desc = 'you declined';
                    break;

                default:
                    desc = 'weird result (you 1 other ![2, 4 ,5])';
                    break;
            }
            break;

        case 2:
            switch (otherStatus) {

                case 1:
                    desc = `${otherName} declined`;
                    break;

                case 2:
                    desc = 'accepted';
                    break;

                case 6:
                    desc = `${otherName} made a reservation`
                    break;

                case -1:
                    desc = 'waiting for reply...';
                    break;

                default:
                    desc = 'weird result (you 2 other ![1, 2 ,6, -1])';
                    break;
            }
            break;

        case 3:
            possibleOtherStatuses = [2, 4, 5, 6];

            switch (true) {
                case (possibleOtherStatuses.includes(otherStatus)):
                    desc = 'you cancelled';
                    break;
                default:
                    desc = 'weird result (you 3 other ![2, 4, 5, 6])';
                    break;
            }
            break;

        case 4:

            possibleOtherStatuses = [2, 4, 5]

            switch (true) {

                case (otherStatus == 1):
                    desc = `${otherName} declined`;
                    break;

                case (otherStatus == 3):
                    desc = `${otherName} cancelled`;
                    break;

                case (possibleOtherStatuses.includes(otherStatus)):
                    desc = 'you re-proposed';
                    break;
                default:
                    desc = 'weird result (you 4 other ![1, 2, 3 , 4, 5])';
                    break;
            }
            break;

        case 5:
            switch (true) {
                case (otherStatus == 1):
                    desc = `${otherName} declined`;
                    break;

                case (otherStatus == 3):
                    desc = `${otherName} cancelled`;
                    break;

                case (otherStatus == 2 || otherStatus == 6):
                    desc = 'you rescheduled'
                    break;

                default:
                    desc = 'weird result (you 5 other ![1, 2, 3, 6])';
                    break;

            }
            break;

        case 6:
            switch (otherStatus) {
                case 2:
                    desc = 'you made a reservatinooooo'
                    break;
                default:
                    desc = 'weird result (you 6 other !2)';
                    break;
            }
            break;
    }

    return desc;
}

const dateItemStyles = StyleSheet.create({

    dateItemContainer: {
        flexDirection: "row",
        margin: 20,

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
        width: '100%',
    },

    infoSection: {
        flex: 3,

        padding: 10,

        paddingTop: 50,
    },

    infoSectionHeader: {
        fontSize: 20,
        fontWeight: "bold",
    },

    infoSectionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },

    iconWrapper: {
        width: 20,
        height: 20,
        marginRight: 10,
    },

    statusMsg: {
        position: "absolute",
        right: 20,
        top: 20,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
    },

    statusMsgStr: {
        color: "white"
    }
});

const s = StyleSheet.create({

});

export default DatesOverview;