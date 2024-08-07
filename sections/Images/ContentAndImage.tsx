import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import CTAButton, {
  Props as PropsCTA,
} from "deco-sites/olym/components/Button/CTAButton.tsx";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

/**
 * @title Conteudo
 */
interface Content {
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Conteudo
   */
  content: RichText;
  /**
   * @title Estilização do CTA
   */
  cta?: PropsCTA;
  /**
   * @title Cor de fundo
   * @format color-input
   */
  background: string;
}

/**
 * @title Imagem
 */
interface ImageSection {
  /**
   * @title Titulo acima da imagem
   */
  title?: RichText;
  /**
   * @title Cor de fundo do texto
   * @format color-input
   */
  backgroud?: string;
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
  /**
   * @title Estilização do CTA
   */
  cta?: PropsCTA;
  /**
   * @title Posição do CTA Desktop
   * @description Padrão: "Esquerda"
   * @default "Esquerda"
   */
  positionDesktop?: "Direita" | "Esquerda" | "Centro";
  /**
   * @title Posição do CTA Mobile
   * @description Padrão: "Centro"
   * @default "Centro"
   */
  positionMobile?: "Direita" | "Esquerda" | "Centro";
}

interface Props {
  /**
   * @title Conteudo
   */
  content: Content;
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
}

const POSITIONMOBILE = {
  "Esquerda": "left-4 right-auto",
  "Centro": "left-0 right-0",
  "Direita": "left-auto right-4",
};
const POSITIONDESKTOP = {
  "Esquerda": "lg:left-4 lg:right-auto",
  "Centro": "lg:left-0 lg:right-0",
  "Direita": "lg:left-auto lg:right-4",
};

function TextContent(props: Content) {
  const { title, content, cta } = props;

  return (
    <div class="w-full lg:w-2/4 h-auto flex flex-col justify-between items-stretch py-5 px-4 gap-[50px] md:pr-8">
      <span
        class="font-FKOlympikus text-[55px] leading-[48px] uppercase max-w-[250px] md:max-w-[350px] lg:max-w-[450px] xl:max-w-[600px] lg:text-[100px] lg:leading-[93px] xl:text-7.5xl "
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </span>
      <div class="flex flex-col font-Signal text-lg gap-5 leading-[20px]">
        <span dangerouslySetInnerHTML={{ __html: content }}></span>
        {cta?.label && <CTAButton {...cta} class="w-fit" />}
      </div>
    </div>
  );
}

function ImageContent(props: ImageSection) {
  const {
    image,
    alt,
    title,
    backgroud,
    preload,
    cta,
    positionDesktop,
    positionMobile,
  } = props;
  const device = useDevice();
  const isMobile = device == "mobile";

  return (
    <div class="w-full lg:w-2/4 flex flex-col md:max-h-[400px] lg:max-h-full overflow-hidden relative">
      {title &&
        (
          <div
            style={{ background: backgroud }}
            class={"font-FKOlympikus text-[75px] leading-[68px] uppercase w-full lg:text-[100px] lg:leading-[93px] xl:text-[150px] xl:leading-[130px] px-4 "}
          >
            <span
              class="pb-3 lg:pb-5 block"
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </span>
          </div>
        )}
      <Image
        src={image}
        alt={alt}
        width={isMobile ? 375 : 720}
        height={isMobile ? 400 : 600}
        preload={preload}
        loading={!preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : "low"}
        class={"w-full h-full object-cover md:max-h-[400px] lg:max-h-[90vh]"}
      />
      {cta?.label && (
        <CTAButton
          {...cta}
          class={`absolute w-fit bottom-4 mx-auto ${
            POSITIONDESKTOP[positionDesktop || "Esquerda"]
          } ${POSITIONMOBILE[positionMobile || "Centro"]}`}
        />
      )}
    </div>
  );
}

export default function ContentAndImage(props: Props) {
  const { content, image, invertOrderDesktop, invertOrderMobile } = props;

  const flexDesktop = invertOrderDesktop
    ? "lg:flex-row-reverse"
    : "lg:flex-row";
  const flexMobile = invertOrderMobile ? "flex-col-reverse" : "flex-col";

  return (
    <div
      class={`w-full h-full flex bg-secondary-content text-primary-content lg:max-h-[90vh] ${flexDesktop} ${flexMobile}`}
      style={{ background: content.background }}
    >
      <TextContent {...content} />
      <ImageContent {...image} />
    </div>
  );
}
