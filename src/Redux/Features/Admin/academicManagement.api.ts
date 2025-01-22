import { baseApi } from "../../api/baseApi";
const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicFaculty: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
    }),
    createAcademicFaculty: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-faculties/create-academic-faculty",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAcademicDepartment: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
    }),
    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useCreateAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} = academicManagementApi;
