// @ts-nocheck
/******************
******************
******************
***
*** additional_questions_standard
***
******************
******************
******************/
window.nvtag_callbacks = window.nvtag_callbacks || {};
var nvtag_callbacks = window.nvtag_callbacks;
nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
nvtag_callbacks.alterFormDefinition= nvtag_callbacks.alterFormDefinition|| [];
nvtag_callbacks.alterErrors = nvtag_callbacks.alterErrors || [];
nvtag_callbacks.alterRequireValid = nvtag_callbacks.alterRequireValid || [];
nvtag_callbacks.preSegue = nvtag_callbacks.preSegue || [];

  // Move I'm a current sustaining member and I'm updating my information
  // @ts-ignore
  const moveSustainerMemberField = function (args) {
      if (args && args.thank === false) { // Check if we're not on the thank you page
    // @ts-ignore
    $(document).ready(function () {
      // @ts-ignore
      if (!window.additionalQuestion || !window.additionalQuestion[0]) {
        return; // Exit if additionalQuestion is empty
      }
      // @ts-ignore
      let sustainerMember = $('.at-row.at-row-full.' + window.additionalQuestion[0].name);
      // @ts-ignore
      let firstName = $('.at-row.FirstName.LastName').closest('.at-row');
  
      if (sustainerMember.length && firstName.length) {
        sustainerMember.insertBefore(firstName);
      }
  
      // Function to handle frequency changes
      function handleFrequencyChange() {
        // @ts-ignore
        let frequency = $('input[name="SelectedFrequency"]');
        frequency.each(function () {
          // @ts-ignore
          if ($(this).is(':checked')) {
            // @ts-ignore
            let frequencyValue = $(this).val();
            if (frequencyValue === '4') {
              sustainerMember.show();
              sustainerMember.find('input').prop('checked', false);
            } else if (frequencyValue === '0') {
              sustainerMember.hide();
              sustainerMember.find('input').prop('checked', false);
            }
          }
        });
      }
  
      // Initial check
      handleFrequencyChange();
      // Bind change event
      // @ts-ignore
      $('input[name="SelectedFrequency"]').on('change', handleFrequencyChange);
    }); // End of document ready
  } // Not on the thank you page

    return args;
  };

  // Move Yes, I would like to receive emails from WNET/ALL ARTS
  const moveRecieveEmailsField = function (args) {
    // @ts-ignore
    $(document).ready(function () {
      // @ts-ignore
      if (!window.additionalQuestion || !window.additionalQuestion[1]) {
        return; // Exit if additionalQuestion doesn't have index 1
      }
      // @ts-ignore
      let receiveEmails = $('.at-row.at-row-full.' + window.additionalQuestion[1].name);
      // @ts-ignore
      let targetField = $('#NVContributionForm' + window.formID + '-ContactInformation .at-fields');
  
      if (receiveEmails.length && targetField.length) {
        receiveEmails.insertAfter(targetField);
      }
    }); // End of document ready
  
    return args;
  };

  // Move Yes, I would like to receive texts from WNET/ALL ARTS
  const moveReceiveTextsField = function (args) {
    // @ts-ignore
    $(document).ready(function () {
      // @ts-ignore
      if (!window.additionalQuestion || !window.additionalQuestion[2]) {
        return; // Exit if additionalQuestion doesn't have index 2
      }
      // @ts-ignore
      let receiveTexts = $('.at-row.at-row-full.' + window.additionalQuestion[2].name);
      // @ts-ignore
      let targetField = $('#NVContributionForm' + window.formID + '-ContactInformation .at-fields');
  
      if (receiveTexts.length && targetField.length) {
        receiveTexts.insertAfter(targetField);
      }
  
    }); // End of document ready
  
    return args;
  };

  // Yes, I would like to be connected to my local PBS station
  const moveBeConnectedField = function (args) {
    // @ts-ignore
    $(document).ready(function () {
      // @ts-ignore
      if (!window.additionalQuestion || !window.additionalQuestion[3]) {
        return; // Exit if additionalQuestion doesn't have index 3
      }
      // @ts-ignore
      let beConnected = $('.at-row.at-row-full.' + window.additionalQuestion[3].name);
      // @ts-ignore
      let targetField = $('#NVContributionForm' + window.formID + '-ContactInformation .at-fields');
  
      if (beConnected.length && targetField.length) {
        beConnected.insertAfter(targetField);
      }
    }); // End of document ready
  
    return args;
  };


    // Update the text for the auto renewal subscription
  const updateAutoRenewalSubscriptionLabel = function (args) {
      // @ts-ignore
      if (!window.additionalQuestion || !window.additionalQuestion[4]) {
        return; // Exit if additionalQuestion doesn't have index 4
      }
    // @ts-ignore
    $(document).ready(function () {
      // @ts-ignore     
      let emailCopy = `<a href='mailto:membership@wnet.org'>membership@wnet.org</a> or by calling 212-560-2888.`;
      let urlAdd = `You also acknowledge and agree to the full Terms of Service located at <a href='https://www.wnet.org/about/terms-of-service/' target='_blank'>https://www.wnet.org/about/terms-of-service/</a>`;
      // @ts-ignore
      let mainCopy = $('#' + 'NVContributionForm' + window.formID + '-AdditionalInformation-' + window.additionalQuestion[4].name + '-label').html();
      // @ts-ignore
      let label = $('#' + 'NVContributionForm' + window.formID + '-AdditionalInformation-' + window.additionalQuestion[4].name + '-label');
      // Update the HTML content of the label element
      label.html(mainCopy + ' ' + emailCopy + ' ' + urlAdd);
    }); // End of document ready
  
    return args;
  };


    const onLoadAutoRenewalSubscriptionLabel = function (args) {
    function onLoadCheck() {
      // @ts-ignore
      if (!window.additionalQuestion || !window.additionalQuestion[4]) {
        return; // Exit if additionalQuestion doesn't have index 4
      }
      // @ts-ignore
      let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
      // @ts-ignore
      let label = $('.' + window.additionalQuestion[4].name);
      // @ts-ignore
      $("input[name=SelectedFrequency]").each(function () {
        // Monthly
        // @ts-ignore
        if ($(this)[0].value === '4' && $(this).is(':checked')) {
          if (autoCheckBox.is(':checked') === true) {
            // console.log(`On Load: Monthly`);
          }
        }
  
        // One-Time
        // @ts-ignore
        if ($(this)[0].value === '0' && $(this).is(':checked')) {
          if (autoCheckBox.is(':checked') === true) {
            label.hide();
            autoCheckBox.prop('checked', false); // Uncheck the checkbox
            // console.log(`On Load: One-Time`);
          }
        }
      });
    }
    onLoadCheck();
    return args;
  };

  const statusAutoRenewalSubscriptionLabel = function(args){        
    // @ts-ignore
    if (!window.additionalQuestion || !window.additionalQuestion[4]) {
      return args; // Exit if additionalQuestion doesn't have index 4
    }
    // @ts-ignore
    let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
    function handleCheckBoxLabel() {
      if(autoCheckBox.is(':checked') === true ){
        // @ts-ignore
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
      } else {
        // @ts-ignore
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
      }    
   }
  // @ts-ignore
  $('label.'+window.additionalQuestion[4].name).on('change click', handleCheckBoxLabel);
  
   return args;
  };
  
  const statusAutoRenewalFrequency = function(args){   
    // @ts-ignore
    if (!window.additionalQuestion || !window.additionalQuestion[4]) {
      return args; // Exit if additionalQuestion doesn't have index 4
    }
    // @ts-ignore
    let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
    
    function handleCheckBoxLabel() {
      // @ts-ignore
      $("input[name=SelectedFrequency]").each(function () {
        // Monthly
        // @ts-ignore
        if ($(this)[0].value === '4' && $(this).is(':checked')) {
          if (autoCheckBox.is(':checked') === true) {
          }
        }
  
        // One-Time
        // @ts-ignore
        if ($(this)[0].value === '0' && $(this).is(':checked')) {
          if (autoCheckBox.is(':checked') === true) {
            autoCheckBox.prop('checked', false); // Uncheck the checkbox
          }
        }
      });
   }
  
  // @ts-ignore
  $('label.at-radio-label-0,label.at-radio-label-4' ).on('change click', handleCheckBoxLabel);
  
   return args;
  };


    // Handle Auto Renewal Subscription Checkbox
