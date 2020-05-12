<h2><?= $title ?></h2>
<?php echo form_open('posts/update/'.$post->id);?>

  <div class="form-group">
    <label for="exampleInputEmail1">Title</label>
    <input type="text" class="form-control" placeholder="Add title" name="title" value="<?php echo $post->title; ?>">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Body</label>
    <textarea  class="form-control" placeholder="Add body" name="body" id="editorBody"><?php echo $post->body; ?></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>