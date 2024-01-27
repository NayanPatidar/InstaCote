import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { userSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount, isPending } = userSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    console.log("1");
    
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }
    console.log("2");

    const isLoggedIn = await checkAuthUser();
    console.log(isLoggedIn);
    
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
          Login to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular ">
          Welcome back! Please enter your details
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-420 mt-2"
      >
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
          {isUserLoading ? (
            <div className="flex-center gap-2 ">
              <Loader />
              Loading...
            </div>
          ) : (
            "Sign In "
          )}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2 ">
          Don't have an account?
          <Link
            to={"/sign-up"}
            className="text-primary-500 text-small-semibold ml-1"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SigninForm;
