import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

/**
 * @titleBy title
 */
interface Card {
  /**
   * @title Icone
   */
  icon?: ImageWidget;
  /**
   * @title Tag alt
   */
  alt?: string;
  /**
   * @title Titulo
   */
  title: string;
  /**
   * @title Conteudo
   */
  content: RichText;
}
/**
 * @title Conteudo
 */
interface Content {
  /**
   * @title Pre Titulo
   */
  preTitle?: RichText;
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Pos titulo
   */
  posTitle?: RichText;
}

/**
 * @title Conteudo
 */
interface ContentSection {
  /**
   * @title Conteudo
   */
  content: Content;
  /**
   * @title Titulo dos cards
   */
  tileCards: RichText;
  /**
   * @title Cards de conteudo
   */
  cards: Card[];
}

/**
 * @title Imagem
 */
interface ImageSection {
  /**
   * @title Imagem
   */
  image: ImageWidget;
  /**
   * @title Tag alt
   */
  alt: string;
  /**
   * @title Pre carregar a imagem
   * @description Este recurso é importante quando a imagem é a primeira a ser carregado no site, por exemplo se encontra na primeira dobra, recomendado em somente uma imagem por pagina
   */
  preload?: boolean;
}

interface Props {
  /**
   * @title Conteudo
   */
  content: ContentSection;
  /**
   * @title Imagem
   */
  image: ImageSection;
  /**
   * @title Inverter posição no desktop
   */
  invertOrderDesktop?: boolean;
  /**
   * @title Inverter posição no mobile
   */
  invertOrderMobile?: boolean;
  /**
   * @title Cor de fundo
   * @format color-input
   * @description Padrão: "#000"
   */
  background?: string;
}

function Card(props: Card) {
  const { icon, title, content, alt } = props;

  return (
    <div class="w-full h-auto inline-block">
      <div class="w-full h-auto flex flex-row text-base-100 gap-3 md:mb-5 ">
        <div class="w-[18px] h-[10px] pt-1">
          {icon && (
            <Image
              alt={alt}
              src={icon}
              width={18}
              height={10}
              loading={"lazy"}
              class="w-full h-auto object-contain"
            />
          )}
        </div>
        <div class="w-full h-full flex flex-col">
          <span
            class="text-base uppercase"
            dangerouslySetInnerHTML={{ __html: title }}
          >
          </span>
          <span
            class="text-xs leading-[12px]"
            dangerouslySetInnerHTML={{ __html: content }}
          >
          </span>
        </div>
      </div>
    </div>
  );
}

function ImageSection(props: ImageSection) {
  const { alt, image, preload } = props;

  const device = useDevice();
  const isMobile = device == "mobile";

  return (
    <div class="w-full h-full md:w-2/4 md:h-auto">
      <Image
        alt={alt}
        src={image}
        width={isMobile ? 375 : 720}
        height={isMobile ? 395 : 750}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : "low"}
        class="w-full h-full object-cover"
      />
    </div>
  );
}

function ContentSection(props: ContentSection) {
  const { tileCards, content, cards } = props;

  return (
    <div class="w-full h-auto md:w-2/4 flex-col flex justify-between text-base-100 gap-[50px]  py-5 px-4">
      <div class={"w-full h-full flex-col flex gap-4"}>
        {content.preTitle &&
          (
            <span
              class=" font-Signal text-lg lg:-mb-6"
              dangerouslySetInnerHTML={{ __html: content.preTitle }}
            >
            </span>
          )}
        <span
          class="text-[55px] leading-[48px] uppercase font-FKOlympikus lg:text-7.5xl "
          dangerouslySetInnerHTML={{ __html: content.title }}
        >
        </span>
        {content.posTitle &&
          (
            <span
              class="uppercase  font-Signal text-lg max-w-[368px]"
              dangerouslySetInnerHTML={{ __html: content.posTitle }}
            >
            </span>
          )}
      </div>
      <div class={"w-full h-auto flex-col flex gap-y-5"}>
        <span
          class="text-lg text-base-100"
          dangerouslySetInnerHTML={{ __html: tileCards }}
        >
        </span>
        <div class="flex flex-col w-full h-full flex-wrap gap-5 md:block md:columns-2 lg:columns-3">
          {cards.map((card) => <Card {...card} />)}
        </div>
      </div>
    </div>
  );
}

export default function ContentCardsAndImage(props: Props) {
  const {
    invertOrderDesktop,
    invertOrderMobile,
    content,
    image,
    background = "#000",
  } = props;

  const flexDesktop = invertOrderDesktop
    ? "md:flex-row-reverse"
    : "md:flex-row";
  const flexMobile = invertOrderMobile ? "flex-col-reverse" : "flex-col";

  return (
    <div
      class={`w-full h-auto flex flex-col font-Signal xl:max-h-[750px] ${flexDesktop} ${flexMobile}`}
      style={{ background: background }}
    >
      <ImageSection {...image} />
      <ContentSection {...content} />
    </div>
  );
}
