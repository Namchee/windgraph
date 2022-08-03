export const HERO_TEMPLATE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{ preconnect }}
    {{ fonts }}
    <script src="https://cdn.tailwindcss.com"></script>
    {{ scripts }}
  </head>

  <body>
    <div class="{{ container }}">
      <div class="row-start-2 flex flex-col items-center">
        {{ image }}
        {{ title }}
        {{ subtitle }}
      </div>

      <div class="self-end row-start-3">
        {{ footer }}
      </div>
    </div>
  </body>
</html>`;
