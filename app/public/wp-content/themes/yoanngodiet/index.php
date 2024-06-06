<?php
    function greet ($name, $color) {
        echo "<p>My name is $name and my favourite color is $color</p>";
    }
    greet("Ingvild", "green");
    greet("Nils", "blue");

?>

<h1><?php bloginfo("name"); ?></h1>
<p><?php bloginfo("description");?></p>