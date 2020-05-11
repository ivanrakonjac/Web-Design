<?php namespace App\Models;

use CodeIgniter\Model;

class Post_model extends Model
{
        protected $table      = 'posts';
        protected $primaryKey = 'id';

        protected $returnType = 'object';

        protected $allowedFields = ['title', 'slug', 'body'];

        public function get_post($slug = FALSE){
            if($slug === FALSE){
                echo "$slug === FALSE";
            }

            return $this->where('slug',$slug)->findAll();
        }



}