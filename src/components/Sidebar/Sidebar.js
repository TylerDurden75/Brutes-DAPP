import React, {useState, useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import * as s from './Sidebar.styles';

const Sidebar = props => {
    const {
        backgroundImage = 'BRUTES_ARC_4.png',
        sidebarHeader = {
            fullName: '',
            shortName: ''
        },
        menuItems = [],
        fonts = {
            header: '',
            menu: ''
        }
    } = props;

    //State 
    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
    const [isSidebarOpen, setSidebarState] = useState(true);
    const [header, setHearder] = useState(sidebarHeader.fullName);
    const [subMenusStates, setSubmenus] = useState({});


    //Update of header state
    useEffect(() => {
        isSidebarOpen ? setTimeout(() => setHearder(sidebarHeader.fullName), 200) : setHearder(sidebarHeader.shortName);
    }, [isSidebarOpen, sidebarHeader])


    //Update of sidebar state
    useEffect(() => {
        const updateWindowWidth = () => {
            if (window.innerWidth < 1280 /*&& isSidebarOpen*/) setSidebarState(false);
            else setSidebarState(true)
        }
        window.addEventListener('resize', updateWindowWidth);

        return () => window.removeEventListener('resize', updateWindowWidth);
    }, [/*isSidebarOpen*/]);

    useEffect(() => {
        const newSubmenus = {};

        menuItems.forEach((item, index) => {
            const hasSubmenus = item.subMenuItems.length !== 0;

            if (hasSubmenus) {
            newSubmenus[index] = {};
            newSubmenus[index]['isOpen'] = false;
            newSubmenus[index]['selected'] = null;
            }
        })
        setSubmenus(newSubmenus)

    }, [menuItems]);

    const handleMenuItemClick = (name, index) => {
        setSelectedMenuItem(name)

        const subMenusCopy = JSON.parse(JSON.stringify(subMenusStates));

        if (subMenusStates.hasOwnProperty(index)) {
            subMenusCopy[index]['isOpen'] = !subMenusStates[index]['isOpen']
            setSubmenus(subMenusCopy)
        }
        else {
           for (let item in subMenusStates) {
               subMenusCopy[item]['isOpen'] = false;
               subMenusCopy[item]['selected'] = null
           }
           setSubmenus(subMenusCopy);
        }
    }


    const handleSubMenuItemClick = (menuItemIdx, subMenuItemIdx) => {
        const subMenusCopy = JSON.parse(JSON.stringify(subMenusStates));

        subMenusCopy[menuItemIdx]['selected'] = subMenuItemIdx;
        setSubmenus(subMenusCopy);
    }

    const menuItemsJSX = menuItems.map((item, index) => {
        const isItemSelected = selected === item.name;

        const hasSubmenus = !!item.subMenuItems.length;
        const isOpen = subMenusStates[index] ? subMenusStates[index].isOpen : null;

        const subMenusJSX = item.subMenuItems.map((subMenuItem, subMenuItemIndex) => {
            const isSubmenuItemSelected = subMenusStates[index] ? subMenusStates[index].selected : null;
            return (
                <Link to={`${item.to}${subMenuItem.to}`} style={{textDecoration: 'none' }} key={subMenuItemIndex}>
                    <s.SubMenuItem
                        onClick={() => handleSubMenuItemClick(index, subMenuItemIndex)}
                        selected={{isSubmenuItemSelected}}
                    >
                        {subMenuItem.name}
                    </s.SubMenuItem>
                </Link>
            )
        })

        return (
            <s.ItemContainer key={index}>
                <Link to={item.to} style={{ textDecoration: 'none' }}>
                    <s.MenuItem 
                        font={fonts.menu}
                        selected={isItemSelected}
                        onClick={() => handleMenuItemClick(item.name, index)}
                        isSidebarOpen={isSidebarOpen}
                        isOpen={isOpen}
                    >
                        <s.Icon isSidebarOpen={isSidebarOpen} src={item.icon}/>
                        <s.Text isSidebarOpen={isSidebarOpen}>{item.name}</s.Text>
                        {hasSubmenus && isSidebarOpen && (
                            <s.DropdownIcon selected={isItemSelected} isOpen={isOpen}/>
                        )}
                    </s.MenuItem>
                </Link>

                {/*Display submenus if they exist*/}
                <AnimatePresence>
                    {hasSubmenus && isOpen && (
                        <motion.nav
                            inital={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            exit={{ opacity: 0, x: -30 }}
                        >
                            <s.SubMenuItemContainer isSidebarOpen={isSidebarOpen}>{subMenusJSX}</s.SubMenuItemContainer>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </s.ItemContainer>
        )
    });

    return (
        <s.SidebarContainer backgroundImage={backgroundImage} isSidebarOpen={isSidebarOpen}>
            <s.SidebarHeader font={fonts.header}>{header}</s.SidebarHeader>
            <s.MenuItemContainer>{menuItemsJSX}</s.MenuItemContainer>
            <s.TogglerContainer onClick={() => setSidebarState(!isSidebarOpen)}>
                <s.Toggler/>
            </s.TogglerContainer>
        </s.SidebarContainer>
    )
}

export default Sidebar;