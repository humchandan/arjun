import { z } from "zod";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";


export const messageRouter = createTRPCRouter({
    getMany: baseProcedure
    .query(async () => {
        const message = await prisma.message.findMany({
            orderBy: {
                updatedAt: "desc"
            },
            
        })
    }),
create: baseProcedure
.input(
    z.object({
        value: z.string().min(1, { message: "Message is required" }), 
    }),
    )
.mutation(async ({ input }) => {
    const createdMessage = await prisma.message.create({
        data: {
            content: input.value,
            role: "USER",
            type: "RESULT",
        },      
    });
   
    await inngest.send({
            name: "code-agent/run",
            data: {
              value: input.value,
            }
          });

          return createdMessage;
}),
});