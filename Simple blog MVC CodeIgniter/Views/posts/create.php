<h2><?= $title ?></h2>

<?php $validation=\Config\Services::validation();?>
<?php $errorTitle=$validation->getError('title'); $errorBody = $validation->getError('body');?>

<!-- ova linija pravi formu: <form action="http://localhost:8080/posts/create" method="post" accept-charset="utf-8"> -->
<?php echo form_open('posts/create');?>

  <div class="form-group">
    <label for="exampleInputEmail1">Title</label>
    <input type="text" class="form-control" placeholder="Add title" name="title" value="<?php if(!$validation->getError('title')) echo $_POST['title']; ?>">
    <?php echo $errorTitle ?>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Body</label>

    <textarea class="form-control"  name="body" id="editorBody" placeholder="Add body" rows="10" cols="80">
      <?php if(!$validation->getError('body')) echo $_POST['body']; ?>
    </textarea>
    <?php echo $errorBody ?>
  </div>

  <div class="form-group">
   <select name="category_id" class="form-control">
      <?php foreach($categories as $category): ?>
        <option value="<?php echo $category->id;?>"><?php echo $category->name;?></option>
      <?php endforeach;?>
   </select> 
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>