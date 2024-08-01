import { RichText } from "apps/admin/widgets.ts";
import CTAButton, {
  Props as CTAProps,
} from "deco-sites/olym/components/Button/CTAButton.tsx";

interface Props {
  /**
   * @title Titulo
   */
  title: string;
  /**
   * @title Descrição
   */
  content?: RichText;
  /**
   * @title Placeholder
   */
  plachegolder: string;
  /**
   *  @title Estilizações do CTA
   */
  cta: CTAProps;
  /**
   *  @title Cor de fundo
   * @description Cor Padrão: #b3b3b3
   * @format color-input
   */
  background?: string;
}

export default function Newsletter(props: Props) {
  const { title, content, plachegolder, cta, background } = props;

  return (
    <div
      class="flex flex-col w-full h-full bg-[#b3b3b3] px-3 py-5 pb-24 lg:pb-10 lg:pt-0 text-black gap-3 lg:gap-6"
      style={{ background: background }}
    >
      <h2
        class={" text-[56px] leading-[56px] font-FKOlympikus uppercase lg:text-8xl"}
      >
        {title}
      </h2>
      {content && (
        <span
          class={"text-lg font-Signal leading-[20px] lg:max-w-[690px] mb-9 lg:mb-1 "}
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </span>
      )}
      <form class="w-full h-full flex flex-col gap-3 lg:gap-9">
        <input
          placeholder={plachegolder}
          class=" outline-none placeholder:font-Signal lg:text-sm lg:placeholder:text-sm text-lg placeholder:text-lg placeholder:text-black text-black font-Signal border-b border-black w-full lg:max-w-[690px]"
          style={{ background: background }}
        >
        </input>

        <CTAButton {...cta} class="w-fit" />
      </form>
    </div>
  );
}
