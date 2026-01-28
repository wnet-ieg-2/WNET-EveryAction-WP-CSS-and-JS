<?php
/*
Plugin Name: WNET EveryAction WP CSS and JS 
Description: A container to maintain the custom JS and CSS for embedded EveryAction forms on WNET sites
Version: 2025.01.24 convert pledge shim to use localStorage
Authors: WNET Digital (plugin), MWD (JS and CSS)
*/

class WNET_EveryAction_WP_CSS_and_JS {
  private $dir;
  private $file;
  public $assets_url;
  public $token;
  public $version;

  public function __construct() {
    $this->version = '2026.01.28'; 
    /* use today's date in the line above in 'xxxx.xx.xx' format to make sure CloudFront is using this version. 
     * If including the script elsewhere, it is generally best to also include that date as a query string
    */   
    $this->assets_url = esc_url( trailingslashit( plugins_url( '/assets/', __FILE__ ) ) );
    $this->token = 'wnet_everyaction_wp';
  }

  public function enqueue_scripts() {
    // this will register and enqueue the assets in the specific template(s) that need them

	if ( is_singular('contribute')) {
        global $post;
		wp_register_script( $this->token . '_js' , $this->assets_url . 'js/ea-donate-form.js', array('jquery'), $this->version, true );
		wp_enqueue_script( $this->token . '_js' );
		wp_script_add_data($this->token . '_js',  'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
		wp_enqueue_style( $this->token . '_css', $this->assets_url . 'css/ea-donate-form-theme-styles.css', null, $this->version);
		wp_register_script( $this->token . '_passportinstantgrat_js', 'https://nvlupin.blob.core.windows.net/images/van/WNET/WNET/1/78997/images/2025_MWD_WNET_Contribution_Main_Theme/js/reusables/2026_MWD_WNET_Passport_Instant_Gratification.js', array('jquery'), $this->version, true );
		wp_enqueue_script( $this->token . '_passportinstantgrat_js');
		wp_script_add_data( $this->token . '_passportinstantgrat_js', 'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
		if ('premium-checkout' == $post->post_name) {
			// enqueue the pledge shim and pledge additional questions only on the pledge premium checkout form 
			wp_register_script( $this->token . '_ea_additionalfields_premiums_js', 'https://nvlupin.blob.core.windows.net/images/van/WNET/WNET/1/78997/images/2025_MWD_WNET_Contribution_Main_Theme/js/reusables/2026_WNET_Main_Theme_AQ_E-Store.js', array($this->token . '_js'), $this->version, true );
            wp_enqueue_script( $this->token . '_ea_additionalfields_premiums_js');
            wp_script_add_data( $this->token . '_ea_additionalfields_premiums_js',  'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
            wp_register_script('everyaction_pledge_shim',$this->assets_url . 'js/everyaction_pledge_shim.js', array('jquery'), $this->version, true);
			wp_enqueue_script( 'everyaction_pledge_shim');
			wp_script_add_data( 'everyaction_pledge_shim',  'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
		} else {
			// all the other everyaction donate forms get these additional questions
			wp_register_script( $this->token . '_ea_additionalfields_js', 'https://nvlupin.blob.core.windows.net/images/van/WNET/WNET/1/89836/images/2026/2026_WNET_Main_Theme_AQ_Standard.js', array($this->token . '_js'), $this->version, true );
			wp_enqueue_script( $this->token . '_ea_additionalfields_js');
			wp_script_add_data( $this->token . '_ea_additionalfields_js',  'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
		}
	}
  }


}

/* EOF */