window.nvtag_callbacks.alterRequireValid.push(function (args) {
  // Check if additionalQuestion exists and has the required index
  // @ts-ignore
  if (!window.additionalQuestion || !window.additionalQuestion[4]) {
    return args;
  }
  // create a jquery document ready function
    // @ts-ignore
    $(document).ready(function() {
      // @ts-ignore
      let checkboxLabel = $('.' + window.additionalQuestion[4].name);
      // @ts-ignore
      let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
      // Check Frequency
      if (args.field_name === 'SelectedFrequency' && args.val === '0') {
        // @ts-ignore
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
        checkboxLabel.hide();
        // console.log(`On AlterRequired: One-Time`);
      } else if (args.field_name === 'SelectedFrequency' && args.val === '4') {
        autoCheckBox.prop('checked', false); // Uncheck the checkbox
        // @ts-ignore
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
        checkboxLabel.show();
        // console.log(`On AlterRequired: Monthly`);
      }
      // End of document ready
    });
  
    return args;
  });


  // var nvtag_callbacks = window.nvtag_callbacks = window.nvtag_callbacks || {};
  // nvtag_callbacks.alterFormDefinition= nvtag_callbacks.alterFormDefinition|| [];
nvtag_callbacks.alterFormDefinition.push(function (args) {
  
  // Check if additionalQuestion exists and has the required index
  // @ts-ignore
  if (!window.additionalQuestion || !window.additionalQuestion[4]) {
    return args;
  }
  // create a jquery document ready function
    // @ts-ignore
    $(document).ready(function() {
      // @ts-ignore
      let checkboxLabel = $('.' + window.additionalQuestion[4].name);
      // @ts-ignore
      let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
      // Check Frequency
      if (args.field_name === 'SelectedFrequency' && args.val === '0') {
        // @ts-ignore
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
        checkboxLabel.hide();
        // console.log(`On AlterRequired: One-Time`);
      } else if (args.field_name === 'SelectedFrequency' && args.val === '4') {
        autoCheckBox.prop('checked', false); // Uncheck the checkbox
        // @ts-ignore
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
        checkboxLabel.show();
        // console.log(`On AlterRequired: Monthly`);
      }
      // End of document ready
    });
// console.log('alterFormDef', args);
return args;
});

 const moveMemberID = function (args) {

    // @ts-ignore
    if (!window.additionalQuestion || !window.additionalQuestion[0] || !window.additionalQuestion[5]) {
      return args;
    }

    // @ts-ignore
    $(document).ready(function() {
      // @ts-ignore
      let sustainerMember = $('div.at-row.at-row-full.' + window.additionalQuestion[0].name);
      // @ts-ignore
      let firstName = $('div.at-fields .at-row.FirstName.LastName');
      // @ts-ignore
      let memberID = $('div.at-row.at-row-full.'+ window.additionalQuestion[5].name);
      let memberIDInput = $('input[title="Member ID"]');

      if (memberID.length && firstName.length && memberIDInput.length) {
        setTimeout(function() {
          memberID.insertAfter(sustainerMember);
        }, 50);
      }
    });

      return args;
    };

    const howShouldWeAcknowledgeYou = function (args) {

    // @ts-ignore
    if (!window.additionalQuestion || !window.additionalQuestion[5] || !window.additionalQuestion || !window.additionalQuestion[6] || !window.additionalQuestion[7] || !window.additionalQuestion[8]) {
      return args;
    }

    $(document).ready(function() {
      // @ts-ignore
      let formID = window.formID;
      // @ts-ignore
      let memberID = $('div.at-row.at-row-full.'+ window.additionalQuestion[5].name);
      // Hide memberID if additionalQuestions 6, 7, 8 are defined
      if (window.additionalQuestion[6] && window.additionalQuestion[7] && window.additionalQuestion[8]) {
        memberID.hide();
      }
    });

      // @ts-ignore
      let contributionInformation = $("fieldset#NVContributionForm" + formID + "-ContributionInformation");

      // create a fieldset with the id of hsway and the class of at-fieldset
      let fieldset = $('<fieldset>', {
        id: 'hsway',
        class: 'at-fieldset'
      });

    fieldset.insertAfter(contributionInformation);

    let additionalChildren6Headline = $('.at-row.at-row-full.' + window.additionalQuestion[6].name);
    $('.at-row.at-row-full.' + window.additionalQuestion[6].name).css('margin', '0');
    let additionalChildren5Input = $('.at-row.at-row-full.' + window.additionalQuestion[7].name);
    let additionalChildren5Checkbox = $('.at-row.at-row-full.' + window.additionalQuestion[8].name)

    // now lets insert additionalChildren6Headline, additionalChildren5Input and additionalChildren5Checkbox into the fieldset that was created
    if (additionalChildren6Headline.length && additionalChildren5Input.length && additionalChildren5Checkbox.length) {
      additionalChildren6Headline.appendTo(fieldset);
      additionalChildren5Input.appendTo(fieldset);
      additionalChildren5Checkbox.appendTo(fieldset);
    };

    return args;

    console.log('WNET-Patrons Main-AQ-HSWAY')
  };

  nvtag_callbacks.postRender.push(moveSustainerMemberField);
  nvtag_callbacks.postRender.push(moveBeConnectedField);
  nvtag_callbacks.postRender.push(moveReceiveTextsField);
  nvtag_callbacks.postRender.push(moveRecieveEmailsField);
  nvtag_callbacks.postRender.push(updateAutoRenewalSubscriptionLabel);
  nvtag_callbacks.postRender.push(onLoadAutoRenewalSubscriptionLabel);
  nvtag_callbacks.postRender.push(statusAutoRenewalSubscriptionLabel);
  nvtag_callbacks.postRender.push(statusAutoRenewalFrequency);
  nvtag_callbacks.postRender.push(moveMemberID);
  nvtag_callbacks.postRender.push(howShouldWeAcknowledgeYou);
