import * as z from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";

const SignupForm = () => {
  const isLoading = false;

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="public/assets/images/logo.svg" />

        <h2 className="h2-bold md:h2-bold pt-1 sm:pt-1">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular ">
          To use Snapgram, please enter your account details
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-420 mt-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="forms-field">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input max-h-10" {...field} />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField  
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="forms-field">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input max-h-10" {...field} />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="forms-field">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input max-h-10" {...field} />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="forms-field">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input max-h-10" {...field} />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary mt-8">
          {isLoading ? (
            <div className="flex-center gap-2 ">
              <Loader />
              Loading...
            </div>
          ) : (
            "Sign up "
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
