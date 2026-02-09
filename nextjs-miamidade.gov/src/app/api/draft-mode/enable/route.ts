import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // Enable Draft Mode
  (await draftMode()).enable();

  // Redirect to the path from the Sanity Studio
  redirect(slug || "/");
}
