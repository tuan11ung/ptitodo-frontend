import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)


export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    // Them moi 1 noti vao dau mang currentNotifications
    addNotifications: (state, action) => {
      const incomingInvitation = action.payload
      state.currentNotifications.unshift(incomingInvitation)
    },
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
    }),
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload
      const getInvitation = state.currentNotifications.find(i => i._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

// Danh cho component con goi len thay doi du lieu
export const { updateCurrentNotifications, clearCurrentNotifications, addNotifications } = notificationsSlice.actions

// Danh cho component con goi len de lay du lieu
export const currentNotificationsSelector = (state) => {
  return state.notifications.currentNotifications
}

export default notificationsSlice.reducer