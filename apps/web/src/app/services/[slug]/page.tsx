import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { serviceContent, type ServiceSlug } from "@/app/services/service-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = serviceContent[slug as ServiceSlug];
  if (!content) return {};
  return { title: content.title, description: content.subtitle };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = serviceContent[slug as ServiceSlug];
  if (!content) notFound();
  return <ServiceDetailTemplate content={content} />;
}

