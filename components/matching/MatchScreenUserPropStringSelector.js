export function userPropStringSelector(userProps) {

    let profProps = []

    switch (userProps.sport) {
        case 1:
            profProps.push('Sport');
            break;
    }

    switch (userProps.party) {
        case 1:
            profProps.push('Feest');
            break;
    }

    switch (userProps.smoking) {
        case 1:
            profProps.push('Rookt');
            break;
        case 3:
            profProps.push('Rookt niet');
            break;
    }

    switch (userProps.alcohol) {
        case 1:
            profProps.push('Drinkt alcohol')
            break;
        case 3:
            profProps.push('Drinkt geen alcohol')
            break;
    }

    switch (userProps.politics) {
        case 1:
            profProps.push('Stemt links')
            break;
        case 2:
            profProps.push('Stemt rechts')
            break;
        case 3:
            profProps.push('Stemt rechts')
            break;
        case 4:
            profProps.push('Stemt niet')
            break;
    }

    switch (userProps.work) {
        case 1:
            profProps.push('Werkt minder dan 40 uur p/w')
            break;
        case 3:
            profProps.push('Werkt meer dan 40 uur p/w')
            break;
    }

    switch (userProps.kids) {
        case 1:
            profProps.push('Heeft kind(eren)');
            break;
        case 2:
            profProps.push('Heeft geen kinderen');
            break;
    }

    switch (userProps.kidWish) {
        case 1:
            profProps.push('Wil kinderen')
            break;
        case 3:
            profProps.push('Wil geen kinderen');
            break;
    }

    return profProps;

}