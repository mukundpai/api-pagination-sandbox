import { z } from "zod";

export const Content = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
});

export const Contents = z.array(Content);

export const Page = z.object({
  page: z.number(),
  per_page: z.number(),
  is_next: z.boolean(),
  data: Contents,
});

export type Content = z.infer<typeof Content>;
export type Contents = z.infer<typeof Contents>;
export type Page = z.infer<typeof Page>;
