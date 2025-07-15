import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { clearStorage } from '@/storage';

const NavBard = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <div className='bg-primary'>
                <AppBar position="static" color='transparent'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='text-white'>
                            AllEasy
                        </Typography>
                        <Button style={{ color: 'white' }} onClick={() => {
                            clearStorage();
                            window.location.href = '/'
                        }}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </Box>
    );
}

export default NavBard;