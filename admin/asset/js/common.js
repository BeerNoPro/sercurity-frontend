$(document).ready(function () {
    // Reset error list
    $(document).on('input textarea', function () {
        $('#save_error_list').addClass('d-none');
        $('#save_error_list').html('');
    });

    //Reset form 
    $(document).on('click', '.show-modal', function () {
        $('.modal-backdrop').show();
        $('input').val('');
        $('textarea').val('');
        $('#modalContents .modal-title').html('Add data');
        $('.btn-handel').html('Add');
        $('.btn-handel').removeClass('btn-primary btn-update');
        $('.btn-handel').addClass('btn-success btn-add');
        $('#save_error_list').addClass('d-none');
    });

    // Show and hide icon ajax completed
    $(document).ajaxStart(function(){
        $("#icon-loading").removeClass("d-none");
    });
    $(document).ajaxComplete(function(){
        $("#icon-loading").addClass("d-none");
    });

    // Show input datepicker 
    $( "#date-start" ).datepicker({ dateFormat: 'yy-mm-dd' });
    $( "#date-end" ).datepicker({ dateFormat: 'yy-mm-dd' });
    
});