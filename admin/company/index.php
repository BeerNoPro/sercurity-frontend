<?php 
    $title = 'Company';
    $baseUrl = "..";
    require_once($baseUrl . '/layout/header.php');
?>

<!-- link css datepicker -->
<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
<!-- link css alertify -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>

<div class="row">
    <div class="col-md-12">
        <div class="row-top mt-3 mb-3 d-flex justify-content-between align-items-center">
            <h1 class="">Lists content companies</h1>
            <a href="#" class="btn btn-success show-modal" data-bs-toggle="modal" data-bs-target="#modalContents">
                Add Company
            </a>
        </div>
        <h3 class="alert alert-warning d-none" id="error"></h3>
        <table class="table table-bordered table-responsive">
            <thead>
                <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date incorporation</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="table-show-lists"></tbody>
        </table>
        <!-- start modal add -->
        <div class="modal" id="modalContents" tabindex="-1" aria-labelledby="modalContents" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" id="form">
                            <ul class="alert alert-warning d-none" id="save_error_list"></ul>
                            <input type="hidden" value="" name="input_id">
                            <div class="form-group mt-3">
                                <label for="" class="form-label">Name:</label>
                                <input type="text" class="form-control" name="name" placeholder="Name...">
                            </div>
                            <div class="form-group mt-3">
                                <label for="" class="form-label">Address:</label>
                                <input type="text" class="form-control" name="address" placeholder="Address...">
                            </div>
                            <div class="form-group mt-3">
                                <label for="" class="form-label">Email:</label>
                                <input type="email" class="form-control" name="email" placeholder="Email...">
                            </div>
                            <div class="form-group mt-3">
                                <label for="" class="form-label">Phone number:</label>
                                <input type="text" class="form-control" name="phone" placeholder="Phone number...">
                            </div>
                            <div class="form-group mt-3">
                                <label for="" class="form-label">Date incorporation:</label>
                                <input id="datepicker" type="text" class="form-control" name="date_incorporation" placeholder="Date...">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" value="" class="btn btn-success btn-handel btn-add">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal add -->
        <!-- start modal show detail -->
        <div class="modal" tabindex="-1" id="modalShowDetail" aria-labelledby="modalShowDetail" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Show content detail</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-show-detail"></table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal show detail -->
    </div>
</div>

<!-- jquery ui datepicker -->
<script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<!-- alerttify link -->
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

