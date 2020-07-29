import React, { useState, useEffect, useRef } from 'react';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import { ArrowButtonTop, ArrowButtonDropDown, ArrowButtonRight } from '../../components/UpForMeArrowButtons';
import { navigationProxy } from '../../navigation/navigationProxy';
import { DATA_STORE } from '../../stored/dataStore';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import TextQuicksand from '../../components/TextQuicksand';
import { calcAgeHet, today, writtenMonths, toRetardDate } from '../../res/data/time';
import { Calendar } from 'react-native-calendars';
import { TimePicker } from 'react-native-wheel-picker-android';
import { iconIndex } from '../../components/UpForMeIcon';
import up4meColours from '../../res/data/colours';
import AlbeitABitLate from '../../components/bigComponents/AlbeitABitLate';
import { networkFeedbackMessages } from '../../components/waitIndicator';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';

const PlanDate = ({ route }) => {

    const userid = route.params.userid;

    const [dateConfig, setDateConfig] = useState({
        ...DATA_STORE.plannedDate,
        userid: userid,
    });

    const profileData = DATA_STORE.profileCache[userid];

    const resData = useRef(null);

    const _init = useRef(false);

    if (!_init.current) {

        if (route.params.resData) {
            resData.current = route.params.resData[0];

            setDateConfig({
                ...dateConfig,
                locationData: resData.current,
            });
        }
        else if (DATA_STORE.plannedDate.locationData) {
            resData.current = DATA_STORE.plannedDate.locationData;

            setDateConfig({
                ...dateConfig,
                locationData: DATA_STORE.plannedDate.locationData,
            });
        }

        _init.current = true;
    }

    useEffect(() => {
        DATA_STORE.plannedDate = dateConfig;
    }, [dateConfig]);

    const [netFeedback, setNetFeedback] = useState({
        message: '',
        busy: false,
    })

    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <FlexSection>
                <ArrowButtonTop header={'Date plannen'} onPress={() => {
                    navigationProxy.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Home',
                                params: {},
                            },
                        ]
                    })
                }} />


                <View>
                    <FastImage
                        style={styles.matchPhoto}
                        source={{
                            uri: profileData.foto1,
                        }} />
                    <TextQuicksand>{profileData.naam}, {calcAgeHet(profileData.geboortedatum)}</TextQuicksand>
                    <TextQuicksand>{profileData.zoektin}</TextQuicksand>
                    <TextQuicksand>{profileData.beroep}</TextQuicksand>
                </View>

                <DaySelect
                    initDate={DATA_STORE.plannedDate.date}
                    onChange={(output) => {
                        setDateConfig({
                            ...dateConfig,
                            date: output,
                        })
                    }} />

                <TimeSelect
                    initTime={DATA_STORE.plannedDate.time}
                    onChange={(output) => {
                        setDateConfig({
                            ...dateConfig,
                            time: output,
                        })
                    }} />

                <LocationSelect resData={resData.current} />


            </FlexSection>
            <AlbeitABitLate message={netFeedback.message} title={'Op date!'} enableCondition={(
                dateConfig.userid &&
                dateConfig.time &&
                dateConfig.date &&
                dateConfig.locationData &&
                !netFeedback.busy
            )}
                onPress={async () => {
                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    });

                    await dodoFlight({
                        method: 'post',
                        url: `http:/192.168.1.12:8080/api/v1/set/date`,
                        // url: getEndpoint(endpoints.post.setDate),\
                        data: {
                            userid1: DATA_STORE.userID,
                            userid2: dateConfig.userid,
                            status: 2,
                            date: toRetardDate(dateConfig.date),
                            time: `${dateConfig.time.hr}${dateConfig.time.min}`,
                            resid: dateConfig.locationData.resid,
                        },

                        thenCallback: () => {
                            setNetFeedback({
                                busy: false,
                                message: '',
                            });
                        },

                        catchCallback: () => {
                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err,
                            });
                        }
                    })
                }}
            />
        </Body>
    );
}

const DaySelect = ({ initDate = null, onChange = ({ day, month, year }) => { } }) => {

    const markerConfig = { selected: true, selectedColor: up4meColours.gradPink }

    const [date, setDate] = useState(initDate);

    const [markedDate, setMarkedDate] = useState((!initDate) ? {} : {
        [`${initDate.year}-${initDate.month}-${initDate.day}`]: markerConfig,
    });


    return (
        <ArrowButtonDropDown icon={iconIndex.calendar} header={(!date) ? 'Selecteer een datum' : `${date.day} ${writtenMonths[date.month - 1]} ${date.year}`} start={true}>
            <Calendar

                minDate={`${today.year}-${today.month + 1}-${today.day + 2}`}
                maxDate={`${today.year}-${today.month + 2}-${today.day + 2}`}

                markedDates={markedDate}
                onDayPress={(day) => {

                    let _date = {
                        day: day.day,
                        month: day.month,
                        year: day.year,
                    }

                    onChange(_date);

                    setDate(_date);

                    setMarkedDate({
                        [day.dateString]: markerConfig,
                    })
                }}
            />
        </ArrowButtonDropDown>
    )
}

const TimeSelect = ({ initTime = null, onChange = ({ min, hr }) => { } }) => {

    const [time, setTime] = useState(initTime);

    const selDate = useRef(new Date);

    const _init = useRef(false);

    if (!_init.current && initTime) {

        selDate.current.setHours(initTime.hr);
        selDate.current.setMinutes(initTime.min);

        _init.current = true;
    }

    return (
        <ArrowButtonDropDown icon={iconIndex.clock} header={(!time) ? 'Selecteer een tijdstip' : `${time.hr}:${time.min}`}>
            <TimePicker format24={true}
                initDate={selDate.current}
                onTimeSelected={(res) => {

                    selDate.current = res;

                    let _time = {
                        min: (res.getMinutes() == 0) ? '00' : res.getMinutes(),
                        hr: res.getHours(),
                    }

                    onChange(_time);

                    setTime(_time);
                }}
            />
        </ArrowButtonDropDown>
    )
}

const LocationSelect = ({ resData = null }) => {

    console.log(resData);

    return (
        <ArrowButtonRight
            onPress={() => {
                navigationProxy.navigate('LoadPlanDateLocations');
            }}
            icon={iconIndex.location} header={
                (!resData) ? 'Selecteer een locatie' : resData.naam
            } end={true} />
    )
}

const styles = StyleSheet.create({
    matchPhoto: {
        width: 75,
        height: 75,
    }
})

export default PlanDate;