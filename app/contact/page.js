import ContactRoutePage from '@/app/components/ContactRoutePage';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact pour votre événement à Agadir',
  description:
    'Contactez Jawhara Tech pour votre projet de production technique événementielle à Agadir, dans le Souss-Massa ou ailleurs au Maroc.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactRoutePage />;
}
