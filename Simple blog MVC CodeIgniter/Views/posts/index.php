<h2><?= $title ?></h2>

<?php
 foreach($posts as $post){
    echo "<h3>{$post->title}</h3>";
    echo "<small class=post-date>{$post->created_at}</small>";
    echo "<p>{$post->body}</p>";
    $linkKaStrani=site_url();
    $linkKaStrani.="posts/{$post->slug}";

    echo "<p><a href=\"$linkKaStrani\" class=\"btn btn-primary\">Read more</a></p>";

    /*
    Kada kliknem na dugme prebacice me na http://localhost:8080/posts/post-one.php => view za prvi post
    */
 }

?>