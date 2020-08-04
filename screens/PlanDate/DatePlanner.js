import React, { useState, useEffect, useRef } from 'react';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import { ArrowButtonTop, ArrowButtonDropDown, ArrowButtonRight } from '../../components/UpForMeArrowButtons';
import { navigationProxy } from '../../navigation/navigationProxy';
import { DATA_STORE } from '../../stored/dataStore';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import TextQuicksand from '../../components/TextQuicksand';
import { calcAgeHet, today, writtenMonths, toAPIDate } from '../../res/data/time';
import { Calendar } from 'react-native-calendars';
import { TimePicker } from 'react-native-wheel-picker-android';
import UpForMeIcon, { iconIndex } from '../../components/UpForMeIcon';
import up4meColours from '../../res/data/colours';
import AlbeitABitLate from '../../components/bigComponents/AlbeitABitLate';
import { networkFeedbackMessages } from '../../components/waitIndicator';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';

const DatePlanner = ({

    userid = null,
    _resData = null,
    editing = false,
    canEditLocation = true,

}) => {

    const [dateConfig, setDateConfig] = useState({
        ...DATA_STORE.plannedDate,
        userid: userid,
    });

    const profileData = DATA_STORE.profileCache[userid];

    const resData = useRef(null);

    const _init = useRef(false);

    if (!_init.current) {

        if (_resData) {
            resData.current = _resData;

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
        <>
            <FlexSection>
                <ArrowButtonTop
                    icon={iconIndex.heart}
                    header={(editing) ? 'Date wijzigen' : 'Date plannen'} onPress={() => {
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
                                },
                            ]
                        })
                    }} />


                <View style={styles.infoContainer}>
                    <FastImage
                        style={styles.matchPhoto}
                        source={{
                            uri: profileData.foto1,
                        }} />
                    <View>
                        <View style={styles.infoItem}>
                            <TextQuicksand >{profileData.naam}, {calcAgeHet(profileData.geboortedatum)}</TextQuicksand>
                        </View>
                        <View style={styles.infoItem}>
                            <UpForMeIcon style={styles.infoIcon} icon={iconIndex.location} />
                            <TextQuicksand>{profileData.zoektin}</TextQuicksand>
                        </View>
                        <View style={styles.infoItem}>
                            <UpForMeIcon style={styles.infoIcon} icon={iconIndex.occupation_black} />
                            <TextQuicksand>{profileData.beroep}</TextQuicksand>
                        </View>
                    </View>
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

                <LocationSelect
                    canEdit={canEditLocation}
                    editing={editing}
                    resData={resData.current} />


            </FlexSection>
            <AlbeitABitLate message={netFeedback.message} title={(editing) ? 'Stel wijzigingen voor' : 'Op date!'} enableCondition={(
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
                        // url: `http:/192.168.1.10:8080/api/v1/set/date`,
                        url: getEndpoint(endpoints.post.setDate),
                        data: {
                            userid1: DATA_STORE.userID,
                            userid2: dateConfig.userid,
                            status: (editing) ? (canEditLocation) ? 4 : 5 : 2,
                            date: toAPIDate(dateConfig.date),
                            time: `${dateConfig.time.hr}${dateConfig.time.min}`,
                            resid: dateConfig.locationData.resid,
                        },

                        thenCallback: () => {
                            setNetFeedback({
                                busy: false,
                                message: '',
                            });

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
                                ],
                            })
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
        </>
    );
}

const DaySelect = ({ initDate = null, onChange = ({ day, month, year }) => { } }) => {

    const markerConfig = { selected: true, selectedColor: up4meColours.gradPink }

    const [date, setDate] = useState(initDate);

    const [markedDate, setMarkedDate] = useState((!initDate) ? {} : {
        [`${initDate.year}-${initDate.month}-${initDate.day}`]: markerConfig,
    });


    const _today = new Date()

    var _tomorrow = new Date(_today)
    _tomorrow.setMonth(_today.getMonth());
    _tomorrow.setDate(_today.getDate() + 2);


    var _nextMonth = new Date(_today)
    _nextMonth.setMonth(_today.getMonth());
    _nextMonth.setDate(_today.getDate() + 32);


    const tomorrow = `${_tomorrow.getFullYear()}-${_tomorrow.getMonth()}-${_tomorrow.getDate()}`
    const nextMonth = `${_nextMonth.getFullYear()}-${_nextMonth.getMonth()}-${_nextMonth.getDate()}`

    console.log(tomorrow, nextMonth);

    return (
        <ArrowButtonDropDown icon={iconIndex.calendar} header={(!date) ? 'Selecteer een datum' : `${date.day} ${writtenMonths[date.month - 1]} ${date.year}`} start={true}>
            <Calendar

                // minDate={tomorrow}
                // maxDate={nextMonth}
                markedDates={markedDate}
                onDayPress={(day) => {

                    let _date = {
                        day: day.day,
                        month: day.month,
                        year: day.year,
                    }

                    console.log(_date);

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
                        min: ((res.getMinutes() + '').length == 1) ? '0' + res.getMinutes() : res.getMinutes(),
                        hr: ((res.getHours() + '').length == 1) ? '0' + res.getHours() : res.getHours(),
                    }

                    onChange(_time);

                    setTime(_time);
                }}
            />
        </ArrowButtonDropDown>
    )
}

const LocationSelect = ({ resData = null, canEdit = true, editing = false }) => {

    return (
        <View style={{
            opacity: (canEdit) ? 1 : 0.5
        }}>
            <ArrowButtonRight
                onPress={() => {

                    if (canEdit) {
                        navigationProxy.navigate((editing) ? 'LoadEditDateLocations' : 'LoadPlanDateLocations');
                    }
                }}
                icon={iconIndex.location} header={
                    (!resData) ? 'Selecteer een locatie' : resData.naam
                } end={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    matchPhoto: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 24
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    infoIcon: {
        width: 25,
        height: 25,
        marginRight: 12,
    },

    infoContainer: {
        flexDirection: "row",
        margin: 24,
    }
})

export default DatePlanner;