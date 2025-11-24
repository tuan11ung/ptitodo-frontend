import React from 'react'
import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box sx={{
      p: '10px 0',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#0984e3'),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardContentHeight
    }}>
      <ListColumns columns={orderedColumns}/>
    </Box>
  )
}

export default BoardContent