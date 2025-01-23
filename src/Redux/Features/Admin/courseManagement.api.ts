import { baseApi } from "../../api/baseApi";

const CourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
    getAllRegisteredSemesters: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisteredSemestersQuery,
} = CourseManagementApi;
