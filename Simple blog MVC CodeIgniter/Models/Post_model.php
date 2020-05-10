<?php namespace App\Models;

use CodeIgniter\Model;

class Post_model extends Model
{
        protected $table      = 'posts';
        protected $primaryKey = 'id';

        protected $returnType = 'object';

        public function get_post($slug = FALSE){
            if($slug === FALSE){
                //$query = $this->db->get('posts');
                //return $query->result_array();
            }

            return $this->where('slug',$slug)->findAll();
        }

}