import QuotePage from '@/app/components/QuotePage';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Demander un devis technique événementiel',
  description:
    'Présentez votre événement à Jawhara Tech : type, date, lieu et coordonnées pour commencer à cadrer votre besoin technique à Agadir ou au Maroc.',
  path: '/devis',
});

export default function QuoteRoute() {
  return <QuotePage />;
}
