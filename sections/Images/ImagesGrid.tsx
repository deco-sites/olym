import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

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
}
interface Props {
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Linhas de imagens
   */
  rows: Row[];
  /**
   * @title Cor do funcdo
   * @format color
   */
  background?: string;
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
  const { images } = props;

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
  } = props;

  return (
    <div class="w-full h-full " style={{ background: background }}>
      <div class="w-full h-full flex flex-col gap-20 px-5 py-10 max-w-[1272px] mx-auto xl:px-0">
        <span
          class="font-FKOlympikus text-white text-[50px] leading-[42px] md:text-6xl md:leading-[1] lg:text-[65px] text-center px-6 md:px-0"
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </span>
        <div class="flex flex-col w-full h-full gap-5">
          {rows.map((row) => <Row {...row} />)}
        </div>
      </div>
    </div>
  );
}
