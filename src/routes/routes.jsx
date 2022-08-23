import config from '../config';
import Home from '../pages/Home'
import Login from '../pages/Login'
import {DefaultLayout,HeaderOnly} from '../layouts'

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };