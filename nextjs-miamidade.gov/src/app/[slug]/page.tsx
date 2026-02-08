import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";

const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = await client.fetch<SanityDocument>(SERVICE_QUERY, await params, options);
  const serviceImageUrl = service.image
    ? urlFor(service.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to services
      </Link>
      {serviceImageUrl && (
        <img
          src={serviceImageUrl}
          alt={service.name}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{service.name}</h1>
      <div className="prose">
        {Array.isArray(service.description) && <PortableText value={service.description} />}
      </div>
    </main>
  );
}
