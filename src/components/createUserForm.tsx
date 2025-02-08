"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { userInsertType } from "@/app/db/schema/userSchema";
import { useForm } from "react-hook-form";
import { UserFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/server-actions/userService";
export default function CreateUserForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<userInsertType>({
    resolver: zodResolver(UserFormSchema),
    defaultValues:{
        name: "",
        age: 18,
        email: "",
        phone: "",
        password: "",
        avatar: "",
        account_status: false,
        role: null,
      }
  });


//   const handleSelectChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, role: Number(value) }));
//   };

  const onSubmit = async (data: userInsertType) => {
    console.log("User Data:", data);
    const result = await createUser(data);
    console.log("User Created:", result);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create New User</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
         
              placeholder="Enter name"
           
              {...register("name")}
            />
            {errors.name && <Label>{errors.name.message}</Label>}
          </div>

          <div>
            <Label>Age</Label>
            <Input
              type="number"
             
              placeholder="Enter age"
             
              {...register("age",{valueAsNumber:true})}
            />
            {errors.age ? <Label>{errors.age.message}</Label> : null}
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
            
              {...register("email")}
            />
            {errors.email ? <Label>{errors.email.message}</Label> : null}
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              type="tel"
          
              placeholder="Enter phone number"
             
              {...register("phone")}
            />
            {errors.phone ? <Label>{errors.phone.message}</Label> : null}
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
            
              placeholder="Enter password"
              
              {...register("password")}
            />
              {errors.password ? <Label>{errors.password.message}</Label> : null}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <Label>Avatar URL</Label>
            <Input
            
              placeholder="Enter avatar URL"
            
              {...register("avatar")}
            />
              {errors.avatar ? <Label>{errors.avatar.message}</Label> : null}
          </div>
          <div>
            <Label>Role</Label>
            <Select onValueChange={(value) => setValue("role", Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Admin</SelectItem>
                <SelectItem value="2">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label>Account Active</Label>
            <Switch
              onCheckedChange={(checked) => setValue("account_status", checked)}
            />
          </div>
        </div>

        {/* Submit Button (Full Width) */}
        <div className="col-span-2">
          <Button type="submit" className="w-full">
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
}
