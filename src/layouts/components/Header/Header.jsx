import { useEffect, useState } from 'react'
import { getAllCategory } from './../../../services/CategoryService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Text, Avatar, Dropdown, Input, Button, Tooltip } from "@nextui-org/react";
import { Layout } from "./Layout.jsx";
import { Link } from "@nextui-org/react";
import * as authAction from '../../../redux/auth/authSlice'
import InfoIcon from '../../../components/Icon/InfoIcon';
import NowOrder from '../../../components/Icon/NowrOrder';
import HistoryOrder from '../../../components/Icon/HistoryOrder';
import { getUserFromLocalStorage } from '../../../utils/userHanle';
import ModalLogin from './ModalLogin';
import { Logo } from './Logo';
import 'react-toastify/dist/ReactToastify.css';
import { Search, ShoppingBagOutlined } from '@mui/icons-material';
import Loading from '../../../components/Loading/Loading';
import Categories from './Categories';

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
  const optionMenu = [
    { name: 'Thông tin cá nhân', icon: <InfoIcon />, href: `/profile/${userCur?.id}` },
    { name: 'Đơn hàng hiện tại', icon: <NowOrder />, href: '/myOrderStatus' },
    { name: 'Lịch sử đơn hàng', icon: <HistoryOrder />, href: '/orderHistory' },
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
    navigate('/shoppingcart')
  }
  if (categories.length === 0) {
    return (
      <Loading />
      // <Skeleton variant="rectangular" width={'auto'} height={76} />
    )
  }
  return (
    <Layout>
      <Navbar shouldHideOnScroll maxWidth={'fluid'} isBordered variant="sticky">
        <Navbar.Toggle showIn={'sm'} />
        <Navbar.Brand>
          <Text b color="inherit" hideIn="sm" css={{marginRight:'$10'}}>
            <Link color={'warning'} href='/'><Logo /></Link>
          </Text>
          <Navbar.Content
            enableCursorHighlight
            activeColor="warning"
            hideIn="sm"
            variant="default"
          >
            <Navbar.Link isActive href="#">Trang chủ</Navbar.Link>
            <Tooltip content={<Categories categories={categories} />} css={{ left: '$0', transform: 'none' }} placement='bottom'>
              <Navbar.Link href="#">
                Sản phẩm
              </Navbar.Link>
            </Tooltip>
            <Navbar.Link href="#">Giới thiệu</Navbar.Link>
            <Navbar.Link href="#">Liên hệ</Navbar.Link>
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
                <Button onClick={handleSearch} light size={16}><Search /></Button>
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
                      color="primary"
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
                  {/* <Dropdown.Item key={''} withDivider color="default">
                    <ModalLogin show={userCur?.id !== undefined ? false : true} />
                  </Dropdown.Item> */}
                  {optionMenu.map((option) => (
                    <Dropdown.Item key={option.href} color="default">
                      {option.name}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item withDivider color="default">
                    <Button onClick={handleLogout} color={'error'} light css={{ display: "flex", justifyContent: "flex-start", padding: "$0" }}>Đăng xuất</Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </>
            :
            <>
              <ModalLogin />
              <Button auto ghost as={Link} href="/register">
                Đăng ký
              </Button>
            </>
          }
        </Navbar.Content>
        <Navbar.Collapse>
          {categories.map((category) => (
            category.subCategories.map((subCategory, index) => (
              <Navbar.CollapseItem
                key={index}
                activeColor="secondary"
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
