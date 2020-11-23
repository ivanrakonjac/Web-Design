<h3>Multiple upload file</h3>
<form method="post" enctype="multipart/form-data" action="<?php site_url('slika/uploads')?>" >
    Photo <input type="file" name="photo[]" multiple="multiple">
    <br>
    <button type="submit" class="btn btn-primary" formaction="uploads">Upload</button>
</form>
