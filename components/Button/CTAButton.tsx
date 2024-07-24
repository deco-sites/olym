import { type ComponentChildren } from "preact";
export interface Props {
  label?: string;
  href?: string;
  /** @format color */
  backgroundButton?: string;
  /** @format color */
  textColorButton?: string;
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
    class: _class,
    children,
  } = props;

  return (
    <a
      href={href}
      class={"bg-secondary text-white rounded-4xl text-lg px-3 py-[6px] font-light leading-5 font-Signal " +
        _class}
      style={{ background: backgroundButton, color: textColorButton }}
    >
      {children}
      {label}
    </a>
  );
}
