"use client";
import { LoginInFormSchema } from "@/app/Schemas/AuthSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginInFormSchema>>({
    resolver: zodResolver(LoginInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmitForm(values: z.infer<typeof LoginInFormSchema>) {
    console.log(values);
  }

  return (
    <Card className=" lg:max-w-md md:max-w-md w-full bg-zinc-900 select-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Log In to your account
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-4 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your password</FormLabel>
                  <FormControl>
                    <div className="relative space-y-2">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-1 right-1 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                         {showPassword ? (
                          <EyeIcon className="h-4 w-4" />
                        ) : (
                          <EyeClosedIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-primary font-bold"
            >
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-muted-foreground text-xs">
          Don&apos;t have an account?{" "}
          <a
            className="underline text-indigo-500 font-brand font-medium "
            href="/signup"
          >
            Sign Up
          </a>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
