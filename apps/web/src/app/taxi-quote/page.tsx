import { serviceContent } from "@/app/services/service-content";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";

export default function TaxiQuotePage() {
  const content = serviceContent["a-to-b-taxi"];

  return <ServiceDetailTemplate content={content} />;
}

