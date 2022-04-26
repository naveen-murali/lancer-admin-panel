import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { datas, lancerDatas } from './datas';
import { DropDown } from './DropDown';
import { NavLinkContent } from './NavLinkContent';
import {
    getSideNav,
    setSideNaveWidth,
    hideSideNav,
    clearSmall,
    setSmall,
    showSideNav
} from '../../features/SideNav/sideNav';


export const SideNav = memo(() => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const sideNav = useSelector(getSideNav);
    const { hide, small, width } = sideNav;

    const changeSideNav = useCallback(() => {
        const main = ref.current.offsetWidth;
        width !== main && dispatch(setSideNaveWidth(main));

        if (window.innerWidth > 992)
            dispatch(showSideNav());
        else if (window.innerWidth <= 992 && window.innerWidth > 768) {
            dispatch(hideSideNav());
            dispatch(clearSmall());
        }
        else if (window.innerWidth > 768)
            dispatch(clearSmall());
        else if (window.innerWidth <= 768)
            !small && dispatch(setSmall());

        // eslint-disable-next-line
    }, [dispatch, small]);


    useEffect(() => {
        const main = ref.current.offsetWidth;
        dispatch(setSideNaveWidth(main));
    }, [hide, dispatch]);

    useEffect(() => {
        changeSideNav();
    }, [changeSideNav]);

    useEffect(() => {
        window.addEventListener("resize", (e) => {
            changeSideNav();
        });

        return () => window.removeEventListener("resize", () => { });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={small ? 'shadow lancer-sidenav small' : 'shadow lancer-sidenav'}
            style={{
                width: small
                    ? hide
                        ? `0px`
                        : `${ref.current.offsetWidth}px`
                    : `${width}px`,
                zIndex: "2000"
            }}>
            <div className={small
                ? "px-2 lancer-sidenav-container"
                : hide
                    ? "px-2 lancer-sidenav-container hide"
                    : "px-2 lancer-sidenav-container"} ref={ref}>

                <Nav className="flex-column justify-content-end w-100">
                    {datas.map((data, index) =>
                        <span key={data.path + index + data.title}>
                            {!data.dropdown
                                ? <LinkContainer
                                    to={data.path}>
                                    <Nav.Link className={`d-flex align-items-center w-100 sideNavLink ${pathname === data.path ? "selected" : (data.path !== "/" && pathname.startsWith(data.path)) && "selected"} text-white mb-2 rounded`}>
                                        <NavLinkContent data={data} />
                                    </Nav.Link>
                                </LinkContainer>
                                : <>
                                    <DropDown pathname={pathname} data={data} />
                                </>}
                        </span>
                    )}
                </Nav>

                <h5 className='navHeaders mt-2 mx-1'>Lancer</h5>
                <Nav className="flex-column justify-content-end w-100">
                    {lancerDatas.map((data, index) =>
                        <LinkContainer
                            key={data.path + index + data.title}
                            to={data.path}>
                            <Nav.Link className={`d-flex align-items-center w-100 sideNavLink ${pathname === data.path ? "selected" : (data.path !== "/" && pathname.startsWith(data.path)) && "selected"} text-white mb-2 rounded`}>
                                <NavLinkContent data={data} />
                            </Nav.Link>
                        </LinkContainer>
                    )}
                </Nav>

            </div>
        </div >
    );
});
