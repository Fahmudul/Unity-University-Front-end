import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),

    getAllStudents: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User"],
    }),

    getSingleStundet: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/students/${id}`,
          method: "GET",
        };
      },
    }),

    blockUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/change-status/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStundetQuery,
  useBlockUserMutation,
} = userManagementApi;
