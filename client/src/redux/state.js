import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Retrieve user from localStorage
  token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // ✅ Store user
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // ✅ Remove user on logout
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Update user in localStorage
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;

/**
 * import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token); // Only store token
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;

 */
