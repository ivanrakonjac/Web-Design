<h2><?= $title ?></h2>

<?php
    //post[0] jer mi sam post nije objekat
    echo "<small class=post-date>{$post[0]->created_at}</small>";
    echo "<p>{$post[0]->body}</p>";
?>