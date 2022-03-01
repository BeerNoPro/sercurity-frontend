$(document).ready(function () {
    // Link url request
    var urlApi = 'http://127.0.0.1:8000/api/admin/company/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/company-search/';
   
    // Get show list contents
    fetchApi(urlApi)
    function fetchApi(urlApi) {
        $.get({
            url: urlApi,
            dataType: "json",
            success: function (response) {
                if (response.status == 200) {
                    // Handle content table
                    $('#error').addClass('d-none');
                    $('.table-show-lists').html('');
                    $.each(response.data.data, function (key, value) { 
                        $('.table-show-lists').append(`
                            <tr>
                                <th>${response.index++}</th>
                                <td data-id="${value.id}" class="table-name hover-text-click">
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
                    // Handle pagination
                    if (response.data.last_page > 1) {
                        $('#show-pagination').removeClass('d-none');
                        $('#show-pagination ul').html('');
                        $.each(response.data.links, function (key, link) {
                            link.active ? active = 'active' : active = '';
                            link.url == null ? disabled = 'disabled' : disabled = '';
                            $('#show-pagination ul').append(`
                                <li class="page-item ${active}${disabled}">
                                    <a class="page-link" href="${link.url}">${link.label}</a>
                                </li>
                            `);
                        });
                    } else {
                        $('#show-pagination').addClass('d-none');
                    }
                } else {
                    $('#error').removeClass('d-none');
                    $('#error').html(response.message);
                }
            }
        });
    }

    // Click pages pagination
    $(document).on('click', '.page-item', function (e) {
        e.preventDefault();
        let linkPage = $(this).find('a').attr('href');
        if (linkPage != 'null') {
            fetchApi(linkPage)
        }
    });

    // Function show content detail
    function showContentDetail(urlApi, id) {
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
    }

    // show list suggestions content
    $('input[name=search]').keyup(function(){
        let nameSearch = $(this).val();
        if (nameSearch != '') {
            $.get({
                url: urlApiSearch + nameSearch,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 200) {
                        $('.result-search').removeClass('d-none');
                        $('.result-search').html('');
                        $.each(response.data, function (key, item) {
                            $('.result-search').append(`
                                <li class="hover-text-click" data-id="${item.id}" >${item.name}</li>
                            `);
                        });
                    } else {
                        $('.result-search').addClass('d-none');
                    }
                }
            });
        } else {
            $('.result-search').addClass('d-none');
        }
    }); 

    // Click show suggestions content detail
    $(document).on('click', '.result-search li', function () {
        let id = $(this).attr('data-id');
        let content = $(this).text();
        $('input[name=search]').val(content);
        $('.result-search').addClass('d-none');
        showContentDetail(urlApi, id);
    });

    // Click button search content
    $(document).on('click', '.btn-search', function (e) {
        e.preventDefault();
        let contentSearch = $('input[name=search]').val();
        $.get({
            url: urlApiSearch + contentSearch,
            dataType: "json",
            success: function (response) {
                if (response.status == 200) {
                    $('.table-show-detail').html('');
                    $('#modalShowDetail').modal('show');
                    $.each(response.data, function (key, item) {
                        $('.table-show-detail').append(`
                            <tr>
                                <th>Id:</th>
                                <td>${item.id}</td>
                            </tr>
                            <tr>
                                <th>Name:</th>
                                <td>${item.name}</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>${item.address}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>${item.email}</td>
                            </tr>
                            <tr>
                                <th>Phone:</th>
                                <td>${item.phone}</td>
                            </tr>
                            <tr>
                                <th>Date incorporation:</th>
                                <td>${item.date_incorporation}</td>
                            </tr>
                            <tr>
                                <th>Date created:</th>
                                <td>${item.created_at}</td>
                            </tr>
                            <tr>
                                <th>Date updated:</th>
                                <td>${item.updated_at}</td>
                            </tr>
                        `);
                    });
                } else {
                    // alert notification add fail
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(response.message);
                }
            }
        });
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
                    $('.modal-backdrop').hide();
                    $('#modalContents').modal('hide');
                    // Call function fetApi
                    fetchApi(urlApi);
                } else if (response.status == 404) {
                    // Alert notification error
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
                    $('#modalContents .modal-title').html('Edit data');
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
                    // Alert notification add fail
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
                    fetchApi(urlApi);
                } else if (response.status == 404) {
                    // Alert notification error
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(response.message);
                }
            }
        });
    });

    // Click name content show detail
    $(document).on('click', '.table-name', function () {
        let id = $(this).attr('data-id');
        showContentDetail(urlApi, id);
    });
});