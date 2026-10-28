import type { Metadata } from "next";
import { serviceContent } from "@/app/services/service-content";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Get a Taxi Quote",
  description: "Get a fixed-price quote for a point-to-point taxi anywhere in London, with reliable, licensed drivers available 24/7.",
  alternates: { canonical: "/services/a-to-b-taxi" },
};

export default function TaxiQuotePage() {
  const content = serviceContent["a-to-b-taxi"];

  return <ServiceDetailTemplate content={content} />;
}

