import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

/**
 * @titleBy alt
 */
interface ItemImage {
  /**
   * @title Image Desktop
   */
  image: ImageWidget;
  /**
   * @title Image MObile
   */
  imageMobile: ImageWidget;
  /**
   * @title alt da imagem
   */
  alt: string;
  /**
   * @title Comprimento da imagem Desktop
   * @description É importante setar o tamanho da imagem desktop por conta da sua variação no grid, assim é possivel garantir uma melhor responsividade
   */
  widht: number;
  /**
   * @title Altura da imagem Desktop
   */
  height: number;
}

interface Props {
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Imagens
   */
  images: ItemImage[];
  /**
   * @title Grid Area
   * @description Aqui você pode criar o layout das images do jeito que preferir e de acordo com a quantidade de imagens add acima, basta colocar img-'posição', por exemplo "'img-1 img1' 'img-2 img-3';" use este exemplo como referencia e veja o resultado ao lado
   * @format textarea
   */
  gridTemplate: string;
  /**
   * @title Cor do funcdo
   * @format color
   */
  background?: string;
}

function ItemGrid({ props, index }: { props: ItemImage; index: number }) {
  const { image, imageMobile, alt, widht, height } = props;

  const device = useDevice();

  return (
    <div class="w-full h-full" style={{ gridArea: `img-${index + 1}` }}>
      <Image
        src={device == "mobile" ? imageMobile : image}
        alt={alt}
        width={device == "mobile" ? 335 : widht}
        height={device == "mobile" ? 200 : height}
        loading={"lazy"}
        fetchPriority="low"
      />
    </div>
  );
}

export default function ImagesGrid(props: Props) {
  const {
    title,
    images,
    background = "#262626",
    gridTemplate = "'11''2''2';",
  } = props;

  return (
    <div class="w-full h-full " style={{ background: background }}>
      <div class="w-full h-full flex flex-col gap-20 px-5 py-10 max-w-[1272px] mx-auto xl:px-0">
        <span
          class="font-FKOlympikus text-white text-[50px] leading-[42px] md:text-6xl md:leading-[1] lg:text-[65px] text-center px-6 md:px-0"
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </span>
        <div
          class="flex flex-col lg:grid w-full h-full gap-5"
          style={{ gridTemplateAreas: gridTemplate }}
        >
          {images.map((img, index) => <ItemGrid props={img} index={index} />)}
        </div>
      </div>
    </div>
  );
}
