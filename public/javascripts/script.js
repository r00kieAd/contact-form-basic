let query = "";
let submit = false;
let valid = true;
$(document).ready(() => {
    if (!submit) $('#iConsent').removeAttr('checked');
    $('.qry').removeAttr('checked');
    $('.inpx').removeAttr('disabled');
});

$('.inpt').click(() => {
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

function iDontConsent() {
    submit = false;
    $('#iConsent').prop('checked', false);
    $('.submit-button input').toggleClass('submit-form');
}

$('#formMain').submit((event) => {
    event.preventDefault();
    if (!submit) return;
    const form_data = getValues();
    valid = checkForm(form_data);
    if (valid) {
        $('.inpx').prop('disabled', true);
        submitForm(form_data);
    } else {
        iDontConsent();
    }
});

async function submitForm(form_data) {
    $('.submit-form').val('Please wait...');
    $('#loaderDiv').show();
    submit = false;
    function hideLoader() {
        $('.submit-form').val('Submit');
        $('#loaderDiv').hide();
    }
    await $.ajax({
        url: "/success.html",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            firstName: form_data[0], lastName: form_data[1],
            email: form_data[2], queryType: form_data[3],
            message: form_data[4]
        }),
        success: function (result) {
            if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
            }
            hideLoader();
        },
        error: function (xhr) {
            function displayError(xhr, resp) {
                if ($('.serverResponse').text() != "") {
                    $('.serverResponse').text(`Status ${xhr.status}: ${resp.error}`);
                } else {
                    $('#formMain').after(`<p class='serverResponse'>Status ${xhr.status}: ${resp.error}</p>`);
                }
            }
            if (xhr.status != 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    displayError(xhr, response);
                } catch (err) {
                    alert(`Status ${xhr.status}, ${xhr.statusText}\n\nTry Refreshing the page..`);
                }
            } else {
                alert(`unknown error with code ${xhr.status}, ${xhr.statusText}\n\nTry Refreshing the page..`);
            }
            $('.inpx').prop('disabled', false);
            hideLoader();
            iDontConsent();
        }
    });

}

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
            valid = false;
        }
    } else {
        $('#firstname').after('<p class="err">name should not be empty</p>');
        $('#firstname').addClass('errinpt');
        valid = false;
    }

    if (vars[1]) {
        if (nameRegex.test(vars[1])) {
            $('#lastname').after('<p class="err">name should only contain alphabets</p>');
            $('#lastname').addClass('errinpt');
            valid = false;
        }
    } else {
        $('#lastname').after('<p class="err">name should not be empty</p>');
        $('#lastname').addClass('errinpt');
        valid = false;
    }

    if (!emailRegex.test(vars[2])) {
        $('#email').after('<p class="err">invalid email</p>');
        $('#email').addClass('errinpt');
        valid = false;
    }

    if (!vars[3]) {
        $('#queriesDiv').after('<p class="err">select a query type</p>');
        $('.query-type').addClass('errinpt');
        valid = false;
    }

    if (!vars[4]) {
        $('.message-div').after('<p class="err">a message is required</p>');
        $('#message').addClass('errinpt');
        valid = false;
    }
    return valid;
}