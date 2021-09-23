import React from "react"
import { Toolbar, AppBar, IconButton, Typography } from '@mui/material'
import { Message } from '@mui/icons-material'

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <Message />
                </IconButton>
                <Typography variant='h6' width='100%' className='center'>
                    SMS Gateway comparison
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