<script>
    $(document).ready(function () {
        // Link url request
        var urlApi = 'http://127.0.0.1:8000/api/admin/company/';

        // Show input datepicker 
        $( "#datepicker" ).datepicker({ dateFormat: 'yy-mm-dd' });

        // Show and hide icon ajax completed
        $(document).ajaxStart(function(){
            $("#icon-loading").removeClass("d-none");
        });
        $(document).ajaxComplete(function(){
            $("#icon-loading").addClass("d-none");
        });
       
        // Get show list contents
        fetchApi()
        function fetchApi() {
            $.get({
                url: urlApi,
                dataType: "json",
                success: function (response) {
                    if (response.status == 200) {
                        $('#error').addClass('d-none');
                        $('.table-show-lists').html('');
                        $.each(response.data, function (key, value) { 
                            $('.table-show-lists').append(`
                                <tr>
                                    <th>${key+1}</th>
                                    <td data-id="${value.id}" class="table-name">
                                        ${value.name}
                                    </td>
                                    <td>${value.address}</td>
                                    <td>${value.phone}</td>
                                    <td>${value.email}</td>
                                    <td>${value.date_incorporation}</td>
                                    <td>
                                        <button type="submit" value="${value.id}" class="btn btn-warning btn-sm btn-edit">Edit</button>
                                    </td>
                                </tr>
                            `);
                        });
                    } else {
                        $('#error').removeClass('d-none');
                        $('#error').html(response.message);
                    }
                }
            });
        }

        // Reset error list
        $(document).on('input', function () {
            $('#save_error_list').addClass('d-none');
            $('#save_error_list').html('');
        });

        //Reset form 
        $(document).on('click', '.show-modal', function () {
            $('.modal-backdrop').show();
            $('input').val('');
            $('.modal-title').html('Add data');
            $('.btn-handel').html('Add');
            $('.btn-handel').removeClass('btn-primary btn-update');
            $('.btn-handel').addClass('btn-success btn-add');
            $('#save_error_list').addClass('d-none');
        });

        // Add content
        $(document).on('click', '.btn-add', function () {
            let formData = new FormData($('#form')[0]);
            $.post({
                url: urlApi,
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    // console.log(response);
                    if (response.status == 400) {
                        $('#save_error_list').removeClass('d-none');
                        $.each(response.error, function (indexInArray, valueOfElement) { 
                            $('#save_error_list').append('<li>' + valueOfElement + '</li>');
                        });
                    } else if (response.status == 200) {
                        // console.log(response);
                        // alert notification add success
                        alertify.set('notifier','position', 'top-right');
                        alertify.success(response.message);
                        // Reset form and hide modal
                        $('#save_error_list').addClass('d-none');
                        $('#modalContents').find('input').val('');
                        $('.modal-backdrop').hide();
                        $('#modalContents').modal('hide');
                        // Call function fetApi
                        fetchApi();
                    } else if (response.status == 404) {
                        // alert notification error
                        alertify.set('notifier','position', 'top-right');
                        alertify.error(response.message);
                    }
                }
            });
        });

        // Edit content
        $(document).on('click', '.btn-edit', function () {
            let id = $(this).val();
            $.get({
                url: urlApi + id,
                dataType: "json",
                success: function (response) {
                    if (response.status == 200) {
                        // Handle form edit
                        $('.modal-backdrop').show();
                        $('#modalContents').modal('show');
                        $('.modal-title').html('Edit data');
                        $('.btn-handel').html('Update');
                        $('.btn-handel').removeClass('btn-success btn-add');
                        $('.btn-handel').addClass('btn-primary btn-update');
                        // Add response value in form input edit
                        $('input[name=input_id]').val(response.data.id);
                        $('input[name=name]').val(response.data.name);
                        $('input[name=address]').val(response.data.address);
                        $('input[name=email]').val(response.data.email);
                        $('input[name=phone]').val(response.data.phone);
                        $('input[name=date_incorporation]').val(response.data.date_incorporation);
                    } else {
                        // alert notification add fail
                        alertify.set('notifier','position', 'top-right');
                        alertify.error(response.message);
                    }
                }
            });
        });

        // Update content
        $(document).on('click', '.btn-update', function () {
            let id = $('input[name=input_id]').val();
            let formData = new FormData($('#form')[0]);
            $.post({
                url: urlApi + id,
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.status == 400) {
                        $('#save_error_list').removeClass('d-none');
                        $.each(response.error, function (indexInArray, valueOfElement) { 
                            $('#save_error_list').append('<li>' + valueOfElement + '</li>');
                        });
                    } else if (response.status == 200) {
                        // Alert notification add success
                        alertify.set('notifier','position', 'top-right');
                        alertify.success(response.message);
                        // Reset form and hide modal
                        $('#save_error_list').addClass('d-none');
                        $('#modalContents').find('input').val('');
                        $('#modalContents').modal('hide');
                        // Call function fetApi
                        fetchApi();
                    } else if (response.status == 404) {
                        // Alert notification error
                        alertify.set('notifier','position', 'top-right');
                        alertify.error(response.message);
                    }
                }
            });
        });

        // Show content detail
        $(document).on('click', '.table-name', function () {
            let id = $(this).attr('data-id');
            $.get({
                url: urlApi + id,
                dataType: "json",
                success: function (response) {
                    if (response.status == 200) {
                        $('.table-show-detail').html('');
                        $('#modalShowDetail').modal('show');
                        $('.table-show-detail').append(`
                            <tr>
                                <th>Id:</th>
                                <td>${response.data.id}</td>
                            </tr>
                            <tr>
                                <th>Name:</th>
                                <td>${response.data.name}</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>${response.data.address}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>${response.data.email}</td>
                            </tr>
                            <tr>
                                <th>Phone:</th>
                                <td>${response.data.phone}</td>
                            </tr>
                            <tr>
                                <th>Date incorporation:</th>
                                <td>${response.data.date_incorporation}</td>
                            </tr>
                            <tr>
                                <th>Date created:</th>
                                <td>${response.data.created_at}</td>
                            </tr>
                            <tr>
                                <th>Date updated:</th>
                                <td>${response.data.updated_at}</td>
                            </tr>
                        `);
                    } else {
                        // alert notification add fail
                        alertify.set('notifier','position', 'top-right');
                        alertify.error(response.message);
                    }
                }
            });
        });

        // Search content
        $(document).on('click', '.btn-search', function (e) {
            e.preventDefault();
            let contentSearch = $('input[name=search]').val();
            console.log(contentSearch);
        });
    });
</script>

<?php 
    require_once($baseUrl . '/layout/footer.php');
?>