"use client";
import { userSelectType } from "@/app/db/schema/userSchema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";

type users = {
  transactionUser: userSelectType[];
};
export function ViewUsersTable(transactionUser: users) {
  return <div>{JSON.stringify(transactionUser)}</div>;
}
