import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore"
const signupSchema = z.object({
  firstName: z.string().min(2,"Họ phải có ít nhất 2 ký tự").max(100,"Họ không được vượt quá 100 ký tự"),
  lastName: z.string().min(2,"Tên phải có ít nhất 2 ký tự").max(100,"Tên không được vượt quá 100 ký tự"),
  username: z.string().min(2,"Tên đăng nhập phải có ít nhất 2 ký tự").max(100,"Tên đăng nhập không được vượt quá 100 ký tự"),
  email: z.email("Vui lòng nhập địa chỉ email hợp lệ"),
  password: z.string().min(6,"Mật khẩu phải có ít nhất 6 ký tự").max(100,"Mật khẩu không được vượt quá 100 ký tự")
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {signUp} =useAuthStore();

  const{ register, handleSubmit, formState: {errors, isSubmitting}}= useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormValues) => {
    // Handle form submission logic here
    //Goi API để đăng ký người dùng mới
    const {firstName, lastName, username, email, password} = data;

    await signUp(firstName, lastName, username, email, password);
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
                  Tạo tài khoản mới
                </h1>
                <p className=" text-muted-foreground text-balance">
                  Tao tai khoan moi de bat dau su dung dich vu cua chung toi
                  </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Họ</Label>
                  <Input type="text" id="firstName" {...register("firstName")}/>
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Tên</Label>
                  <Input type="text" id="lastName" {...register("lastName")} />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>

              
                <div className="flex flex-col gap-3">
                  <Label htmlFor="username">Tên Đăng Nhập</Label>
                  <Input type="text" id="username" {...register("username")} />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
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
                Tạo tài khoản
              </Button>
              <div className="text-center text-sm">
                Bạn đã có tài khoản?{" "}
                <a href="/signin" className="underline underline-offset-4">
                  Đăng nhập
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
       Bằng cách tiếp tục, bạn đồng ý với<a href="#">Điều khoản sử dụng </a>{" "}
        and <a href="#">Dịch vụ</a>.
      </div>
    </div>
  )
}
