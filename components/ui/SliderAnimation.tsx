import { useScript } from "deco/hooks/useScript.ts";
import type { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { type ComponentChildren } from "preact";

function Button(
  { index, children, ...props }:
    & { index: number; children?: ComponentChildren }
    & JSX.IntrinsicElements["button"],
) {
  return (
    <button
      {...props}
      data-button={index}
      class={clx("focus:outline-none group", props.class?.toString())}
    >
      {children}
    </button>
  );
}
function Dot(
  { index, children, ...props }:
    & { index: number; children?: ComponentChildren }
    & JSX.IntrinsicElements["button"],
) {
  return (
    <button
      {...props}
      data-dot={index}
      disabled={index == 0}
      aria-label={`go to slider item ${index}`}
      class={clx("focus:outline-none group", props.class?.toString())}
    >
      {children}
    </button>
  );
}

type Animation =
  | "fade-in-top"
  | "fade-in-botton"
  | "fade-in-left"
  | "fade-in-right"
  | "fade-in-botton-left"
  | "fade-in-botton-right"
  | "fade-in-top-left"
  | "fade-in-top-right";

const ANIMATIONS = {
  "fade-in-top": "animate-fade-t",
  "fade-in-botton": "animate-fade-b",
  "fade-in-left": "animate-fade-l",
  "fade-in-right": "animate-fade-r",
  "fade-in-botton-left": "animate-fade-bl",
  "fade-in-botton-right": "animate-fade-br",
  "fade-in-top-left": "animate-fade-tl",
  "fade-in-top-right": "animate-fade-tr",
};

export interface Props {
  rootId: string;
  scroll?: "smooth" | "auto";
  interval?: number;
  nMax: number;
  animations?: {
    animation?: Animation;
  }[];
}

function AnimationSlider(
  { rootId, interval, nMax }: Props,
) {
  const root = document.getElementById(rootId);
  const slider = root?.querySelectorAll<HTMLElement>("[data-container]");
  const animations = root?.querySelectorAll<HTMLElement>("[data-animation]");
  const prev = root?.querySelector<HTMLElement>('[data-slide="prev"]');
  const next = root?.querySelector<HTMLElement>('[data-slide="next"]');
  const dots = root?.querySelectorAll<HTMLElement>("[data-dot]");

  function Index() {
    const dataIndex = root?.getAttribute("data-index") || "0";
    const index = parseInt(dataIndex);

    return index;
  }

  function event(newIndex: number) {
    slider?.forEach((e) => {
      const dataSlide = e.getAttribute("data-container") || "0";
      // const dataAnimation = e.getAttribute('data-animation')
      if (e.className.includes("opacity-1")) {
        e.classList.add("opacity-0");
      }
      if (parseInt(dataSlide) == newIndex) {
        e.setAttribute("disabled", "");
        e.classList.add("opacity-1");
        e.classList.remove("opacity-0");
      } else {
        e.removeAttribute("disabled");
        e.classList.add("opacity-0");
        e.classList.remove("opacity-1");
      }
    });

    animations?.forEach((e) => {
      const dataAniamtion = e.getAttribute("data-animation") || "0";
      // const dataAnimation = e.getAttribute('data-animation')

      if (parseInt(dataAniamtion) == newIndex) {
        e.removeAttribute("data-disabled");
      } else {
        e.setAttribute("data-disabled", "");
      }
    });
    dots?.forEach((e) => {
      const dataAniamtion = e.getAttribute("data-dot") || "0";
      // const dataAnimation = e.getAttribute('data-animation')

      if (parseInt(dataAniamtion) == newIndex) {
        e.setAttribute("disabled", "");
      } else {
        e.removeAttribute("disabled");
      }
    });

    root?.setAttribute("data-index", newIndex.toString());
  }

  function onClickNext() {
    const index = Index();
    const newIndex = (index + 1) % (nMax + 1);

    event(newIndex);
  }

  function onClickPrev() {
    const index = Index();
    const newIndex = (index - 1 + nMax + 1) % (nMax + 1);

    event(newIndex);
  }

  if (interval) {
    setInterval(onClickNext, interval);
  }

  root?.addEventListener("touchmove", (event) => {
    // Previne o comportamento padrão para evitar rolagem, etc.
    event.preventDefault();

    const widht = root.clientWidth;
    const partial = widht / 2;

    // Pega a posição do primeiro toque
    const touch = event.touches[0];
    const touchX = touch.clientX;
    if (touchX < partial) {
      onClickPrev();
    } else {
      onClickNext();
    }

    // Exibe a posição
  });

  next?.addEventListener("click", onClickNext);
  prev?.addEventListener("click", onClickPrev);
}

const animationByType = {
  "animate-fade-r": `    
        @keyframes animate-fade-r {
            from {
                opacity: 0;
                transform: translate3d(0px, 0px, 0px);
            }
            to {
                opacity: 1;
                transform: translate3d(100px, 0px, 0px);
            }
        }   
        .animate-fade-r[data-disabled] {
            animation: animate-fade-r 0.3s ease-out;
            transition:0.2s cubic-bezier(.23,1,.32,1) 4s;
        }
    `,
  "animate-fade-l": `    
        @keyframes animate-fade-l {
            from {
                opacity: 0;
                transform: translate3d(0px, 0px, 0px);
            }
            to {
                opacity: 1;
                transform: translate3d(-100px, 0px, 0px);
            }
        }   
        .animate-fade-l[data-disabled] {
            animation: animate-fade-l 0.3s ease-out;
            transition:0.2s cubic-bezier(.23,1,.32,1) 4s;
        }
    `,
  "animate-fade-t": `    
        @keyframes animate-fade-t {
            from {
                opacity: 0;
                transform: translate3d(0px, 0px, 0px);
            }
            to {
                opacity: 1;
                transform: translate3d(0px, -100px, 0px);
            }
        }   
        .animate-fade-t[data-disabled] {
            animation: animate-fade-t 0.3s ease-out;
            transition:0.2s cubic-bezier(.23,1,.32,1) 4s;
        }
    `,
  "animate-fade-b": `    
        @keyframes animate-fade-b {
            from {
                opacity: 0;
                transform: translate3d(0px, 0px, 0px);
            }
            to {
                opacity: 1;
                transform: translate3d(0px, 100px, 0px);
            }
        }   
        .animate-fade-b[data-disabled] {
            animation: animate-fade-b 0.3s ease-out;
            transition:0.2s cubic-bezier(.23,1,.32,1) 4s;
        }
    `,
  "animate-fade-tr": `
        @keyframes animation-fade-tr {
            from {
                opacity: 1;
                transform: translate3d(0px, 0px, 0px);
    
            }
            to {
                opacity: 0;
                transform: translate3d(100px, -100px, 0px);
            }
        }
        
        .animate-fade-tr[data-disabled] {
            animation: animation-fade-tr 0.3s ease-out;
            transition:0.2s cubic-bezier(.23,1,.32,1) 4s;
        }
    `,
  "animate-fade-tl": `
        @keyframes animation-fade-tl {
            from {
                opacity: 1;
                transform: translate3d(0px, 0px, 0px);
    
            }
            to {
                opacity: 0;
                transform: translate3d(-100px, -100px, 0px);
            }
        }
        
        .animate-fade-tl[data-disabled] {
            animation: animation-fade-tl 0.3s ease-out;
            transition:0.2s cubic-bezier(.23,1,.32,1) 4s;
        }
    `,
  "animate-fade-br": `
        @keyframes animation-fade-br {
            from {
                opacity: 1;
                transform: translate3d(0px, 0px, 0px);
    
            }
            to {
                opacity: 0;
                transform: translate3d(100px, 100px, 0px);
            }
        }
        
        .animate-fade-br[data-disabled] {
            animation: animation-fade-br 0.3s ease-out;
            transition:0.2s cubic-bezier(.23,1,.32,1) 4s;
        }
    `,
  "animate-fade-bl": `
        @keyframes animation-fade-bl {
            from {
                opacity: 1;
                transform: translate3d(0px, 0px, 0px);
    
            }
            to {
                opacity: 0;
                transform: translate3d(-100px, 100px, 0px);
            }
        }
        
        .animate-fade-bl[data-disabled] {
            animation: animation-fade-bl 0.3s ease-out;
            transition:0.2s cubic-bezier(.23,1,.32,1) 4s;
        }
    `,
};

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["button"] & { index: number }) {
  return <button disabled={index == 0} data-container={index} {...props} />;
}

function ItemAnimation(
  { index, ...props }: JSX.IntrinsicElements["li"] & { index: number },
) {
  return (
    <>
      <li data-animation={index} {...props} />
    </>
  );
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <button
      disabled
      data-slide="next"
      aria-label="Next item"
      {...props}
    />
  );
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <button disabled data-slide="prev" aria-label="Previous item" {...props} />
  );
}

function JS(
  { rootId, scroll = "smooth", interval, nMax = 1, animations }: Props,
) {
  return (
    <>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(AnimationSlider, {
            rootId,
            scroll,
            interval,
            nMax,
            animations,
          }),
        }}
      />
      {animations?.map((item) => {
        const type = ANIMATIONS[item.animation || "fade-in-right"];
        return (
          <style
            dangerouslySetInnerHTML={{
              __html: animationByType[type as keyof typeof animationByType],
            }}
          />
        );
      })}
    </>
  );
}

Slider.Dot = Dot;
Slider.Item = Item;
Slider.Animation = ItemAnimation;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;
Slider.Button = Button;
Slider.JS = JS;

export default Slider;
