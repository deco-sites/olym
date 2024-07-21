import { type ComponentChildren } from "preact";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "deco/hooks/useScript.ts";

type Animations =
  | "fade-in"
  | "fade-in-bottom"
  | "slide-left"
  | "slide-right"
  | "zoom-in";

export interface Props {
  animationType?: Animations;
  duration?: string;
  children?: ComponentChildren;
  /**
   * hidde true
   */
  class?: string;
}

const scale = (id: string) => {
  globalThis.window.addEventListener("scroll", () => {
    const element = document.getElementById(id);
    if (element) {
      const elementTop = window.pageYOffset +
        element.getBoundingClientRect().top;
      const scrollTop = document.documentElement.scrollTop;
      let scaleValue = 1;

      const topValue = 0.1 * scrollTop * 1.5 + "px";

      if (scrollTop > elementTop) {
        scaleValue = 1 + 0.001 * scrollTop * 1.2;
      }

      if (scaleValue >= 0) {
        const finalScale = Math.min(scaleValue, 1.45);
        element.style.transform = `scale(${finalScale})`;
        element.style.top = parseFloat(topValue) > 60 ? "60px" : topValue;
        element.style.width = "auto";
      }
    }
  });
};

const snippet = (id: string, animationClass?: Animations) => {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(`animate-${animationClass}`);
        entry.target.classList.remove(`opacity-0`);
      }
    });
  }, { threshold: 0.50 });

  const element = document.getElementById(id);
  element && observer.observe(element);
};

const animationByType = {
  "fade-in": `    
          @keyframes fade-in {
              from {
                  opacity: 0;
              }
              to {
                  opacity: 1;
              }
          }   
          .animate-fade-in {
              animation: fade-in 1s ease-out;
          }
      `,
  "fade-in-bottom": `
          @keyframes fade-in-bottom {
              from {
                  opacity: 0;
                  transform: translateY(100%);
      
      top: 0;
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          
          .animate-fade-in-bottom {
              animation: fade-in-bottom 1s ease-out;
          }
      `,
  "slide-left": `
          @keyframes slide-left {
              from {
                  transform: translateX(100vw);
              }
              to {
                  transform: translateX(0);
              }
          }
  
          .animate-slide-left {
              animation: slide-left 1s ease-out;
          }
      `,
  "slide-right": `
          @keyframes slide-right {
              from {
                  transform: translateX(-100vw);
              }
              to {
                  transform: translateX(0);
              }
          }
  
          .animate-slide-right {
              animation: slide-right 1s ease-out;
          }
      `,
  "zoom-in": `
          @keyframes zoom-in {
              from {
                  transform: scale(0);
                  opacity: 0;
              }
              to {
                  transform: scale(1);
                  opacity: 1;
              }
          }
  
          .animate-zoom-in {
              animation: zoom-in 1s ease-out;
          }
      `,
};

function AnimationItem(props: Props) {
  const { children, animationType = "fade-in", class: _class } = props;
  const id = useId();

  return (
    <div
      id={id}
      class={"opacity-0 " + _class}
      style={"transition: 2s cubic-bezier(.23,1,.32,1) 0s;"}
    >
      <style
        dangerouslySetInnerHTML={{ __html: animationByType[animationType] }}
      >
      </style>
      {children}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(snippet, id, animationType),
        }}
      />
    </div>
  );
}

Animation.AnimationItem = AnimationItem;

export default function Animation(props: Props) {
  const { children } = props;

  const id = useId();

  return (
    <div
      class="w-full h-full relative mx-auto"
      style={"transition: 2s cubic-bezier(.23,1,.32,1) 0s;"}
      id={id}
    >
      {children}

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(scale, id),
        }}
      />
    </div>
  );
}
