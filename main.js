// Open and Close Dropdown
$('.dropdown .toggle').click(function () {
    $(this).parents('.dropdown').toggleClass('open')
});

// Select Dropdown item
var selections = [];
$('.dropdown .menu .item').click(function () {
    // Single Select
    if (!$(this).parents('.dropdown').hasClass('multi')) {
        var itemText = $(this).find('.item-label').text();
        $(this).siblings('.item').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.dropdown').find('.toggle-label').text(itemText);
        $(this).parents('.dropdown').removeClass('open').addClass('selection-made');
    } else { //Multi Select
        $(this).toggleClass('active');
        $(this).parents('.dropdown').addClass('selection-made');
        var checkbox = $(this).find('input');
        var chipText = $(this).find('.item-label').text();
        if (checkbox.prop('checked')) { //Remove chip
            $(this).find('input').prop('checked', false)
            for (var i = 0; i < selections.length; i++) {
                if (selections[i] === chipText) {
                    selections.splice(i, 1);
                }
            }
            chipAddRemove()
            console.log(selections)
        } else {
            $(this).find('input').prop('checked', true)
            selections.push(
                chipText
            );
            chipAddRemove()
            console.log(selections)

        }
    }
});

function chipAddRemove() {
    $('.chip-wrapper .chip').remove();
    for (var i = 0; i < selections.length; i++) {
        $('.chip-wrapper').append(
            '<div class="chip">' +
                '<span>' + selections[i] + '</span>' +
                '<div class="remove-chip">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"> <path fill="currentColor" fill-rule="evenodd" d="M11.86 4.14a.48.48 0 010 .68L8.678 8l3.18 3.18a.48.48 0 11-.678.68L8 8.678l-3.18 3.18a.48.48 0 11-.68-.678L7.322 8l-3.18-3.18a.48.48 0 01.678-.68L8 7.322l3.18-3.18a.48.48 0 01.68 0z" clip-rule="evenodd"/> </svg>' +
                '</div>' +
            '</div>'
        )
    }
}

$('.dropdown .menu .item').click(function () {
    if ($(this).parents('.dropdown').hasClass('multi')) {
        if (!selections.length) {
            $(this).parents('.dropdown').removeClass('selection-made');
        } else {
            $(this).parents('.dropdown').addClass('selection-made');
        }
    }
});

// Close multi select dropdown on outside click
$(window).click(function () {
    $('.dropdown').removeClass('open')
});

$('.dropdown').click(function (event) {
    event.stopPropagation();
});
