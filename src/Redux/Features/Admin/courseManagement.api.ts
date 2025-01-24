import { baseApi } from "../../api/baseApi";

const CourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    getAllRegisteredSemesters: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
      providesTags: ["semester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: ({ id, data }) => ({
        url: `/semester-registrations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),

    getAllCourse: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
    }),

    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
    }),

    assignCourseFaculty: builder.mutation({
      query: ({ courseId, faculties }) => {
        console.log({ faculties, courseId });
        return {
          url: `/courses/${courseId}/assign-faculties`,
          method: "POST",
          body: { faculties },
        };
      },
    }),

    getCourseFaculty: builder.query({
      query: (courseId) => ({
        url: `/courses/${courseId}/get-faculties`,
        method: "GET",
      }),
    }),

    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
  useGetAllCourseQuery,
  useCreateCourseMutation,
  useAssignCourseFacultyMutation,
  useGetCourseFacultyQuery,
  useCreateOfferedCourseMutation,
} = CourseManagementApi;
