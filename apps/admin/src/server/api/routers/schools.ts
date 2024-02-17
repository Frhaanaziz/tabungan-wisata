import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import {
  addSchoolSchema,
  schoolSchema,
  updateSchoolSchema,
} from "@repo/validators/school";
import { getPaginatedDataSchema } from "@repo/validators";
import { School, SchoolAdmin } from "@repo/types";

export const schoolRouter = createTRPCRouter({
  getById: adminProcedure
    .input(schoolSchema.pick({ id: true }))
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const { id } = input;

      try {
        const result = await getBackendApi(accessToken).get(`/schools/${id}`);

        return result.data;
      } catch (error) {
        console.error("schoolRouter getById", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get school",
        });
      }
    }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    const accessToken = ctx.session.accessToken;

    try {
      const result = await getBackendApi(accessToken).get("/schools");

      return result.data;
    } catch (error) {
      console.error("schoolRouter getAll", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get schools",
      });
    }
  }),

  getAllPaginated: adminProcedure
    .input(getPaginatedDataSchema)
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const { page, take, search } = input;

      try {
        const result = await getBackendApi(accessToken, {
          page,
          take,
          search,
        }).get("/schools");

        return result.data;
      } catch (error) {
        console.error("schoolRouter getAllPaginated", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get schools",
        });
      }
    }),

  create: adminProcedure
    .input(addSchoolSchema)
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const { schoolAdmins, ...rest } = input;

      try {
        const result = await getBackendApi(accessToken).post("/schools", rest);
        const school = result.data as School;

        // Create school admins
        const schoolAdminsData = await Promise.all(
          schoolAdmins.map(async (admin) => {
            const res = await getBackendApi(accessToken).post(
              `/school-admins`,
              {
                ...admin,
                schoolId: school.id,
              },
            );

            return res.data;
          }),
        );

        return { ...school, schoolAdmins: schoolAdminsData };
      } catch (error) {
        console.error("schoolRouter create", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create school",
        });
      }
    }),

  update: adminProcedure
    .input(updateSchoolSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, schoolAdmins, ...rest } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).put(
          `/schools/${id}`,
          rest,
        );
        const school = result.data as School & { schoolAdmins: SchoolAdmin[] };

        // Get deleted school admins
        const deletedAdmins = school.schoolAdmins.filter(
          (admin) => !schoolAdmins.some((a) => a.id === admin.id),
        );
        // Delete school admins if they are not in the new data
        if (deletedAdmins.length) {
          await Promise.all(
            deletedAdmins.map(async (admin) => {
              await getBackendApi(accessToken).delete(
                `/school-admins/${admin.id}`,
              );
            }),
          );
        }

        const schoolAdminsData = await Promise.all(
          schoolAdmins.map(async (admin) => {
            // if admin has an id, update it
            if (admin.id) {
              const res = await getBackendApi(accessToken).put(
                `/school-admins/${admin.id}`,
                admin,
              );

              return res.data;
            }

            // if admin has no id, create it
            const res = await getBackendApi(accessToken).post(
              `/school-admins`,
              {
                ...admin,
                schoolId: id,
              },
            );

            return res.data;
          }),
        );

        return { ...result.data, schoolAdmins: schoolAdminsData };
      } catch (error) {
        console.error("schoolRouter update", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update school",
        });
      }
    }),
});
