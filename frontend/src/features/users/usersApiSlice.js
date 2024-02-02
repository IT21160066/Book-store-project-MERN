import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/appSlice";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();
