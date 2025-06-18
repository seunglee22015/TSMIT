"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { SignUpSchema } from "@/lib/zod-schema";
import { signUpProfileToDB } from "@/actions/signup";

import { useSession } from "next-auth/react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { data: sessionData } = useSession();

  console.log("sessionData", sessionData);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setFormErrors({});

    console.log("sessionData2", sessionData);

    const result = SignUpSchema.safeParse({
      name: sessionData?.user.name || name,
      phone: sessionData?.user.phone || phone,
      street: sessionData?.user.street || street,
      city: sessionData?.user.city || city,
      state: sessionData?.user.state || state,
      zipcode: sessionData?.user.zipcode || zipcode,
      email: sessionData?.user.email || email,
      password,
      confirmPassword,
    });

    console.log("SignUpSchema result:", result);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const mapped = Object.fromEntries(
        Object.entries(errors).map(([k, v]) => [k, v?.[0] ?? ""])
      );
      setFormErrors(mapped);
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    console.log("signup page data ", signUpData);

    if (signUpError || !signUpData.user) {
      setError(signUpError?.message || "Sign-up failed");
      return;
    }

    const insertResult = await signUpProfileToDB({
      id: signUpData.user.id,
      name,
      phone,
      street,
      city,
      state,
      zipcode,
    });

    if (!insertResult.success) {
      setError("Sign-up succeeded, but profile creation failed.");
      return;
    }

    setMessage(
      "Sign-up successful! Please check your email to verify your account."
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={sessionData?.user.name || name}
            onChange={(e) => setName(e.target.value)}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )}
        </label>
        <label className="block mb-2">
          Phone:
          <input
            type="tel"
            className="border px-2 py-1 w-full"
            value={sessionData?.user.phone || phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {formErrors.phone && (
            <p className="text-red-500 text-sm">{formErrors.phone}</p>
          )}
        </label>
        <label className="block mb-2">
          Street Address:
          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={sessionData?.user.street || street}
            onChange={(e) => setStreet(e.target.value)}
          />
          {formErrors.street && (
            <p className="text-red-500 text-sm">{formErrors.street}</p>
          )}
        </label>
        <label className="block mb-2">
          City:
          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={sessionData?.user.city || city}
            onChange={(e) => setCity(e.target.value)}
          />
          {formErrors.city && (
            <p className="text-red-500 text-sm">{formErrors.city}</p>
          )}
        </label>
        <label className="block mb-2">
          State:
          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={sessionData?.user.state || state}
            onChange={(e) => setState(e.target.value)}
          />
          {formErrors.state && (
            <p className="text-red-500 text-sm">{formErrors.state}</p>
          )}
        </label>
        <label className="block mb-2">
          ZIP Code:
          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={sessionData?.user.zipcode || zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          {formErrors.zipcode && (
            <p className="text-red-500 text-sm">{formErrors.zipcode}</p>
          )}
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="text"
            className="border px-2 py-1 w-full"
            value={sessionData?.user.email || email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            className="border px-2 py-1 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          )}
        </label>
        <label className="block mb-2">
          Confirm Password:
          <input
            type="password"
            className="border px-2 py-1 w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
          )}
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-2 cursor-pointer"
        >
          Create Account
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-600 mt-2">{message}</p>}
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="underline text-blue-600"
        >
          Log in
        </button>
      </p>
    </div>
  );
}
