@extends('layouts.app')

@section('head')
  <link rel="stylesheet" href="css/printing.css">
@endsection

@section('content')
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
@endsection

@section('scripts')
  <script src="js/printing.js" defer></script>
@endsection

