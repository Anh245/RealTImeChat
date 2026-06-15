import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signinSchema = z.object({
  email: z.email("Vui lòng nhập địa chỉ email hợp lệ"),
  password: z.string().min(6,"Mật khẩu phải có ít nhất 6 ký tự").max(100,"Mật khẩu không được vượt quá 100 ký tự")
});

type SigninFormValues = z.infer<typeof signinSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const{ register, handleSubmit, formState: {errors, isSubmitting}}= useForm<SigninFormValues>({
      resolver: zodResolver(signinSchema)
    });
    
    const onSubmit = async (data: SigninFormValues) => {
      // Handle form submission logic here
    };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img
                    src="/logo.svg"
                    alt="Logo"/>
                </a>
                <h1 className="text-2xl font-bold ">
                  Đăng nhập
                </h1>
                <p className=" text-muted-foreground text-balance">
                  Đăng nhập để tiếp tục
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="a@email.com...." {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input type="password" id="password" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Đăng nhập
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
