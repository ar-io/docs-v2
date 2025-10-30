import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { transformerOpenAPI } from 'fumadocs-openapi/server';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import Image from 'next/image';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  pageTree: {
    transformers: [transformerOpenAPI()],
  },
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }
    
    // Handle custom SVG/PNG icons
    if (typeof icon === 'string' && (icon.endsWith('.svg') || icon.endsWith('.png'))) {
      return createElement(Image, {
        key: icon,
        src: icon,
        alt: '',
        width: 16,
        height: 16,
        className: 'size-4'
      });
    }
    
    // Handle lucide-react icons
    if (icon in icons) return createElement(icons[icon as keyof typeof icons], { key: icon });
  },
});
