"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "../Hooks/Auth";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<string | null>(null);
  const { user, login } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // log the user
    console.log(user);
  }, [user]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    const result = await handleAuth();
    console.log(result);

    // Reset form data only after handling auth
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  async function handleAuth() {
    const result = await login(formData.username, formData.password);

    if (result.success) {
      console.log("Login successful");
      router.replace("/home"); // Use `replace` to navigate to the home page
      return result;
    }

    console.log(result.error);
    setErrors(result.error); // Update state with error message
    return result;
  }

  return (
    <Card className="md:border-1 border-none md:shadow shadow-none mx-auto max-w-md my-20 pb-6">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials below to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {errors && (
            <span className="text-red-400 flex items-center">
              <CircleAlert className="w-5 h-5 me-1" />
              {errors}
            </span>
          )}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              id="username"
              type="text"
              placeholder="Johny Doe"
              required
              className={errors ? "border-red-500" : ""}
              value={formData.username || ""}
              onChange={onChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              className={errors ? "border-red-500" : ""}
              required
              value={formData.password || ""}
              onChange={onChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </CardFooter>
      </form>
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="underline">
          Sign up
        </Link>
      </div>
    </Card>
  );
}
