import { RichText } from "apps/admin/widgets.ts";

/**
 * @titleBy label
 */
interface Links {
  /**
   * @title Label
   */
  label: string;
  /**
   * @title Link
   */
  href: string;
}

/**
 * @titleBy title
 */
interface Card {
  /**
   * @title Titulo
   */
  title?: string;
  /**
   * @title Lista de links
   */
  link?: Links[];
}

interface Props {
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Colunas
   */
  cards?: Card[];
}

export default function FooterLP(props: Props) {
  const { title, cards } = props;

  return (
    <footer class="w-full h-full flex flex-col gap-20 p-5 text-white bg-base-200">
      <h2
        class="text-[45px] leading-[42px] font-FKOlympikus"
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </h2>
      <div class="flex flex-row w-full h-full justify-between items-start flex-wrap gap-y-20 md:flex-nowrap">
        {cards && cards?.length > 1 &&
          cards.map((card) => (
            <div class="flex flex-col gap-7 min-w-[50%] md:min-w-[auto]">
              {card.title && (
                <h4 class={"font-FKOlympikus text-[30px] leading-[36px]"}>
                  {card.title}
                </h4>
              )}
              {card.link && card.link.length > 1 &&
                (
                  <ul class="font-Signal text-xl flex flex-col gap-5">
                    {card.link?.map((link) => (
                      <li>
                        <a href={link.href}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
      </div>
    </footer>
  );
}
