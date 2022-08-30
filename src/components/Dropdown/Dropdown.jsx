/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/solid'
import LoginIcon from '../Icon/LoginIcon'
import RegisterIcon from '../Icon/RegisterIcon'
import InfoIcon from '../Icon/InfoIcon'
import NowOrder from '../Icon/NowrOrder'
import HistoryOrder from '../Icon/HistoryOrder'
import LogoutIcon from '../Icon/LogoutIcon'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { userSelector } from '../../redux/auth/authSlice';
import * as authAction from '../../redux/auth/authSlice'
// import { classNames } from 'classnames/bind';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const optionMenu = [
    { name: 'Đăng nhập', icon: <LoginIcon />, href: '/login' },
    { name: 'Đăng ký', icon: <RegisterIcon />, href: '/register' },
    { name: 'Thông tin cá nhân', icon: <InfoIcon />, href: '/profile' },
    { name: 'Đơn hàng hiện tại', icon: <NowOrder />, href: '/myOrderStatus' },
    { name: 'Lịch sử đơn hàng', icon: <HistoryOrder />, href: '/orderHistory' },
    // { name: 'Đăng xuất', icon: <LogoutIcon />, href: '/' },
]
export default function Dropdown() {
    const dispatch = useDispatch();
    let userCur = useSelector(userSelector)
    let newOptionMenu = []
    const [a, b, ...rest] = optionMenu
    if (userCur.email === '') {
        newOptionMenu = [a, b]
    } else {
        newOptionMenu = [...rest]
    }
    const handleLogout = () =>{
        dispatch(authAction.logout())
    }
    
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-600">
                    <UserIcon className="w-6 h-6" aria-hidden="true" />
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {newOptionMenu.map((item, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <Link to={item.href} className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm', 'flex justify-between'
                                    )}>
                                        <span>{item.name}</span>
                                        {item.icon}
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                        
                        <Menu.Item>
                            {({ active }) => (
                                <button hidden={userCur.email !== ''?false:true} onClick={handleLogout} id='btn' className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm w-full', 'flex justify-between'
                                )}>
                                    <span>Đăng xuất</span>
                                    <LogoutIcon />
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
