// MWD - ea-donate-form.js 041024
var nvtag_callbacks = window.nvtag_callbacks = window.nvtag_callbacks || {};
var nvtag_callbacks = nvtag_callbacks || {};
nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
nvtag_callbacks.cssPostRender = nvtag_callbacks.cssPostRender || [];
nvtag_callbacks.alterFormDefinition = nvtag_callbacks.alterFormDefinition || [];
window.nvtag_callbacks.alterRequireValid = window.nvtag_callbacks.alterRequireValid || [];
window.nvtag_callbacks.alterErrors = window.nvtag_callbacks.alterErrors || [];
window.nvtag_callbacks.postContributionAmountChanged = window.nvtag_callbacks.postContributionAmountChanged || [];
var passPortOneTimeError = false;
var upsellLB = true;
var firedOnce = false;
var applyCss;
var timeout;
var amnt;
var showModal = false;
var hideGiftAdd = true;
var freq;
var otherAmt;

var preFixAdjust = function(args){
  // Prefix Modify title or Prefix and add to datalist
  var dataList = jQuery('#at-prefixes');
  var prefixAdd = ['Mrs.', 'Miss.', 'Dr.& Mrs.', 'Dr. & Mr.'];
      dataList[0].options[1].value = "Mr.";
      dataList[0].options[2].value = "Mr. & Mrs";
      dataList[0].options[3].value = "Mr. & Mr.";
      dataList[0].options[4].value = "Mrs. & Mrs.";
      dataList[0].options[5].value = "Ms.";

      $.each(prefixAdd, function (i, item) {
      $("#at-prefixes").append($("<option>").attr('value', item).text(item));
      });

      $('input[name="Prefix"]').on('input', function() {
        var input = $(this).val().toLowerCase();
        var options = $('#at-prefixes').find('option').map(function() {
          return $(this).val().toLowerCase();
        }).get();
        if ($.inArray(input, options) === -1) {
          $(this).val('');
        }
      }); 

    return args;
}

var cssPostRender = function( args ) {
  $(document).ready(function (e) {
    // Get and apply selected checked Frequency
    var $SelectedFrequency = $('input:radio[name="SelectedFrequency"]');
    if ($SelectedFrequency.is(':checked') === false) {
      $SelectedFrequency.filter('checked').prop('checked', true);
    }

    // Additional Questios -  Move Around Form.
    $("fieldset.at-fieldset.AdditionalInformation label.at-check, fieldset.at-fieldset.AdditionalInformation label.at-text").prependTo("fieldset.at-fieldset.ContactInformation");

    $(".at-check").eq(0).css('margin', '0 10px');
    $(".at-check").eq(1).css('margin', '0 10px');
    $(".at-check").eq(2).css('margin', '0 10px');
    $(".at-check").eq(3).css('margin', '0 28px');
    $("div.at-radio").css("margin", "0");
    $("div.at-radios.clearfix").css("margin", "0");
    $(".edit-otheramount").attr('placeholder', 'Other');
    $(".at-check").eq(3).insertBefore($(".at-form-submit"))
    return args;
  });
}

// Frequency
var SelectedFrequencyBtn = function(args) {
  $("input[name=SelectedFrequency]").each(function () {
    if ($(this).is(':checked')) {
      $(this).parent().addClass( "freqChecked" )
    } else {
      $(this).parent().removeClass( "freqChecked" )
    }
    // Hide First Checbox From Additional Questions
    if ($(this)[0].value === '0' && $(this).is(':checked') ) {
      $(".at-check").eq(0).css('display', 'none');
      $(".at-check").eq(3).css('display', 'none');
    } else {
      $(".at-check").eq(0).css('display', 'block');
      $(".at-check").eq(3).css('display', 'block');
    }
    cssPostRender();
    applySelectedColor();
    displayPremium();

  });
}

  var selectedAmtBtn = function(){
    $("input[name=SelectAmount]").each(function () {
      if ($(this).is(':checked')) {
        $(this).parent().addClass( "selectAmount" ) 
        applySelectedColor();
      } else {
        $(this).parent().removeClass( "selectAmount" ) 
        applySelectedColor();
      }
    });
  }

  var applySelectedColor = function(){
    setTimeout(function() {
      $("input[name=SelectAmount]").each(function () {
        if ($(this).is(':checked')) {
        $(this).parent().css("color", "#ffffff")
        } else {
        $(this).parent().css("color", "#000000")
        }
      });
    }, 50);
  }

  // Page Builder Custom Footer CTA's links for Modals 
  var hidePageModal = function(){
    $('.w3-modal').hide();
    $('.wne-modal').hide();
    // This will reasign the passPortalModal and only show the suggestion modal one time
    passPortModal = function(){}
  }

var passPortModal = function(amnt){
  var shown = false; 
  var otherAmount = amnt;
  // console.log(otherAmount)
  if(shown === false){
    $("input[name=SelectedFrequency]").each(function () {
      if ($(this)[0].value === '0' && $(this).is(':checked') ) {
        $("input[name=SelectAmount]").each(function () {
          if ((otherAmount <= 59.00) && $(this).is(':checked') ) {
            $('#passPortAlertAmount').show();
            shown = true;
          } else {
            $('#passPortAlertAmount').hide();
          }
        });
      } 
    });
   }
}

var selectedGift = function () {
  if(hideGiftAdd === true){
    $("fieldset.ShippingInformation").hide();
  }
  setTimeout(function() {
    $("input[name=gift]").each(function () {
      if ($(this).is(':checked')) {
        $(this).parent().css("border", "2px solid #007DA3")
      } else {
        $(this).parent().css("border", "2px solid #8f8f8f")
      }
    });
  }, 5);
}

