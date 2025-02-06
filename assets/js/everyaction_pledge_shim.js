/* shim for working with an EveryAction donation form
 * requires the EA form to have custom fields with
 * titles 'PCodes' and 'Your Selected Premiums'
 * to store that info and pass it along to the EA backend
 */

	var shopping_cart = localStorage.getItem('shopping_cart');
    if (typeof shopping_cart !== 'undefined' && shopping_cart !== null) { shopping_cart = JSON.parse( shopping_cart ); }
    else { 
		shopping_cart = []; 
		}

	var required_donation_amount = 0;
	var required_installment_amount = 0;
	var current_frequency = 0;
	var pcode_field = '';
	var premium_field = '';
	var premium_display = '';

	function setup_pcode_and_premium_fields() {
		pcode_field = $("input[title='PCodes']");
		premium_field = $("textarea[title='Your Selected Premiums']");
		$(pcode_field).parent().parent().hide();
		$(premium_field).parent().parent().hide();
		$('header.at-markup.HeaderHtml').append('<div class="premium_list"></div>');
	}


	function update_pcode_and_premium_and_value_fields() {
		if (shopping_cart.length == 0) {
			// this shouldn't ever come up but JIC
			$('.premium_list').html('<h4>Your shopping cart is empty. <strong><a href="/support/pledge-premiums/">Click here to choose your Thank You Gifts.</a></strong></h4>');
			return;
		}
		var pcodestring = '';
		var premiumstring = '';
		var premiumhtml = '';
		required_donation_amount = 0;
		$.each(shopping_cart, function( index, item ) {
			pcodestring += item.pcode + ':' + item.qty + '|';
			var this_item_value = Number(item.qty) * Number(item.amt);
			var fmv_string = '';
			if (typeof item.fmv !== 'undefined') {
				fmv_string = ' – Fair Market Value $' + item.fmv;
			}
			premiumstring += 'The ' + item.title + fmv_string + "\r\n" ;
			premiumhtml += '<li><strong>' + item.title + '</strong> Price: $' + item.amt + ' Quantity: ' +  item.qty + "</li>" ;
			required_donation_amount += this_item_value;
		});
		pcode_field.val(pcodestring);
		premium_field.val(premiumstring);
		var formatted_required_donation_amount = required_donation_amount.toLocaleString();
		$('.premium_list').html("<p><em><a href='/support/pledge-premiums/cart/'>Change your order</a></em></p><h3>Here's a summary of your order:</h3><ul>" + premiumhtml + '</ul><p class="contribution_message">Minimum contribution: $<span class="required_contribution">'+formatted_required_donation_amount+'</span></p>');
		set_required_amount();
	}

	function check_frequency() {
		$('input[name="SelectedFrequency"]').each(function () {
			if ($(this).is(':checked')) {
				current_frequency = $(this).val();
			}
		});
	}

	function set_required_amount() {
		if (!required_donation_amount) {
			return;
		}
		required_installment_amount = (required_donation_amount/12);
		required_installment_amount = Math.round((required_installment_amount + Number.EPSILON) * 100) / 100;
		setTimeout(update_amount_values_display, 10);
	}

	let update_amount_values_display = function() {
        if (current_frequency == 4) {
            var formatted_required_installment_amount = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, trailingZeroDisplay: 'stripIfInteger'}).format(required_installment_amount);
            $("span.required_contribution").html(formatted_required_installment_amount + " per month for 12 months");
            $("input[name='OtherAmount']").parent().prev().hide();
            $("input[name='OtherAmount']").val(formatted_required_installment_amount);
        } else {
			var formatted_required_donation_amount = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, trailingZeroDisplay: 'stripIfInteger'}).format(required_donation_amount);
            $("input[name='OtherAmount']").val(required_donation_amount);
            $("span.required_contribution").html(formatted_required_donation_amount);
            $("input[name='OtherAmount']").parent().prev().hide();
        }
        $("input[name='OtherAmount']").attr("readonly", true);
        $("input[name='OtherAmount']").focus();
	}


	let initialize_form_when_ready = function () {
		setup_pcode_and_premium_fields();
		check_frequency();
		update_pcode_and_premium_and_value_fields();
		$('input[name="SelectedFrequency"]').on('change click', function () {
			check_frequency();
			set_required_amount();
		});

	}

	var nvtag_callbacks = nvtag_callbacks || {};
	nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
	nvtag_callbacks.postRender.push(initialize_form_when_ready);
