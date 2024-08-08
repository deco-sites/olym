import { useScript } from "deco/hooks/useScript.ts";
import { MINICART_DRAWER_ID } from "../../constants.ts";
import { useId } from "../../sdk/useId.ts";

const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;

    if (!counter) {
      return;
    }

    // Set minicart items count on header
    if (count === 0) {
      counter.classList.add("hidden");
    } else {
      counter.classList.remove("hidden");
    }

    counter.innerText = count > 9 ? "9+" : count.toString();
  });

function Bag() {
  const id = useId();

  return (
    <>
      <label
        class="indicator relative"
        for={MINICART_DRAWER_ID}
        aria-label="open cart"
      >
        <span
          id={id}
          class="hidden indicator-item badge bg-transparent badge-sm font-thin cursor-pointer text-white absolute top-[19px] left-[-14px]"
        />

        <span class="w-auto flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="20"
            viewBox="0 0 22 25"
            fill="none"
          >
            <path
              d="M0.59375 20.7109C0.59375 23.1367 1.82422 24.3438 4.27344 24.3438H18.0664C20.1641 24.3438 21.3945 23.125 21.3945 20.7109V8.58203C21.3945 6.16797 20.1523 4.94922 17.7148 4.94922H15.8398C15.7812 2.48828 13.6367 0.390625 10.9883 0.390625C8.33984 0.390625 6.20703 2.48828 6.13672 4.94922H4.27344C1.82422 4.94922 0.59375 6.15625 0.59375 8.58203V20.7109ZM8.02344 4.94922C8.08203 3.42578 9.33594 2.17188 10.9883 2.17188C12.6406 2.17188 13.9062 3.42578 13.9531 4.94922H8.02344ZM2.48047 20.6172V8.67578C2.48047 7.45703 3.125 6.83594 4.29688 6.83594H17.6797C18.8398 6.83594 19.5078 7.45703 19.5078 8.67578V20.6172C19.5078 21.8359 18.8398 22.457 18.0312 22.457H4.29688C3.125 22.457 2.48047 21.8359 2.48047 20.6172Z"
              fill="white"
            />
          </svg>
        </span>
      </label>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}

export default Bag;
