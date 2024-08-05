import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li
      class="group-hover:opacity-80 group-hover:hover:opacity-100 flex items-center pr-5 duration-200"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={url}
        class=" hover:opacity-1 text-base/5 font-medium text-base-100 uppercase"
      >
        {name}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex z-40 items-start justify-center gap-6 bg-primary w-screen "
            style={{
              top: "0px",
              left: "0px",
              marginTop: HEADER_HEIGHT_DESKTOP,
            }}
          >
            {image?.url && (
              <Image
                class="p-6"
                src={image.url}
                alt={image.alternateName}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.url}>
                    <span>{node.name}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.url}>
                          <span class="text-xs">{leaf.name}</span>
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
