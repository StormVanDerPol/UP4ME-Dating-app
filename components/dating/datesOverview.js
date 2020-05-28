import React, { useRef } from 'react';

import { View, StyleSheet, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { gs, up4meColours } from "../../globals";
import Nav from "../nav";
import BlepButton from "../blepButton";
import RNSVG_ruler from '../../res/ui/rnsvg/rnsvg_ruler';
import LinearGradient from 'react-native-linear-gradient';

const DatesOverview = () => {

    return (
        <ScrollView style={gs.body}>

            <Nav currentSection={'Matches'} />

            <BlepButton active={1} title={['Matches', 'Dates']} route={['Overview', undefined]} />


            <DateItem name={'boi'} date={{
                day: '3',
                month: 10,
                year: 2020,
            }}
                time={'19:00'}
                location={'somewhere'}

                status={'accepted'}
            />

            <DateItem name={'boi'} date={{
                day: '3',
                month: 10,
                year: 2020,
            }}
                time={'19:00'}
                location={'somewhere'}

                status={'accepted'}
            />

            <DateItem name={'boi'} date={{
                day: '3',
                month: 10,
                year: 2020,
            }}
                time={'19:00'}
                location={'somewhere'}

                status={'accepted'}
            />

            <DateItem name={'boi'} date={{
                day: '3',
                month: 10,
                year: 2020,
            }}
                time={'19:00'}
                location={'somewhere'}

                status={'accepted'}
            />

        </ScrollView>
    );

}

const DateItem = (p) => {

    const _month = useRef(p.date.month);

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
                    <Text> {p.date.day}{_month.current}{p.date.year}</Text>
                </View>

                <View style={dateItemStyles.infoSectionItem}>
                    <View style={dateItemStyles.iconWrapper}>
                        <RNSVG_ruler />
                    </View>
                    <Text>{p.time}</Text>
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

        paddingTop: 35,
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