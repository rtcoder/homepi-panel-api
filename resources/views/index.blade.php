@extends('layouts.app')

@section('head')
  <link rel="stylesheet" href="css/index.css">
@endsection

@section('content')
  <div class="apps">
    <div class="tile">
      <div class="image">
        <img src="img/admin.png" alt="" />
      </div>
      <div class="name">Admin</div>
    </div>

    <a class="tile" href="http://homepi.local:3500/">
      <div class="image">
        <img src="img/albumer.png" alt="" />
      </div>
      <div class="name">Albumer</div>
    </a>

    <a href="/printing">
      <div class="tile">
        <div class="image">
          <img src="img/print.png" alt="" />
        </div>
        <div class="name">Drukowanie</div>
      </div>
    </a>
  </div>
@endsection

