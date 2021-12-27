const { createSlice } = require('@reduxjs/toolkit')

const uiSlice = createSlice({
  name: 'ui',
  initialState: { notification: null },
  reducers: {
    showNotification(state, actions) {
        state.notification = {
          status: actions.payload.status,
          title: actions.payload.title,
          message: actions.payload.message,
        }
      },
    resetNotification(state){
        state.notification=null
    }
  }

})
export const uiActions = uiSlice.actions
export default uiSlice
