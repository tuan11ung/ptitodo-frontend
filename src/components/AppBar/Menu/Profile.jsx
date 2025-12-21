import React from 'react'
import { Box } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import { useSelector, useDispatch } from 'react-redux'
import { currentUserSelector } from '~/redux/user/userSlice'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'

import { Link } from 'react-router-dom'

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const dispatch = useDispatch()
  const currentUser = useSelector(currentUserSelector)

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: 'Log out of your account?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    })
      .then(() => {
        dispatch(logoutUserAPI())
      })
      .catch(() => {})
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profile' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 34, height: 34 }}
            src={currentUser?.avatar}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button-profile'
          }
        }}
      >
        <Link to={'/settings/account'} style={{ color: 'inherit' }}>
          <MenuItem
            sx={{
              '&:hover': { color:'primary.main' }
            }}
          >
            <Avatar
              sx={{ width: 28, height: 28, mr: 2 }}
              src={currentUser?.avatar}
            /> Profile
          </MenuItem>
        </Link>
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        <Link to={'/settings/account'} style={{ color: 'inherit' }}>
          <MenuItem onClick={handleClose} sx={{ minWidth: '220px' }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <MenuItem
          sx={{
            '&:hover': { 
              color: 'error.light',
              '& .logout-icon': {
                color: 'error.light'
              }
            }

          }}
          onClick={handleLogout}>
          <ListItemIcon>
            <Logout className='logout-icon' fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile