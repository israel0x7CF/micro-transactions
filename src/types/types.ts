import {z,ZodType} from 'zod';
import { userInsertType, userSelectType } from "@/app/db/schema/userSchema";

export interface NavItem {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
  }
  
export interface GridNavigationProps {
    items?: NavItem[];
    columns?: 2 | 3 | 4;
  }

  export const UserFormSchema:ZodType<userInsertType>= z.object({
    name:z.string({
      required_error:"Name is required",
      invalid_type_error:"Name must be a string"
    }).min(3),
    age:z.number({
      required_error:"Age is required",
      invalid_type_error:"Age must be a number"
    }).min(18),
    email:z.string({
      required_error:"Email is required",
      invalid_type_error:"Email must be a string"
    }).email(),
    phone:z.string({
      required_error:"Phone is required",
      invalid_type_error:"Phone must be a string" 
    }).min(10),
    password:z.string({
      required_error :"Password is required",
      invalid_type_error:"Password must be a string"
    }).min(6),   
    avatar:z.string(
      { 
        required_error:"Avatar is required", 
        invalid_type_error:"Avatar must be a string"
      }
    ).url(),
  })

  export type Action =
  | { type: 'SET_AS_ACTIVE'; payload: userSelectType }
  | { type: 'GET_USER'; }
  | { type: 'INITIALIZE_USER'; payload: userSelectType }

export type ContextProps = {
  state: userSelectType
  dispatch: React.Dispatch<Action>
}