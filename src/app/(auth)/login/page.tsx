import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function LoginPage() {
  
  async function fakeLogin() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.set("devconnect_session", "placeholder-value", {
      httpOnly: true,
      path: "/",
    });
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Log in</h1>
      <form action={fakeLogin}>
        <button type="submit">Fake login (Lesson 15 placeholder)</button>
      </form>
    </div>
  );
}