// import React from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { useVerifyUserMutation } from "@/redux/apiSlice/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import auth from "../../assets/auth.png";

import { useNavigate } from "react-router-dom";
const Verify = () => {
  const FormSchema = z.object({
    otp: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [handleVerifyEmail] = useVerifyUserMutation();

  const onSubmit = async (data) => {
    const email = localStorage.getItem("email");
    const res = await handleVerifyEmail({ ...data, email: email });
    if (res?.data?.status === 200) {
      navigate("/profile");
      localStorage.setItem("token", res.data.token);
      toast({ variant: "success", title: "Successfully Registered !!!" });
    } else if (res?.data?.status === 401) {
      toast({ variant: "destructive", title: res.data.msg });
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <div
        className={`bg-white w-[70%] h-fit md:h-[90%]  flex  rounded-2xl shadow-lg overflow-hidden`}
      >
        <div className="w-full md:w-1/2  px-8 py-4">
          <div className="flex mb-4 font-medium items-center gap-2">
            <div className="bg-purple-500 w-4 h-4 rounded-tl-full rounded-tr-full "></div>
            <span>Horizon</span>
          </div>

          <p className="text-gray-500 text-sm mb-4">
            An otp has been sent to your email, please check.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mx-auto space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="bg-purple-500" type="submit">
                Submit
              </Button>
            </form>
          </Form>
          {/* <img src={auth} alt="auth" className="w-40 mx-auto" /> */}
        </div>
        <div
          className={`w-1/2 duration-300 transition-transform hidden rounded-r-2xl md:flex  
          
         text-white   items-center justify-center`}
        >
          <img
            src="https://cdn.dribbble.com/userupload/14898990/file/original-ba68e98ea10e1867e831884c3b153387.png?resize=752x" // Replace with your image path
            className="mx-auto h-full object-cover  "
            alt="Login illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Verify;
