export const IMAGE_LEFT = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {fonts}
    <script src="https://cdn.tailwindcss.com"></script>
    {scripts}
  </head>

  <body class="{container}">
    <div>
      {image}
    </div>

    <div class="flex flex-col justify-between">
      <div>
        {title}
        {subtitle}
      </div>

      {footer}
    </div>
  </body>
</html>`;
