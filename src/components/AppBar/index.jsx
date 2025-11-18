import React from 'react'
import { Box, SvgIcon } from '@mui/material'
import ModeSelect from '../../components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as ptitLogo } from '~/assets/PTIT.svg'
import Typography from '@mui/material/Typography'
import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import InputAdornment from '@mui/material/InputAdornment'
import Templates from './Menu/Template'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SearchIcon from '@mui/icons-material/Search'
import Profile from './Menu/Profile'

function AppBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }}/>
        {/* <img src={ptitLogo} style={{ width: '24px', height: '24px' }}/> */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={ptitLogo} sx={{ width: '40px', height: '40px' }} inheritViewBox />
          <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>
            PTITodo
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={<AddIcon/>}>Create</Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ModeSelect/>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          size="small"
          InputProps={{
            startAdornment:
              <InputAdornment position="start"
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: 'primary.main'
                  }
                }}>
                <SearchIcon/>
              </InputAdornment>
          }}
          sx={{
            minWidth: '120px'
          }}
        />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
          </Badge>
        </Tooltip>
        <Tooltip title="Help" sx={{ cursor: 'pointer', color: 'primary.main' }}>
          <HelpOutlineIcon/>
        </Tooltip>
        <Tooltip title="Account settings" sx={{ cursor: 'pointer', color: 'primary.main' }}>
          <Profile />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default AppBar