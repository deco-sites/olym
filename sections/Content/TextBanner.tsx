import { RichText } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @title Texto
   */
  title: RichText;
  /**
   * @titile Cor do fundo
   * @format color-input
   */
  background?: string;
  /**
   * @titile Ativar borda a baixo
   */
  showBorder?: boolean;
  /**
   * @titile Cor da borda
   * @format color-input
   */
  borderColor?: string;
}

export default function TextBanner(props: Props) {
  const { title, background, borderColor = "#bee02b", showBorder } = props;

  return (
    <div
      class={"w-full h-full p-4 bg-primary-content lg:p-5"}
      style={{
        background: background,
        borderBottom: `${showBorder ? "1px solid " + borderColor : "none"}`,
      }}
    >
      <span
        class=" font-FKOlympikus text-[75px] leading-[60px] text-secondary-content pb-4 lg:pb-5 block lg:text-[150px] lg:leading-[0.75]"
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </span>
    </div>
  );
}
