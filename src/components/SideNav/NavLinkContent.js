import React, { memo } from 'react';

export const NavLinkContent = memo(({ data }) => {
    return (
        <>
            <span className='d-flex align-items-center justify-content-center p-0'>
                {data.icon}
            </span>
            <div className="d-flex align-items-center justify-content-between w-100">
                <span className='d-flex align-items-center justify-content-center p-0 lancer-sidenav-title' style={{ marginLeft: "1rem" }}>
                    {data.title}
                </span>
                <span className='d-flex align-items-center justify-content-center p-0 lancer-sidenav-arrow' style={{ marginLeft: "1rem" }}>
                    <svg style={{ fill: "white" }} height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" /></svg>
                </span>
            </div>
        </>
    );
});

export default NavLinkContent;