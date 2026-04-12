import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export async function getCurrentSession() {
  return getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function requireRole(roles: Array<"ADMIN" | "DEALER" | "USER">) {
  const session = await requireAuth();
  if (!roles.includes(session.user.role)) {
    redirect("/login");
  }
  return session;
}
