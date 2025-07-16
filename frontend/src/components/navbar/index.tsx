import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import useMediaQuery from '@mui/material/useMediaQuery';
import { AuthContext } from '@/contexts/authContext';
import { IoIosLogOut } from "react-icons/io";


const NavBar = () => {
    const isMobile = useMediaQuery('(min-width:1000px)');
    const navigate = useNavigate();

    const { logout, username } = React.useContext(AuthContext)

    return (
        <div className='w-full flex flex-col z-50'>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <AppBar color='transparent' style={{ height: '60px', zIndex: '30', position: 'fixed', width: '100%', backgroundColor: '#1a1a1a', boxShadow: 'none' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography fontWeight={'bold'} variant="h6" component="div" sx={{ flexGrow: 1 }} className='text-white'>
                            AllEasy
                        </Typography>
                        <div className='flex flex-row items-center gap-5'>
                            <div className='flex flex-col'>
                                <Typography fontSize={15} fontWeight={'bold'} component="span" sx={{ flexGrow: 1 }} className='text-white'>
                                    Bem vindo,
                                </Typography>
                                <Typography fontSize={15} fontWeight={'bold'} component="span" sx={{ flexGrow: 1 }} className='text-white'>
                                    {username}
                                </Typography>
                            </div>
                            <Button style={{ color: 'white' }} onClick={() => {
                                logout()
                            }}><IoIosLogOut color='white' size={21} /></Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ flexGrow: 1, height: '100vh', backgroundColor: 'transparent', position: 'static', marginTop: '60px' }}>
                <div className='bg-sidebar-primary h-screen'>
                    <MenuList sx={{ width: '100%', flexGrow: 1 }}>
                        <Divider />
                        <MenuItem onClick={() => {
                            navigate('/tarefas')
                        }} className='flex flex-row gap-2 items-center'>
                            <FaTasks size={20} color='white' />
                            {isMobile ? (<ListItemText className='text-white w-full' >Tarefas</ListItemText>) : null}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {
                            navigate('/dashboard')
                        }} className='flex flex-row gap-2 items-center'>
                            <FaHome size={20} color='white' />
                            {isMobile ? (<ListItemText className='text-white text-3xl w-full' >Dashboard</ListItemText>) : null}
                        </MenuItem>
                        <Divider />
                    </MenuList>
                </div>
            </Box>
        </div>
    );
}

export default NavBar;