var displayPremium = function(args) {
  // var def = args.form_definition;
  // if (def.type !== 'ContributionForm') return;
  var one_time = $("label.at-radio-label-0").children().is(':checked');
  if (one_time) {
    $("fieldset.at-fieldset.Premiums").hide();
    $(".at-check").eq(0).hide();
    $('#gift-0').click(); // click to no gift
  } else {
    $("fieldset.at-fieldset.Premiums").show();
    $(".at-check").eq(0).show();
  }
}

var wnePostRender = function (args) {
  $(document).on('click','.at-radio-label-0',function(){ SelectedFrequencyBtn(); });
  $(document).on('click','.at-radio-label-4',function(){ SelectedFrequencyBtn(); });
  $(document).on('click','.label-amount',function(){ selectedAmtBtn();});  
  $(document).on('change','.label-amount',function(){ selectedAmtBtn();});
  $(document).on('click','.label-amount',function(){ selectedAmtBtn();});  
  $(document).on('change','.label-amount',function(){ selectedAmtBtn();});
  $(document).on('click','.label-otheramount',function(){ selectedAmtBtn(); });
  $(document).on('change','.label-otheramount',function(){ selectedAmtBtn(); });
  $(document).on('change','.edit-otheramount',function(){ selectedAmtBtn(); });
  $(document).on('click','.edit-otheramount',function(){ selectedAmtBtn(); });
  $(document).on('change','.edit-otheramount',function(){ selectedAmtBtn(); });
  $(document).on('focus','.edit-otheramount',function(){ selectedAmtBtn(); });
  // Premium Gift Options
  $(document).on('click','.at-gift',function(){ selectedGift(); });
  $(document).on('change','.at-gift',function(){ selectedGift(); });
  $(document).on('click','input[name="SelectAmount"]',function(){
    var target = $(this).prop("defaultValue")
    if(showModal){
      if( target === '5.00' && freq === '4'){
        $('#giftSug').show()
       }
       if(target === '10.00' && freq === '4'){
        $('#giftSug').show()
       }
    }
  });
  
  $(document).on('click','#yesplease',function(e){
   e.preventDefault();
   $('#gift-9').click()
  });

  // Modals
  $('span#footerCTA-1').click(function (e) { e.preventDefault(); $('div#cta-01').show(); });
  $('span#footerCTA-2').click(function (e) { e.preventDefault(); $('div#cta-02').show(); });
  $('.w3-button').click(function (e) { e.preventDefault(); hidePageModal(); });
  $('.wne-button').click(function (e) { e.preventDefault(); hidePageModal(); });

  SelectedFrequencyBtn();
  applySelectedColor();
  return args;
} 
// End Post Render

window.nvtag_callbacks.alterErrors.push(function (args) {
  var targetElement = $(".at-check").eq(3);
  var children = targetElement.children();
  $("input[name=SelectedFrequency]").each(function () {
   
    if ($(this)[0].value === '0' && $(this).is(':checked') ) {
      $(".at-check").eq(3).hide()
      if( !children.is(':checked') ){
        $('input[type=submit].at-submit').prop('disabled', false);
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
        $('input.at-submit.btn-at').prop('disabled', false);
        $(".at-check").eq(3).hide()

        } else{
          $(children).prop( "checked", false );
         // console.log( $(children).prop( "checked", false ) )
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
        $('input.at-submit.btn-at').prop('disabled', false);
   
      }
    } 

    if ($(this)[0].value === '4' && $(this).is(':checked') ) {
      if( !children.is(':checked') ){
        $('input[type=submit].at-submit').prop('disabled', true);
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
        $('input.at-submit.btn-at').prop('disabled', true);
        } else{
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
        $('input.at-submit.btn-at').prop('disabled', false);

      }
    } 
  });

  return args;
});

// Call passPortModal with value
window.nvtag_callbacks.alterErrors.push(function (args) {

  if(passPortOneTimeError === true){
    if (args.field_name === 'SelectAmount') {
      otherAmt = args.val
      otherNumVal = parseInt(otherAmt)
      $("input[name=SelectedFrequency]").each(function () {
        if ($(this)[0].value === '0' && $(this).is(':checked') ) {
          $("input[name=SelectAmount]").each(function () {
            if (otherNumVal <= 59.99 ) {
             passPortModal(otherNumVal)
            } else {
            }
          });
        } 
      });
    }
  }
 return args;
});


var addLegalCopy = function () {
  // Get 4th Checkbox
  const targetElement = $(".at-check").eq(3);
  // Targeting child nodes
  const childNodes = targetElement.children();
  // Targeting specific child nodes by index
  const firstChild = targetElement.children().eq(0);

  let emailCopy = `or emailing <a href='mailto:membership@wnet.org'>membership@wnet.org</a>.`
  let urlAdd = `You also acknowledge and agree to the full Terms of Service located at <a href='https://www.wnet.org/about/terms-of-service/' target='_blank'>https://www.wnet.org/about/terms-of-service/</a>`
  $(".at-check").eq(3).children()[1].innerHTML = $(".at-check").eq(3).children()[1].innerHTML + ' ' + emailCopy + ' ' + ' ' + urlAdd

}

nvtag_callbacks.postRender.push(preFixAdjust);
nvtag_callbacks.postRender.push(addLegalCopy);
nvtag_callbacks.postRender.push(wnePostRender);
nvtag_callbacks.postRender.push(cssPostRender);