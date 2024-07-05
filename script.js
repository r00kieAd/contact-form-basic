var query_type = 'none';
var form_has_errors = false;
$('.general-q-div').click(
    function () {
        $('#generalEnquiry').prop('checked', true);
        query_type = $('#generalEnquiry').val();
        $('#supportRequest').prop('checked', false);
        $(this).css('background-color', 'hsl(148, 38%, 91%)');
        $('.support-q-div').css('background-color', 'hsl(0, 0%, 100%)');
        removeError($('#generalEnquiry'));
    }
);

$('.support-q-div').click(
    function () {
        $('#generalEnquiry').prop('checked', false);
        query_type = $('#supportRequest').val();
        $('#supportRequest').prop('checked', true);
        $(this).css('background-color', 'hsl(148, 38%, 91%)');
        $('.general-q-div').css('background-color', 'hsl(0, 0%, 100%)');
        removeError($('#supportRequest'));
    }
);

$('#consent').click(
    function () {
        if (!$(this).prop('checked')) { $(this).removeAttr('checked'); }
        else {
            $(this).attr('checked', 'checked');
            $('#consenterror').hide();
        }
    }
)

function hoverColor(e, state) {
    if ($(this).css('border-color') == 'rgb(215, 60, 60)') return;
    if (state == 'in') $(e).css('border-color', 'hsl(169, 82%, 27%)');
    if (state == 'out') $(e).css('border-color', 'hsl(186, 15%, 59%)');
}

function displayError(p, e, err_text) {
    $(e).text(err_text);
    $(p).css('border-color', 'hsl(0, 66%, 54%)');
    $(e).show();
    $(p).attr('has-error', true);
    form_has_errors = true;
}

function removeError(p) {
    $(p).attr('has-error', false);
    $(p).css('border-color', 'hsl(186, 15%, 59%)');
    // alert($(p).prop('id'));
    if ($(p).prop('id').includes('Name')) {
        if ($('#firstName').attr('has-error') == 'false' && $('#lastName').attr('has-error') == 'false') {
            $('#nameerror').hide();
        }
        return;
    } else if ($(p).prop('id').includes('mail')) {
        $('#emailerror').hide();
    } else if ($(p).prop('type').includes('radio')) {
        $('#radioerror').hide();
    } else if ($(p).prop('id').includes('message')) {
        $('#messagerror').hide();
    }
    form_has_errors = false;
}

$('.inp').hover(
    function () {
        hoverColor(this, 'in');
    },
    function () {
        hoverColor(this, 'out');
    }
)

$('.inp').focusin(
    function () {
        hoverColor(this);
    }
);

$('.inp').blur(
    function () {
        const curr_value = $(this).val().trim();
        const regex = /[0-9]|[!@#$%&]/;
        const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        var prp = $(this).prop('id');
        var has_error;
        if (prp == 'firstName' || prp == 'lastName') {
            has_error = regex.test(curr_value);
        } else {
            has_error = !email_regex.test(curr_value);
        }
        if (prp == 'message') has_error = false;
        if (curr_value && has_error) {
            switch (prp) {
                case 'firstName':
                    displayError(this, '#nameerror', 'Enter a valid name');
                    return
                case 'lastName':
                    displayError(this, '#nameerror', 'Enter a valid name');
                    return
                case 'email':
                    displayError(this, '#emailerror', 'Enter a valid email');
            }
            return;
        }
        removeError(this);
    }
)

$('#submit').click(function () {
    if ($(this).text() == 'Refresh') location.reload(); 
    const valid = checkEmptyError();
    if (valid && !form_has_errors) {
        $('#success').show();
        $('#success').animate({top: "10%"});
        $(this).text('Refresh');
    }
});

function checkEmptyError() {
    var not_empty = true;
    const empty_error = 'This field is required';
    const first_name = $('#firstName').val().trim();
    const last_name = $('#lastName').val().trim();
    const email_addr = $('#email').val().trim();
    const message = $('#message').val().trim();

    if (!first_name || !last_name || !email_addr || !message || query_type == 'none') {
        if (!first_name) displayError($('#firstName'), '#nameerror', empty_error);
        if (!last_name) displayError($('#lastName'), '#nameerror', empty_error);
        if (!email_addr) displayError($('#email'), '#emailerror', empty_error);
        if (!message) displayError($('#message'), '#messagerror', empty_error);
        if (query_type == 'none') displayError($('.form-x inp'), '#radioerror', empty_error);
        not_empty = false;
    }

    if (!$('#consent').prop('checked')) {
        $('#consenterror').show();
        not_empty = false;
    }

    return not_empty;

}