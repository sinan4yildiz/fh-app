<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <title>FH App</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{ mix('css/app.min.css') }}" rel="stylesheet" type="text/css"/>
</head>
<body class="antialiased">
    <div id="app"></div>
    <script type="text/javascript" src="{{ mix('js/app.min.js') }}"></script>
</body>
</html>
