import React from 'react';
import { View } from 'react-native';

import RNSVG_up4me_logo_login from '../res/icons/rnsvg/rnsvg_up4me_logo_login';
import RNSVG_google_logo from '../res/icons/rnsvg/rnsvg_google_logo';
import RNSVG_up4me_logo_colour from '../res/icons/rnsvg/rnsvg_up4me_logo_colour';
import RNSVG_up4me_logo_gray from '../res/icons/rnsvg/rnsvg_up4me_logo_gray';
import RNSVG_ruler from '../res/icons/rnsvg/rnsvg_ruler';
import RNSVG_restaurant_star from '../res/icons/rnsvg/rnsvg_restaurantStar';
import RNSVG_restaurant_star_gray from '../res/icons/rnsvg/rnsvg_restaurantStar_gray';
import RNSVG_restaurant_fav_filter from '../res/icons/rnsvg/rnsvg_restaurant_fav_filter';
import RNSVG_restaurant_fav_heart from '../res/icons/rnsvg/rnsvg_restaurant_fav_heart';
import RNSVG_report from '../res/icons/rnsvg/rnsvg_report';
import RNSVG_phone from '../res/icons/rnsvg/rnsvg_phone';
import RNSVG_oops from '../res/icons/rnsvg/rnsvg_oops';
import RNSVG_occupation from '../res/icons/rnsvg/rnsvg_occupation';
import RNSVG_match_yes from '../res/icons/rnsvg/rnsvg_match_yes';
import RNSVG_match_no from '../res/icons/rnsvg/rnsvg_match_no';
import RNSVG_LocationPin from '../res/icons/rnsvg/rnsvg_LocationPin';
import RNSVG_location_profile from '../res/icons/rnsvg/rnsvg_location_profile';
import RNSVG_location from '../res/icons/rnsvg/rnsvg_location';
import RNSVG_locatieding from '../res/icons/rnsvg/rnsvg_locatieding';
import RNSVG_foto from '../res/icons/rnsvg/rnsvg_foto';
import RNSVG_email from '../res/icons/rnsvg/rnsvg_email';
import RNSVG_edit from '../res/icons/rnsvg/rnsvg_edit';
import RNSVG_clock from '../res/icons/rnsvg/rnsvg_clock';
import RNSVG_calendar from '../res/icons/rnsvg/rnsvg_calendar';
import RNSVG_arrow_right from '../res/icons/rnsvg/rnsvg_arrow_right';
import RNSVG_arrow_back from '../res/icons/rnsvg/rnsvg_arrow_back';
import RNSVG_arrow_down from '../res/icons/rnsvg/rnsvg_arrow_down';
import RNSVG_filter_colour from '../res/icons/rnsvg/nav/rnsvg_filter_colour';
import RNSVG_filter_gray from '../res/icons/rnsvg/nav/rnsvg_filter_gray';
import RNSVG_locations_colour from '../res/icons/rnsvg/nav/rnsvg_locations_colour';
import RNSVG_locations_gray from '../res/icons/rnsvg/nav/rnsvg_locations_gray';
import RNSVG_matches_colour from '../res/icons/rnsvg/nav/rnsvg_matches_colour';
import RNSVG_matches_colour_notif from '../res/icons/rnsvg/nav/rnsvg_matches_colour_notif';
import RNSVG_matches_gray from '../res/icons/rnsvg/nav/rnsvg_matches_gray';
import RNSVG_matches_gray_notif from '../res/icons/rnsvg/nav/rnsvg_matches_gray_notif';
import RNSVG_paperPlane from '../res/icons/rnsvg/nav/rnsvg_paperPlane';
import RNSVG_profile_colour from '../res/icons/rnsvg/nav/rnsvg_profile_colour';
import RNSVG_profile_gray from '../res/icons/rnsvg/nav/rnsvg_profile_gray';
import RNSVG_magnifying_glass from '../res/icons/rnsvg/rnsvg_magnifying_glass';
import RNSVG_apple_login_logo from '../res/icons/rnsvg/rnsvg_apple_login_logo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNSVG_heart from '../res/icons/rnsvg/rnsvg_heart';

export const iconIndex = {


    heart: <RNSVG_heart />,

    nav: {
        filter_colour: <RNSVG_filter_colour />,
        filter_gray: <RNSVG_filter_gray />,

        locations_colour: <RNSVG_locations_colour />,
        locations_gray: <RNSVG_locations_gray />,

        matches_colour: <RNSVG_matches_colour />,
        matches_colour_notif: <RNSVG_matches_colour_notif />,
        matches_gray: <RNSVG_matches_gray />,
        matches_gray_notif: <RNSVG_matches_gray_notif />,

        profile_colour: <RNSVG_profile_colour />,
        profile_gray: <RNSVG_profile_gray />,
    },

    up4me_logo_login: <RNSVG_up4me_logo_login />,
    up4me_logo_colour: <RNSVG_up4me_logo_colour />,
    up4me_logo_gray: <RNSVG_up4me_logo_gray />,

    ruler: <RNSVG_ruler />,

    restaurant_star: <RNSVG_restaurant_star />,
    restaurant_star_gray: <RNSVG_restaurant_star_gray />,

    restaurant_fav_filter: <RNSVG_restaurant_fav_filter />,
    restaurant_fav_heart: <RNSVG_restaurant_fav_heart />,

    report: <RNSVG_report />,
    phone: <RNSVG_phone />,
    oops: <RNSVG_oops />,

    occupation: <RNSVG_occupation />,
    occupation_black: <RNSVG_occupation color={'#454545'} />,

    match_like: <RNSVG_match_yes />,
    match_dislike: <RNSVG_match_no />,

    location_pin: <RNSVG_LocationPin />,
    location_profile: <RNSVG_location_profile />,
    location: <RNSVG_location />,
    locatieding: <RNSVG_locatieding />,

    photo: <RNSVG_foto />,
    email: <RNSVG_email />,
    edit: <RNSVG_edit />,
    clock: <RNSVG_clock />,
    calendar: <RNSVG_calendar />,
    paperplane: <RNSVG_paperPlane />,

    arrow_right: <RNSVG_arrow_right />,
    arrow_left: <RNSVG_arrow_back />,
    arrow_down: <RNSVG_arrow_down />,

    magnifying_glass: <RNSVG_magnifying_glass />,

    google_logo: <RNSVG_google_logo />,

    apple_login_logo: <RNSVG_apple_login_logo />,
}

const UpForMeIcon = ({ icon, touchable = false, onPress = () => { }, style = { height: 50, width: 50, } }) => {
    return (
        <View style={style}>
            {
                (touchable) ?

                    <TouchableOpacity
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        onPress={() => {
                            onPress()
                        }}>
                        {icon}
                    </TouchableOpacity>

                    :

                    icon

            }

        </View>
    );
}

export default UpForMeIcon;