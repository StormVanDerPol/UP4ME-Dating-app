import DevRouter from '../dev/DevRouter';
import DevSandbox from '../dev/DevSandbox';
import Landing from '../screens/Landing/Landing';
import LocalStratEmail from '../screens/authentication/LocalStratEmail/LocalStratEmail';
import RegistUserData from '../screens/registration/RegistUserData/RegistUserData';
import ConfirmationCode from '../screens/authentication/ConfirmationCode/ConfirmationCode';
import RegistLocation from '../screens/registration/RegistLocation/RegistLocation';
import { devMode } from '../dev/devConfig';
import RegistGender from '../screens/registration/RegistGender/RegistGender';
import RegistPhotos from '../screens/registration/RegistPhotos/RegistPhotos';
import AuthCallback from '../screens/authentication/oAuthCallback/oAuthCallback';
import WebViewContainer from '../screens/authentication/WebViewContainer/WebViewContainer';

//Add new routes here + put it in the DevRouter.js
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
    {
        name: 'RegistGender',
        component: RegistGender,
    },
    {
        name: 'RegistPhotos',
        component: RegistPhotos,
    },
    {
        name: 'Callback',
        component: AuthCallback,
    },
    {
        name: 'WebViewContainer',
        component: WebViewContainer,
    }

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