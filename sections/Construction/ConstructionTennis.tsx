import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useScript } from "deco/hooks/useScript.ts";
import CTAButton from "../../components/Button/CTAButton.tsx";
import { Props as PropsCTA } from "../../components/Button/CTAButton.tsx";

/**
 * @titleBy alt
 */
interface Step {
  /**
   * @title Conteudo
   */
  content: RichText;
  /**
   * @title Imagem
   */
  image: ImageWidget;
  /**
   * @title Imagem Opaca
   */
  imageOpacity: ImageWidget;
  /**
   * @title Tag alt
   */
  alt: string;
  /**
   * @title Posição da imagem
   * @description A posição serve para que detemrinar em quql posição a imagem deve ir com os eventos dos botões
   */
  position: number;
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
   * @title Etapas
   */
  step: Step[];
  /**
   * hidde true
   */
  index?: number;
  /**
   * @format color-input
   * @title Cor de fundo
   */
  background?: string;
  /**
   * @format color-input
   * @title Cor dos botões
   */
  arrowBgColor?: string;
  /**
   * @title Estilização do CTA
   */
  cta?: PropsCTA;
}

const TRANLATEY = {
  1: "translate-y-[30%]",
  2: "translate-y-[-5%] lg:translate-y-[-5%]",
  3: "translate-y-[-30%] lg:translate-y-[-25%]",
  4: "translate-y-[-50%] lg:translate-y-[-45%]",
  5: "translate-y-[-70%] lg:translate-y-[-65%]",
  6: "translate-y-[-100%] lg:translate-y-[-90%]",
  7: "translate-y-[-130%] lg:translate-y-[-120%]",
};

function AnimationScroll(next: boolean, nMax: number) {
  const TRANSLATEY = {
    1: ["translate-y-[30%]"],
    2: ["translate-y-[-5%]", "lg:translate-y-[0%]"],
    3: ["translate-y-[-30%]", "lg:translate-y-[-10%]"],
    4: ["translate-y-[-50%]", "lg:translate-y-[-30%]"],
    5: ["translate-y-[-70%]", "lg:translate-y-[-45%]"],
    6: ["translate-y-[-100%]", "lg:translate-y-[-70%]"],
    7: ["translate-y-[-130%]", "lg:translate-y-[-120%]"],
  };

  const container = globalThis.document.getElementById("animationScroll");
  const dataIndex = container?.getAttribute("data-index") || "0";

  const index = parseInt(dataIndex);
  const nextIndex = next
    ? (index + 1) % (nMax + 1)
    : (index - 1 + nMax + 1) % (nMax + 1);

  // Seleciona as imagens
  const currentImg = globalThis.document.querySelector(
    `[data-index-img="${index}"]`,
  );
  const nextImg = globalThis.document.querySelector(
    `[data-index-img="${nextIndex}"]`,
  );
  const currentContent = globalThis.document.querySelector(
    `[data-index-content="${index}"]`,
  );
  const nextContent = globalThis.document.querySelector(
    `[data-index-content="${nextIndex}"]`,
  );

  // Remove a classe atual de transição
  if (currentImg) {
    const currentPosition = parseInt(
      currentImg.getAttribute("data-position-img") || "1",
    );
    TRANSLATEY[currentPosition as keyof typeof TRANSLATEY]?.forEach((cls) => {
      container?.classList.remove(cls);
    });
  }

  // Adiciona a nova classe de transição
  if (nextImg) {
    const nextPosition = parseInt(
      nextImg.getAttribute("data-position-img") || "1",
    );
    TRANSLATEY[nextPosition as keyof typeof TRANSLATEY]?.forEach((cls) => {
      container?.classList.add(cls);
    });

    // Atualiza a opacidade das imagens
    currentImg?.classList.replace("opacity-1", "opacity-0");
    nextImg?.classList.replace("opacity-0", "opacity-1");
    currentContent?.classList.replace("opacity-1", "opacity-0");
    nextContent?.classList.replace("opacity-0", "opacity-1");
    currentContent?.classList.replace("h-full", "h-0");
    nextContent?.classList.replace("h-0", "h-full");

    // Atualiza os atributos do container
    container?.setAttribute("data-index", nextIndex.toString());
    container?.setAttribute("data-position", nextPosition.toString());
  }
}

