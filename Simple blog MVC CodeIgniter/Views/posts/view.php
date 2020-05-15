<!-- view koji sluzi za prikazivanje 1 posta-->

<h2><?= $title ?></h2>

<?php
    //post[0] jer mi sam post nije objekat
    echo "<small class=post-date>{$post[0]->created_at}</small>";
    echo "<small>in <strong>{$post[0]->name}</strong>";
    echo "<p>{$post[0]->body}</p>";
?>

<hr>

<?php echo form_open('/posts/delete/'.$post[0]->id);?>
    <input type="submit" class="btn btn-danger" value="delete">
</form>

<a class="btn btn-warning" href="<?php echo base_url(); ?>/posts/edit/<?php echo $post[0]->id ?>">Edit</a>

