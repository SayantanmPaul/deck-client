import { z } from "zod";

export const MessageSchema = z.object({
  _id: z.string(),
  senderId: z.string(),
  text: z.string(),
  timeStamp: z.number(),
  contentUrl: z.string().nullable(),
  contentType: z.string().nullable(),
  contentFileName: z.string().nullable(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
