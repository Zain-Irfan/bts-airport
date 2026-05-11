import { serviceContent } from "@/app/services/service-content";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";

export default function BusinessTaxiServicesPage() {
  const content = serviceContent["business-taxi-services"];
  return <ServiceDetailTemplate content={content} />;
}

