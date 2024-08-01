import { ImageWidget, VideoWidget as Video } from "apps/admin/widgets.ts";
import CTAButton, {
  Props as PropsCTA,
} from "deco-sites/olym/components/Button/CTAButton.tsx";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

/**
 * @title Video
 */
interface VideoSection {
  /**
   * @title Video
   */
  video: Video;
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
   * @title Video em Loop
   */
  loop?: boolean;
  /**
   * @title Auto play no video
   */
  autoplay?: boolean;
  /**
   * @title Mutado
   */
  muted?: boolean;
}

/**
 * @title Video
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
   * @title Video
   */
  video: VideoSection;
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

function VideoContent(props: VideoSection) {
  const { alt, preload = false, video, loop, autoplay, muted } = props;

  return (
    <div class="w-full lg:w-2/4 h-auto flex flex-col justify-between items-stretch">
      <video
        data-testid="html5-player"
        class=" object-cover w-full h-full max-h-screen xl:max-h-[95vh] min-h-[300px]"
        loop={loop}
        autoplay={autoplay}
        muted={muted}
        playsinline={false}
        alt={alt}
        loading={preload ? "eager" : "lazy"}
      >
        <source src={video} />
        <div class="olympikus-fourmaker-0-x-fallbackContainer">
          <img
            class="w-100 h-100 olympikus-fourmaker-0-x-fallbackImage"
            src="https://storecomponents.vtexassets.com/arquivos/ids/155639"
          />
        </div>
      </video>
    </div>
  );
}

function ImageContent(props: ImageSection) {
  const { image, alt, preload, cta, positionDesktop, positionMobile } = props;
  const device = useDevice();
  const isMobile = device == "mobile";

  return (
    <div class="w-full lg:w-2/4 flex flex-col md:max-h-[400px] lg:max-h-full overflow-hidden relative">
      <Image
        src={image}
        alt={alt}
        width={isMobile ? 375 : 720}
        height={isMobile ? 400 : 600}
        preload={preload}
        loading={!preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : "low"}
        class={"w-full h-full object-cover lg:max-h-[90vh]"}
      />
      <CTAButton
        {...cta}
        class={`absolute w-fit bottom-4 mx-auto ${
          POSITIONDESKTOP[positionDesktop || "Esquerda"]
        } ${POSITIONMOBILE[positionMobile || "Centro"]}`}
      />
    </div>
  );
}

export default function VideoAndImage(props: Props) {
  const { video, image, invertOrderDesktop, invertOrderMobile } = props;

  const flexDesktop = invertOrderDesktop
    ? "lg:flex-row-reverse"
    : "lg:flex-row";
  const flexMobile = invertOrderMobile ? "flex-col-reverse" : "flex-col";

  return (
    <div
      class={`w-full h-full flex bg-secondary-content text-primary-content lg:max-h-[90vh] ${flexDesktop} ${flexMobile}`}
    >
      <VideoContent {...video} />
      <ImageContent {...image} />
    </div>
  );
}
