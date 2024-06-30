var query_type = 'none';
$('.general-q-div').click(
    function () {
        $('#generalEnquiry').prop('checked', true);
        query_type = $('#generalEnquiry').val();
        $('#supportRequest').prop('checked', false);
        $(this).css('background-color', 'hsl(148, 38%, 91%)');
        $('.support-q-div').css('background-color', 'hsl(0, 0%, 100%)');
    }
);

$('.support-q-div').click(
    function () {
        $('#generalEnquiry').prop('checked', false);
        query_type = $('#supportRequest').val();
        $('#supportRequest').prop('checked', true);
        $(this).css('background-color', 'hsl(148, 38%, 91%)');
        $('.general-q-div').css('background-color', 'hsl(0, 0%, 100%)');
    }
);

$('#submit').click(function () {

});

function checkErrors() {
    const empty_error = 'This field is required';
    const invalid_name = 'Enter a valid name';
    const invalid_email = 'Please enter a valid email address';
    const select_query = 'Please select a query type';
    const consent_error = 'To submit this form, please consent to being contracted';
    const first_name = $('#firstName').text().trim();
    const last_name = $('#lastName').text().trim();
    const email_addr = $('#email').text().trim();
    const message = $('#message').text().trim();
    const regex = /^{[0-9]!@#$%&}/;

    if (!first_name) {
        $('#fnerror').text(empty_error);
    } else {
        if (regex.test(first_name)) {
            $('#fnerror').text(invalid_name);
        }
    };

    if (!last_name) {
        $('#lnerror').text(empty_error);
    } else {
        if (regex.test(last_name)) {
            $('#lnerror').text(invalid_name);
        }
    };
    // email regex needed
    if (!email_addr) {
        $('#email').text(empty_error);
    } else {
        if (regex.test(email_addr)) {
            $('#fnerror').text(invalid_email);
        }
    };

    if (query_type == 'none') {
        $('#radioerror').text(select_query);
    }

    if (!message) {
        $('#messageerror').text(empty_error);
    }
}