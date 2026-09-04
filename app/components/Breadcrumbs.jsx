import Link from 'next/link';
import { createBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from './JsonLd';

export default function Breadcrumbs({ items }) {
  const schema = createBreadcrumbSchema(items);

  return (
    <>
      <nav className="breadcrumbs" aria-label="Fil d’Ariane">
        <ol>
          {items.map((item, index) => (
            <li key={item.href}>
              {index < items.length - 1 ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <StructuredData data={schema} />
    </>
  );
}
