"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Contents } from "./endpoint";

export const columns: ColumnDef<Contents>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
];
