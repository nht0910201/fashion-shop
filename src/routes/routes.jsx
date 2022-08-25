import config from '../config';
import Home from '../pages/Home'
import Login from '../pages/Login'
import {DefaultLayout,HeaderOnly} from '../layouts'
import ListProduct from '../pages/ListProduct';
import DetailProduct from '../pages/DetailProduct';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.listProduct, component: ListProduct, layout: DefaultLayout },
    { path: config.routes.detailProduct, component: DetailProduct, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };