import { ServicePageLayout } from "@/components/marketing/service-page-layout";
import { servicePageContent } from "@/content/marketing";

export default function MobileAppDevelopment() {
  return <ServicePageLayout service={servicePageContent["mobile-app-development"]} />;
}
