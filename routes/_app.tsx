import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "deco/hooks/useScript.ts";
import { Context } from "deco/deco.ts";

const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: ` @font-face {
            font-family: 'FKOlympikus';
            src:
                url("${
              asset("/fonts/FKOlympikus-Upright.ttf")
            }") format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
            
        @font-face {
            font-family: 'Signal';
            src:
                url("${asset("/fonts/signalweb-regular.woff")}") format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }

                @font-face {
            font-family: 'Signal';
            src:
                url("${asset("/fonts/signalweb-light.woff")}") format('woff');
            font-weight: light;
            font-style: light;
            font-display: swap;
        }
        `,
          }}
        >
        </style>

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
