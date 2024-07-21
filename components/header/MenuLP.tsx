interface Link {
  label: string;
  href: string;
}

interface Props {
  menuItems?: Link[];
  cta?: string;
  /**
   * @title Call to Action URL
   * @format text
   */
  ctaUrl?: string;
}

export default function MenuLP(props: Props) {
  const { menuItems, cta, ctaUrl } = props;

  return (
    <nav class="min-h-screen gap-5 flex flex-col h-full overflow-y-auto bg-neutral w-screen py-4">
      <a
        href={ctaUrl}
        class="bg-secondary text-white rounded-4xl text-lg px-4 py-[6px] font-light leading-5 w-max mx-4"
      >
        {cta}
      </a>
      <ul class="flex text-white flex-col items-start last:border-b w-full border-[#B3B3B3] ">
        {menuItems?.map((item) => (
          <li class="py-5 px-4 border-t border-[#B3B3B3] w-full">
            <a href={item.href} class=" text-lg uppercase font-light">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
