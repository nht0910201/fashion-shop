import { Grid, Loading, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getCatgoriesByAdmin, getUsersByAdmin, getAllBrandsByAdmin, getProductsByAdmin, getOrdersByAdmin } from "../../../services/AdminService";
import TableBrand from "./TableBrand";
import TableCategories from "./TableCategories";
import TableOrder from "./TableOrder";
import TableProduct from "./TableProduct";
import TableUser from "./TableUser";

function Admin() {
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState({})
  useEffect(() => {
    async function getData() {
      let [products, orders, users, categories, brands] = await Promise.all([
        getProductsByAdmin(0),
        getOrdersByAdmin(0),
        getUsersByAdmin(0),
        getCatgoriesByAdmin(),
        getAllBrandsByAdmin()
      ]);
      if (products.success && orders.success && users.success && categories.success && brands.success) {
        setProducts(products.data)
        setOrders(orders.data)
        setCategories(categories.data)
        setBrands(brands.data)
        setUsers(users.data)
      }
    }
    getData()
  }, [])
  let locate = useLocation()
  let params = new URLSearchParams(locate.search);
  let url = params.get('page')
  return (
    <div className="w-full">
      {users.length === 0 || categories.length === 0 || brands.length === 0 || products.length === 0 || orders.length === 0 ?
        <Grid.Container wrap="wrap" justify="center" gap={2} >
          <Grid xs={12} css={{ w: '100vw', h: '100vh' }} alignItems='center' justify="center">
            <Loading size='xl' type='gradient' color={'warning'} />
          </Grid>
        </Grid.Container>
        : <>
          <TableUser users={users} show={url === 'user' || url === null ? false : true} />
          <TableProduct products={products} show={url === 'product' ? false : true} />
          <TableCategories categories={categories} show={url === 'category' ? false : true} />
          <TableBrand brands={brands} show={url === 'brand' ? false : true} />
          <TableOrder orders={orders} show={url === 'order' ? false : true} />
        </>}
    </div>
  );
}

export default Admin;