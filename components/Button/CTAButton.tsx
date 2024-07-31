import { type ComponentChildren } from "preact";
export interface Props {
  /**
   * @title Label
   */
  label?: string;
  /**
   * @title Link
   */
  href?: string;
  /**
   * @format color-input
   * @title Cor de CTA
   * @default #7bd301
   */
  backgroundButton?: string;
  /**
   * @format color-input
   * @title Cor do texto
   * @default #ffff
   */
  textColorButton?: string;
  /**
   *  @format color
   * @title Cor da borda
   */
  borderColor?: string;
  /**
   * @title Ativar borda
   */
  showBorder?: boolean;
  /**
   * @hide true
   */
  class?: string;
  /**
   * @hide true
   */
  children?: ComponentChildren;
}

export default function CTAButton(props: Props) {
  const {
    label,
    href,
    textColorButton,
    backgroundButton,
    borderColor,
    class: _class,
    children,
    showBorder,
  } = props;

  return (
    <a
      href={href}
      class={"bg-secondary text-white rounded-4xl text-lg px-3 py-[6px] font-light leading-5 font-Signal cursor-pointer h-8 flex justify-center items-center " +
        _class}
      style={{
        background: backgroundButton,
        color: textColorButton,
        border: showBorder ? `1px solid ${borderColor}` : null,
      }}
    >
      {children}
      {label}
    </a>
  );
}
