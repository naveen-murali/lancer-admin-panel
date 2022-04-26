import React, { memo, useRef, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavLinkContent from './NavLinkContent';

export const DropDown = memo(({ data, pathname }) => {
    const mainRef = useRef(null);
    const containerRef = useRef(null);

    const [height, setHeight] = useState(0);

    const toggleDropdown = () => setHeight((prev) =>
        prev ? 0 : containerRef.current.offsetHeight);

    const getNavLinkData = (item, data) => {
        item.icon = item.icon || data.icon;
        return item;
    };

    return <>
        <Nav.Link
            onClick={toggleDropdown}
            className={`d-flex align-items-center w-100 sideNavLink ${pathname === data.path ? "selected" : (data.path !== "/" && pathname.startsWith(data.path)) && "selected"} text-white mb-2 rounded`}>
            <span className='d-flex align-items-center justify-content-center p-0'>
                {data.icon}
            </span>
            <div className="d-flex align-items-center justify-content-between w-100">
                <span className='d-flex align-items-center justify-content-center p-0 lancer-sidenav-title' style={{ marginLeft: "1rem" }}>
                    {data.title}
                </span>
                <span className='d-flex align-items-center justify-content-center p-0 lancer-sidenav-arrow'
                    style={{
                        marginLeft: "1rem",
                        transition: "all 0.4s ease",
                        transform: height ? "rotateZ(90deg)" : "rotateZ(0deg)"
                    }}>
                    <svg style={{ fill: "white" }} height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" /></svg>
                </span>
            </div>
        </Nav.Link>

        <div className='m-0 p-0 rounded shadow'
            ref={mainRef}
            style={{
                height: `${height}px`,
                overflow: "hidden",
                transition: "all 0.4s ease",
                background: "#1a2038"
            }}>
            <div className='m-0 p-0 shadow' ref={containerRef}>
                {data.dropdownItems.map((item) =>
                    <LinkContainer to={item.path} key={item.path + data.path}>
                        <Nav.Link
                            className={`d-flex align-items-center w-100 sideNavLink ${pathname === item.path ? "selected" : (data.path !== "/" && pathname.startsWith(item.path)) && "selected"} text-white mb-2 rounded`}>
                            <NavLinkContent
                                data={getNavLinkData(item, data)} />
                        </Nav.Link>
                    </LinkContainer>
                )}
                <NavDropdown.Divider className='mb-5' />
            </div>
        </div>
    </>;
});