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
import RegistProfileText from '../screens/registration/RegistProfileText/RegistProfileText';
import RegistUserProperties from '../screens/registration/RegistUserProperties/RegistUserProperties';
import RegistCriteria from '../screens/registration/RegistCriteria/RegistCriteria';
import LoadingFull from '../screens/loading/LoadingFull';
import { loadingTasks } from '../screens/loading/loadingTasks';
import Home from '../screens/home/Home/Home';

//Add new routes here + put it in the DevRouter.js
var appRoutes = [
    {
        name: 'StartUp',
        component: LoadingFull,
        params: {
            taskSet: 'startUp',
        }
    },
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
    },
    {
        name: 'RegistProfileText',
        component: RegistProfileText,
    },
    {
        name: 'RegistUserProperties',
        component: RegistUserProperties,
    },
    {
        name: 'RegistCriteria',
        component: RegistCriteria,
    },
    {
        name: 'LoadHome',
        component: LoadingFull,
        params: {
            taskSet: 'home',
        }
    },
    {
        name: 'Home',
        component: Home,
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