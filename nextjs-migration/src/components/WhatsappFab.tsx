import Image from "next/image";

import { ASSOCIATION } from "@/lib/association";
import type { Lang } from "@/lib/i18n";

/**
 * Ported verbatim from the floating WhatsApp button in templates/base.html.
 * Static markup, no interaction logic — stays a server component.
 */
export default function WhatsappFab({ lang, label }: { lang: Lang; label: string }) {
  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${ASSOCIATION.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      lang={lang}
    >
      <Image src="/images/icon-whatsapp.webp" alt="" width={62} height={62} priority />
    </a>
  );
}
