import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import ModeSelect from '../ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
// import { ReactComponent as ptitLogo } from '~/assets/PTIT.svg'
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
import AddBoxIcon from '@mui/icons-material/AddBox'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SearchIcon from '@mui/icons-material/Search'
import Profile from './Menu/Profile'
import CloseIcon from '@mui/icons-material/Close'
import Notifications from './Notifications/Notifications'

import { Link } from 'react-router-dom'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#0984e3'),
      '&::-webkit-scrollbar-track': { m: 1 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Link to={'/boards'} style={{ color: 'inherit' }}>
          <Tooltip title="Boards List">
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }}/>
          </Tooltip>
        </Link>
        {/* <img src={ptitLogo} style={{ width: '24px', height: '24px' }}/> */}
        <Link to={'/boards'} style={{ color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* <SvgIcon component={ptitLogo} sx={{ width: '40px', height: '40px' }} inheritViewBox /> */}
            <Box
              component="img"
              src="https://ptit.edu.vn/wp-content/uploads/2023/06/logo-footer-svg.svg"
              alt="PTIT Logo"
              sx={{
                height: 32, // Điều chỉnh kích thước theo nhu cầu
                width: 32,
                objectFit: 'cover', // 'cover', 'contain', 'fill'
                objectPosition: 'left' // Vị trí crop
              }}
            />
            <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
              PTITodo
            </Typography>
          </Box>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {/* <Workspaces />
          <Recent />
          <Starred />
          <Templates /> */}
          {/* <Button sx={{ color: 'white' }} startIcon={<AddBoxIcon/>}>Create</Button> */}
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ModeSelect/>
        <TextField
          id="outlined-search"
          label="Search"
          type="text"
          size="small"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}>
                <SearchIcon/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize='small'
                sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                onClick={() => setSearchValue('')}
              />
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '170px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
        />

        <Notifications />

        <Tooltip title="Help" sx={{ cursor: 'pointer', color: 'white' }}>
          <HelpOutlineIcon/>
        </Tooltip>
        <Tooltip title="Account settings" sx={{ cursor: 'pointer', color: 'white' }}>
          <Profile />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default AppBar