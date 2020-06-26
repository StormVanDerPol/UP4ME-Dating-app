import DevRouter from '../dev/DevRouter';
import DevSandbox from '../dev/DevSandbox';
import Landing from '../screens/Landing/Landing';
import LocalStratEmail from '../screens/authentication/LocalStratEmail/LocalStratEmail';
import RegistUserData from '../screens/registration/RegistUserData/RegistUserData';
import ConfirmationCode from '../screens/authentication/ConfirmationCode/ConfirmationCode';
import RegistLocation from '../screens/registration/RegistLocation/RegistLocation';
import { devMode } from '../dev/devConfig';

//Add new routes here
var appRoutes = [
    {
        name: 'Landing',
        component: Landing,
    },
    {
        name: 'LocalStratEmail',
        component: LocalStratEmail,
    },
    {
        name: 'ConfirmationCode',
        component: ConfirmationCode,
    },
    {
        name: 'RegistUserData',
        component: RegistUserData,
    },
    {
        name: 'RegistLocation',
        component: RegistLocation,
    },

];

if (devMode.enabled) {
    appRoutes.unshift(
        {
            name: 'DevRouter',
            component: DevRouter,
        },
        {
            name: 'DevSandbox',
            component: DevSandbox,
        },
    )
}

export default appRoutes;