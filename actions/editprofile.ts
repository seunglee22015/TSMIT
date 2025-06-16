"use server";

import { prisma } from "@/lib/prismaClient";

export async function editProfileToDB({
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
    await prisma.profiles.upsert({
      where: { id }, // Ensure we are updating the existing profile
      update: {
        name,
        phone,
        street,
        city,
        state,
        zipcode,
      },
      create: {
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
    console.error("Failed to update profile:", error);
    return { success: false };
  }
}
