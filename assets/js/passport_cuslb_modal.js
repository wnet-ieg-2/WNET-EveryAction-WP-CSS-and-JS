      // Passport Up Sell Light Box
      const addCUSLBBtn = function (args) {
        // Get Main Submit Button and Give it an Id
        $('.at-form-submit').attr('id', 'submit-one')
        // Add USLB Button After Main Submit Button
        $('.at-form-submit').after('<div id="submit-two" class="at-form-submit clearfix uslb-btn"><button id="uslbBtn" type="submit" class="at-submit btn-at btn-at-primary">Donate {{Amount}} {{Frequency}}</button><div class="at-markup secure-processing-single-step-div"><label class="secure-processing-label at-text">Your donation will be securely processed.<div class="glyphicons glyphicons-lock" aria-hidden="true"></div></label></div></div>');
        // Hide Main Submit Button
        $('div#submit-two').css('display', 'none');
        return args;
      };
    
      // Diplay USLB Light Box
      let displayCUSLB = function (s) {
        // console.log(s)
        if (s === true) {
          $('div#uslb').css('display', 'flex');
        } else {
          $('div#uslb').hide();
        }
      }
    
      let initUSLB = function (amount) {

        let otherNumVal = parseInt(amount)
    
        $("input[name=SelectedFrequency]").each(function () {
          // If One Time and Other Value
          if ($(this)[0].value === '0' && $(this).is(':checked')) {
            if (otherNumVal <= 59.99) {
              let amount = otherNumVal;
              $('div#submit-one').css('display', 'none');
              $('div#submit-two').css('display', 'flex');
    
            } else {
              $('div#submit-one').css('display', 'flex');
              $('div#submit-two').css('display', 'none');
            }
          } else {
            $('div#submit-one').css('display', 'flex');
            $('div#submit-two').css('display', 'none');
          }
        });
        // console.log(otherNumVal)
      };
    
    
      window.nvtag_callbacks.postContributionAmountChanged = window.nvtag_callbacks.postContributionAmountChanged || [];
    
      window.nvtag_callbacks.postContributionAmountChanged.push(function (args) {
        let otherTotalAmount = parseInt(args.totalAmount)
        // Passport Suggested Modal Error
        initUSLB(otherTotalAmount)
        // Insert Amount into UPLB Button
        $('#uplb-amount').text(`Process my gift of $${otherTotalAmount}`)
        // console.log(otherTotalAmount)
        return args;
      });
    
    
      nvtag_callbacks.postRender.push(addCUSLBBtn);
  
      $(document).on('click', 'button#uslbBtn', function (e) {
        displayCUSLB(true);
        e.preventDefault();
      });
    
      // Yes on Monthly of $5/Monthly
      $(document).on('click', 'button#yesMO', function (e) {
        if (!window.additionalQuestion || !window.additionalQuestion[4]) {
          return; // Exit if additionalQuestion is empty
        }

      let autoCheckboxLabel = $('#' + 'NVContributionForm' + window.formID + '-AdditionalInformation-' + window.additionalQuestion[4].name + '-label');
        $("input[name=SelectedFrequency]")[0].click();
        $("input[name=OtherAmount]").val(5);
        $("input[name=OtherAmount]").focus();
        $(".at-checkbox-title").next();
        setTimeout(() => {
          autoCheckboxLabel.click();
              setTimeout(() => {      
          $("input[type=submit]").click();
              $('div#uslb').css('display', 'none');
              displayCUSLB(false);
            }, 500);
        }, 500);
        e.preventDefault();
      });
    
      $(document).on('click', 'button#yesOT', function (e) {
        // click on $60 One-Time
        $("label.label-amount")[0].click();
        setTimeout(() => {
          $("input[type=submit]").click();
          $('div#uslb').css('display', 'none');
          displayCUSLB(false);
          // console.log('yesOT')
        }, 500);
        e.preventDefault();
      });
    
      $(document).on('click', 'button#noThk', function (e) {
        setTimeout(() => {
          $("input[type=submit]").click();
          $('div#uslb').css('display', 'none');
          displayCUSLB(false);
        }, 500);
        // console.log('noThk');
        e.preventDefault();
      });
    
      $(document).on('click', 'button#decline', function (e) {
        setTimeout(() => {
          $("input[type=submit]").click();
          $('div#uslb').css('display', 'none');
          displayCUSLB(false);
        }, 500);
        // console.log('decline');
        e.preventDefault();
      });
    console.log('Passport CUSLB Modal: On');