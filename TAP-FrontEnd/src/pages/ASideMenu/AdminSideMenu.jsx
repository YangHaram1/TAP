import { useEffect, useState } from 'react';
import styles from './BizSideMenu.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBox, FaCartPlus } from 'react-icons/fa';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

export const AdminSideMenu =()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState('');

    const menus = [
        { name: "대시보드", link: "/", type: "dashboard" },
        { 
          name: "회원관리", link: "/members", type: "memberManage", 
          submenus: [
            { name: "일반회원관리", link: "/members/user" },
            { name: "기업회원관리", link: "/members/biz" }
          ]
        }
    ];
    
    const [dropdown, setDropdown] = useState(() => {
        const savedState = localStorage.getItem('dropdownState');
        return savedState ? JSON.parse(savedState) : { memberManage: false };
    });

    const handleMenuClick = (link, type) => {
        setSelectedMenu(type);
        navigate(link);
    };

    const toggleDropdown = (menuType) => {
        setDropdown(prev => {
          const newDropdownState = { ...prev, [menuType]: !prev[menuType] };
          localStorage.setItem('dropdownState', JSON.stringify(newDropdownState));
          return newDropdownState;
        });
    };

    useEffect(() => {
        const path = location.pathname;
        let newSelectedMenu = '';
        let newDropdownState = { memberManage: false };
    
        menus.forEach(menu => {
          if (path.startsWith(menu.link)) {
            newSelectedMenu = menu.type;
            if (menu.submenus) {
              const matchedSubmenu = menu.submenus.find(submenu => path === submenu.link);
              if (matchedSubmenu) {
                newSelectedMenu = matchedSubmenu.name;
              }
              newDropdownState = {
                ...newDropdownState,
                [menu.type]: true
              };
            }
          }
        });
    
        setSelectedMenu(newSelectedMenu);
        setDropdown(prev => ({
          ...prev,
          ...newDropdownState
        }));
      }, [location.pathname]);
    
      return (
        <div className={styles.container}>
          <div className={styles.menuContainer}>
            {menus.map((menu, i) => (
              <div key={i}>
                <div 
                  className={styles.menuItem} 
                  onClick={() => menu.submenus ? toggleDropdown(menu.type) : handleMenuClick(menu.link, menu.type)}
                >
                  <div className={styles.icon}>
                    {menu.type === 'dashboard' ? <FaBox size={20} /> : <FaCartPlus size={20} />}
                  </div>
                  <span className={styles.menuTitle}>{menu.name}</span>
                  {menu.submenus && (
                    <div className={styles.dropdownToggle}>
                      {dropdown[menu.type] ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
                    </div>
                  )}
                </div>
                {menu.submenus && dropdown[menu.type] && (
                  <div className={styles.submenuContainer}>
                    {menu.submenus.map((submenu, j) => (
                      <div 
                        key={j} 
                        className={styles.submenuItem} 
                        onClick={() => handleMenuClick(submenu.link, submenu.name)}
                        style={{ color: selectedMenu === submenu.name ? 'orange' : 'gray' }}
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
      );
    };
