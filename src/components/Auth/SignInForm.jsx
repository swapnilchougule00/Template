import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/pages/authLayout/Schema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginUserMutation } from "@/redux/apiSlice/auth/authApi";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";

export function SignInForm({ showSignUp, setShowSignUp }) {
  const [showPassword, setShowPassoword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [handleLogin] = useLoginUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await handleLogin(data);
    if (response.data.status === 200) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("counter", response.data.count);
      localStorage.setItem("isAccepted", response.data.ter_con);
      toast({ variant: "success", title: "Login Successful !!!" });
      const count = response.data.count;
      navigate("/dashboard");
    } else if (response.data.status === 401) {
      localStorage.setItem("email", data.email);
      toast({ variant: "destructive", title: response.data.msg });
      navigate("/verify");
    } else if (response.data.status === 400) {
      toast({ variant: "destructive", title: response.data.msg });
    } else {
      // toast();
    }
  };
  const handleShowPassword = () => {
    setShowPassoword(!showPassword);
  };

  return (
    <div
      className={` flex justify-center items-center ${
        showSignUp ? " hidden" : "block opacity-100"
      }
     w-full md:w-1/2 md:pr-20 px-8 py-4`}
    >
      <div className="mx-auto grid  gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {!showPassword ? (
                        <Eye
                          className={`h-4 w-4 absolute cursor-pointer right-2 top-1/2 -translate-y-1/2`}
                          onClick={handleShowPassword}
                        />
                      ) : (
                        <EyeOff
                          className={`h-4 w-4 absolute cursor-pointer right-2 top-1/2 -translate-y-1/2`}
                          onClick={handleShowPassword}
                        />
                      )}

                      <Input
                        placeholder="***"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full " type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => setShowSignUp(true)}
            className="underline text-blue-500"
          >
            Sign Up
          </button>
        </p>{" "}
      </div>
    </div>
  );
}
