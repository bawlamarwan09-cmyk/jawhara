import AboutPage from '@/app/components/AboutPage';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'À propos : équipe et présence au Maroc',
  description:
    'Découvrez le positionnement, l’équipe de terrain, le matériel et la trajectoire de Jawhara Tech, présente à Agadir et active au Maroc.',
  path: '/a-propos',
});

export default function AboutRoute() {
  return <AboutPage />;
}
