import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const id = useId();
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-start items-center gap-2 text-primary">
        <div class="flex flex-row gap-2">
          <label class="text-xs text-black font-normal" for={id}>
            Parabéns, Você ganhou <strong>frete grátis!</strong>
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="12"
            viewBox="0 0 15 12"
          >
            <path
              fill="#000"
              d="M1.5-.75A1.5 1.5 0 010-2.25V-9a1.5 1.5 0 011.5-1.5h6.75A1.5 1.5 0 019.75-9v.75h1.53a1.119 1.119 0 01.853.394L13.978-5.7a1.121 1.121 0 01.272.731V-1.5h.375a.376.376 0 01.375.375.376.376 0 01-.375.375H13.5a2.251 2.251 0 01-2.25 2.25A2.237 2.237 0 019-.75H5.979a2.237 2.237 0 01-2.25 2.25 2.251 2.251 0 01-2.25-2.25zM.75-9v6.75a.75.75 0 00.75.75h.128A2.251 2.251 0 013.75-3a2.248 2.248 0 012.121 1.5H9V-9a.75.75 0 00-.75-.75H1.5A.75.75 0 00.75-9zm12.63 3.75l-1.816-2.119a.4.4 0 00-.284-.131H9.75v2.25zm-3.63.75v2.072A2.2 2.2 0 0111.25-3a2.248 2.248 0 012.121 1.5h.129v-3zm-6 2.25a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5zm7.5 3a1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5 1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5z"
              transform="translate(0 10.5)"
            >
            </path>
          </svg>
        </div>
      </div>
      <progress
        id={id}
        class="progress progress-secondary w-full"
        value={100}
        max={100}
      />
      <span class="text-[10px] text-[#5d5d5d]">
        *O desconto será aplicado automaticamente
      </span>
    </div>
  );
}

export default FreeShippingProgressBar;
