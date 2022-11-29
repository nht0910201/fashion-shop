
import config from '../config';

import Home from '../pages/Home'
import { AdminLayout, DefaultLayout, HeaderOnly } from '../layouts'
import ForgotPassword from '../pages/ForgotPassword';
import Order from '../pages/Order';
import OrderDetail from '../pages/OrderDetail';
import SignUp from '../pages/SignUp';
import Oauth2 from '../pages/Oauth2';
import ProfileInfo from '../pages/ProfileInfo';
import ProductList from './../pages/ProductList/ProductList';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Admin from '../pages/Admin/Manage';
import MyOrder from '../pages/MyOrder';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';
import AddProduct from '../pages/Admin/Product/AddProduct';
import UpdateProduct from '../pages/Admin/Product/UpdateProduct';
import View404 from '../pages/404/View404';
import LoginAdmin from '../pages/LoginAdmin';

const publicRoutes = [
    { path: config.routes.productList, component: ProductList, layout: DefaultLayout },
    { path: config.routes.search, component: ProductList, layout: DefaultLayout },
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.productDetail, component: ProductDetail, layout: DefaultLayout },
    { path: config.routes.profile, component: ProfileInfo, layout: HeaderOnly },
    { path: config.routes.cart, component: Cart, layout: DefaultLayout },
    { path: config.routes.register, component: SignUp, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: HeaderOnly },
    { path: config.routes.order, component: Order, layout: DefaultLayout },
    { path: config.routes.myOrder, component: MyOrder, layout: HeaderOnly },
    { path: config.routes.orderSuccess, component: OrderSuccess },
    { path: config.routes.orderDetail, component: OrderDetail, layout: DefaultLayout },
    { path: config.routes.oauth2, component: Oauth2 },
    { path: config.routes.notFound, component: View404 },
    { path: config.routes.loginManage, component: LoginAdmin },
];

const privateRoutes = [
    { path: config.routes.productList, component: ProductList, layout: DefaultLayout },
    { path: config.routes.search, component: ProductList, layout: DefaultLayout },
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.productDetail, component: ProductDetail, layout: DefaultLayout },
    { path: config.routes.profile, component: ProfileInfo },
    { path: config.routes.cart, component: Cart, layout: DefaultLayout },
    { path: config.routes.register, component: SignUp, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: HeaderOnly },
    { path: config.routes.order, component: Order, layout: DefaultLayout },
    { path: config.routes.myOrder, component: MyOrder, layout: HeaderOnly },
    { path: config.routes.orderSuccess, component: OrderSuccess },
    { path: config.routes.orderDetail, component: OrderDetail, layout: DefaultLayout },
    { path: config.routes.oauth2, component: Oauth2 },

    
    { path: config.routes.admin, component: Admin, layout: AdminLayout },
    { path: config.routes.addProduct, component: AddProduct },
    { path: config.routes.updateProduct, component: UpdateProduct },
];

export { publicRoutes, privateRoutes };