import React, { useEffect, useState } from 'react'
import styles from './BizSideMenu.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaBox, FaCartPlus } from 'react-icons/fa'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

export const AdminSideMenu = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedMenu, setSelectedMenu] = useState('')

    const menus = [
        { name: '대시보드', link: '/', type: 'dashboard', icon: FaBox },
        {
            name: '상품관리',
            link: '/products',
            type: 'productManage',
            icon: FaCartPlus,
            submenus: [
                { name: '상품ㅎ관리', link: '/products/product' },
                { name: '상품신청관리', link: '/products/apply' },
                { name: '할인신청관리', link: '/products/apply/sale' },
            ],
        },
        {
            name: '주문관리',
            link: '/orders',
            type: 'orderManage',
            icon: FaCartPlus,
            submenus: [{ name: '주문ㅎ관리', link: '/orders/user' }],
        },
        {
            name: '고객관리',
            link: '/members',
            type: 'memberManage',
            icon: FaCartPlus,
            submenus: [
                { name: '일반회원관리', link: '/members/user' },
                { name: '기업회원관리', link: '/members/biz' },
            ],
        },
        {
            name: '고객센터',
            link: '/support',
            type: 'supportManage',
            icon: FaCartPlus,
            submenus: [
                { name: '관리자 1:1 상담', link: '/support/chat' },
                { name: '고객 문의내역', link: '/support/inquiry' },
            ],
        },
        {
            name: '쿠폰 관리',
            link: '/coupon',
            type: 'couponManage',
            icon: FaCartPlus,
            submenus: [
                { name: '쿠폰 종류', link: '/coupon/type' },
                { name: '사용자 쿠폰 내역', link: '/coupon/list' },
            ],
        },
        {
            name: '멤버쉽 관리',
            link: '/grade',
            type: 'gradeManage',
            icon: FaCartPlus,
        },
        {
            name: '게시물 관리',
            link: '/board',
            type: 'boardManage',
            icon: FaCartPlus,
            submenus: [
                { name: '공지사항', link: '/board/notice' },
                { name: '사용자 기대평 내역', link: '/board/list' },
            ],
        },
        {
            name: '로그 관리',
            link: '/log',
            type: 'logManage',
            icon: FaCartPlus,
        },
    ]

    const [dropdown, setDropdown] = useState(() => {
        const savedState = localStorage.getItem('dropdownState')
        return savedState ? JSON.parse(savedState) : {}
    })

    const handleMenuClick = (link, type) => {
        setSelectedMenu(type)
        navigate(link)
    }

    const toggleDropdown = menuType => {
        setDropdown(prev => {
            const newDropdownState = { ...prev, [menuType]: !prev[menuType] }
            localStorage.setItem(
                'dropdownState',
                JSON.stringify(newDropdownState)
            )
            return newDropdownState
        })
    }

    useEffect(() => {
        const path = location.pathname
        let newSelectedMenu = ''
        let newDropdownState = {}

        menus.forEach(menu => {
            if (path.startsWith(menu.link)) {
                newSelectedMenu = menu.type
                if (menu.submenus) {
                    const matchedSubmenu = menu.submenus.find(
                        submenu => path === submenu.link
                    )
                    if (matchedSubmenu) {
                        newSelectedMenu = matchedSubmenu.name
                    }
                    newDropdownState = {
                        ...newDropdownState,
                        [menu.type]: true,
                    }
                }
            }
        })

        setSelectedMenu(newSelectedMenu)
        setDropdown(prev => ({
            ...prev,
            ...newDropdownState,
        }))
    }, [location.pathname])

    return (
        <div className={styles.container}>
            <div className={styles.menuContainer}>
                {menus.map((menu, i) => (
                    <div key={i}>
                        <div
                            className={styles.menuItem}
                            onClick={() =>
                                menu.submenus
                                    ? toggleDropdown(menu.type)
                                    : handleMenuClick(menu.link, menu.type)
                            }
                        >
                            <div className={styles.icon}>
                                {React.createElement(menu.icon, { size: 20 })}{' '}
                                {/* 아이콘 동적 생성 */}
                                {/* {menu.type === 'dashboard' ? <FaBox size={20} /> : <FaCartPlus size={20} />} */}
                            </div>
                            <span className={styles.menuTitle}>
                                {menu.name}
                            </span>
                            {menu.submenus && (
                                <div className={styles.dropdownToggle}>
                                    {dropdown[menu.type] ? (
                                        <HiChevronUp size={20} />
                                    ) : (
                                        <HiChevronDown size={20} />
                                    )}
                                </div>
                            )}
                        </div>
                        {menu.submenus && dropdown[menu.type] && (
                            <div className={styles.submenuContainer}>
                                {menu.submenus.map((submenu, j) => (
                                    <div
                                        key={j}
                                        className={styles.submenuItem}
                                        onClick={() =>
                                            handleMenuClick(
                                                submenu.link,
                                                submenu.name
                                            )
                                        }
                                        style={{
                                            color:
                                                selectedMenu === submenu.name
                                                    ? 'rgb(122 74 207)'
                                                    : 'gray',
                                            fontWeight:
                                                selectedMenu === submenu.name
                                                    ? 'bold'
                                                    : '100',
                                        }}
                                    >
                                        {submenu.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
