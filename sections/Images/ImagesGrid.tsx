import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import ContainerAnimation from "deco-sites/olym/components/Animation/ComponentAnimation.tsx";
import type { Props as Animation } from "../../components/Animation/ComponentAnimation.tsx";

/**
 * @titleBy alt
 */
interface ItemImage {
  /**
   * @title Image Desktop
   * @description Imagem recomendada para a linha com uma imagem so:1272x600px ou com duas images:626x600px ou com as mesma proporção;
   */
  image: ImageWidget;
  /**
   * @title Image Mobile
   * @description Tamanho da imagem recomendado 626x600px ou da mesma propoção
   */
  imageMobile: ImageWidget;
  /**
   * @title Alt da imagem
   */
  alt: string;
}

/**
 * @title Linhas
 */
interface Row {
  /**
   * @title Images
   * @description imagens na mesma linha, recomendado no min 1 e no max 4
   * @minItems 1
   * @maxItems 2
   */
  images: ItemImage[];
  /**
   * @title Configuração da Animação
   */
  animation?: Animation;
  /**
   * @title Ativar animação
   * @description Caso queira ter uma melhor visualização do conteudo, basta desativar essa opção, após finalizado a edição, ative novamente para que fucione corretamente no site
   */
  showAnimaton?: boolean;
}
interface Props {
  /**
   * @title Id de Referencia
   * @description Este Id serve de referenciar caso queira criar uma navegação na mesma pagina
   */
  id?: string;
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Linhas de imagens
   */
  rows: Row[];
  /**
   * @title Cor do fundo
   * @format color-input
   */
  background?: string;
  /**
   * @title Configuração da Animação do titulo
   */
  animation?: Animation;
  /**
   * @title Ativar animação
   * @description Caso queira ter uma melhor visualização do conteudo, basta desativar essa opção, após finalizado a edição, ative novamente para que fucione corretamente no site
   */
  showAnimaton?: boolean;
}

const MOBILESIZE = {
  "widht": 335,
  "height": 200,
};

const DESKTOPWIDTH = {
  "1": 1272,
  "2": 620,
};

const DESKTOPHEIGHT = {
  "1": 600,
  "2": 600,
};

function ItemImg(
  { props, numberCol }: { props: ItemImage; numberCol: "1" | "2" },
) {
  const { image, imageMobile, alt } = props;

  const device = useDevice();

  return (
    <div class={numberCol == "1" ? "w-full" : "lg:w-2/4 w-full" + " h-full "}>
      <Image
        src={device == "mobile" ? imageMobile : image}
        alt={alt}
        width={device == "mobile"
          ? MOBILESIZE["widht"]
          : DESKTOPWIDTH[numberCol || "2"]}
        height={device == "mobile"
          ? MOBILESIZE["height"]
          : DESKTOPHEIGHT[numberCol || "2"]}
        loading={"lazy"}
        fetchPriority="low"
        class={"w-full h-auto object-contain"}
      />
    </div>
  );
}

function Row(props: Row) {
  const { images, animation, showAnimaton } = props;

  if (showAnimaton) {
    return (
      <ContainerAnimation
        animationType={animation?.animationType}
        duration={animation?.duration}
      >
        <div
          class={"w-full flex-col lg:flex-row flex-wrap md:flex-nowrap gap-5 flex"}
        >
          {images.map((img) => (
            <ItemImg props={img} numberCol={images.length === 1 ? "1" : "2"} />
          ))}
        </div>
      </ContainerAnimation>
    );
  }
  return (
    <div
      class={"w-full flex-col lg:flex-row flex-wrap md:flex-nowrap gap-5 flex"}
    >
      {images.map((img) => (
        <ItemImg props={img} numberCol={images.length === 1 ? "1" : "2"} />
      ))}
    </div>
  );
}

export default function ImagesGrid(props: Props) {
  const {
    title,
    rows,
    background = "#262626",
    animation,
    showAnimaton,
    id,
  } = props;

  return (
    <div id={id} class="w-full h-full " style={{ background: background }}>
      <div class="w-full h-full flex flex-col gap-20 px-5 py-10 max-w-[1272px] md:px-[42px] mx-auto xl:px-0">
        {showAnimaton
          ? (
            <ContainerAnimation
              animationType={animation?.animationType}
              duration={animation?.duration}
            >
              <span
                class="font-FKOlympikus text-white text-[50px] leading-[42px] md:text-6xl md:leading-[1] lg:text-[65px] text-center block"
                dangerouslySetInnerHTML={{ __html: title }}
              >
              </span>
            </ContainerAnimation>
          )
          : (
            <span
              class="font-FKOlympikus text-white text-[50px] leading-[42px] md:text-6xl md:leading-[1] lg:text-[65px] text-center block"
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </span>
          )}

        <div class="flex flex-col w-full h-full gap-5">
          {rows.map((row) => <Row {...row} />)}
        </div>
      </div>
    </div>
  );
}
