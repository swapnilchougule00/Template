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
import { registerSchema } from "@/pages/authLayout/Schema";
import { ScrollArea } from "../ui/scroll-area";
import { useRegisterUserMutation } from "@/redux/apiSlice/auth/authApi";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

export function SignUpForm({ showSignUp, setShowSignUp }) {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confPassword: "",
    },
  });

  const navigate = useNavigate();

  const [handleRegister, { error, isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data) => {
    const response = await handleRegister(data);
    console.log(response);
    if (response.data.status === 200) {
      setShowSignUp(false);
      localStorage.setItem("email", data.email);
      toast({ variant: "success", title: response.data.msg });
      navigate("/verify");
    } else if (response.data.status === 401) {
      toast({ variant: "destructive", title: response.data.msg });
      localStorage.setItem("email", data.email);
      navigate("/verify");
    } else {
      toast(error);
    }
  };

  return (
    <ScrollArea
      className={`md:w-1/2  flex justify-center  w-full  md:px-20 px-8 py-4 items-center  ${
        showSignUp ? "block" : "hidden opacity-0"
      }  `}
    >
      <div className="mx-auto grid  ">
        <div className="grid  text-center">
          <h2 className="md:text-3xl font-semibold  text-gray-900">
            Create an Account
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Join us and experience the best service
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {isLoading ? (
                <div
                  className="loader border-t-2 mt-3 rounded-full border-gray-500 bg-gray-300 animate-spin
aspect-square w-8 flex justify-center items-center text-yellow-700"
                ></div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => setShowSignUp(false)}
            className="text-blue-500"
          >
            Sign In
          </button>
        </p>
      </div>
    </ScrollArea>
  );
}
