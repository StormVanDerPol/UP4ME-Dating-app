import React from 'react';
import { StyleSheet, View } from 'react-native';
import UpForMeIcon, { iconIndex } from '../UpForMeIcon';
import { TapGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import { navigationProxy } from '../../navigation/navigationProxy';

export const nbroutes = {
    home: 0,
    profile: 1,
    filter: 2,
    matches: 3,
    locations: 4,
}

const NavBar = ({ route }) => {

    const nbItems = [
        {
            route: 'LoadProfileHub',
            n: nbroutes.profile,
            iconColour: iconIndex.nav.profile_colour,
            iconGray: iconIndex.nav.profile_gray,
            iconStyle: styles.icon,
        },
        {
            route: 'LoadCriteria',
            n: nbroutes.filter,
            iconColour: iconIndex.nav.filter_colour,
            iconGray: iconIndex.nav.filter_gray,
            iconStyle: styles.icon,
        },
        {
            route: 'LoadHome',
            n: nbroutes.home,
            iconColour: iconIndex.up4me_logo_colour,
            iconGray: iconIndex.up4me_logo_gray,
            iconStyle: styles.logo,
        },
        {
            route: 'LoadMatchOverview',
            n: nbroutes.matches,
            iconColour: iconIndex.nav.matches_colour,
            iconGray: iconIndex.nav.matches_gray,
            iconStyle: styles.icon,
        },
        {
            route: 'LoadViewLocations',
            n: nbroutes.locations,
            iconColour: iconIndex.nav.locations_colour,
            iconGray: iconIndex.nav.locations_gray,
            iconStyle: styles.icon,
        },
    ]

    return (
        <View style={styles.navContainer} >


            {
                nbItems.map((item, i) => {
                    return (<View key={i}>
                        <TouchableOpacity onPress={() => {
                            if (route != item.n)
                                navigationProxy.reset({
                                    index: 0,
                                    routes: [
                                        {
                                            name: item.route,
                                            params: {},
                                        }
                                    ]
                                });
                        }}>
                            {(route == item.n) ?
                                <UpForMeIcon style={item.iconStyle} icon={item.iconColour} /> :
                                <UpForMeIcon style={item.iconStyle} icon={item.iconGray} />}
                        </TouchableOpacity>

                    </View>)
                })
            }

        </View>
    );
}


const styles = StyleSheet.create({

    navContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        // paddingVertical: 20
        height: 50,
        // borderBottomWidth: 1,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5
    },

    icon: {
        width: 30,
        height: 25,
        marginHorizontal: 10,
    },

    logo: {
        height: 20,
        width: 100
    },
});

export default NavBar;