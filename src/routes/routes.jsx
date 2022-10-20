
import config from '../config';

import Home from '../pages/Home'
import {DefaultLayout,HeaderOnly} from '../layouts'
import ForgotPassword from '../pages/ForgotPassword';
import Order from '../pages/Order';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import OrderDetail from '../pages/OrderDetail';
import SignUp from '../pages/SignUp';
import Oauth2 from '../pages/Oauth2';
import ProfileInfo from '../pages/ProfileInfo';
import ProductList from './../pages/ProductList/ProductList';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Admin from '../pages/Admin';
import MyOrder from '../pages/MyOrder';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';

const publicRoutes = [
    { path: config.routes.productList, component: ProductList, layout: DefaultLayout },
    { path: config.routes.search, component: ProductList, layout: DefaultLayout },
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.productDetail, component: ProductDetail, layout: DefaultLayout },
    { path: config.routes.profile, component: ProfileInfo, layout: HeaderOnly },
    { path: config.routes.cart, component: Cart, layout: DefaultLayout },
    { path: config.routes.register, component: SignUp, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component:ForgotPassword, layout: HeaderOnly },
    { path: config.routes.order, component:Order, layout: DefaultLayout },
    { path: config.routes.orderHistory, component:OrderHistory, layout: DefaultLayout },
    { path: config.routes.myOrder, component:MyOrder, layout: HeaderOnly },
    { path: config.routes.orderSuccess, component:OrderSuccess },
    { path: config.routes.orderDetail, component:OrderDetail, layout: DefaultLayout },
    { path: config.routes.oauth2 ,component:Oauth2},
];

const privateRoutes = [
    { path: config.routes.admin, component: Admin, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };