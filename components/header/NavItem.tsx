import Image from "apps/website/components/Image.tsx";
import { NAVBAR_HEIGHT_DESKTOP } from "../../constants.ts";
import { ImageWidget, RichText } from "apps/admin/widgets.ts";

/**@titleBy label */
export interface Link {
  /**
   * @title Texto
   */
  label: RichText;
  /**
   * @title Link
   */
  href: string;
}
/**@titleBy title */
export interface Container {
  /**
   * @title Titulo
   */
  title?: string;
  /**
   * @title Links
   */
  items?: Link[];
  /**
   * @title Ver Mais
   * @description Texto ao final dos links por exemplo "Ver Mais"
   */
  more?: RichText;
  /**
   * @title Link
   */
  href?: string;
}

/**
 * @titleBy label
 */
export interface Column {
  /**
   * @title Texto
   */
  label: string;
  /**
   * @title Link
   */
  href: string;
  /**
   * @maxItems 5
   * @title Colunas
   */
  columns?: Container[];
  /**
   * @format color-input
   * @title Cor do texto
   */
  colorText?: string;
  /**
   * @title Imagem
   */
  image?: ImageWidget;
  /**
   * @title Tag Alt da Imagem
   */
  alt?: string;
  /**
   * @title Link da imagem
   */
  hrefImage?: string;
  /**
   * @title Texto
   * @description Abaixo da Imagem, por exemplo "Ver Mais"
   */
  more?: RichText;
}

/**
 * @title Menu
 */
export interface Props {
  /**
   * @title Itens
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
      class="group hover:opacity-100 flex items-center pr-5 duration-200 min-h-16"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={href}
        class=" hover:opacity-1 group-hover:opacity-80  text-base/5 font-medium text-base-100 uppercase"
        style={{ color: colorText }}
      >
        {label}
      </a>

      {columns && columns.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex z-40 items-start justify-center gap-6 bg-primary w-screen border-t border-base-100 h-auto px-6"
            style={{
              top: "0px",
              left: "0px",
              marginTop: "64px",
            }}
          >
            <div class={"w-screen h-full flex flex-row"}>
              {hrefImage && image && (
                <div class="w-[37%] h-full flex flex-col gap-4 max-w-[400px] py-6">
                  <a href={hrefImage} class="h-full w-full ">
                    <Image
                      class=" w-full max-h-[356px] max-w-[356px]"
                      src={image}
                      alt={alt}
                      width={356}
                      height={356}
                      loading="lazy"
                    />
                  </a>
                  {more && href &&
                    (
                      <div class="flex flex-row gap-1 border-b border-base-100 w-fit items-center">
                        <a
                          class="  text-base"
                          href={href}
                          dangerouslySetInnerHTML={{ __html: more }}
                        >
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="10"
                          fill="none"
                        >
                          <path
                            d="M8.898 6.338h1.278V.56H4.398v1.296h3.546L.816 9.002l.918.918 7.164-7.146v3.564z"
                            fill="#fff"
                          />
                        </svg>
                      </div>
                    )}
                </div>
              )}
              <ul
                class={`grid items-start justify-center gap-6 h-auto w-[70%] ${
                  image ? "w-[70%]" : "w-full"
                }`}
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                }}
              >
                {columns.map((node) => (
                  <li class="p-6 border-r border-base-100 pl-0 h-full last:border-r-0">
                    <a
                      class="hover:outline-none text-xs uppercase "
                      href={node.title}
                    >
                      <span>{node.title}</span>
                    </a>

                    <ul class="flex flex-col gap-1 mt-4">
                      {node.items?.map((leaf) => (
                        <li>
                          <a class="hover:outline-none" href={leaf.href}>
                            <span
                              class=" text-base"
                              dangerouslySetInnerHTML={{ __html: leaf.label }}
                            >
                            </span>
                          </a>
                        </li>
                      ))}
                      {node.more && node.href &&
                        (
                          <li class="flex flex-row gap-1 border-b border-base-100 w-fit items-center">
                            <a
                              class="  text-base"
                              href={node.href}
                              dangerouslySetInnerHTML={{ __html: node.more }}
                            >
                            </a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="10"
                              fill="none"
                            >
                              <path
                                d="M8.898 6.338h1.278V.56H4.398v1.296h3.546L.816 9.002l.918.918 7.164-7.146v3.564z"
                                fill="#fff"
                              />
                            </svg>
                          </li>
                        )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
