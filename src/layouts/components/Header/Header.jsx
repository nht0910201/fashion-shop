import { useEffect, useState } from 'react'
import { getAllCategory } from './../../../services/CategoryService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Text, Avatar, Dropdown, Input, Button } from "@nextui-org/react";
import { Layout } from "./Layout.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import { icons } from './Icon'
import { Link } from "@nextui-org/react";
import * as authAction from '../../../redux/auth/authSlice'
import InfoIcon from '../../../components/Icon/InfoIcon';
import NowOrder from '../../../components/Icon/NowrOrder';
import HistoryOrder from '../../../components/Icon/HistoryOrder';
import { getUserFromLocalStorage } from '../../../utils/userHanle';
import ModalLogin from './ModalLogin';
import { Logo } from './Logo';

export default function Header() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    async function getData() {
      let Categories = await getAllCategory()
      setCategories(Categories.data)
    }
    getData()
  }, []);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let userCur = getUserFromLocalStorage()
  const optionMenu = [
    // { name: 'Đăng nhập', icon: <LoginIcon />, href: '/login' },
    // { name: 'Đăng ký', icon: <RegisterIcon />, href: '/register' },
    { name: 'Thông tin cá nhân', icon: <InfoIcon />, href: `/profile/${userCur?.id}` },
    { name: 'Đơn hàng hiện tại', icon: <NowOrder />, href: '/myOrderStatus' },
    { name: 'Lịch sử đơn hàng', icon: <HistoryOrder />, href: '/orderHistory' },
  ]
  // let newOptionMenu = []
  // const [a, b, ...rest] = optionMenu
  // if (userCur?.id === undefined) {
  //   newOptionMenu = [a, b]
  // } else {
  //   newOptionMenu = [...rest]
  // }
  const handleLogout = () => {
    navigate('/')
    dispatch(authAction.logout())
  }
  return (
    <Layout>
      <Navbar maxWidth={'fluid'} isBordered variant="sticky">
        <Navbar.Toggle showIn={'xs'} />
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            <Link href='/'><Logo/>FASHION</Link> 
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="default"
        >
          {categories.map((category) => (
            <Dropdown isBordered key={category.id}>
              <Navbar.Item>
                <Dropdown.Button
                  auto
                  light
                  css={{
                    px: 0,
                    dflex: "center",
                    svg: { pe: "none" },
                  }}
                  iconRight={icons.chevron}
                  ripple={false}

                >
                  {category.name}
                </Dropdown.Button>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="ACME features"
                css={{
                  $$dropdownMenuWidth: "340px",
                  $$dropdownItemHeight: "70px",
                  "& .nextui-dropdown-item": {
                    py: "$4",
                    // dropdown item left icon
                    svg: {
                      color: "$secondary",
                      mr: "$4",
                    },
                    // dropdown item title
                    "& .nextui-dropdown-item-content": {
                      w: "100%",
                      fontWeight: "$semibold",
                    },
                  },
                }}
                onAction={(key) => { window.location.href = `/listProduct/${key}` }}
                items={category.subCategories}
              >
                {(item) => (
                  <Dropdown.Item
                    key={item.id}
                    icon={icons.scale}
                  >
                    {item.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </Navbar.Content>
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
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
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
              placeholder="Search..."
            />
          </Navbar.Item>
          {userCur?.id !== undefined ?
            <>
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
              <Button auto flat as={Link} href="/register">
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
