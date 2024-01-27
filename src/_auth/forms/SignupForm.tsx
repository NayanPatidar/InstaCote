import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster";

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
import { toast, useToast } from "@/components/ui/use-toast";
import {
  userCreateUserAccount,
  userSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    userCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    userSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({ title: "Sign up failed. Please try again." });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign in failed. Please try again." });
    }
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
                <Input
                  type="password"
                  className="shad-input max-h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary mt-8">
          {isCreatingUser ? (
            <div className="flex-center gap-2 ">
              <Loader />
              Loading...
            </div>
          ) : (
            "Sign up "
          )}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2 ">
          Already have an account?
          <Link
            to={"/sign-in"}
            className="text-primary-500 text-small-semibold ml-1"
          >
            {" "}
            Log In
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignupForm;
