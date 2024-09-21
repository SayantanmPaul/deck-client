"use client";

import { useAddFriend } from "@/lib/react-queries/queries";
import { ErrorResponse } from "@/lib/types";
import { AddNewFriendSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

const AddNewFriend = () => {
  const form = useForm<z.infer<typeof AddNewFriendSchema>>({
    resolver: zodResolver(AddNewFriendSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: addFriend } = useAddFriend();

  const queryClient = useQueryClient();


  function handleAddFriend(data: z.infer<typeof AddNewFriendSchema>) {
    addFriend(data, {
      onSuccess: () => {
        toast.success("friend request sent");
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data.error || "something went wrong");
      },
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddFriend)} className=" ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Please provide your friend&apos;s email</FormLabel>
                <FormControl>
                  <div className="flex space-x-4">
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                    <Button type="submit" className="font-bold">
                      Add
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default AddNewFriend;

export const AddNewFriendSidebarOptions = () => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <p className="text-xs font-secoundary font-semibold text-neutral-400">
        Overview
      </p>
      <Link
        href={"/dashboard/friends/add"}
        className="text-neutral-300 hover:text-indigo-600 hover:bg-neutral-900 group flex items-center gap-x-3 p-2 rounded-md text-xs font-semibold"
      >
        <div className="text-white group-hover:text-indigo-600 flex w-8 h-8 shrink-0 items-center justify-center rounded-lg border text-xs font-medium bg-neutral-800">
          <IconUserPlus className="h-4 w-4" />
        </div>
        <p className="truncate">Add Friend</p>
      </Link>
    </div>
  );
};
