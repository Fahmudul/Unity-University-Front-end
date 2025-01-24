import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: () => ({
        url: "/offered-courses",
        method: "GET",
      }),
    }),
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllOfferedCoursesQuery, useEnrollCourseMutation } =
  studentCourseApi;
