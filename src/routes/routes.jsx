import config from '../config';
import Home from '../pages/Home'
import Login from '../pages/Login'
import {DefaultLayout,HeaderOnly} from '../layouts'
import ListProduct from '../pages/ListProduct';
import DetailProduct from '../pages/DetailProduct';
import Profile from '../pages/Profile';
import ShoppingCart from '../pages/ShoppingCart';
import Register from '../pages/Rigister';
import ChangePassword from '../pages/ChangePassword';
import ForgotPassword from '../pages/ForgotPassword';
import Order from '../pages/Order';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import MyOrderStatus from '../pages/MyOrderStatus';
import OrderDetail from '../pages/OrderDetail';


const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.listProduct, component: ListProduct, layout: DefaultLayout },
    { path: config.routes.detailProduct, component: DetailProduct, layout: DefaultLayout },
    { path: config.routes.proflie, component: Profile, layout: HeaderOnly },
    { path: config.routes.shoppingCart, component: ShoppingCart, layout: DefaultLayout },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.changePassword, component:ChangePassword, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component:ForgotPassword, layout: HeaderOnly },
    { path: config.routes.order, component:Order, layout: DefaultLayout },
    { path: config.routes.orderHistory, component:OrderHistory, layout: DefaultLayout },
    { path: config.routes.myOrderStatus, component:MyOrderStatus, layout: DefaultLayout },
    { path: config.routes.orderDetail, component:OrderDetail, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };