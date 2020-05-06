// Open and Close Dropdown
$('.dropdown').on('click', '.toggle', function(){
    $(this).parents('.dropdown').toggleClass('open');
    $('.dropdown-overlay').addClass('open');
})

$('body').on('click', '.dropdown-overlay', function(){
    $('.dropdown-overlay').removeClass('open');    
})

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
        $('.dropdown-overlay').removeClass('open');
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
            updateChips()
        } else { // Add Chip
            $(this).find('input').prop('checked', true)
            selections.push(
                chipText
            );
            updateChips()
        }
    }
});

function updateChips() {
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

$('.chip-wrapper').on('click', '.chip', function(){
    $(this).remove();
    var chipText = $(this).children('span').text();
    for (var i = 0; i < selections.length; i++) {
        if (selections[i] === chipText) {
            selections.splice(i, 1);
        }
    }
    if (!selections.length) {
        // $(this).parents('.dropdown').removeClass('selection-made');
    }
})
    
$(document).ready(function(){
    $('body').append('<div class="dropdown-overlay"></div>')
});

// Close multi select dropdown on outside click
$(window).click(function () {
    $('.dropdown').removeClass('open')
});

$('.dropdown').click(function (event) {
    event.stopPropagation();
});


// Modals

$('body').on('click', '[data-modal]', function(){
    var showModal = $(this).attr('data-modal');
    $('#'+ showModal).addClass('open');
    $('body').addClass('overlayOpen');
});

$('body').on('click', '.modal-close, .modal-scrim', function(){
    $('.modal.open').removeClass('open');
    $('body').removeClass('overlayOpen');
});

$(document).ready(function(){
    tippy('[data-tippy-content]', {
        animation: 'shift-away'
    });
    $('.modal').each(function(){
        var modalBody = $(this).find('.modal-body');
        if(modalBody.height() > 280 && !$(this).hasClass('drawer')){
            $(this).addClass('scrolling');
        }
    })
});


// Tabs

$('.tab').click(function(){
    var showTab = $(this).attr('data-tab');
    var tabGroup = $(this).parents('.tab-wrapper').attr('data-tab-pane-group');
    if(tabGroup){
        $('.tab-pane-wrapper').each(function(){
            var groupName = $(this).attr('data-tab-pane-group');
            if(groupName === tabGroup){
                $(this).children('.tab-pane').removeClass('open');
                $(this).children(showTab).addClass('open');
            }
        })
    }
    $(this).siblings('.tab').removeClass('active');
    $(this).addClass('active');
});

// Table

// Select single row
$('body').on('click', '.select-row .checkmark', function(){
    $(this).parents('.table-row').toggleClass('selected')
});

// Select all rows
$('body').on('click', '.select-all .checkmark', function(){
    $(this).parents('.table-head').siblings('.table-body').children('.table-row').addClass('selected');
    
    $(this).parents('.table-head').siblings('.table-body').children('.table-row').each(function(){
        $(this).find('.checkbox input').prop('checked', true);
    })
});

// Switch themes

$('.theme-toggle').click(function(){
    $(this).addClass('open')
    $('body').toggleClass('dark-mode')
    setTimeout(function(){
        $('.theme-toggle').removeClass('open');
    }, 500)
})

// Toggle Inter
var i = 0
$('.inter-toggle').click(function(){
    $('body').toggleClass('inter');
    i++
    if ( i % 2 == 0) {
        $(this).text('Show Inter');
    }else{
        $(this).text('Show Proxima');
    }
})

// Increase FS
var k = 0
$('.size-toggle').click(function(){
    $('body').toggleClass('fs-increase');
    k++
    if ( k % 2 == 0) {
        $(this).text('Increase FS');
    }else{
        $(this).text('Decrease FS');
    }
})