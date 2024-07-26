import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useSection } from "deco/hooks/useSection.ts";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useScript } from "deco/hooks/useScript.ts";

/**
 * @titleBy alt
 */
interface Step {
  content: RichText;
  image: ImageWidget;
  imageOpacity: ImageWidget;
  alt: string;
  position: number;
}

interface Props {
  title: RichText;
  step: Step[];
  /**
   * hidde true
   */
  index?: number;
  /**
   * @format color
   */
  background?: string;
  /**
   * @format color
   */
  buttonColor?: string;
}

const TRANLATEY = {
  1: "translate-y-[30%]",
  2: "translate-y-[-15%] lg:translate-y-[-5%]",
  3: "translate-y-[-40%] lg:translate-y-[-25%]",
  4: "translate-y-[-75%] lg:translate-y-[-45%]",
  5: "translate-y-[-100%] lg:translate-y-[-65%]",
  6: "translate-y-[-130%] lg:translate-y-[-90%]",
  7: "translate-y-[-130%] lg:translate-y-[-120%]",
};

function AnimationScroll(next: boolean, nMax: number) {
  const TRANSLATEY = {
    1: ["translate-y-[30%]"],
    2: ["translate-y-[-15%]", "lg:translate-y-[-5%]"],
    3: ["translate-y-[-40%]", "lg:translate-y-[-25%]"],
    4: ["translate-y-[-75%]", "lg:translate-y-[-45%]"],
    5: ["translate-y-[-100%]", "lg:translate-y-[-65%]"],
    6: ["translate-y-[-130%]", "lg:translate-y-[-90%]"],
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
        class={`absolute top-0 bottom-0 left-0 right-0 ${
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
    buttonColor = "#a5a5a5",
  } = props;
  const prev = step.length - 1;

  const device = useDevice();

  if (device == "mobile") {
    return (
      <div
        class="w-full h-full overflow-hidden 
      slide-next"
        style={{ background: background }}
      >
        <div class="flex flex-col gap-5w-full h-full text-white">
          <div class="relative">
            <span
              class="font-FKOlympikus text-[65px] leading-[55px] w-full text-left "
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </span>
          </div>
          <div class={"min-h-[300px] overflow-hidden w-full h-full relative"}>
            <div
              class={` absolute w-full h-full max-w-[500px] mx-auto  ${
                TRANLATEY[index as keyof typeof TRANLATEY || 1]
              }`}
            >
              {step.map((img, indexImg) => (
                <StepImage props={img} index={indexImg} indexImg={index} />
              ))}
            </div>
          </div>
          <div>
            <div
              class="w-full flex flex-row justify-end lg:relative px-5  min-h-[200px] relative pt-5"
              style={{ background: background }}
            >
              <div class="w-full h-full relative pb-[70px]">
                {step.map((item, indexContent) => (
                  <div
                    class={`flex font-Signal text-base
                   text-left w-full
                  ${
                      indexContent == index
                        ? "opacity-1 relative "
                        : "opacity-0 absolute"
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
                  style={{ background: buttonColor }}
                  hx-target="closest section"
                  hx-swap="outerHTML transition:true"
                  hx-get={useSection({
                    props: {
                      index: index < 1
                        ? step[step.length - 1].position
                        : index - 1,
                    },
                  })}
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
                  style={{ background: buttonColor }}
                  hx-target="closest section"
                  hx-swap="outerHTML transition:true"
                  hx-get={useSection({
                    props: { index: index == prev ? 0 : index + 1 },
                  })}
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
        </div>
      </div>
    );
  }

  return (
    <div
      class="w-full h-full overflow-hidden pt-[70px] lg:py-[70px] px-5 lx:px-0 "
      style={{ background: background }}
    >
      <div class="w-full h-full max-w-[1270px] min-h-[660px] lg:min-h-[560px]  mx-auto text-white flex flex-col items-center justify-start relative">
        <span
          class="font-FKOlympikus text-[65px] leading-[55px] w-full text-left"
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </span>
        <div class="w-full h-full lg:grid lg:grid-cols-[300px_auto_300px] flex flex-col grid-rows-1 min-h-[500px] absolute ">
          <div class="relative h-autoh-full flex items-center w-full flex-col justify-center">
            {step.map((item, indexContent) => (
              <div
                class={`flex font-Signal relative items-center w-full slide-next 
                   before:content-[''] before:w-[280px] before:h-[1px] before:absolute before:left-[240px] before:translate-y-[50%] before:top-[calc(50%-49px) before:border-white before:border-t before:border-dashed 
                ${indexContent == index ? "opacity-1" : "opacity-0 "}  `}
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
            class={` relative w-full h-full max-w-[500px] mx-auto slide-next ${
              TRANLATEY[index as keyof typeof TRANLATEY || 1]
            }`}
          >
            {step.map((img, indexImg) => (
              <StepImage props={img} index={indexImg} indexImg={index} />
            ))}
          </div>
          <div
            class="w-full flex flex-row justify-end lg:relative px-5 absolute bottom-0"
            style={{ background: background }}
          >
            <div class="w-full h-full relative pb-[70px]">
              {step.map((item, indexContent) => (
                <div
                  class={`flex font-Signal text-base
                   top-0 bottom-0 left-0 right-0 text-left w-full
                  ${
                    indexContent == index
                      ? "opacity-1 relative "
                      : "opacity-0 absolute"
                  }`}
                >
                  <span dangerouslySetInnerHTML={{ __html: item.content }}>
                  </span>
                </div>
              ))}
            </div>
            <div class="flex flex-col gap-4 items-center justify-center z-10 absolute lg:relative">
              <button
                class="flex justify-center items-center rounded-full w-10 h-10"
                style={{ background: buttonColor }}
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
                style={{ background: buttonColor }}
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
      </div>
    </div>
  );
}
