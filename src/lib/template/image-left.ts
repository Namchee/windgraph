export const IMAGE_LEFT = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {fonts}
    <script src="https://cdn.tailwindcss.com"></script>
    {scripts}
  </head>

  <body class="grid grid-cols-2 {container}">
    <div class="overflow-hidden mr-auto">
      {image}
    </div>

    <div class="flex flex-col justify-between">
      <div>
        {subtitle}
        {title}
      </div>

      {footer}
    </div>
  </body>
</html>`;
