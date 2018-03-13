<?php

// router for security (it block .env)

if (preg_match('/\.(?:png|jpg|jpeg|gif|html|php|js|css)$/', $_SERVER["REQUEST_URI"])) {
    return false;    // serve the requested resource as-is.
} elseif($_SERVER["REQUEST_URI"] === "/") {
    echo file_get_contents("index.html");
} else {
    echo file_get_contents("404.html");
}