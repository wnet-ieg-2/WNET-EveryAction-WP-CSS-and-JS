<?php
/*
Plugin Name: WNET EveryAction WP CSS and JS 
Description: A container to maintain the custom JS and CSS for embedded EveryAction forms on WNET sites
Version: 0.1 initial functioning plugin
Authors: WNET Digital (plugin), MWD (JS and CSS)
*/

class WNET_EveryAction_WP_CSS_and_JS {
  private $dir;
  private $file;
  private $assets_dir;
  public $assets_url;
  public $token;
  public $version;

  public function __construct() {
    $this->version = '0.1';
    $this->dir = realpath( __DIR__ . '/..' );
		$this->assets_dir = trailingslashit( $this->dir ) . 'assets';
		$this->assets_url = trailingslashit(plugin_dir_url( __DIR__ ) ) . 'assets';
    $this->token = 'wnet_everyaction_wp';
  }

  public function enqueue_scripts() {
    // this will register and enqueue the assets in the specific template(s) that need them
    wp_register_script( $this->token . '_js' , $this->assets_url . '/js/ea-donate-form.js', array('jquery'), $this->version, true );
    wp_enqueue_script( $this->token . '_js' );
    wp_enqueue_style( $this->token . '_css', $this->assets_url . '/css/ea-donate-form-theme-styles.css', null, $this->version);
  }


}

/* EOF */
