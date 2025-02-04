import { paymentRelations, paymentTable } from "./schema/paymentSchema";
import {usersTable} from "./schema/userSchema";

export const schema = [
  usersTable,
  paymentTable
];
