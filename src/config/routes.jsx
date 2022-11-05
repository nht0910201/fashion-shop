const routes = {
    home: '/',
    register:'/register',
    forgotPassword:'/forgotPassword',
    listProduct:'/listProduct/:id',
    productList:'/productList/:id',
    search:'/search',
    detailProduct:'/detailProduct/:id',
    productDetail:'/productDetail/:id',
    profile:'/profile/:id',
    shoppingCart:'/shoppingcart',
    cart:'/cart',
    order:'/order',
    orderHistory:'/orderHistory',
    myOrder:'/myOrder',
    orderSuccess:'/redirect/payment',
    orderDetail:'/orderDetail/:id',
    oauth2:'/oauth2/redirect',
    admin :'/admin',
    addProduct: '/admin/addProduct',
    updateProduct:'admin/updateProduct/:id',
    notFound:'*'
};

export default routes;