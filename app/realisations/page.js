import ProjectsIndexPage from '@/app/components/ProjectsIndexPage';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Réalisations événementielles au Maroc',
  description:
    'Découvrez les projets événementiels vérifiés de Jawhara Tech à Tiznit, Tafraout, Rabat, Tan-Tan et ailleurs au Maroc.',
  path: '/realisations',
});

export default function ProjectsPage() {
  return <ProjectsIndexPage />;
}
