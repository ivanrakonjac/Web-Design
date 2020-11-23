<h3>Single upload file</h3>
<form method="post" enctype="multipart/form-data" action="<?php site_url('slika/upload')?>" >
    Photo <input type="file" name="photo">
    <br>
    <button type="submit" class="btn btn-primary" formaction="upload">Upload</button>
</form>
