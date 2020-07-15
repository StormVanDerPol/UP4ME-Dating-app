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
import LoadingScreen from '../screens/loading/LoadingScreen';
import Home from '../screens/home/Home/Home';
import Boot from '../screens/Landing/Boot';
import LoadHome from '../screens/home/Home/LoadHome';
import LoadProfiles from '../screens/home/Home/LoadProfiles';
import LoadCriteria from '../screens/EditCriteria/LoadCriteria';
import EditCriteria from '../screens/EditCriteria/EditCriteria';
import LoadProfileHub from '../screens/profile/LoadProfileHub';
import ProfileHub from '../screens/profile/ProfileHub';

//Add new routes here + put it in the DevRouter.js
var appRoutes = [
    {
        name: 'StartUp',
        component: Boot,
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
        component: LoadHome,
    },
    {
        name: 'LoadProfiles',
        component: LoadProfiles,
    },
    {
        name: 'Home',
        component: Home,
    },
    {
        name: 'LoadCriteria',
        component: LoadCriteria,
    },
    {
        name: 'EditCriteria',
        component: EditCriteria,
    },
    {
        name: 'LoadProfileHub',
        component: LoadProfileHub,
    },
    {
        name: 'ProfileHub',
        component: ProfileHub,
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