import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { getCatgoriesByAdmin, getUsersByAdmin,getAllBrandsByAdmin, getProductsByAdmin } from "../../../services/AdminService";
import TableBrand from "./TableBrand";
import TableCategories from "./TableCategories";
import TableProduct from "./TableProduct";
import TableUser from "./TableUser";

function Admin() {
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [brands,setBrands] = useState([])
  const [products,setProducts] = useState([])
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
    async function getProducts(){
      let allProducts = await getProductsByAdmin(0)
      if(allProducts.success){
        setProducts(allProducts.data.list)
      }
    }
    getProducts()
    getUsers()
    getCategories()
    getBrands()
  }, [])
  if(users.length === 0 || categories.length === 0 || brands.length === 0 || products.length ===0){
    return <Loading/>
  }
  return (
    <div className="w-full">
      <TableUser users={users} totalPage={totalPageUser} totalQuantity={quantityUser} />
      <TableProduct products={products}/>
      <TableCategories categories={categories} />
      <TableBrand brands={brands}/>
      <Text id="order" hidden>Quản lý Order</Text>
    </div>
  );
}

export default Admin;