import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { getCatgoriesByAdmin, getUsersByAdmin,getAllBrandsByAdmin, getProductsByAdmin, getOrdersByAdmin } from "../../../services/AdminService";
import TableBrand from "./TableBrand";
import TableCategories from "./TableCategories";
import TableOrder from "./TableOrder";
import TableProduct from "./TableProduct";
import TableUser from "./TableUser";

function Admin() {
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [brands,setBrands] = useState([])
  const [products,setProducts] = useState([])
  const [orders,setOrders] = useState([])
  let [pageUSer, setPageUser] = useState(0);
  const [totalPageUser, setTotallPageUser] = useState(0)
  const [quantityUser, setQuantityUser] = useState(0)
  useEffect(() => {
    async function getUsers() {
      let allUser = await getUsersByAdmin(pageUSer)
      if (allUser.success) {
        setUsers(allUser.data.list)
        setTotallPageUser(allUser.totalPage)
        setQuantityUser(allUser.totalQuantity)
      }
    }
    async function getCategories() {
      let allCategories = await getCatgoriesByAdmin()
      setCategories(allCategories.data)
    }
    async function getBrands(){
      let allBrands = await getAllBrandsByAdmin();
      setBrands(allBrands.data)
    }
    async function getOrders(){
      let allOrders = await getOrdersByAdmin(0)
      if(allOrders.success){
        setOrders(allOrders.data)
      }
    }
    async function getProducts(){
      let allProducts = await getProductsByAdmin(0)
      if(allProducts.success){
        setProducts(allProducts.data.list)
      }
    }
    getProducts()
    getOrders()
    getUsers()
    getCategories()
    getBrands()
  }, [])
  let locate = useLocation()
  let params = new URLSearchParams(locate.search);
  let url = params.get('page')
  if(users.length === 0 || categories.length === 0 || brands.length === 0 || products.length ===0 || orders.length === 0){
    return <Loading/>
  }
  return (
    <div className="w-full">
      <TableUser users={users} totalPage={totalPageUser} totalQuantity={quantityUser} show={url === 'user' || url ===null ? false : true}/>
      <TableProduct products={products} show={url === 'product'  ? false : true}/>
      <TableCategories categories={categories} show={url === 'category' ? false : true}/>
      <TableBrand brands={brands} show={url === 'brand' ? false : true}/>
      <TableOrder orders={orders} show={url === 'order' ? false : true}/>
    </div>
  );
}

export default Admin;