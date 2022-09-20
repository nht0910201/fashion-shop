
import config from '../config';
import Home from '../pages/Home'
import {DefaultLayout,HeaderOnly} from '../layouts'
import DetailProduct from '../pages/DetailProduct';
import Profile from '../pages/Profile';
import ShoppingCart from '../pages/ShoppingCart';
import ChangePassword from '../pages/ChangePassword';
import ForgotPassword from '../pages/ForgotPassword';
import Order from '../pages/Order';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import MyOrderStatus from '../pages/MyOrderStatus';
import OrderDetail from '../pages/OrderDetail';
import SignUp from '../pages/SignUp';
import ListProduct from '../pages/ListProduct';

const publicRoutes = [
    { path: config.routes.listProduct, component: ListProduct, layout: DefaultLayout },
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.detailProduct, component: DetailProduct, layout: DefaultLayout },
    { path: config.routes.proflie, component: Profile, layout: HeaderOnly },
    { path: config.routes.shoppingCart, component: ShoppingCart, layout: DefaultLayout },
    { path: config.routes.register, component: SignUp, layout: HeaderOnly },
    { path: config.routes.changePassword, component:ChangePassword, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component:ForgotPassword, layout: HeaderOnly },
    { path: config.routes.order, component:Order, layout: DefaultLayout },
    { path: config.routes.orderHistory, component:OrderHistory, layout: DefaultLayout },
    { path: config.routes.myOrderStatus, component:MyOrderStatus, layout: DefaultLayout },
    { path: config.routes.orderDetail, component:OrderDetail, layout: DefaultLayout },
];

const privateRoutes = [
    
];

export { publicRoutes, privateRoutes };