import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const appRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany();
  }),

  createTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input: data, ctx }) => {
      return await ctx.prisma.todo.create({ data });
    }),
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input: { id, title, completed }, ctx }) => {
      return await ctx.prisma.todo.update({
        where: { id },
        data: { title, completed },
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
