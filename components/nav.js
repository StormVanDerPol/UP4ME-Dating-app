import React, { useState } from 'react';

import {
    StyleSheet, View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RNSVG_filter_colour from '../res/ui/rnsvg/nav/rnsvg_filter_colour';
import RNSVG_filter_gray from '../res/ui/rnsvg/nav/rnsvg_filter_gray';

import RNSVG_up4me_logo_colour from '../res/ui/rnsvg/rnsvg_up4me_logo_colour';
import RNSVG_up4me_logo_gray from '../res/ui/rnsvg/rnsvg_up4me_logo_gray';

import RNSVG_locations_colour from '../res/ui/rnsvg/nav/rnsvg_locations_colour';
import RNSVG_locations_gray from '../res/ui/rnsvg/nav/rnsvg_locations_gray';

import RNSVG_matches_colour from '../res/ui/rnsvg/nav/rnsvg_matches_colour';
import RNSVG_matches_gray from '../res/ui/rnsvg/nav/rnsvg_matches_gray';

import RNSVG_profile_colour from '../res/ui/rnsvg/nav/rnsvg_profile_colour';
import RNSVG_profile_gray from '../res/ui/rnsvg/nav/rnsvg_profile_gray';
import RNSVG_matches_gray_notif from '../res/ui/rnsvg/nav/rnsvg_matches_gray_notif';
import RNSVG_matches_colour_notif from '../res/ui/rnsvg/nav/rnsvg_matches_colour_notif';

const Nav = (p) => {

    const [hasNotif, setHasNotif] = useState(true);

    const up4melogo = () => {
        return (p.currentSection == 'Main') ? <RNSVG_up4me_logo_colour /> : <RNSVG_up4me_logo_gray />;
    }

    const filterButton = () => {
        return (p.currentSection == 'Filter') ? <RNSVG_filter_colour /> : <RNSVG_filter_gray />;
    }

    const locationsButton = () => {
        return (p.currentSection == 'Location') ? <RNSVG_locations_colour /> : <RNSVG_locations_gray />;
    }

    const profileButton = () => {
        return (p.currentSection == 'Profile') ? <RNSVG_profile_colour /> : <RNSVG_profile_gray />;
    }

    const matchesButton = () => {

        if (p.currentSection == 'Matches') {
            return hasNotif ? <RNSVG_matches_colour_notif /> : <RNSVG_matches_colour />;
        }
        else {
            return hasNotif ? <RNSVG_matches_gray_notif /> : <RNSVG_matches_gray />;
        }
    }


    return (
        <>
            <View style={[s.navContainer]}>
                <View style={[s.navItemGroup]}>
                    <TouchableWithoutFeedback style={[s.navItem]}

                        onPress={() => {
                            p.n.navigate('UserProfile');
                        }}
                    >
                        {profileButton()}
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={[s.navItem]}
                        onPress={() => {
                            p.n.navigate('EditFilters');
                        }}
                    >
                        {filterButton()}
                    </TouchableWithoutFeedback>
                </View>

                <TouchableWithoutFeedback style={[s.navLogo]}
                    onPress={() => {
                        p.n.navigate('MatchCatalog');
                    }}
                >
                    {up4melogo()}
                </TouchableWithoutFeedback>

                <View style={[s.navItemGroup]}>
                    <TouchableWithoutFeedback style={[s.navItem]}
                        onPress={() => {
                            p.n.navigate('MatchCatalog');
                        }}
                    >
                        {locationsButton()}
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={[s.navItem]}
                        onPress={() => {
                            p.n.navigate('Login');
                        }}
                    >
                        {matchesButton()}
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </>
    );
}

const s = StyleSheet.create({

    navContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 20
    },

    navItem: {

        // borderWidth: 2,

        width: 30,
        height: 25,
        marginHorizontal: 10,

        justifyContent: "center",
        alignItems: 'center',
    },

    navItemGroup: {
        flexDirection: 'row',
    },

    navLogo: {

        // borderWidth: 2,

        height: 20,
        width: 100
    },
});

export default Nav;