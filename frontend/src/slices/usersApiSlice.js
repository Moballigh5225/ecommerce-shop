import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// sending those auth data as email and password here so we are passing the data in query callback function

//  so instead of query we are going to use mutation because are not only fetching data but also authenticating making a post request

// and since its a post request we are going to specify the method also and also body that data gonna passed in

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

//  here we are going to export it as useLoginMutation because its not a query
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
