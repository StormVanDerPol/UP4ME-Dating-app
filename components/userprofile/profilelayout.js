import { MatchScreenUserProfileStyles } from "../matching/MatchScreenUserProfileStyles";
import React, { useRef, useState } from 'react';
import FastImage from "react-native-fast-image";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import RNSVG_report from "../../res/ui/rnsvg/rnsvg_report";
import RNSVG_location_profile from "../../res/ui/rnsvg/rnsvg_location_profile";
import RNSVG_occupation from "../../res/ui/rnsvg/rnsvg_occupation";
import RNSVG_ruler from "../../res/ui/rnsvg/rnsvg_ruler";
import RNSVG_paperPlane from "../../res/ui/rnsvg/nav/rnsvg_paperPlane";
import RNSVG_match_no from "../../res/ui/rnsvg/rnsvg_match_no";
import RNSVG_match_yes from "../../res/ui/rnsvg/rnsvg_match_yes";
import Carousel, { Pagination } from "react-native-snap-carousel";

const ProfileLayout = ({ userData, layout = 0 }) => {

    const [carouselIndex, setCarouselIndex] = useState(0)

    const [fu, forceUpdate] = useState(fu + 1);

    const _carouselRef = useRef();

    var displayMemes = <></>

    if (layout == 0) {
        displayMemes = (
            <View style={MatchScreenUserProfileStyles.matchDecision}>
                <RNSVG_match_no />
                <RNSVG_match_yes />
            </View>
        )
    }

    function carouselItem({ item, index }) {
        return (

            <FastImage
                key={index}
                style={{
                    width: Dimensions.get('window').width,
                    height: '100%',
                }}
                source={{
                    uri: item,
                }}
                width={'100%'}
                height={'100%'}
            />
        )
    }

    return (
        <>
            <View style={[MatchScreenUserProfileStyles.container]}>

                <Carousel
                    data={userData.profilePictures}
                    renderItem={carouselItem}
                    ref={(c) => { _carouselRef.current = c; }}
                    layout={'stack'}
                    layoutCardOffset={18}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    scrollEnabled={false}
                    onSnapToItem={(index) => setCarouselIndex(index)}
                    loop={true}
                    useScrollView={true}
                />
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                    }}>
                    <Pagination
                        tappableDots={true}
                        inactiveDotOpacity={1}
                        dotStyle={PagDotStyles.dot}
                        dotColor={'#fff'}
                        inactiveDotColor={'#fff'}
                        carouselRef={_carouselRef.current}
                        dotsLength={userData.profilePictures.length}
                        activeDotIndex={carouselIndex}
                    />
                </View>
                <View
                    onLayout={() => {
                        forceUpdate(fu + 1);
                    }}

                    style={{
                        position: "absolute",
                        right: 20,
                        top: 20,
                        width: 30,
                        height: 30,
                        opacity: 0.7,
                    }}>
                    <RNSVG_report />
                </View>

                <View style={MatchScreenUserProfileStyles.infoBox}>
                    <Text style={MatchScreenUserProfileStyles.infoBoxHeader}>{userData.name}, {userData.age}</Text>
                    <View style={MatchScreenUserProfileStyles.infoBoxItem}>
                        <View style={[MatchScreenUserProfileStyles.infoBoxIcon]}><RNSVG_location_profile /></View>
                        <Text style={MatchScreenUserProfileStyles.infoBoxText}>{userData.placeName}</Text>
                    </View>
                    <View style={MatchScreenUserProfileStyles.infoBoxItem}>
                        <View style={[MatchScreenUserProfileStyles.infoBoxIcon]}><RNSVG_occupation /></View>
                        <Text style={MatchScreenUserProfileStyles.infoBoxText}>{userData.job}</Text>
                    </View>
                </View>
            </View>


            <View>
                <View style={MatchScreenUserProfileStyles.subInfoBoxContainer}>
                    <View style={MatchScreenUserProfileStyles.subInfoBoxWrapper}>
                        <View style={MatchScreenUserProfileStyles.subInfoIconWrapper}>
                            <RNSVG_ruler />
                        </View>
                        <Text>{userData.height}m</Text>
                    </View>
                    <View style={MatchScreenUserProfileStyles.subInfoBoxWrapper}>
                        <View style={MatchScreenUserProfileStyles.subInfoIconWrapper}>
                            <RNSVG_paperPlane />
                        </View>
                        <Text>{userData.dist}km</Text>
                    </View>
                </View>

                <View>
                    <Text style={MatchScreenUserProfileStyles.description}>{userData.desc}</Text>
                    <View style={MatchScreenUserProfileStyles.matchProperties}>
                        {
                            userData.userPropertiesDesc.map((prop, i) => {
                                return (
                                    <View key={i}>
                                        <Text style={MatchScreenUserProfileStyles.matchProperty}>
                                            {prop}
                                        </Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>

                {displayMemes}

            </View>
        </>);
}

const PagDotStyles = StyleSheet.create({
    dot: {
        margin: -2.5,
        padding: 0,

        width: 20,
        height: 20,

        borderRadius: 100,

        backgroundColor: '#fff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,

        elevation: 5,
    },
})


export default ProfileLayout;