function StepImage(
  { props, indexImg, index }: { props: Step; indexImg: number; index: number },
) {
  const { imageOpacity, image, alt, position } = props;

  console.log("index", index, position);

  return (
    <>
      <div
        data-index-img={index}
        data-position-img={position}
        class={`absolute top-0 bottom-0 left-0 right-0 -z-10 ${
          index == indexImg ? "opacity-1" : "opacity-0 "
        }`}
      >
        <Image
          src={image}
          alt={alt}
          width={419}
          height={700}
          loading="lazy"
          fetchPriority="low"
          class="w-full h-auto object-contain absolute"
        />
      </div>
      <div class={`absolute top-0 bottom-0 left-0 right-0 `}>
        <Image
          src={imageOpacity}
          alt={alt}
          width={419}
          height={700}
          loading="lazy"
          fetchPriority="low"
          class="w-full h-auto object-contain absolute"
        />
      </div>
    </>
  );
}

export default function ConstructionTennis(props: Props) {
  const {
    title,
    step,
    index = 1,
    background = "#262626",
    arrowBgColor = "#a5a5a5",
    cta,
    id,
  } = props;

  const device = useDevice();

  if (device == "mobile") {
    return (
      <div
        id={id}
        class="w-full h-full overflow-hidden 
      slide-next"
        style={{ background: background }}
      >
        <div class="flex flex-col gap-5w-full h-full text-white p-10">
          <div
            class="relative z-10"
            style={`box-shadow: 1px 40px 30px ${background};`}
          >
            <span
              class="font-FKOlympikus text-[50px] leading-[42px] lg:text-[65px] lg:leading-[55px] w-full text-left z-10 "
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </span>
          </div>
          <div class={"min-h-[300px] overflow-hidden w-full h-full relative"}>
            <div
              id="animationScroll"
              data-position={1}
              data-index={0}
              class={` absolute w-full h-full max-w-[500px] mx-auto  ${
                TRANLATEY[index as keyof typeof TRANLATEY || 1]
              }`}
              style={"transition: 1.4s cubic-bezier(.23,1,.32,1) 0s;"}
            >
              {step.map((img, indexImg) => (
                <StepImage props={img} index={indexImg} indexImg={index} />
              ))}
            </div>
          </div>
          <div class="flex justify-center items-center flex-col gap-5">
            <div
              class="w-full flex flex-row justify-end lg:relative  min-h-[200px] relative pt-5"
              style={`background: ${background};     box-shadow: 0px -20px 30px ${background}`}
            >
              <div class="w-full h-full relative pb-[70px]">
                {step.map((item, indexContent) => (
                  <div
                    data-index-content={indexContent}
                    class={`flex font-Signal text-base
                   text-left w-full
                  ${
                      indexContent == index
                        ? "opacity-1 h-full"
                        : "opacity-0 h-0"
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item.content }}>
                    </span>
                  </div>
                ))}
              </div>
              <div class="flex flex-col gap-4 items-center justify-center z-10 ">
                <button
                  class="flex justify-center items-center rounded-full w-10 h-10"
                  style={{ background: arrowBgColor }}
                  // hx-target="closest section"
                  // hx-swap="outerHTML transition:true"
                  // hx-get={useSection({
                  //   props: {
                  //     index: index < 1
                  //       ? step[step.length - 1].position
                  //       : index - 1,
                  //   },
                  // })}
                  hx-on:click={useScript(
                    AnimationScroll,
                    false,
                    step[step.length - 1].position,
                  )}
                >
                  <svg
                    width="20"
                    height="13"
                    viewBox="0 0 20 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3.0293"
                      y="13"
                      width="4"
                      height="14"
                      rx="2"
                      transform="rotate(-135 3.0293 13)"
                      fill="white"
                    />
                    <rect
                      x="20"
                      y="10.1714"
                      width="4"
                      height="14"
                      rx="2"
                      transform="rotate(135 20 10.1714)"
                      fill="white"
                    />
                  </svg>
                </button>
                <button
                  class="flex justify-center items-center rounded-full w-10 h-10"
                  style={{ background: arrowBgColor }}
                  // hx-target="closest section"
                  // hx-swap="outerHTML transition:true"
                  // hx-get={useSection({
                  //   props: { index: index == prev ? 0 : index + 1 },
                  // })}
                  hx-on:click={useScript(
                    AnimationScroll,
                    true,
                    step[step.length - 1].position,
                  )}
                >
                  <svg
                    width="20"
                    height="13"
                    viewBox="0 0 20 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="16.9707"
                      width="4"
                      height="14"
                      rx="2"
                      transform="rotate(45 16.9707 0)"
                      fill="white"
                    />
                    <rect
                      y="2.82861"
                      width="4"
                      height="14"
                      rx="2"
                      transform="rotate(-45 0 2.82861)"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {cta?.label && <CTAButton {...cta} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      class="w-full h-full overflow-hidden pt-[70px] py-[70px] px-5 lx:px-0 "
      style={{ background: background }}
    >
      <div class="w-full h-full max-w-[1270px] min-h-[660px] :min-h-[560px]  mx-auto text-white flex flex-col items-center justify-start relative">
        <span
          class="font-FKOlympikus text-[50px] leading-[42px] lg:text-[65px] lg:leading-[55px] w-full text-left z-10"
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </span>
        <div class="w-full h-full grid grid-cols-[300px_auto_300px]  flex-col grid-rows-1 min-h-[500px] absolute ">
          <div class="relative h-autoh-full flex items-center w-full flex-col justify-center">
            {step.map((item, indexContent) => (
              <div
                data-index-content={indexContent}
                class={`flex font-Signal relative items-center w-full slide-next 
                   before:content-[''] before:w-[280px] before:h-[1px] before:absolute before:left-[240px] before:translate-y-[50%] before:top-[calc(50%-49px) before:border-white before:border-t before:border-dashed 
                ${
                  indexContent == index ? "opacity-1 h-full" : "opacity-0 h-0"
                }  `}
              >
                <span
                  class="absolute top-2/4 bottom-0 left-0 right-0 text-lg text-left w-full"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                >
                </span>
              </div>
            ))}
          </div>
          <div
            id="animationScroll"
            data-position={1}
            data-index={0}
            class={` relative w-full h-full max-w-[500px] mx-auto ${
              TRANLATEY[index as keyof typeof TRANLATEY || 1]
            }`}
            style={"transition: 1.4s cubic-bezier(.23,1,.32,1) 0s;"}
          >
            {step.map((img, indexImg) => (
              <StepImage props={img} index={indexImg} indexImg={index} />
            ))}
          </div>
          <div
            class="w-full flex flex-row justify-end relative px-5  bottom-0"
            style={{ background: background }}
          >
            <div class="flex flex-col gap-4 items-center justify-center z-10 ">
              <button
                class="flex justify-center items-center rounded-full w-10 h-10"
                style={{ background: arrowBgColor }}
                // hx-target="closest section"
                // hx-swap="outerHTML transition:true"
                // hx-get={useSection({ props: { index: index < 1 ? step[step.length - 1].position : index - 1 } })}
                hx-on:click={useScript(
                  AnimationScroll,
                  false,
                  step[step.length - 1].position,
                )}
              >
                <svg
                  width="20"
                  height="13"
                  viewBox="0 0 20 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3.0293"
                    y="13"
                    width="4"
                    height="14"
                    rx="2"
                    transform="rotate(-135 3.0293 13)"
                    fill="white"
                  />
                  <rect
                    x="20"
                    y="10.1714"
                    width="4"
                    height="14"
                    rx="2"
                    transform="rotate(135 20 10.1714)"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                class="flex justify-center items-center rounded-full w-10 h-10"
                style={{ background: arrowBgColor }}
                // hx-target="closest section"
                // hx-swap="outerHTML transition:true"
                // hx-get={useSection({ props: { index: index == prev ? 0 : index + 1 } })}
                hx-on:click={useScript(
                  AnimationScroll,
                  true,
                  step[step.length - 1].position,
                )}
              >
                <svg
                  width="20"
                  height="13"
                  viewBox="0 0 20 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="16.9707"
                    width="4"
                    height="14"
                    rx="2"
                    transform="rotate(45 16.9707 0)"
                    fill="white"
                  />
                  <rect
                    y="2.82861"
                    width="4"
                    height="14"
                    rx="2"
                    transform="rotate(-45 0 2.82861)"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {cta?.label && (
          <CTAButton
            {...cta}
            class="mt-auto z-10"
          />
        )}
      </div>
    </div>
  );
}
