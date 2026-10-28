import type { Metadata } from "next";
import { serviceContent } from "@/app/services/service-content";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Business Taxi Services",
  description: "Reliable business taxis and corporate transfers across London, with fixed pricing, professional drivers and account options.",
};

export default function BusinessTaxiServicesPage() {
  const content = serviceContent["business-taxi-services"];
  return <ServiceDetailTemplate content={content} />;
}

