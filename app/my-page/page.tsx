// "use client";

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";

export default async function MyPage() {
  const session = await getAuthSession();
  console.log("session", session);
  if (!session?.user) {
    redirect("/login");
  }

  // const router = useRouter();

  return (
    <>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">My Page</h1>
        <p>Welcome, {session.user.name}.</p>
        <p>My phone number is {session.user.phone}.</p>
        <p>My user ID is {session.user.id}.</p>
        <p>My email is {session.user.email}.</p>
        <p>My address is:</p>
        <p>{session.user.street}</p>
        <p>
          {session.user.city}, {session.user.state} {session.user.zipcode}
        </p>
        <a
          href="/editProfile"
          className="underline text-blue-600 cursor-pointer"
        >
          Edit Profile
        </a>
      </div>
    </>
  );
}
