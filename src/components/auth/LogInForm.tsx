"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInSchemaType, logInSchema } from "@/lib/validation/loginSchema";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Icon from "../Icon";
import authService from "@/appwrite/auth";

const LogInForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm<LogInSchemaType>({ resolver: zodResolver(logInSchema) });

  const logInSubmitHandler: SubmitHandler<LogInSchemaType> = async (data) => {
    try {
      await authService.logIn(data);
      reset();
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast({ description: error.message, variant: "destructive" });
    }
  };

  return (
    <form
      autoComplete="off"
      className="grid gap-4"
      onSubmit={handleSubmit(logInSubmitHandler)}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="m@example.com"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="mt-4">
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting || !isDirty || !isValid}
        >
          {isSubmitting ? (
            <>
              <Icon name="loader-2" className="animate-spin mr-2" /> Login...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </div>
    </form>
  );
};

export default LogInForm;
