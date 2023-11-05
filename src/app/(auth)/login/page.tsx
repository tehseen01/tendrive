"use client";

import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import LogInForm from "@/components/auth/LogInForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useTestLogIn from "@/hooks/useTestLogIn";
import Link from "next/link";

const Login = () => {
  const handleTestLogin = useTestLogIn();

  return (
    <main className="flex items-center justify-center bg-background h-screen">
      <BackButton />
      <Card className="bg-background">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in to continue</CardTitle>
          <CardDescription>
            Enter your email below to login, <br /> don&apos;t have an account
            <Button variant={"link"} asChild>
              <Link href={"/signup"}>Create account</Link>
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icon name="github" className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" onClick={handleTestLogin}>
              <Icon name="chrome" className="mr-2 h-4 w-4" />
              Test User
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <LogInForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
