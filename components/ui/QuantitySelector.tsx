import { useScript } from "deco/hooks/useScript.ts";
import { type JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

const onClick = (delta: number) => {
  // doidera!
  event!.stopPropagation();
  const button = event!.currentTarget as HTMLButtonElement;
  const input = button.parentElement
    ?.querySelector<HTMLInputElement>('input[type="number"]')!;
  const min = Number(input.min) || -Infinity;
  const max = Number(input.max) || Infinity;
  input.value = `${Math.min(Math.max(input.valueAsNumber + delta, min), max)}`;
  input.dispatchEvent(new Event("change", { bubbles: true }));
};

function QuantitySelector(
  { id = useId(), disabled, ...props }: JSX.IntrinsicElements["input"],
) {
  return (
    <div class="join w-full flex h-8 items-center">
      <button
        type="button"
        class="btn btn-square btn-ghost no-animation h-8 w-7"
        hx-on:click={useScript(onClick, -1)}
        disabled={disabled}
      >
        -
      </button>
      <div
        data-tip={`Quantity must be between ${props.min} and ${props.max}`}
        class={clx(
          "flex-grow join-item",
          "flex justify-center items-center",
          "has-[:invalid]:tooltip has-[:invalid]:tooltip-error has-[:invalid]:tooltip-open has-[:invalid]:tooltip-bottom h-8",
        )}
      >
        <input
          id={id}
          class={clx(
            "input text-center flex-grow [appearance:textfield]",
            "invalid:input-error bg-black text-white px-0 rounded-md h-8 w-8",
          )}
          disabled={disabled}
          inputMode="numeric"
          type="number"
          {...props}
        />
      </div>
      <button
        type="button"
        class="btn btn-square btn-ghost no-animation h-8 w-7"
        hx-on:click={useScript(onClick, 1)}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
