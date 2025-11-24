import React from 'react'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Button from '@mui/material/Button'
import { Box, Tooltip } from '@mui/material'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '5px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50',
    color: 'white'
  },
  '&:hover .MuiSvgIcon-root': {
    bgcolor: 'primary.50',
    color: 'white'
  }
}

function BoardBar({ board }) {
  return (
    <Box px={2} sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#3498db'),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      '&::-webkit-scrollbar-track': { m: 1 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
          startIcon={<PersonAddIcon/>}>Invite</Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}>
          <Tooltip title='Tuan11ung'>
            <Avatar
              alt="Tuan11ung"
              src="https://yt3.ggpht.com/yti/ANjgQV8VnKoPIgSssCBNX0ZVJCjtxosld3ereCDaK8SaKvk=s88-c-k-c0x00ffffff-no-rj" />
          </Tooltip>
          <Tooltip title='Tuan11ung'>
            <Avatar
              alt="Tuan11ung"
              src="https://i.pinimg.com/736x/21/0b/c8/210bc83e75e13a9d861ce2ea32021e2c.jpg" />
          </Tooltip>
          <Tooltip title='Tuan11ung'>
            <Avatar
              alt="Tuan11ung"
              src="https://i.pinimg.com/1200x/35/d4/a6/35d4a62fad980e8f5a410d3a6bc3f219.jpg" />
          </Tooltip>
          <Tooltip title='Tuan11ung'>
            <Avatar
              alt="Tuan11ung"
              src="https://i.pinimg.com/1200x/d8/6c/f3/d86cf339d4baed9fb0ebfa9b83f3e61e.jpg" />
          </Tooltip>
          <Tooltip title='Tuan11ung'>
            <Avatar
              alt="Tuan11ung"
              src="https://i.pinimg.com/736x/f0/f8/85/f0f885b81b5848e9b9379f3e6e0a2437.jpg" />
          </Tooltip>
          <Tooltip title='Tuan11ung'>
            <Avatar
              alt="Tuan11ung"
              src="https://i.pinimg.com/736x/96/8f/14/968f14e1e60d0819dd356adfa5d614ec.jpg" />
          </Tooltip>
          <Tooltip title='Tuan11ung'>
            <Avatar
              alt="Tuan11ung"
              src="https://i.pinimg.com/736x/e7/5c/20/e75c206e04dae9e36db7b5844173d10c.jpg" />
          </Tooltip>
          <Tooltip title='Tuan11ung'>
            <Avatar
              alt="Tuan11ung"
              src="https://i.pinimg.com/736x/aa/5c/55/aa5c55966f7f45a92ac7167a6892afbd.jpg" />
          </Tooltip>

        </AvatarGroup>
      </Box>

    </Box>
  )
}

export default BoardBar