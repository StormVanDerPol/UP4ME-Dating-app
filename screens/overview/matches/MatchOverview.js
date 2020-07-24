import React from 'react';
import { DATA_STORE } from '../../../stored/dataStore';

const MatchOverview = () => {

    console.log(DATA_STORE)

    return (
        <>

        </>
    );
}

export const getStatusDescription = (yourStatus, otherStatus, otherName) => {

    let desc = '';

    let possibleOtherStatuses;

    switch (yourStatus) {
        case -1:
            switch (otherStatus) {
                case 2:
                    desc = 'new date request!';
                    break;
                default:
                    desc = 'weird result (you 2 other !2)';
                    break;
            }
            break;

        case 1:

            possibleOtherStatuses = [2, 4, 5]

            switch (true) {
                case (possibleOtherStatuses.includes(otherStatus)):
                    desc = 'you declined';
                    break;

                default:
                    desc = 'weird result (you 1 other ![2, 4 ,5])';
                    break;
            }
            break;

        case 2:
            switch (otherStatus) {

                case 1:
                    desc = `${otherName} declined`;
                    break;

                case 2:
                    desc = 'accepted';
                    break;

                case 6:
                    desc = `${otherName} made a reservation`
                    break;

                case -1:
                    desc = 'waiting for reply...';
                    break;

                default:
                    desc = 'weird result (you 2 other ![1, 2 ,6, -1])';
                    break;
            }
            break;

        case 3:
            possibleOtherStatuses = [2, 4, 5, 6];

            switch (true) {
                case (possibleOtherStatuses.includes(otherStatus)):
                    desc = 'you cancelled';
                    break;
                default:
                    desc = 'weird result (you 3 other ![2, 4, 5, 6])';
                    break;
            }
            break;

        case 4:

            possibleOtherStatuses = [2, 4, 5]

            switch (true) {

                case (otherStatus == 1):
                    desc = `${otherName} declined`;
                    break;

                case (otherStatus == 3):
                    desc = `${otherName} cancelled`;
                    break;

                case (possibleOtherStatuses.includes(otherStatus)):
                    desc = 'you re-proposed';
                    break;
                default:
                    desc = 'weird result (you 4 other ![1, 2, 3 , 4, 5])';
                    break;
            }
            break;

        case 5:
            switch (true) {
                case (otherStatus == 1):
                    desc = `${otherName} declined`;
                    break;

                case (otherStatus == 3):
                    desc = `${otherName} cancelled`;
                    break;

                case (otherStatus == 2 || otherStatus == 6):
                    desc = 'you rescheduled'
                    break;

                default:
                    desc = 'weird result (you 5 other ![1, 2, 3, 6])';
                    break;

            }
            break;

        case 6:
            switch (otherStatus) {
                case 2:
                    desc = 'you made a reservatinooooo'
                    break;
                default:
                    desc = 'weird result (you 6 other !2)';
                    break;
            }
            break;
    }

    return desc;
}

export default MatchOverview;