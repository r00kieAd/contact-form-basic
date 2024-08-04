let query = "";
let submit = false;
let valid = true;
$(document).ready(() => {
    if (!submit) $('#iConsent').removeAttr('checked');
    $('.qry').removeAttr('checked');
});

$('.inpt').focus(() => {
    $('.inpt').removeClass('errinpt');
    $('.err').hide();
    valid = true;
})

$('.query-type').click(function () {
    $('.qry').prop('checked', false);
    const classes = $(this).attr('class');
    if (classes.includes('query-1')) {
        $(this).addClass('highlight');
        $('#query1').prop('checked', true);
        $('.query-2').removeClass('highlight');
        query = $('#query1').val();
        return;
    }
    $(this).addClass('highlight');
    $('#query2').prop('checked', true);
    $('.query-1').removeClass('highlight');
    query = $('#query2').val();
})

$('#iConsent').change(function () {
    $('.submit-button input').toggleClass('submit-form');
    if (submit) {
        $('#iConsent').prop('checked', false);
        submit = false;
        return;
    }
    if (!submit) {
        $('#iConsent').prop('checked', true);
        submit = true;
    }
});

$('#formMain').submit((event) => {
    event.preventDefault();
    if (!submit) return;
    valid = checkForm(getValues());
    if (valid) {
        alert('form submitted');
        return;
    } else {
        submit = false;
        $('#iConsent').prop('checked', false);
        $('.submit-button input').toggleClass('submit-form');
    }
});

function getValues() {
    const firstName = $('#firstname').val();
    const lastName = $('#lastname').val();
    const email = $('#email').val();
    const queryType = query;
    const message = $('#message').val();
    return [firstName, lastName, email, queryType, message];
}

function checkForm(vars) {

    if (!valid) return false;

    const nameRegex = /[0-9]|[!@#$%^&*()]/g;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (vars[0]) {
        if (nameRegex.test(vars[0])) {
            $('#firstname').after('<p class="err">name should only contain alphabets</p>');
            $('#firstname').addClass('errinpt');
        }
    } else {
        $('#firstname').after('<p class="err">name should not be empty</p>');
        $('#firstname').addClass('errinpt');
    }

    if (vars[1]) {
        if (nameRegex.test(vars[1])) {
            $('#lastname').after('<p class="err">name should only contain alphabets</p>');
            $('#lastname').addClass('errinpt');
        }
    } else {
        $('#lastname').after('<p class="err">name should not be empty</p>');
        $('#lastname').addClass('errinpt');
    }

    if (!emailRegex.test(vars[2])) {
        $('#email').after('<p class="err">invalid email</p>');
        $('#email').addClass('errinpt');
    }

    if (!vars[3]) {
        $('#queriesDiv').after('<p class="err">select a query type</p>');
        $('.query-type').addClass('errinpt');
    }

    if (!vars[4]) {
        $('.message-div').after('<p class="err">a message is required</p>');
        $('#message').addClass('errinpt');
    }
    return false;
}