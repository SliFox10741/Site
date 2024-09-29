<?php

echo '<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сокровищница дракона - Каталог</title>
    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="stylesheet" href="../styles/catalog.css">
    <link rel="stylesheet" href="../styles/basket.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.1/underscore-min.js"></script>
</head>

<body>
    <header>
    ';
    include "../content/menu.html"; 
    include "../content/cart.html";
    include "../content/catalog.html";
    include "../content/footer.html";

echo '
    <script src="../scripts/catalog.js"></script>
    <script src="../scripts/script.js"></script>
    <script src="../scripts/cart.js"></script>
    <script src="../scripts/mobile_menu.js"></script>
</body>
</html>';