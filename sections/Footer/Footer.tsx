import { type ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import type { ComponentChildren } from "preact";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}
/** @titleBy title */
interface ItemContact {
  title: string;
  subTitle: string;
  href?: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/**
 * @titleBy
 */
interface Contact {
  item: ItemContact[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
  width?: number;
  height?: number;
}

interface Props {
  links?: Link[];
  contact: Contact;
  social?: Social[];
  paymentMethods?: Social[];
  technologies?: Social[];
  content?: RichText;
  /**
   * @title Cor de fundo
   * @format color-input
   * @description Cor padrão: "#2834d7"
   */
  background?: string;
}

function Summary({ title, children }: {
  title: string;
  children: ComponentChildren;
}) {
  return (
    <details class="group border-b rounded-none border-base-100 last:border-none last:border-b-0 cursor-pointer syllabus">
      <summary class="collapse-title flex flex-row px-4  md:px-8 font-medium text-white justify-between items-center text-sm md:text-base md:text-2xl gap-3 xl:gap-4 max-h-[45px] min-h-[45px]">
        <h4 class=" w-auto uppercase text-xs">{title}</h4>
        <span class={"hidden group-open:flex"}>
          -
        </span>
        <span class={"flex  group-open:hidden"}>
          +
        </span>
      </summary>
      <div class=" pt-0 p-4 cursor-default gap-2 flex flex-col">
        {children}
      </div>
    </details>
  );
}

function Footer({
  links = [],
  social = [],
  paymentMethods = [],
  content,
  background = "#2834d7",
  contact,
  technologies,
}: Props) {
  const device = useDevice();
  const isMobile = device == "mobile";

  return (
    <footer
      class=" sm:px-0 flex flex-col font-Signal text-base-100"
      style={{ backgroundColor: background }}
    >
      <div class=" flex flex-col gap-5 sm:gap-10 border-b border-base-100">
        <ul class="grid grid-flow-row sm:grid-flow-col md:grid-cols-4 ">
          {links.map(({ title, href, children }) => (
            isMobile
              ? (
                <div class="flex flex-col w-full md:order-1 order-2 border-base-100 border-b">
                  <Summary title={title}>
                    {contact.item.map(({ title, href }) => (
                      <li class="flex flex-col gap-2">
                        {href
                          ? (
                            <a class="text-sm " href={href}>
                              {title}
                            </a>
                          )
                          : (
                            <span class="text-sm ">
                              {title}
                            </span>
                          )}
                      </li>
                    ))}
                  </Summary>
                </div>
              )
              : (
                <li class="flex flex-col gap-4 md:border-r  border-base-100  py-5 pl-6 md:order-1 order-2">
                  <a class="text-xs uppercase" href={href}>{title}</a>
                  <ul class="flex flex-col gap-1">
                    {children.map(({ title, href }) => (
                      <li>
                        <a class="text-sm " href={href}>
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )
          ))}

          <li class="flex flex-col sm:flex-row gap-12 justify-between items-start md:border-r  border-base-100 pb-0 md:py-5 md:pl-6 order-3 md:order-2">
            {isMobile
              ? (
                <div class="flex flex-col w-full">
                  {contact?.item?.map(({ title, href, subTitle }) => (
                    <Summary title={title}>
                      <li class="flex flex-col ">
                        {href
                          ? (
                            <a class="text-sm " href={href}>
                              {subTitle}
                            </a>
                          )
                          : (
                            <span class="text-sm ">
                              {subTitle}
                            </span>
                          )}
                      </li>
                    </Summary>
                  ))}
                </div>
              )
              : (
                <ul class="flex flex-col gap-7">
                  {contact?.item?.map(({ title, href, subTitle }) => (
                    <li class="flex flex-col ">
                      <span class="text-xs uppercase  ">{title}</span>
                      {href
                        ? (
                          <a class="text-sm " href={href}>
                            {subTitle}
                          </a>
                        )
                        : (
                          <span class="text-sm ">
                            {subTitle}
                          </span>
                        )}
                    </li>
                  ))}
                </ul>
              )}
          </li>
          <li class="flex flex-col sm:flex-row gap-12 justify-between items-start sm:items-center  order-1 md:order-3 border-t border-b border-base-100 md:border-none">
            <ul class="flex h-full w-full min-h-20">
              {social.map(({ image, href, alt }) => (
                <li class="w-full md:w-2/4 h-full border-r border-base-100 last:border-none flex justify-center items-center py-5">
                  <a href={href} class="max-h-[24px] h-full">
                    <Image
                      src={image}
                      alt={alt}
                      loading="lazy"
                      width={14}
                      height={14}
                      class="w-full h-full object-cover"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div class="flex flex-col md:flex-row gap-12 justify-between items-start p-5 ">
        <div class="flex flex-col justify-between w-full md:w-2/4 gap-7">
          <ul class="flex flex-wrap gap-5 flex-col md:flex-row md:items-center">
            <span class="text-xs uppercase ">PAGAMENTOS</span>
            <div class={"flex flex-row gap-2 flex-wrap"}>
              {paymentMethods.map(({ image, alt, width, height }) => (
                <li class="h-8 w-10  flex justify-center items-center">
                  <Image
                    src={image}
                    alt={alt}
                    width={width || 34}
                    height={height || 23}
                    loading="lazy"
                  />
                </li>
              ))}
            </div>
          </ul>
          {content && (
            <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4">
              <span
                class="text-xs font-normal uppercase"
                dangerouslySetInnerHTML={{ __html: content }}
              >
              </span>
            </div>
          )}
        </div>
        <div class="w-full md:w-2/4 flex flex-row gap-6 items-center justify-center md:justify-end">
          {technologies?.map(({ image, alt, height, width }) => (
            <li class="h-auto w-16  flex justify-center items-center">
              <Image
                src={image}
                alt={alt}
                width={width || 20}
                height={height || 20}
                loading="lazy"
                class={"w-full h-auto object-cover"}
              />
            </li>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
