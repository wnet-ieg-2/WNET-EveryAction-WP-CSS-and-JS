<?php
/*
Plugin Name: WNET EveryAction WP CSS and JS 
Description: A container to maintain the custom JS and CSS for embedded EveryAction forms on WNET sites
Version: 2023.03.23
Authors: WNET Digital (plugin), MWD (JS and CSS)
*/

class WNET_EveryAction_WP_CSS_and_JS {
  private $dir;
  private $file;
  public $assets_url;
  public $token;
  public $version;

  public function __construct() {
    $this->version = '2023.04.07'; 
    /* use today's date in the line above in 'xxxx.xx.xx' format to make sure CloudFront is using this version. 
     * If including the script elsewhere, it is generally best to also include that date as a query string
    */   
    $this->assets_url = esc_url( trailingslashit( plugins_url( '/assets/', __FILE__ ) ) );
    $this->token = 'wnet_everyaction_wp';
  }

  public function enqueue_scripts() {
    // this will register and enqueue the assets in the specific template(s) that need them
    wp_register_script( $this->token . '_js' , $this->assets_url . 'js/ea-donate-form.js', array('jquery'), $this->version, true );
    wp_enqueue_script( $this->token . '_js' );
    wp_enqueue_style( $this->token . '_css', $this->assets_url . 'css/ea-donate-form-theme-styles.css', null, $this->version);
  }


}

/* EOF */
