import { type ComponentChildren } from "preact";
export interface Props {
  label?: string;
  href?: string;
  /** @format color */
  backgroundButton?: string;
  /** @format color */
  textColorButton?: string;
  /**
  /** @format color */
  borderColor?: string;
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
      class={"bg-secondary text-white rounded-4xl text-lg px-3 py-[6px] font-light leading-5 font-Signal cursor-pointer h-8 " +
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
