"use server";

import { signIn, signOut } from "../../../auth";

export async function signInWithGoogle() {
  if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) return;

  await signIn("google", { redirectTo: "/mi-cuenta/" });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}
