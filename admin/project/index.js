$(document).ready(function () {
    // Link url request
    var urlApi = 'http://127.0.0.1:8000/api/admin/project/';
    var urlApiEdit = 'http://127.0.0.1:8000/api/admin/project-edit/';
    var urlApiForeignKey = 'http://127.0.0.1:8000/api/admin/project-foreign/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/project-search/';

    var company = 'company';
    var workRoom = 'work_room';
    var select1 = $('#select-1');
    var select2 = $('#select-2');

    // Edit placeholder
    $('input[name=search]').attr('placeholder', 'Search name project...');

    // Add background color sidebar 
    $('.project').addClass('sidebar-color');
   
    // Get show list contents
    fetchApi(urlApi)
    function fetchApi(urlApi) {
        $.get({
            url: urlApi,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if (response.status == 200) {
                    // Handle content table
                    $('#error').addClass('d-none');
                    $('.table-show-lists').html('');
                    $.each(response.data.data, function (key, value) {
                        $('.table-show-lists').append(`
                            <tr p-id="${value.id}">
                                <th>${response.index++}</th>
                                <td class="table-name hover-text-click">
                                    ${value.name}
                                </td>
                                <td>${value.time_start}</td>
                                <td>${value.time_completed}</td>
                                <td class="company hover-text-click" c-id="${value.company.id}">
                                    ${value.company.name}
                                </td>
                                <td class="work-room hover-text-click" w-id="${value.work_room.id}">
                                    ${value.work_room.name}
                                </td>
                                <td class="text-center">
                                    <button type="submit" value="${value.id}" class="btn btn-sm btn-edit">
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
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
    function contentTableDetail(data, table) {
        // console.log(data);
        $('.table-show-detail').html('');
        $('#modalShowDetail').modal('show');
        switch (table) {
            case 'project':
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Project id:</th>
                            <td>${item.id}</td>
                        </tr>
                        <tr>
                            <th>Company id:</th>
                            <td>${item.company.id}</td>
                        </tr>
                        <tr>
                            <th>Work room id:</th>
                            <td>${item.work_room.id}</td>
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
                            <th>Company name:</th>
                            <td>${item.company.name}</td>
                        </tr>
                        <tr>
                            <th>Work room name:</th>
                            <td>${item.work_room.name}</td>
                        </tr>
                        <tr>
                            <th>Work room location:</th>
                            <td>${item.work_room.location}</td>
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
                break;
            case 'company':
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Company id:</th>
                            <td>${item.company.id}</td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>${item.company.name}</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>${item.company.address}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>${item.company.email}</td>
                        </tr>
                        <tr>
                            <th>Phone:</th>
                            <td>${item.company.phone}</td>
                        </tr>
                        <tr>
                            <th>Date incorporation:</th>
                            <td>${item.company.date_incorporation}</td>
                        </tr>
                        <tr>
                            <th>Date created_at:</th>
                            <td>${item.company.created_at}</td>
                        </tr>
                        <tr>
                            <th>Date updated_at:</th>
                            <td>${item.company.updated_at}</td>
                        </tr>
                    `);
                });
                break;
            default:
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Name:</th>
                            <td>${item.work_room.name}</td>
                        </tr>
                        <tr>
                            <th>Location:</th>
                            <td>${item.work_room.location}</td>
                        </tr>
                        <tr>
                            <th>Date created_at:</th>
                            <td>${item.work_room.created_at}</td>
                        </tr>
                        <tr>
                            <th>Date updated_at:</th>
                            <td>${item.work_room.updated_at}</td>
                        </tr>
                    `);
                });
                break;
        }
    }

    // Function show content detail
    function showContentDetail(urlApi, id) {
        let table = 'project';
        $.get({
            url: urlApi + id,
            dataType: "json",
            success: function (response) {
                if (response.status == 200) {
                    contentTableDetail(response.data, table);
                } else {
                    // Alert notification add fail
                    alertError(response.message);
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
                    alertError(response.message);
                }
            }
        });
    }

    // show list suggestions content
    $('input[name=search]').keyup(function () {
        let nameSearch = $(this).val().replace(/ /g, "");
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
        showContentDetail(urlApiEdit, id);
    });

    // Click button search content
    $(document).on('click', '.btn-search', function (e) {
        e.preventDefault();
        let contentSearch = $('input[name=search]').val();
        let table = 'project';
        $.get({
            url: urlApiSearch + contentSearch,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if (response.status == 200) {
                    contentTableDetail(response.data, table);
                } else {
                    // Alert notification add fail
                    alertError(response.message);
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
            headers: {
                'Accept': 'application/json',
            },
            success: function (response) {
                if (response.status == 200) {
                    // Alert notification add success
                    alertSuccess(response.message);
                    // Reset form and hide modal
                    $('#save_error_list').addClass('d-none');
                    $('#modalContents').find('input').val('');
                    $('.modal-backdrop').hide();
                    $('#modalContents').modal('hide');
                    // Call function fetApi
                    fetchApi(urlApi);
                } else if (response.status == 404) {
                    // Alert notification error
                    alertError(response.message);
                }
            }, error: function(error) {
                // console.log(error);
                $('#save_error_list').removeClass('d-none');
                $.each(error.responseJSON.errors, function (key, value) { 
                    $('#save_error_list').append('<li>' + value + '</li>');
                });
            }
        });
    });

    // Edit content
    $(document).on('click', '.btn-edit', function () {
        let id = $(this).val();
        $.get({
            url: urlApiEdit + id,
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
                        $('input[name=id]').val(item.id);
                        $('input[name=name]').val(item.name);
                        $('input[name=time_start]').val(item.time_start);
                        $('input[name=time_completed]').val(item.time_completed);
                        selectOption(urlApiForeignKey, company, select1);
                        selectOption(urlApiForeignKey, workRoom, select2);
                    });
                } else {
                    // Alert notification add fail
                    alertError(response.message);
                }
            }
        });
    });

    // Update content
    $(document).on('click', '.btn-update', function () {
        let id = $('input[name=id]').val();
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
            headers: {
                'Accept': 'application/json',
            },
            success: function (response) {
                if (response.status == 200) {
                    // Alert notification add success
                    alertSuccess(response.message);
                    // Reset form and hide modal
                    $('#save_error_list').addClass('d-none');
                    $('#modalContents').find('input').val('');
                    $('#modalContents').modal('hide');
                    // Call function fetApi
                    fetchApi(urlApi);
                } else if (response.status == 404) {
                    // Alert notification error
                    alertError(response.message);
                }
            }, error: function(error) {
                // console.log(error);
                $('#save_error_list').removeClass('d-none');
                $.each(error.responseJSON.errors, function (key, value) { 
                    $('#save_error_list').append('<li>' + value + '</li>');
                });
            }
        });
    });

    // Click show content project detail
    $(document).on('click', '.table-name', function () {
        let id = $(this).closest('tr').attr('p-id');
        showContentDetail(urlApiEdit, id);
    });

    // Click show content company detail
    $(document).on('click', '.work-room', function () {
        let pId = $(this).closest('tr').attr('p-id');
        let cId = $(this).closest('tr').find('.company').attr('c-id');
        let wId = $(this).attr('w-id');
        let table = '';
        $.get({
            url: urlApiEdit + pId + '/' + cId + '/' + wId,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if (response.status == 200) {
                    contentTableDetail(response.data, table);
                } else {
                    // Alert notification add fail
                    alertError(response.message);
                }
            }
        });
    });

    // Click show content company detail
    $(document).on('click', '.company', function () {
        let pId = $(this).closest('tr').attr('p-id');
        let cId = $(this).attr('c-id');
        let table = 'company';
        $.get({
            url: urlApiEdit + pId + '/' + cId,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if (response.status == 200) {
                    contentTableDetail(response.data, table);
                } else {
                    // Alert notification add fail
                    alertError(response.message);
                }
            }
        });
    });

});