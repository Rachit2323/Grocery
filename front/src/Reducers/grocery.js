import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const API = "http://localhost:4000/";
const API ="https://grocery-delta-swart.vercel.app/";

let initialState = {
  loading: false,
  allgrocery: {},
  creategrocery: false,
  currentgrocery: {},
  groceryerror:""
};

export const grocerydata = createAsyncThunk("grocerydata", async (formData) => {
  try {


    if(!formData.groceryName)
    return ({ error: "Grocery name is required.", success: false });

    else if(!formData.groceryDescription)
    return ({ error: "Grocery Description is required.", success: false });

    else if(!formData.quantity)
    return ({ error: "Grocery quantity is required.", success: false });
  
    else if(!formData.unit)
    return ({ error: "Grocery unit is required.", success: false });

  

    const result = await fetch(`${API}grocery/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const getgrocerydata = createAsyncThunk("getgrocerydata", async () => {
  try {
    const result = await fetch(`${API}grocery/allgrocery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

const grocerySlice = createSlice({
  name: "grocery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(grocerydata.pending, (state) => {
        state.loading = true;
        state.creategrocery = false;
      })
      .addCase(grocerydata.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {
          state.creategrocery = action.payload.success;
          state.groceryerror=action.payload.error;
        } else {
          state.creategrocery = action.payload.success;
          state.currentgrocery = action.payload.data;
        }
      })
      .addCase(grocerydata.rejected, (state) => {
        state.loading = true;
        state.creategrocery = false;
      })
      .addCase(getgrocerydata.pending, (state) => {
        state.loading = true;
        state.successallgrocery = false;
      })
      .addCase(getgrocerydata.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error) {

          state.successallgrocery = action.payload.success;
        } else {

          state.successallgrocery = action.payload.success;
          state.allgrocery = action.payload.data;
        }
      })
      .addCase(getgrocerydata.rejected, (state) => {
        state.loading = true;
        state.successallgrocery = false;
      });
  },
});

export default grocerySlice.reducer;
