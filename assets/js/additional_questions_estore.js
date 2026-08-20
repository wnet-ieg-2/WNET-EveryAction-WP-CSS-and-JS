/******************
******************
******************
***
*** additional_questions_estore - 081826.01
***
******************
******************
******************/

  const moveAQ = function (args) {
  
    let { formID, additionalQuestion } = initializeFormVariables(args);
  
       $(document).ready(function () {
        const moveElement = (element, target, method) => {
          if (element.length && target.length) {
            element[method](target);
          }
        };
  
        let sustainerUpdate = $('.at-row.at-row-full.' + additionalQuestion[2].name);
        let emailOptIn = $('.at-row.at-row-full.' + additionalQuestion[3].name);
        let textOptIn = $('.at-row.at-row-full.' + additionalQuestion[4].name);
        let pbsStationOptIn = $('.at-row.at-row-full.' + additionalQuestion[5].name);
        let autoRenewal = $('.at-row.at-row-full.' + additionalQuestion[6].name);
        
        let firstNameField = $('input[name="FirstName"]').closest('.at-row');
        let contactInfoField = $('#NVContributionForm' + formID + '-ContactInformation .at-fields');
  
        moveElement(sustainerUpdate, firstNameField, 'insertBefore');
        moveElement(textOptIn, contactInfoField, 'insertAfter');
        moveElement(emailOptIn, contactInfoField, 'insertAfter');
        moveElement(pbsStationOptIn, contactInfoField, 'insertAfter');
  
      }); // End of document ready
  
       return args;
  };

  nvtag_callbacks.postRender.push(moveAQ);

      // Update Checkbox Label for Auto Renewal Subscription
      const updateAutoRenewalSubscriptionLabel = function (args) {

        if (args && args.thank === false) { // Check if we're not on the thank you page

        if (!window.additionalQuestion || !window.additionalQuestion[6]) {
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

        const labelId = 'NVContributionForm' + window.formID + '-AdditionalInformation-' + window.additionalQuestion[6].name + '-label';

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
 
  nvtag_callbacks.postRender.push(updateAutoRenewalSubscriptionLabel);
   
  const onLoadStatus = function(args) {
    let { formID, additionalQuestion } = initializeFormVariables(args);
    let frequencyValue = $('input[name="SelectedFrequency"]');
      let autoCheckBoxLabelText = $('#' + 'NVContributionForm' + formID + '-AdditionalInformation-' + additionalQuestion[6].name + '-label')
      let autoCheckBoxLabel = $('.' + additionalQuestion[6].name);
      let autoCheckBox = $("input[name=" + additionalQuestion[6].name + "]");
      let ccNumber = $('label.at-text.at-cc-number');
      let firstNameField = $('input[name="FirstName"]');
      let submitButton = $('input.at-submit.btn-at.btn-at-primary');

    // Function to handle frequency changes, this should detect on load if $('input[name="SelectedFrequency"]') is monthly or one-time. there should be conditionanl logic, if monthly is selected, have the autoChexBox checked and the submit button enabled. if one-time is selected, have the autoCheckBox unchecked. more logic will be added to this function later.

    function handleFrequencyChange() {

      frequencyValue.each(function () {
        if ($(this).is(':checked')) {
          let frequencyValue = $(this).val();
     
          if (frequencyValue === '4') {
            autoCheckBox.prop('checked', true);
            autoCheckBoxLabel.show();
            $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
          } else if (frequencyValue === '0') {
            autoCheckBox.prop('checked', false);
            autoCheckBoxLabel.hide();
            $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
            autoCheckBoxLabelText.css('color', 'red');
          }
        }
      });
    } // End of handleFrequencyChange function
    
    setTimeout(function(){
      firstNameField.focus();
      firstNameField.click();
    },500);
  
    handleFrequencyChange();
  
    return args;
  };
  
  nvtag_callbacks.postRender.push(onLoadStatus);
  
  const handleFrequencyChange = function(args){
   let { formID, additionalQuestion } = initializeFormVariables(args);
  
   // Function to handle frequency changes
   let frequencyValue = $('input[name="SelectedFrequency"]');
      let autoCheckBoxLabel = $('.' + additionalQuestion[6].name);
      let autoCheckBox = $("input[name=" + additionalQuestion[6].name + "]");
      let autoCheckBoxLabelText = $('#' + 'NVContributionForm' + formID + '-AdditionalInformation-' + additionalQuestion[6].name + '-label');
      let submitButton = $('input.at-submit.btn-at.btn-at-primary');
      let sustainerUpdate = $('.at-row.at-row-full.' + additionalQuestion[2].name);
      let firstNameField = $('input[name="FirstName"]');
      // write logic where if monthly is selected on click or change, have the autoCheckbox unchecked and the submit button disabled. if one-time is selected,have the autoCheckbox unchecked and the submit button enabled.  
      function frequencyChange() {
        frequencyValue.each(function () {
          if ($(this).is(':checked')) {
            let frequencyValue = $(this).val();
      
            if (frequencyValue === '4') {
              autoCheckBox.prop('checked', false);
              autoCheckBoxLabel.show();
              submitButton.prop('disabled', true);
              sustainerUpdate.hide();
            } else if (frequencyValue === '0') {
              autoCheckBox.prop('checked', false);
              autoCheckBoxLabel.hide();
              submitButton.prop('disabled', false);
              sustainerUpdate.hide();
              autoCheckBoxLabelText.css('color', 'red');
              
            }
            setTimeout(function(){
            firstNameField.focus();
            firstNameField.click();
          },500);
  
  
          }
        });
      } // End of frequencyChange function
  
   $('input[name="SelectedFrequency"]').on('click change', frequencyChange);
      function handleCheckBoxLabel() {
        if(autoCheckBox.is(':checked') === true ){
          $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
          autoCheckBoxLabelText.css('color', '#5b6671');
        } else {
          $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
          autoCheckBoxLabelText.css('color', 'red');
        }    
     }
    $('label.'+additionalQuestion[6].name).on('change click', handleCheckBoxLabel);
  
  };
  
  nvtag_callbacks.postRender.push(handleFrequencyChange);
  
  console.log('additional_questions_estore.js loaded');
  