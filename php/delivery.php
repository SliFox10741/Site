<?php
echo '
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сокровищница дракона</title>
    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="stylesheet" href="../styles/delivery.css">
    <link rel="stylesheet" href="../styles/basket.css">
</head>
<body>
    <header>
';

include "../content/menu.html"; 
include "../content/cart.html";
include "../content/delivery.html";
include "../content/footer.html";

echo '
    <script src="../scripts/cart.js"></script>
    <script src="../scripts/script.js"></script>
    <script src="../scripts/mobile_menu.js"></script>
</body>
</html>
';
?>