// @ts-nocheck
/******************
******************
******************
***
*** additional_questions_standard - 08/18/2026.01
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
  
  const moveSustainerMemberField = function (args) {
      if (args && args.thank === false) { // Check if we're not on the thank you page
    
    $(document).ready(function () {
      
      if (!window.additionalQuestion || !window.additionalQuestion[0]) {
        return; // Exit if additionalQuestion is empty
      }
      
      let sustainerMember = $('.at-row.at-row-full.' + window.additionalQuestion[0].name);
      
      let firstName = $('.at-row.FirstName.LastName').closest('.at-row');
  
      if (sustainerMember.length && firstName.length) {
        sustainerMember.insertBefore(firstName);
      }
  
      // Function to handle frequency changes
      function handleFrequencyChange() {
        
        let frequency = $('input[name="SelectedFrequency"]');
        frequency.each(function () {
          
          if ($(this).is(':checked')) {
            
            let frequencyValue = $(this).val();
            if (frequencyValue === '4') {
              sustainerMember.hide();
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
      
      $('input[name="SelectedFrequency"]').on('change', handleFrequencyChange);
    }); // End of document ready
  } // Not on the thank you page

    return args;
  };

  // Move Yes, I would like to receive emails from WNET/ALL ARTS
  const moveRecieveEmailsField = function (args) {
    
    $(document).ready(function () {
      
      if (!window.additionalQuestion || !window.additionalQuestion[1]) {
        return; // Exit if additionalQuestion doesn't have index 1
      }
      
      let receiveEmails = $('.at-row.at-row-full.' + window.additionalQuestion[1].name);
      
      let targetField = $('#NVContributionForm' + window.formID + '-ContactInformation .at-fields');
  
      if (receiveEmails.length && targetField.length) {
        receiveEmails.insertAfter(targetField);
      }
    }); // End of document ready
  
    return args;
  };

  // Move Yes, I would like to receive texts from WNET/ALL ARTS
  const moveReceiveTextsField = function (args) {
    
    $(document).ready(function () {
      
      if (!window.additionalQuestion || !window.additionalQuestion[2]) {
        return; // Exit if additionalQuestion doesn't have index 2
      }
      
      let receiveTexts = $('.at-row.at-row-full.' + window.additionalQuestion[2].name);
      
      let targetField = $('#NVContributionForm' + window.formID + '-ContactInformation .at-fields');
  
      if (receiveTexts.length && targetField.length) {
        receiveTexts.insertAfter(targetField);
      }
  
    }); // End of document ready
  
    return args;
  };

  // Yes, I would like to be connected to my local PBS station
  const moveBeConnectedField = function (args) {
    
    $(document).ready(function () {
      
      if (!window.additionalQuestion || !window.additionalQuestion[3]) {
        return; // Exit if additionalQuestion doesn't have index 3
      }
      
      let beConnected = $('.at-row.at-row-full.' + window.additionalQuestion[3].name);
      
      let targetField = $('#NVContributionForm' + window.formID + '-ContactInformation .at-fields');
  
      if (beConnected.length && targetField.length) {
        beConnected.insertAfter(targetField);
      }
    }); // End of document ready
  
    return args;
  };


      // Update Checkbox Label for Auto Renewal Subscription
      const updateAutoRenewalSubscriptionLabel = function (args) {

        if (args && args.thank === false) { // Check if we're not on the thank you page

        if (!window.additionalQuestion || !window.additionalQuestion[4]) {
          return args;
        }

        const designationId = args.form_definition.designation.designationId;
        const designationName = args.form_definition.designation.name; // Assuming the designationId is stored in the name property
        const designationOfficialName = args.form_definition.designation.officialName; // Assuming the designationId is stored in the name property
        
        const portalUrls = {
          52: 'https://www.thirteen.org/portal',
          51: 'https://www.wliw.org/portal',
        };

        const portalUrl = portalUrls[designationId];

        const labelId = 'NVContributionForm' + window.formID + '-AdditionalInformation-' + window.additionalQuestion[4].name + '-label';

        const label = document.getElementById(labelId);

        if (!label) {
          return args;
        }

        // Avoid appending the extra paragraph more than once if postRender fires repeatedly.
        if (label.dataset.autoRenewalCopyInjected === 'true') {
          return args;
        }

        const mainCopy = label.innerHTML || '';

        const termsOfServiceLinkDefault = '<a href="https://www.wnet.org/about/terms-of-service/" target="_blank" rel="noopener noreferrer">https://www.wnet.org/about/terms-of-service/</a>.';
        const termsOfServiceLink = '<a href="https://www.wnet.org/about/terms-of-service/" target="_blank" rel="noopener noreferrer">Terms of Service | The WNET Group</a>.';
        const defaultCopy = ` You can cancel at any time by emailing <a href="mailto:membership@wnet.org">membership@wnet.org</a> or by calling 212-560-2888. You also acknowledge and agree to the full Terms of Service located at ${termsOfServiceLinkDefault}`;
        const portalCopy = ` You can cancel any time at <a href="${portalUrl}" target="_blank" rel="noopener noreferrer">${portalUrl}</a>. You also acknowledge and agree to the full Terms of Service located at ${termsOfServiceLink}`;
        const additionalCopy = portalUrl ? portalCopy : defaultCopy;

        label.innerHTML = `${mainCopy} ${additionalCopy}`;
        label.dataset.autoRenewalCopyInjected = 'true';

        // console.log('Auto Renewal Subscription label updated for designationId:', designationId);
        // console.log('Auto Renewal Subscription label updated for designationName:', designationName);
        console.log('Auto Renewal Subscription label updated for designationOfficialName:', designationOfficialName);

          }

        return args;
      };

    const onLoadAutoRenewalSubscriptionLabel = function (args) {
    function onLoadCheck() {
      
      if (!window.additionalQuestion || !window.additionalQuestion[4]) {
        return; // Exit if additionalQuestion doesn't have index 4
      }
      
      let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
      
      let label = $('.' + window.additionalQuestion[4].name);
      
      $("input[name=SelectedFrequency]").each(function () {
        // Monthly
        
        if ($(this)[0].value === '4' && $(this).is(':checked')) {
          if (autoCheckBox.is(':checked') === true) {
            // console.log(`On Load: Monthly`);
          }
        }
  
        // One-Time
        
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
    
    if (!window.additionalQuestion || !window.additionalQuestion[4]) {
      return args; // Exit if additionalQuestion doesn't have index 4
    }
    
    let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
    function handleCheckBoxLabel() {
      if(autoCheckBox.is(':checked') === true ){
        
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
      } else {
        
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
      }    
   }
  
  $('label.'+window.additionalQuestion[4].name).on('change click', handleCheckBoxLabel);
  
   return args;
  };
  
  const statusAutoRenewalFrequency = function(args){   
    
    if (!window.additionalQuestion || !window.additionalQuestion[4]) {
      return args; // Exit if additionalQuestion doesn't have index 4
    }
    
    let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
    
    function handleCheckBoxLabel() {
      
      $("input[name=SelectedFrequency]").each(function () {
        // Monthly
        
        if ($(this)[0].value === '4' && $(this).is(':checked')) {
          if (autoCheckBox.is(':checked') === true) {
          }
        }
  
        // One-Time
        
        if ($(this)[0].value === '0' && $(this).is(':checked')) {
          if (autoCheckBox.is(':checked') === true) {
            autoCheckBox.prop('checked', false); // Uncheck the checkbox
          }
        }
      });
   }
  
  
  $('label.at-radio-label-0,label.at-radio-label-4' ).on('change click', handleCheckBoxLabel);
  
   return args;
  };


    // Handle Auto Renewal Subscription Checkbox
window.nvtag_callbacks.alterRequireValid.push(function (args) {
  // Check if additionalQuestion exists and has the required index
  
  if (!window.additionalQuestion || !window.additionalQuestion[4]) {
    return args;
  }
  // create a jquery document ready function
    
    $(document).ready(function() {
      
      let checkboxLabel = $('.' + window.additionalQuestion[4].name);
      
      let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
      // Check Frequency
      if (args.field_name === 'SelectedFrequency' && args.val === '0') {
        
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
        checkboxLabel.hide();
        // console.log(`On AlterRequired: One-Time`);
      } else if (args.field_name === 'SelectedFrequency' && args.val === '4') {
        autoCheckBox.prop('checked', false); // Uncheck the checkbox
        
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
  
  if (!window.additionalQuestion || !window.additionalQuestion[4]) {
    return args;
  }
  // create a jquery document ready function
    
    $(document).ready(function() {
      
      let checkboxLabel = $('.' + window.additionalQuestion[4].name);
      
      let autoCheckBox = $("input[name=" + window.additionalQuestion[4].name + "]");
      // Check Frequency
      if (args.field_name === 'SelectedFrequency' && args.val === '0') {
        
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
        checkboxLabel.hide();
        // console.log(`On AlterRequired: One-Time`);
      } else if (args.field_name === 'SelectedFrequency' && args.val === '4') {
        autoCheckBox.prop('checked', false); // Uncheck the checkbox
        
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

    
    if (!window.additionalQuestion || !window.additionalQuestion[0] || !window.additionalQuestion[5]) {
      return args;
    }

    
    $(document).ready(function() {
      
      let sustainerMember = $('div.at-row.at-row-full.' + window.additionalQuestion[0].name);
      
      let firstName = $('div.at-fields .at-row.FirstName.LastName');
      
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

    if (!window.additionalQuestion || !window.additionalQuestion[5] || !window.additionalQuestion || !window.additionalQuestion[6] || !window.additionalQuestion[7] || !window.additionalQuestion[8]) {
      return args;
    }

    $(document).ready(function() {
      
      let formID = window.formID;
      let memberID = $('div.at-row.at-row-full.'+ window.additionalQuestion[5].name);
      // Hide memberID if additionalQuestions 6, 7, 8 are defined
      if (window.additionalQuestion[6] && window.additionalQuestion[7] && window.additionalQuestion[8]) {
        memberID.hide();
      }
    });

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
    }

    return args;

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
  console.log('additional_questions_standard.js loaded');