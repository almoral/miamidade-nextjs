import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const SERVICES_QUERY = `*[
  _type == "service"
]|order(name asc){_id, name, description, slug}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const services = await client.fetch<SanityDocument[]>(SERVICES_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Services</h1>
      <ul className="flex flex-col gap-y-4">
        {services.map((service) => (
          <li className="hover:underline" key={service._id}>
            <Link href={`/${service.slug.current}`}>
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p>{service.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}