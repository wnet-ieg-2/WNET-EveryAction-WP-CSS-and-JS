/******************
******************
******************
***
*** 2026_MWD_WNET_Passport_Instant_Gratification.js 08/18/2026
***
******************
******************
******************/
// Ensure nvtag_callbacks.postRender exists
window.nvtag_callbacks = window.nvtag_callbacks || {};
window.nvtag_callbacks.postRender = window.nvtag_callbacks.postRender || [];

const passPortInstantGratification = function (args) {

  if (args && args.thank === true) {
 
    function createProvisionalMembership(trans_id, first_name, last_name, email, xv, station_nice_name, pbs_referrer_qs, activateurl, instant_grat_ajaxurl, imgurl, watchurl) {
    $('#mvault_status_window').html('<div class="loading"><p><img src="' + imgurl + 'loading.gif" style="width:1em;" />&nbsp;Creating ' + station_nice_name + ' Passport Account...</p></div>');
    
    var ajax = $.ajax({
      type: "POST",
      url: instant_grat_ajaxurl,
      data:{
        'trans_id': trans_id,
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'from_pbs' : pbs_referrer_qs,
        'xv' : xv
      },
      xhr: function() {
        var xhr = $.ajaxSettings.xhr();
        return xhr;
      },
      dataType: "json"
    }).done(function(response) {
      console.log(response);
      var responsetxt; 
      if (typeof response.token !== 'undefined') {
        responsetxt = '<div class="activate"><a href="' + activateurl + response.token + pbs_referrer_qs + '" target=_new><img style="display:inline;" src="' + imgurl + 'passport_icon.png" />&nbsp;<strong>Your donation qualifies for Passport, our on-demand member benefit. Click here now to activate your '+ station_nice_name + ' Passport benefit!</strong></a></div><br /><br /><p><i>Not ready to activate right now?  Look for an email from us with your activation code, or you can save this code for later:</i> <b>' + response.token + '</b></p>';
      } else if (response.activated == true) {
        responsetxt = '<div class="login"><a href="' + watchurl + '"><img style="display:inline;" src="' + imgurl + 'passport_icon.png">&nbsp;<strong>You have already activated your '+ station_nice_name + ' Passport access. Click here to login</strong></a></div>';
      } else {
        if (typeof response.errors !== 'undefined') {
          if (response.errors == 'multiple accounts') {
            responsetxt = "<p>There is already an account on record with your email address that has access to " + station_nice_name + " Passport, and you should already have received an email with your login info.</p>";
          } else {
            responsetxt = '<div class="error"><img align="left" src="' + imgurl + 'passport_icon.png">&nbsp;<strong>We were unable to create your '+ station_nice_name + ' Passport account because of the following error:</strong><br />' + response.errors + "</div>";
          }
        }
      }
      $('#mvault_status_window').html(responsetxt);
    
    }).fail(function(response) {
      $('#mvault_status_window').html('<div class="error">Could not create '+ station_nice_name + ' Passport Account!</div>');
    });
  }

  function checkForAmountThenCreateMember() {
	  var passport_host='';
    if ($('#passport_host').length) {
      passport_host = $('#passport_host').text();
    }
	// these lines now use server-relative urls, since they're the same on all WNET station sites
    var instant_grat_ajaxurl = passport_host + '/pbsoauth/instant_gratification/';
    var watchurl = passport_host + '/programs/';
    var imgurl = passport_host + '/wp-content/plugins/wnet-passport-instant-gratification/assets/img/';
    var pbs_referrer_qs = '';

    /* these are spans on the thankyou page */
    var trans_id = $('#transaction_id').text();
    var first_name = $('#trans_first_name').text();
    var last_name = $('#trans_last_name').text();
    var email = $('#trans_email').text();
    var xv = 'skip';
    var station_nice_name = $('#station_name').text();

	// optionally set the activation url, for PBS.org-initiated donations, also a span on the ty page
	var activateurl = passport_host + '/pbsoauth/activate/?activation_token=';
	if ($('#activation_url').length) {
		activateurl = $('#activation_url').text();
	}

    // Luminate doesn't provide a decent way to filter for amount.
    var amount = 0;
    if ( $('#trans_amount').length ) {
      
      amount = $('#trans_amount').text();
      
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
    }
    // sustainers have a frequency unit of 'months', all others dont
    if ( $('#trans_frequency_unit').length ) {
      
     var freq = $('#trans_frequency_unit').text();
      
      if ((freq == 'months') || (freq == 'monthly')) {
        amount = amount * 12;
      } 
    }
    console.log('calculated amount: ' + amount);
    if (amount && (amount < 60) ) {
      console.log('Amount below threshold of 60: ' + amount);
      $('#mvault_status_window').html('<p><i>Note: Due to rights restrictions, '+ station_nice_name + ' Passport is only available to Members who have given $60 or more in the past year.</i></p>');
    } else {
      // passed our tests, so it is worth trying to attemp the membership 
      createProvisionalMembership(trans_id, first_name, last_name, email, xv, station_nice_name, pbs_referrer_qs, activateurl, instant_grat_ajaxurl, imgurl, watchurl);
    }
  }

  // handling the PBS return path var
  if (typeof pbs_referrer === 'undefined') {
     pbs_referrer_qs = '';
  } else {
    
     pbs_referrer_qs = '/?return_path=' + pbs_referrer;
  }
    // Wait for the thank you page elements to appear before running
    function waitForElement(selector, callback, timeout = 10000) {
      const startTime = Date.now();
      const checkElement = () => {
        if ($(selector).length) {
          console.log('✅ Element found:', selector, '- running callback');
          callback();
        } else if (Date.now() - startTime < timeout) {
          setTimeout(checkElement, 500); // Check every 500ms
        } else {
          console.log('❌ Timeout: Element', selector, 'never appeared');
        }
      };
      checkElement();
    }
    
    waitForElement('#transaction_id', checkForAmountThenCreateMember);
  }

  return args;

};

nvtag_callbacks.postRender.push(passPortInstantGratification);