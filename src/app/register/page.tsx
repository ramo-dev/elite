"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "../Hooks/Auth";
import { useState } from "react";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    other: ""
  });

  const { signUp } = useAuthStore();
  const router = useRouter();

  // Handle authentication on form submission
  async function handleAuth() {


    const result = await signUp(
      formData.email,
      formData.username,
      formData.password,
      formData.confirmPassword
    );
    if (result.success) {
      console.log("User created successfully");
      // Clear form and errors on success
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        other: ""
      });
      router.replace("/login")
    }

    setErrors((prevErrs) => ({ ...prevErrs, other: result.error }))
  }


  // Updates form data on change and resets errors for the field
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear specific field error on change
  }

  // Handles form submission
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let valid = true;

    // Basic client-side validation
    if (formData.username.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is invalid",
      }));
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      }));
      valid = false;
    }

    if (valid) {
      handleAuth();
    }
  }

  return (
    <Card className="md:border border-none md:shadow shadow-none mx-auto max-w-md my-10">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Johnie"
              onChange={handleChange}
              value={formData.username}
              required
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <small className="text-red-500 flex items-center">
                <CircleAlert className="h-4 w-4 me-1" />
                {errors.username}
              </small>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="john@example.com"
              required
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <small className="text-red-500 flex items-center">
                <CircleAlert className="h-4 w-4 me-1" />
                {errors.email}
              </small>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="*******"
              onChange={handleChange}
              value={formData.password}
              required
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <small className="text-red-500 flex items-center">
                <CircleAlert className="h-4 w-4 me-1" />
                {errors.password}
              </small>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="*******"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <small className="text-red-500 flex items-center">
                <CircleAlert className="h-4 w-4 me-1" />
                {errors.confirmPassword}
              </small>
            )}
          </div>

          {errors.other && (
            <small className="text-red-500 flex items-center">
              <CircleAlert className="h-4 w-4 me-1" />
              {errors.other}
            </small>
          )}

          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
