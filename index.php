<?php 
echo '
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сокровищница дракона</title>
    <link rel="stylesheet" href="/styles/fonts.css">
    <link rel="stylesheet" href="/styles/styles.css">
    <link rel="stylesheet" href="/styles/basket.css">
    <link rel="stylesheet" href="/styles/review.css">
    </head>
<body>
<header>
';

include "content/menu.html"; 
include "content/cart.html";
include "content/index.html";
include "content/footer.html";

echo '
<script src="/scripts/review.js"></script>
    <script src="/scripts/cart.js"></script>
    <script src="/scripts/script.js"></script>
    <script src="/scripts/mobile_menu.js"></script>
</body>
</html>';
?>
