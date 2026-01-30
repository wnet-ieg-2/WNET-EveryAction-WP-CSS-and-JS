/******************
******************
******************
***
*** 2026_MWD_WNET_Passport_Instant_Gratification.js
***
******************
******************
******************/
// Ensure nvtag_callbacks.preSegue exists
nvtag_callbacks.preSegue = nvtag_callbacks.preSegue || [];

// @ts-ignore
const passPortInstantGratification = function (args) {

    console.log('preSegue: passPortInstantGratification', args);

	// these lines now use server-relative urls, since they're the same on all WNET station sites
    var instant_grat_ajaxurl = '/pbsoauth/instant_gratification/';
    var activateurl = '/pbsoauth/activate/?activation_token=';
    var watchurl = '/programs/';
    var imgurl = '/wp-content/plugins/wnet-passport-instant-gratification/assets/img/';
    var pbs_referrer_qs = '';

  function createProvisionalMembership(trans_id, first_name, last_name, email, xv, station_nice_name, pbs_referrer_qs) {
    $('#mvault_status_window').html('<div class="loading"><p><img src="' + imgurl + 'loading.gif" style="width:1em;" />&nbsp;Creating ' + station_nice_name + ' Passport Account...</p></div>');
    // @ts-ignore
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
        responsetxt = '<div class="activate"><a href="' + activateurl + response.token + pbs_referrer_qs + '" target=_new><img style="display:inline;" src="' + imgurl + 'passport_icon.png">&nbsp;Your donation qualifies for Passport, our on-demand member benefit. Click here now to activate your '+ station_nice_name + ' Passport benefit!</a></div><p><i>Not ready to activate right now?  Look for an email from us with your activation code, or you can save this code for later:</i> <b>' + response.token + '</b></p>';
      } else if (response.activated == true) {
        responsetxt = '<div class="login"><a href="' + watchurl + '"><img style="display:inline;" src="' + imgurl + 'passport_icon.png">&nbsp;You have already activated your '+ station_nice_name + ' Passport access. Click here to login</a></div>';
      } else {
        if (typeof response.errors !== 'undefined') {
          if (response.errors == 'multiple accounts') {
            responsetxt = "<p>There is already an account on record with your email address that has access to " + station_nice_name + " Passport, and you should already have received an email with your login info.</p>";
          } else {
            responsetxt = '<div class="error"><img align="left" src="' + imgurl + 'passport_icon.png">&nbsp;We were unable to create your '+ station_nice_name + ' Passport account because of the following error: <br />' + response.errors + "</div>";
          }
        }
      }
      $('#mvault_status_window').html(responsetxt);
    // @ts-ignore
    }).fail(function(response) {
      $('#mvault_status_window').html('<div class="error">Could not create '+ station_nice_name + ' Passport Account!</div>');
    });
  }

  function checkForAmountThenCreateMember() {
      /* these are spans on the thankyou page */
  var trans_id = $('#transaction_id').text();
  var first_name = $('#trans_first_name').text();
  var last_name = $('#trans_last_name').text();
  var email = $('#trans_email').text();
  var xv = 'skip';
  var station_nice_name = $('#station_name').text();

    // Luminate doesn't provide a decent way to filter for amount.
    var amount = 0;
    if ( $('#trans_amount').length ) {
      // @ts-ignore
      amount = $('#trans_amount').text();
      // @ts-ignore
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
    }
    // sustainers have a frequency unit of 'months', all others dont
    if ( $('#trans_frequency_unit').length ) {
      // @ts-ignore
     var freq = $('#trans_frequency_unit').text();
      // @ts-ignore
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
      createProvisionalMembership(trans_id, first_name, last_name, email, xv, station_nice_name, pbs_referrer_qs);
    }
  }

  $(function() {
  // handling the PBS return path var
  // @ts-ignore
  if (typeof pbs_referrer === 'undefined') {
     pbs_referrer_qs = '';
  } else {
    // @ts-ignore
     pbs_referrer_qs = '/?return_path=' + pbs_referrer;
  }
    checkForAmountThenCreateMember();
  });

  return args;

};

// nvtag_callbacks.postRender
nvtag_callbacks.preSegue.push(passPortInstantGratification);
