import { createApi, fetchBasequery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBasequery({ baseUrlL: "http://localhost:3500" }),
  //used for cached data so when we invalidate different caches or types we will be refereing to the
  //note and the user data both
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
