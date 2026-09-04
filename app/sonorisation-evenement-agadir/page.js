import ServicePage from '@/app/components/ServicePage';
import { services } from '@/content/services';
import { createPageMetadata } from '@/lib/seo';

const service = services.sound;

export const metadata = createPageMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: service.path,
});

export default function EventSoundPage() {
  return <ServicePage service={service} />;
}
