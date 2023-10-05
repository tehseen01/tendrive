import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchemaType, signUpSchema } from "@/lib/validation/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { ID, account } from "@/appwrite/config";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Icon from "../Icon";

const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) });

  const signUpSubmitHandler: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const { name, email, password } = data;
      await account.create(ID.unique(), email, password, name);
      router.push("/");
      reset();
    } catch (error: any) {
      console.log(error);
      toast({ description: error.message, variant: "destructive" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(signUpSubmitHandler)}
      autoComplete="off"
      className="grid gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          {...register("name")}
          id="name"
          type="text"
          placeholder="john doe"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
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
        <Input {...register("password")} id="password" type="password" />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="mt-4">
        <Button
          className="w-full"
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Icon name="loader-2" className="animate-spin mr-2" />
              Creating...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
