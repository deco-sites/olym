import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Slider from "deco-sites/olym/components/ui/Slider.tsx";
import { clx } from "deco-sites/olym/sdk/clx.ts";
import { useId } from "deco-sites/olym/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

interface Color {
  /**
   *  @format color
   * @title Cor Inicial
   * @default #858585
   */
  primaryColor?: string;
  /**
   * @format color-input
   * @title Cor Secundaria
   * @default #afafaf
   */
  secondColor?: string;
}

/**
 * @titleBy title
 */
interface Posts {
  /**
   * @title Image
   */
  image: ImageWidget;
  /**
   * @title Tag alt
   */
  alt: string;
  /**
   * @title Title
   */
  title?: string;
  /**
   * @title Link
   */
  href: string;
}

interface Props {
  /**
   * @title Pre Titulo
   */
  preTitle?: RichText;
  /**
   * @title titulo
   */
  title: RichText;
  /**
   * @title Gradient no fundo do texto
   * @description Defina as cores do gradiente para aplicar no conteudo, caso queira uma cor solida basta inserir as duas cores iguais. Default: Cor inicial #858585, Cor secundaria: #afafaf
   */
  gradineColorText?: Color;
  /**
   * @title Posts
   */
  posts: Posts[];
  /**
   * @title Duração de Slide
   */
  interval?: number;
}

function Card(props: Posts) {
  const { image, alt, title, href } = props;

  return (
    <a href={href} class="w-full h-full">
      <div class="flex flex-col rounded-3xl bg-neutral h-full">
        <div class="w-full h-full">
          <Image
            src={image}
            alt={alt}
            width={410}
            height={341}
            loading={"lazy"}
            fetchPriority="low"
            class={"w-full h-full "}
          />
        </div>
        <div class="flex flex-col text-white uppercase p-7 tracking-widest-[0.075em] gap-5 justify-between h-full">
          <h3 class="text-[25px] loading-[35px] xl:text-[35px] font-FKOlympikus">
            {title}
          </h3>
          <div class="flex flex-row justify-between items-center">
            <span class="text-[10px] leading-[13px] md:text-[15px] md:leading-[18px]">
              Leia a materia
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="12.0242"
                cy="12.4266"
                rx="11.9412"
                ry="11.5204"
                fill="white"
              />
              <rect
                width="2.01132"
                height="10.0566"
                rx="1.00566"
                transform="matrix(0.719674 -0.694312 0.719674 0.694312 8.27148 6.91016)"
                fill="#A5A5A5"
              />
              <rect
                width="2.01132"
                height="10.0566"
                rx="1.00566"
                transform="matrix(0.719674 0.694312 -0.719674 0.694312 15.5088 11.3496)"
                fill="#A5A5A5"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function BlogPosts(props: Props) {
  const {
    preTitle,
    title,
    gradineColorText = { primaryColor: "#afafaf", secondColor: "#858585" },
    posts,
    interval,
  } = props;
  const id = useId();

  return (
    <div class="w-full h-full">
      <div class="flex flex-col max-w-[1276px] xl:max-w-[1372px] mx-auto font-Signal py-10 md:py-20 lg:py-[70px]">
        {preTitle && (
          <span
            class={"px-10 text-lg xl:px-12  text-neutral"}
            dangerouslySetInnerHTML={{ __html: preTitle }}
          >
          </span>
        )}
        <span
          class="font-FKOlympikus text-[65px] leading-[55px] w-full text-left z-10 pb-1 max-w-[833px] uppercase px-10 xl:px-12 mb-8 md:mb-20 "
          dangerouslySetInnerHTML={{ __html: title }}
          style={` background: linear-gradient(270deg,${gradineColorText.primaryColor} -1.04%,${gradineColorText.secondColor} 100.71%); -webkit-background-clip: text;  -webkit-text-fill-color: transparent`}
        >
        </span>
        <div
          id={id}
          class={clx(
            "grid",
            "grid-rows-[1fr_32px_1fr_64px]",
            "grid-cols-[32px_1fr_32px] h-full",
            "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
            "w-full",
          )}
        >
          <div class="col-span-full row-span-full lg:px-12">
            <Slider class="carousel carousel-center w-full gap-6 ">
              {posts.map((post, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-[80%] md:w-[45%] lg:w-[calc(33%-0.75rem)] last:pr-10 first:pl-10 md:last:pr-[25%] md:first:pl-[25%] lg:last:pr-[0] lg:first:pl-[0]"
                >
                  <Card {...post} />
                </Slider.Item>
              ))}
            </Slider>
          </div>

          <div class="hidden lg:flex items-center justify-start z-10 col-start-1 row-start-2">
            <Slider.PrevButton
              class=""
              disabled={false}
            >
              <svg
                width="13"
                height="20"
                viewBox="0 0 13 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="4"
                  height="14"
                  rx="2"
                  transform="matrix(-0.707108 0.707106 -0.707108 -0.707106 13 16.9707)"
                  fill="#A5A5A5"
                />
                <rect
                  width="4"
                  height="14"
                  rx="2"
                  transform="matrix(0.707108 0.707106 -0.707108 0.707106 10.1714 0)"
                  fill="#A5A5A5"
                />
              </svg>
            </Slider.PrevButton>
          </div>

          <div class="hidden lg:flex items-center justify-end z-10 col-start-3 row-start-2">
            <Slider.NextButton
              class=""
              disabled={false}
            >
              <svg
                width="13"
                height="20"
                viewBox="0 0 13 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="3.0293"
                  width="4"
                  height="14"
                  rx="2"
                  transform="rotate(-45 0 3.0293)"
                  fill="#A5A5A5"
                />
                <rect
                  x="2.82861"
                  y="20"
                  width="4"
                  height="14"
                  rx="2"
                  transform="rotate(-135 2.82861 20)"
                  fill="#A5A5A5"
                />
              </svg>
            </Slider.NextButton>
          </div>
          <Slider.JS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        </div>
      </div>
    </div>
  );
}
