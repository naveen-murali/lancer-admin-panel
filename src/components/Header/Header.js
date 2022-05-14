import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import LinearProgress from '@mui/material/LinearProgress';

import { Price } from "../Price/Price";
import { getLancer } from '../../features/Lancer/lancerSlice';
import { toggleNav } from '../../features/SideNav/sideNav';
import { getLoadingState } from '../../features/Loading/loadingSlice';
import { getAdminInfo, logout } from '../../features/Admin/adminSlice';


export const Header = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const { adminInfo } = useSelector(getAdminInfo);
  const loading = useSelector(getLoadingState);
  const { wallet } = useSelector(getLancer);

  const logoutHandler = () => {
    dispatch(logout());
    redirect('/login');
  };

  return (
    <header className='bg-white'>
      <Navbar bg='white' variant='' expand='md' collapseOnSelect className="shadow py-0">
        <Container fluid>

          <div className="p-0 m-0 d-flex algin-items-center">
            <Button
              onClick={() => dispatch(toggleNav())}
              className="bg-transparent p-2 px-3 m-0"
              style={{ fontSize: "20px" }}>
              <i className="fas fa-bars us-navToggler p-0 m-0"></i>
            </Button>

            <LinkContainer to="/">
              <Navbar.Brand className="brand-text m-0">
                <span>L</span>ancer
              </Navbar.Brand>
            </LinkContainer>
          </div>

          <Nav.Item className="m-0 px-3 d-flex">
            <Nav.Link className='d-flex align-items-center'>
              <span>
                <svg height="24" width="24"><path d="M16 13.5Q16.65 13.5 17.075 13.075Q17.5 12.65 17.5 12Q17.5 11.35 17.075 10.925Q16.65 10.5 16 10.5Q15.35 10.5 14.925 10.925Q14.5 11.35 14.5 12Q14.5 12.65 14.925 13.075Q15.35 13.5 16 13.5ZM5 19Q5 19 5 19Q5 19 5 19Q5 19 5 19Q5 19 5 19V5Q5 5 5 5Q5 5 5 5Q5 5 5 5Q5 5 5 5Q5 5 5 6.112Q5 7.225 5 9V15Q5 16.775 5 17.887Q5 19 5 19ZM5 21Q4.175 21 3.587 20.413Q3 19.825 3 19V5Q3 4.175 3.587 3.587Q4.175 3 5 3H19Q19.825 3 20.413 3.587Q21 4.175 21 5V7.5H19V5Q19 5 19 5Q19 5 19 5H5Q5 5 5 5Q5 5 5 5V19Q5 19 5 19Q5 19 5 19H19Q19 19 19 19Q19 19 19 19V16.5H21V19Q21 19.825 20.413 20.413Q19.825 21 19 21ZM13 17Q12.175 17 11.588 16.413Q11 15.825 11 15V9Q11 8.175 11.588 7.587Q12.175 7 13 7H20Q20.825 7 21.413 7.587Q22 8.175 22 9V15Q22 15.825 21.413 16.413Q20.825 17 20 17ZM20 15Q20 15 20 15Q20 15 20 15V9Q20 9 20 9Q20 9 20 9H13Q13 9 13 9Q13 9 13 9V15Q13 15 13 15Q13 15 13 15Z" /></svg>
              </span>
              <span className='mx-md-2'>
                <Price price={wallet} className="letter-spacing-0" />
              </span>
            </Nav.Link>
            <DropdownButton align="end"
              title={
                <Avatar sx={{ bgcolor: red[400] }}
                  className='shadow'>
                  {adminInfo.name.substring(0, 1)}
                </Avatar>
              }
              id="dropdown-menu-align-end"
              className='text-dark nav-drop prfile px-0 mx-0 us-ml'>
              {/* <LinkContainer to="/profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </LinkContainer> */}
              {/* <Dropdown.Divider /> */}
              <Dropdown.Item onClick={logoutHandler}>
                LogOut
              </Dropdown.Item>
            </DropdownButton>
          </Nav.Item>

        </Container>
      </Navbar>

      {loading && <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>}

    </header >
  );
};
