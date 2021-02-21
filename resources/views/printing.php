<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Drukowanie</title>
  <link href="css/latolatinfonts.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="css/printing.css">
  <script src="js/web-components/prigress-ring.js" defer></script>
  <script src="js/upload.js" defer></script>
  <script src="js/utils.js" defer></script>
</head>

<body>
  <div class="printing">
    <a class="go-back" href="/">Wróć</a>
    <form>
      <label>
        <input multiple type="file" onchange="handleChange(event)" onclick="(event) => {event.target.value = null}"
          accept=".doc, .docx, application/msword,
        application/vnd.openxmlformats-officedocument.wordprocessingml.document,
        application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*" />
        <p>Kliknij aby dodać pliki do drukowania</p>
      </label>

      <table id="files-table">
        <thead>
          <tr>
            <th>Nazwa</th>
            <th class="copies">Liczba kopii</th>
            <th class="pages">Strony</th>
            <th class="delete">Usuń</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <button type="button" onclick="handleSubmit(event)">Drukuj</button>
    </form>
  </div>

  <script src="js/printing.js" defer></script>
</body>

</html>