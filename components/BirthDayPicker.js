import React, { useState, useRef, useEffect } from 'react';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { StyleSheet, View } from 'react-native';

import { writtenMonths, getDaysInMonth, getYears } from '../res/data/time';

const BirthDayPicker = ({ onChangeDate = () => { } }) => {

    const now = new Date();
    const today = {
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        yearIndex: now.getFullYear() - 1950
    }

    const [days, setDays] = useState(getDaysInMonth(today.month, today.year));
    const months = useRef(writtenMonths).current
    const years = useRef(getYears()).current;

    const [selected, setSelected] = useState({
        day: today.day,
        month: today.month,
        year: today.year,
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
                    initPosition={today.month}
                    onItemSelected={(month) => {
                        setDays(getDaysInMonth(month, selected.year));
                        setSelected({ ...selected, month: month });
                    }}
                />
                <WheelPicker style={styles.picker}
                    data={days}
                    initPosition={today.day}
                    onItemSelected={(day) => {
                        setSelected({ ...selected, day: day });
                    }}
                />

                <WheelPicker style={styles.picker}
                    data={years}
                    initPosition={today.yearIndex}
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