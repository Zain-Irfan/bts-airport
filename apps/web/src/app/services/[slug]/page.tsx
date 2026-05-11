import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { serviceContent, type ServiceSlug } from "@/app/services/service-content";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content =
    serviceContent[slug as ServiceSlug] ?? serviceContent["a-to-b-taxi"];
  return <ServiceDetailTemplate content={content} />;
}

