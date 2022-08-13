export const IMAGE_RIGHT = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {fonts}
    <script src="https://cdn.tailwindcss.com"></script>
    {scripts}
  </head>

  <body class="grid grid-cols-2 gap-8 {container}">
    <div class="flex flex-col justify-between">
      <div>
        {subtitle}
        {title}
      </div>

      {footer}
    </div>

    <div>
      {image}
    </div>
  </body>
</html>`;
