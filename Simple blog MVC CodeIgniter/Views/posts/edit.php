<h2><?= $title ?></h2>

<?php echo form_open('posts/update/'.$post[0]->id);?>

  <small>
    in 
    <strong>
    <?php echo $post[0]->name; ?>
    <button class="brn btn-primary btn-sm mb-2 ml-1" onclick="prikaziKategorije()" type="button">Edit kategorije</button>
    </strong>

    <select name="category_id" class="form-control col-sm-2" style="display:none;" id="selectSaKategorijama">
      <?php foreach($categories as $category): ?>
          <option value="<?php echo $category->id;?>"><?php echo $category->name;?></option>
      <?php endforeach;?>
    </select>
  </small>

  <div class="form-group mt-4">
    <label for="exampleInputEmail1">Title</label>
    <input type="text" class="form-control" placeholder="Add title" name="title" value="<?php echo $post[0]->title; ?>">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Body</label>
    <textarea  class="form-control" placeholder="Add body" name="body" id="editorBody"><?php echo $post[0]->body; ?></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  
</form>

<script>
  function prikaziKategorije(){
    document.getElementById("selectSaKategorijama").style.display = "block";
  }
</script>

<!--
    echo "<small>in <strong>{$post[0]->name}</strong> x";

  <div class="form-group" id="biranjeKategorija" style="display:none;">
   <select name="category_id" class="form-control">
   <?php /*foreach($categories as $category): ?>
        <option value="<?php echo $category->id;?>"><?php echo $category->name;?></option>
      <?php endforeach;*/?>
   </select> 
  </div>
-->