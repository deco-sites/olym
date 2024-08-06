import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";
import { ImageWidget, RichText } from "apps/admin/widgets.ts";

/**@titleBy label */
interface Link {
  label: RichText;
  href: string;
}
/**@titleBy title */
export interface Container {
  title?: string;
  items?: Link[];
  more?: RichText;
}

interface Column {
  label: string;
  href: string;
  /**
   * @maxItems 5
   */
  columns?: Container[];
  /**
   * @format color-input
   */
  colorText?: string;
  image?: ImageWidget;
  alt?: string;
  hrefImage?: string;
  more?: RichText;
}

export interface Props {
  /**
   * @maxItems 5
   */
  columns: Column[];
}

function NavItem({ item }: { item: Column }) {
  const {
    label,
    href,
    columns,
    colorText = "#fff",
    image,
    alt,
    hrefImage,
    more,
  } = item;

  return (
    <li
      class="group-hover:opacity-80 group-hover:hover:opacity-100 flex items-center pr-5 duration-200"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={href}
        class=" hover:opacity-1 text-base/5 font-medium text-base-100 uppercase"
        style={{ color: colorText }}
      >
        {label}
      </a>

      {columns && columns.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex z-40 items-start justify-center gap-6 bg-primary w-screen border-t border-base-100"
            style={{
              top: "0px",
              left: "0px",
              marginTop: "64px",
            }}
          >
            {hrefImage && image && (
              <a href={hrefImage} class="h-full">
                <Image
                  class="p-6"
                  src={image}
                  alt={alt}
                  width={300}
                  height={332}
                  loading="lazy"
                />
              </a>
            )}
            <ul
              class="grid items-start justify-center gap-6 w-full h-full"
              style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
            >
              {columns.map((node) => (
                <li class="p-6 border-r border-base-100 pl-0 h-full">
                  <a
                    class="hover:underline text-xs uppercase "
                    href={node.title}
                  >
                    <span>{node.title}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.items?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span
                            class=" text-base"
                            dangerouslySetInnerHTML={{ __html: leaf.label }}
                          >
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
