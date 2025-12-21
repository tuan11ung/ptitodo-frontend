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
            src='https://yt3.ggpht.com/yti/ANjgQV8VnKoPIgSssCBNX0ZVJCjtxosld3ereCDaK8SaKvk=s88-c-k-c0x00ffffff-no-rj'
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
        <MenuItem
          sx={{
            '&:hover': { color:'primary.main' }
          }}
        >
          <Avatar
            sx={{ width: 28, height: 28, mr: 2 }}
            src='https://yt3.ggpht.com/yti/ANjgQV8VnKoPIgSssCBNX0ZVJCjtxosld3ereCDaK8SaKvk=s88-c-k-c0x00ffffff-no-rj'
          /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
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