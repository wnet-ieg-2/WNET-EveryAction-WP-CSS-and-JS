/******************
******************
******************
***
*** 2026 WNET Main Theme AQ E-Store JS Reusable
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
  
       // Update the HTML content of the autoRenewal label element
        let origText = $('#' + 'NVContributionForm' + formID + '-AdditionalInformation-' + additionalQuestion[6].name + '-label').html();
        let autoRenewalLabel = $('#' + 'NVContributionForm' + formID + '-AdditionalInformation-' + additionalQuestion[6].name + '-label');
        let additionalText = `<a href='mailto:membership@wnet.org'>membership@wnet.org</a> or by calling 212-560-2888.`;
        let urlAdd = `You also acknowledge and agree to the full Terms of Service located at <a href='https://www.wnet.org/about/terms-of-service/' target='_blank'>https://www.wnet.org/about/terms-of-service/</a>`;
        // Update the HTML content of the label element
        autoRenewalLabel.html(origText + ' ' + additionalText + ' ' + urlAdd);
  
  
      }); // End of document ready
  
       return args;
  };
  
  nvtag_callbacks.postRender.push(moveAQ);
  
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
              sustainerUpdate.show();
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
  
  console.log('E-Store-AQ.html');
  