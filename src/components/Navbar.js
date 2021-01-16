import React, { useState, useEffect } from 'react';
import { FaBars} from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
// import logo from '../../public/images/BRUTES_Logo_Horiz_W_S.png';
import { Nav,
        NavbarContainer,
        NavLogo,
        MobileIcon,
        NavMenu,
        NavItem,
        NavLinks,
        NavBtn,
        NavBtnLink,} from './NavbarElements';

const Navbar = ({ toggle }) => {


    const toggleHome = () => {
    };
    
    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav>
                    <NavbarContainer>


                        <MobileIcon onClick={toggle}>
                            
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks to="about"
                                        smooth={true} 
                                        duration={500} 
                                        spy={true} 
                                        exact='true' 
                                        offset={-80}
                                >Brutes</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="marketplace"
                                        smooth={true} 
                                        duration={500} 
                                        spy={true} 
                                        exact='true' 
                                        offset={-80}
                                >Gears</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="services"
                                        smooth={true} 
                                        duration={500} 
                                        spy={true} 
                                        exact='true' 
                                        offset={-80}
                                >Marketplace</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="arena"
                                        smooth={true} 
                                        duration={500} 
                                        spy={true} 
                                        exact='true' 
                                        offset={-80}
                                >Account</NavLinks>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink to="/signin">Sign In</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;
