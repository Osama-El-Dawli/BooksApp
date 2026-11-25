import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Osama Saeid',
  username: '@osos_eldawli',
  email: 'osama@gmail.com',
  imageUrl: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateImageProfile: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { updateImageProfile } = profileSlice.actions;
export default profileSlice.reducer;
