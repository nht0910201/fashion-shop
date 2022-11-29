import { useEffect, useState } from 'react'
import { getAllCategory } from './../../../services/CategoryService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Text, Avatar, Dropdown, Input, Button, Tooltip } from "@nextui-org/react";
import { Layout } from "./components/Layout.jsx";
import { Link } from "@nextui-org/react";
import * as authAction from '../../../redux/auth/authSlice'
import { getUserFromLocalStorage } from '../../../utils/userHanle';
import ModalLogin from './components/ModalLogin';
import { Logo } from './components/Logo';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowDropDown, Search, ShoppingBagOutlined } from '@mui/icons-material';
import Categories from './components/Categories';

export default function Header() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    async function getData() {
      let Categories = await getAllCategory();
      setCategories(Categories.data)
    }
    getData()
  }, []);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let userCur = getUserFromLocalStorage()
  const optionClient = [
    { name: 'Thông tin cá nhân', href: `/profile/${userCur?.id}`},
    { name: 'Đơn hàng của tôi', href: '/myOrder'},
    
  ]
  const optionAdmin = [
    { name: 'Thông tin cá nhân', href: `/profile/${userCur?.id}`},
    { name: 'Đơn hàng của tôi', href: '/myOrder'},
    { name: 'Quản lý', href: '/admin'},
  ]
  const handleLogout = () => {
    navigate('/')
    dispatch(authAction.logout())
  }
  const [search, setSearch] = useState('')
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSearch = async () => {
    navigate(`/search?q=${search}`)
  }
  const handleClickCart = () => {
    navigate('/cart')
  }

  return (
    <Layout>
      <Navbar shouldHideOnScroll maxWidth={'fluid'} isBordered variant={"sticky"}>
        <Navbar.Toggle showIn={'sm'} />
        <Navbar.Brand>
          <Text b color="inherit" hideIn="sm">
            <Link style={{marginLeft:-35}} color={'warning'} href='/'><Logo /></Link>
          </Text>
          <Navbar.Content
            enableCursorHighlight
            activeColor="warning"
            hideIn="sm"
            variant="default"
          >
            <Navbar.Link isActive href="/">TRANG CHỦ</Navbar.Link>
            <Tooltip
              content={<Categories categories={categories}/>}
              css={{ left: '$0', transform: 'none' }}
              placement='bottom'
              hideArrow >
              <Navbar.Link href="#">
                SẢN PHẨM <ArrowDropDown/>
              </Navbar.Link>
            </Tooltip>
            <Navbar.Link href="#">GIỚI THIỆU</Navbar.Link>
            <Navbar.Link href="#">LIÊN HỆ</Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
        {/* Search  */}
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Input
              clearable
              contentRight={
                <Button onClick={handleSearch} disabled={search === '' ? true : false} light size={16}><Search /></Button>
              }
              contentRightStyling={false}
              underlined
              color='warning'
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Tìm kiếm"
              value={search}
              onChange={handleSearchChange}
            />
          </Navbar.Item>
          {userCur?.id !== undefined ?
            <>
              <Button onClick={handleClickCart} size={'xs'} light css={{ padding: '$0' }}><ShoppingBagOutlined /></Button>
              <Dropdown placement="bottom-right">
                <Navbar.Item>
                  <Dropdown.Trigger>
                    <Avatar
                      bordered
                      as="button"
                      color="warning"
                      size="md"
                      src={userCur?.id !== undefined ? userCur?.avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png"}
                    />
                  </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu
                  aria-label="User menu actions"
                  color="secondary"
                  onAction={(key) => {
                    window.location.href = key
                  }}
                  css={{ paddingTop: '$0' }}
                >
                  {/* {optionMenu.map((option) => (
                    <Dropdown.Item key={option.href} color="default">
                      {option.name}
                    </Dropdown.Item>
                  ))} */}
                  {userCur.role === 'ROLE_USER' ?
                    optionClient.map((option) => (
                      <Dropdown.Item key={option.href} color="default">
                        {option.name}
                      </Dropdown.Item>
                    ))
                    :
                    optionAdmin.map((option) => (
                      <Dropdown.Item key={option.href} color="default">
                        {option.name}
                      </Dropdown.Item>
                    ))
                  }
                  <Dropdown.Item withDivider color="default">
                    <Button onClick={handleLogout} color={'error'} light css={{ display: "flex", justifyContent: "flex-start", padding: "$0" }}>Đăng xuất</Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </>
            :
            <>
              <ModalLogin />
              <Button auto css={{marginLeft:-15}} ghost as={Link} color='warning' href="/register">
                Đăng ký
              </Button>
            </>
          }
        </Navbar.Content>
        <Navbar.Collapse showIn={'sm'}>
          {categories.map((category) => (
            category.subCategories.map((subCategory, index) => (
              <Navbar.CollapseItem
                key={index}
                activeColor="warning"
              >
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href="#"
                >
                  {subCategory.name}
                </Link>
              </Navbar.CollapseItem>
            ))
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Layout >
  );
}
