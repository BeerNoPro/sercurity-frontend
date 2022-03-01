$(document).ready(function () {
    // Link url request
    var urlApiForeignKey = 'http://127.0.0.1:8000/api/admin/project-foreign/';
    var urlApi = 'http://127.0.0.1:8000/api/admin/project/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/project-search/';

    var company = 'company';
    var workRoom = 'work_room';
    var select1 = $('#select-1');
    var select2 = $('#select-2');
   
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
                                <td>${value.time_start}</td>
                                <td>${value.time_completed}</td>
                                <td>${value.company_name}</td>
                                <td>${value.work_room_name}</td>
                                <td>${value.work_room_location}</td>
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

    // Function get content table detail
    function contentTableDetail(data) {
        console.log(data);
        $('.table-show-detail').html('');
        $('#modalShowDetail').modal('show');
        $.each(data, function (key, item) {
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
                    <th>Time start:</th>
                    <td>${item.time_start}</td>
                </tr>
                <tr>
                    <th>Time completed:</th>
                    <td>${item.time_completed}</td>
                </tr>
                <tr>
                    <th>Company id:</th>
                    <td>${item.company_id}</td>
                </tr>
                <tr>
                    <th>Company name:</th>
                    <td>${item.company_name}</td>
                </tr>
                <tr>
                    <th>Work room id:</th>
                    <td>${item.work_room_id}</td>
                </tr>
                <tr>
                    <th>Work room name:</th>
                    <td>${item.work_room_name}</td>
                </tr>
                <tr>
                    <th>Work room location:</th>
                    <td>${item.work_room_location}</td>
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
    }

    // Function show content detail
    function showContentDetail(urlApi, id) {
        $.get({
            url: urlApi + id,
            dataType: "json",
            success: function (response) {
                if (response.status == 200) {
                    contentTableDetail(response.data);
                } else {
                    // Alert notification add fail
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(response.message);
                }
            }
        });
    }

    // Function show select option 1
    function selectOption(url, name, select) {
        $.get({
            url: url + name,
            dataType: "json",
            success: function (response) {
                $(select).html('')
                if (response.status == 200) {
                    $.each(response.data, function (key, item) { 
                        $(select).append(`<option value="${item.id}">${item.name}</option>`);
                    });
                } else {
                    // Alert notification error
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(response.message);
                }
            }
        });
    }

    // show list suggestions content
    $('input[name=search]').keyup(function () {
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
                    contentTableDetail(response.data);
                } else {
                    // Alert notification add fail
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(response.message);
                }
            }
        });
    });

    // Click pages pagination
    $(document).on('click', '.page-item', function (e) {
        e.preventDefault();
        let linkPage = $(this).find('a').attr('href');
        if (linkPage != 'null') {
            fetchApi(linkPage)
        }
    });

    // Get content foreign key in table
    $(document).on('click', '.show-modal', function () {
        selectOption(urlApiForeignKey, company, select1);
        selectOption(urlApiForeignKey, workRoom, select2);
    });

    // Add content
    $(document).on('click', '.btn-add', function () {
        let companyId = $('#select-1').val();
        let workRoomId = $('#select-2').val();
        let formData = new FormData($('#form')[0]);
        formData.append('company_id', companyId);
        formData.append('work_room_id', workRoomId);
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
                    $.each(response.data, function (key, item) {
                        $('input[name=input_id]').val(item.id);
                        $('input[name=name]').val(item.name);
                        $('input[name=time_start]').val(item.time_start);
                        $('input[name=time_completed]').val(item.time_completed);
                        selectOption(urlApiForeignKey, company, select1);
                        selectOption(urlApiForeignKey, workRoom, select2);
                    });
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
        let companyId = $('#select-1').val();
        let workRoomId = $('#select-2').val();
        let formData = new FormData($('#form')[0]);
        formData.append('company_id', companyId);
        formData.append('work_room_id', workRoomId);
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