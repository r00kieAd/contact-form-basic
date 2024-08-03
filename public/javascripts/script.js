let query = "";
$(document).ready(() => {
    $('#iConsent').removeAttr('checked');
    $('.qry').removeAttr('checked');
});

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
});

$('.submit-form').on('submit', '.submit-form', (event) => {
    // not working
    console.log('Form submitted', event);
    event.preventDefault();
    return false;
});

function checkForm() {
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const queryType = query;
    const message = $('#message').val();
    
    if (firstName || lastName || email || queryType || message) {
        alert('not empty');
    } else {
        alert('empty');
    }
    return false;
}