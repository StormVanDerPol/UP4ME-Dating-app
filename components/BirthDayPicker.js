import React, { useState, useRef, useEffect } from 'react';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { StyleSheet, View } from 'react-native';

import { writtenMonths, getDaysInMonth, getYears, today, getYearIndex } from '../res/data/time';

const BirthDayPicker = ({ initValues = {
    month: today.month,
    day: today.day,
    year: today.year,
}, onChangeDate = () => { } }) => {


    const [days, setDays] = useState(getDaysInMonth(today.month, today.year));
    const months = useRef(writtenMonths).current
    const years = useRef(getYears()).current;

    const initYearIndex = getYearIndex(initValues.year);

    const [selected, setSelected] = useState({
        day: initValues.day - 1,
        month: initValues.month - 1,
        year: initValues.year,
    });

    useEffect(() => {
        onChangeDate({
            day: selected.day + 1,
            month: selected.month + 1,
            year: selected.year,
        });
        // alert(JSON.stringify(selected));
    }, [selected])

    return (
        <>
            <View style={styles.container}>
                <WheelPicker style={styles.picker}
                    data={months}
                    initPosition={initValues.month - 1}
                    onItemSelected={(month) => {
                        setDays(getDaysInMonth(month, selected.year));
                        setSelected({ ...selected, month: month });
                    }}
                />
                <WheelPicker style={styles.picker}
                    data={days}
                    initPosition={initValues.day - 1}
                    onItemSelected={(day) => {
                        setSelected({ ...selected, day: day });
                    }}
                />

                <WheelPicker style={styles.picker}
                    data={years}
                    initPosition={initYearIndex - 1}
                    onItemSelected={(year) => {
                        setDays(getDaysInMonth(selected.month, years[year]));
                        setSelected({ ...selected, year: years[year] });
                    }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 135
    },

    picker: {
        flex: 1,
    }
});

export default BirthDayPicker;