import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Disable Draft Mode
  (await draftMode()).disable();

  // Redirect to homepage
  redirect("/");
}
