
import config from '../config';
import Home from '../pages/Home'
import {DefaultLayout,HeaderOnly} from '../layouts'
import DetailProduct from '../pages/DetailProduct';
import ShoppingCart from '../pages/ShoppingCart';
import ForgotPassword from '../pages/ForgotPassword';
import Order from '../pages/Order';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import MyOrderStatus from '../pages/MyOrderStatus';
import OrderDetail from '../pages/OrderDetail';
import SignUp from '../pages/SignUp';
import ListProduct from '../pages/ListProduct';
import Oauth2 from '../pages/Oauth2';
import ProfileInfo from '../pages/ProfileInfo';
import ProductList from './../pages/ProductList/ProductList';

const publicRoutes = [
    { path: config.routes.listProduct, component: ListProduct, layout: DefaultLayout },
    { path: config.routes.productList, component: ProductList, layout: DefaultLayout },
    { path: config.routes.search, component: ProductList, layout: DefaultLayout },
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.detailProduct, component: DetailProduct, layout: DefaultLayout },
    { path: config.routes.profile, component: ProfileInfo, layout: HeaderOnly },
    { path: config.routes.shoppingCart, component: ShoppingCart, layout: DefaultLayout },
    { path: config.routes.register, component: SignUp, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component:ForgotPassword, layout: HeaderOnly },
    { path: config.routes.order, component:Order, layout: DefaultLayout },
    { path: config.routes.orderHistory, component:OrderHistory, layout: DefaultLayout },
    { path: config.routes.myOrderStatus, component:MyOrderStatus, layout: DefaultLayout },
    { path: config.routes.orderDetail, component:OrderDetail, layout: DefaultLayout },
    { path: config.routes.oauth2 ,component:Oauth2},
];

const privateRoutes = [
    
];

export { publicRoutes, privateRoutes };