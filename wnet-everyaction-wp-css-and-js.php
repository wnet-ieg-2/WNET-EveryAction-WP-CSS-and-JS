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
    $this->version = '2026.02.03'; 
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

		$enqueue_new_scripts = false;
		if (function_exists('get_field') && !empty(get_field('ea_donate_form_enqueue_scripts', get_the_ID()))) {
			$enqueue_new_scripts = get_field('ea_donate_form_enqueue_scripts', get_the_ID());
		}

		wp_register_script( $this->token . '_js' , $this->assets_url . 'js/ea-donate-form.js', array('jquery'), $this->version, true );
		wp_enqueue_script( $this->token . '_js' );
		wp_script_add_data($this->token . '_js',  'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
		wp_enqueue_style( $this->token . '_css', $this->assets_url . 'css/ea-donate-form-theme-styles.css', null, $this->version);
		if (!empty($enqueue_new_scripts)) {
			// only for EA donate forms that are embedded and have support scripts moved out of EA "reusables" and into the EA "theme"
			wp_register_script( $this->token . '_passportinstantgrat_js', $this->assets_url . 'js/passport_instant_gratification.js', array('jquery'), $this->version, true );
			wp_enqueue_script( $this->token . '_passportinstantgrat_js');
			wp_script_add_data( $this->token . '_passportinstantgrat_js', 'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
		}
		if ('premium-checkout' == $post->post_name) {
			// enqueue the pledge shim and pledge additional questions only on the pledge premium checkout form 
			wp_register_script('everyaction_pledge_shim',$this->assets_url . 'js/everyaction_pledge_shim.js', array('jquery'), $this->version, true);
			wp_enqueue_script( 'everyaction_pledge_shim');
			wp_script_add_data( 'everyaction_pledge_shim',  'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
			if (!empty($enqueue_new_scripts)) {
				// only for EA donate forms that are embedded and have support scripts moved out of EA "reusables" and into the EA "theme"
				wp_register_script( $this->token . '_ea_additionalfields_premiums_js', $this->assets_url . 'js/additional_questions_estore.js', array($this->token . '_js'), $this->version, true );
            	wp_enqueue_script( $this->token . '_ea_additionalfields_premiums_js');
            	wp_script_add_data( $this->token . '_ea_additionalfields_premiums_js',  'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
			}
		} else {
			// all non-pledge premium donate forms get these things instead
			if (!empty($enqueue_new_scripts)) {
				// only for EA donate forms that are embedded and have support scripts moved out of EA "reusables" and into the EA "theme"
				wp_register_script( $this->token . '_ea_additionalfields_js', $this->assets_url . 'js/additional_questions_standard.js', array($this->token . '_js'), $this->version, true );
				wp_enqueue_script( $this->token . '_ea_additionalfields_js');
				wp_script_add_data( $this->token . '_ea_additionalfields_js',  'data-script-justification', 'Support file required for WNET-EveryAction-WP-CSS-and-JS plugin.');
			}
		}
	}
  }


}

/* EOF */
