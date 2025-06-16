"use server";

import { prisma } from "@/lib/prismaClient";

export async function signUpProfileToDB({
  id,
  name,
  phone,
  street,
  city,
  state,
  zipcode,
}: {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
}): Promise<{ success: boolean }> {
  try {
    await prisma.profiles.create({
      data: {
        id,
        name,
        phone,
        street,
        city,
        state,
        zipcode,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to insert profile:", error);
    return { success: false };
  }
}
