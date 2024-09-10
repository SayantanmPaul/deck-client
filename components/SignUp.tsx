"use client";
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
import { useSignUpUser } from "@/lib/react-queries/queries";
import { SignUpFormSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { AxiosError } from "axios";
import { EyeIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { mutate: SignUpUser, isPending } = useSignUpUser();

  function onSubmitForm(user: z.infer<typeof SignUpFormSchema>) {
    SignUpUser(user, {
      onSuccess() {
        toast.success("Account created successfully");
        form.reset();
      },
      onError(error) {
        const isAxiosError = error as AxiosError;

        if (isAxiosError.response?.status === 409) {
          form.setError("email", {
            type: "manual",
            message: "Email already exists",
          });
        } else {
          toast.error(isAxiosError.message);
        }
        return null;
      },
    });
  }
  return (
    <Card className=" lg:max-w-md md:max-w-md w-full h-auto bg-transparent select-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign up to collaborate with your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-4 "
          >
            <div className="grid lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
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
                  <FormLabel>Create a password</FormLabel>
                  <FormControl>
                    <div className="relative space-y-2">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
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
              disabled={isPending || form.formState.isDirty === false}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-primary font-bold"
            >
              Sign Up
              {isPending && (
                <LoaderCircleIcon
                  strokeWidth={2.5}
                  className="ml-2 h-4 w-4 animate-spin"
                />
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-muted-foreground text-xs">
          Have an account already?{" "}
          <a
            className="underline text-indigo-500 font-brand font-medium "
            href="/signin"
          >
            Sign in
          </a>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
