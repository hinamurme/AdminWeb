import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BaseURL = import.meta.env.VITE_API_URL;

// Fixed parameter structure
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BaseURL}/auth`, { // Removed userId from URL if fetching all users
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updatedUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      console.log("updatedUser formData 1", formData);
      
      const token = localStorage.getItem("token");
      const response = await axios.put(`${BaseURL}/auth/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response_data 2",response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fixed parameter structure - userId should be passed as argument
export const fetchSingleUser = createAsyncThunk(
  "user/fetchSingleUser",
  async (userId, { rejectWithValue }) => { // userId is the first parameter
    try {
      const token = localStorage.getItem("token");      
      const res = await axios.get(`${BaseURL}/auth/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Fixed Slice
const UserSlice = createSlice({
  name: "user",
  initialState: {
    users: [], // all users
    currentUser: null, // single user
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users cases
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update User cases
      .addCase(updatedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatedUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        // Update in users array
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        // Update current user if it's the same user
        if (state.currentUser && state.currentUser._id === updatedUser._id) {
          state.currentUser = updatedUser;
        }
      })
      .addCase(updatedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Single User cases
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;        
        state.currentUser = action.payload.data; 
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UserSlice.reducer; 