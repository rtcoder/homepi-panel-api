<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <title>Home Pi panel</title>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="css/latolatinfonts.css" rel="stylesheet" type="text/css">

    <script src="js/web-components/prigress-ring.js" defer></script>
    <script src="js/upload.js" defer></script>
    <script src="js/utils.js" defer></script>

    @yield('head')
  </head>
  <body>
    @yield('content')
    
    @yield('scripts')
  </body>
</html>
