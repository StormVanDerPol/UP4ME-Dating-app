function timeLeft2Reply(date, time) {
    if (date == undefined || time == undefined) { console.log("tL2R has no variables input, error"); return false }
    var d = new Date();
    var day = d.getDate();
    var month = (d.getMonth() + 1) * 100;
    var year = d.getFullYear() * 10000;
    var hours = d.getHours() * 100;
    var minutes = d.getMinutes();

    var currentTime = hours + minutes;
    var currentDate = year + month + day;
    console.log("tL2R ", currentTime, currentDate, time, date)
    if (currentDate > date || (currentDate == date && currentTime > time + 100)) {
        return false;
    } else {
        return true;
    }
    //   var timetoday =
}

function nextDay(date) {
    var d = new Date();
    var day = d.getDate();
    var month = (d.getMonth() + 1) * 100;
    var year = d.getFullYear() * 10000;

    var currentDate = year + month + day;

    console.log("nextDay (currentDate, date) ===> ", currentDate, date)

    if (currentDate > date) {
        return true;
    } else {
        return false;
    }
}

// export default 

function checkCannedTuna(currentStatus, currentStatus2, newStatus, currentDate, currentTime, notisent) {

    console.log("currentStatus:", currentStatus, "currentStatus2:", currentStatus2, "date:", currentDate, "time:", currentTime)

    const status = newStatus;
    const prevStatus2 = currentStatus2;
    const prevStatus = currentStatus;
    const myTurn = (notisent == -1)
    const dateCanChange = !(prevStatus2 == 1 || prevStatus2 == 3 || prevStatus2 == 7 || prevStatus == 1 || prevStatus == 3 || prevStatus == 7)

    if (dateCanChange) {

        const decline_accept = (prevStatus2 == 2 || prevStatus2 == 4 || prevStatus2 == 40 || prevStatus2 == 5 || prevStatus2 == 50) && myTurn
        const cancelAllowed = (prevStatus2 == -1 || prevStatus2 == 20) || prevStatus2 == 6 || prevStatus2 == 60
        const counterAllowed = (prevStatus2 == -1 || prevStatus2 == 2 || prevStatus2 == 20 || prevStatus2 == 4 || prevStatus2 == 40 || prevStatus2 == 5 || prevStatus2 == 50 || prevStatus2 == 6)
        const reschedAllowed = counterAllowed
        const reservingAllowed = (prevStatus2 == 20) && prevStatus != 6 && myTurn
        const confirmingReservationSucceeded = (prevStatus == 6)
        const finishDateAllowed = (prevStatus2 == 60 || prevStatus == 60) && nextDay(prefDate.datum)
        const time2Reply = timeLeft2Reply(currentDate, currentTime)

        console.log("decline_accept = (prevStatus2 == 2 || prevStatus2 == 4 || prevStatus2 == 40 || prevStatus2 == 5 || prevStatus2 == 50) && myTurn ", decline_accept)
        console.log("cancelAllowed  = (prevStatus2 == -1 || prevStatus2 == 6 || prevStatus2 == 60 || prevStatus2 == 20) ", cancelAllowed)
        console.log("counterAllowed = (prevStatus2 == -1 || prevStatus2 == 2 || prevStatus2 == 4 || prevStatus2 == 40 || prevStatus2 == 20 || prevStatus2 == 5 || prevStatus2 == 50 || prevStatus2 == 6) ", counterAllowed)
        console.log("reschedAllowed == counterAllowed ", reschedAllowed)
        console.log("reservingAllowed = (prevStatus2 == 20) && myTurn ", reservingAllowed)
        console.log("reservationSucceeded  = (prevStatus == 6) ", confirmingReservationSucceeded)
        console.log("finishDateAllowed  = (prevStatus2 == 60 || prevStatus ==60) && nextDay(prefDate.datum) ", finishDateAllowed)
        console.log("time2Reply", time2Reply)
        // console.log("", myTurn)

        switch (status) {


            case 1: // decline a date 
                console.log("DECLINING")
  /*we can only decline*/ if (decline_accept && time2Reply) {
                    return true
                } else {
                    console.log("Error, can only decline while in the negotiating phase. Status you're replying to is", prevStatus2);
                    console.log("Error, can only decline while in the negotiating phase. Your previous status is", prevStatus);
                    return false
                }


            case 2: // accept a proposal
                console.log("ACCEPTING")

       /*we can only accept*/ if (decline_accept && time2Reply) {
                    return true;
                } else {
                    console.log("Error, can only accept while in the negotiating phase. Status you're replying to is", prevStatus2);
                    console.log("Error, can only accept while in the negotiating phase. Your previous status is", prevStatus);
                    return false
                }

            case 3: // cancel a date
                console.log("CANCEL DATE")
/*we can only cancel*/ if ((cancelAllowed) && time2Reply) {
                    return true;

                } else {
                    console.log("Error,trouble to cancel. Status you're replying to is", prevStatus2);
                    console.log("Error,trouble to cancel. Your previous status is", prevStatus);

                    return false;
                }

            case 4: // propose a different date, time and location
                console.log("COUNTER OFFER / PROPOSAL")

                if (counterAllowed && time2Reply) {
                    if (prevStatus2 != 4 && prevStatus2 != 40) { // first counteroffer
                        console.log("primary counter")
                        return true;

                    }

                    if ((prevStatus2 == 4 || prevStatus2 == 40)) { // contraOffer situation
                        console.log("secondary counter")

                        return true
                    }

                    // return false
                }

                console.log("Error,trouble to counter/contraOffer. Status you're replying to is", prevStatus2);
                console.log("Error,trouble to counter/contraOffer. Your previous status is", prevStatus);
                return false

            case 5: // reschedule the date 
                // you can only reschedule something            
                console.log("RESCHEDULE")

                if (reschedAllowed && time2Reply) /**and i changed my mind or something came up */ {

                    if (prevStatus2 != 5 && prevStatus2 != 50) {
                        console.log("primary reschedule")
                        return true
                    }

                    if ((prevStatus2 == 5 || prevStatus2 == 50)) {
                        console.log("secondary reschedule")

                        return true
                    }
                    return false

                }
                else {
                    console.log("Error,trouble to reschedule. Status you're replying to is", prevStatus2);
                    console.log("Error,trouble to reschedule. Your previous status is", prevStatus);
                    return false;
                }
            case 6:
                console.log("RESERVING NOW", "(this switch switches forth and back between 6 and 60)")
                if (reservingAllowed && time2Reply) {
                    console.log("RESERVING")
                    return true
                }

                if (confirmingReservationSucceeded && time2Reply) {
                    console.log("RESERVATION IS DONE")

                    return true
                }

                console.log("Error,trouble to reserve/confirm reservation. Status you're replying to is", prevStatus2);
                console.log("Error,trouble to reserve/confirm reservation. Your previous status is", prevStatus);
                return false
                break;


            case 7:
                if (finishDateAllowed) {
                    return true
                }
                console.log("Error,trouble to confirm succesfull date. Status you're replying to is", prevStatus2);
                console.log("Error,trouble to confirm succesfull date. Your previous status is", prevStatus);
                return false
                break;


        } // einde switch

    } // einde if date can change


    else {
        return false
    }
    // datum en tijd was enigszins geldig
} // einde functie setDate

console.log(checkCannedTuna(2,3,5,20200812,2000, -1))
// userid1, userid2, status, date, time, resid, ronde
// setDate(110, 2, 1, 20211101, 1830, 10,true)
// setDate(2, 110, 4, 20211101, 1830, 5,2)


//            userid1, userid2, status,  date,    time,  resid, ronde
// setDate(        110  ,    5   ,   2   ,20200825,  1030,   15   ,   )
// setDate(        5,      110,      1   ,20201130,  1045,   16,   3)

// -- removeProfile ==> placeholder image, and profpic.
// -- pauseProfile ==>  does it work?
// 