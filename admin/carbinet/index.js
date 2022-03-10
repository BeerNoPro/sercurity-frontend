$(document).ready(function () {
    // Link url request
    var urlApi = 'http://127.0.0.1:8000/api/admin/carbinet/';
    var urlApiEdit = 'http://127.0.0.1:8000/api/admin/carbinet-edit/';
    var urlApiForeignKey = 'http://127.0.0.1:8000/api/admin/carbinet-foreign/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/carbinet-search/';

    var workRoom = 'work_room';
    var member = 'member';
    var select1 = $('#select-1');
    var select2 = $('#select-2');

    // Edit placeholder
    $('input[name=search]').attr('placeholder', 'Search name cabinet...');

    // Add background color sidebar 
    $('.cabinet').addClass('sidebar-color');
   
    // Get show list contents
    fetchApi(urlApi)
    function fetchApi(urlApi) {
        $.get({
            url: urlApi,
            dataType: "json",
            success: function (response) {
                // console.log(response.data.data);
                if (response.status == 200) {
                    // Handle content table
                    $('#error').addClass('d-none');
                    $('.table-show-lists').html('');
                    $.each(response.data.data, function (key, value) {
                        $('.table-show-lists').append(`
                            <tr data-id="${value.id}" w-id="${value.work_room_id}">
                                <th>${response.index++}</th>
                                <td class="table-name hover-text-click">
                                    ${value.name}
                                </td>
                                <td class="work-room hover-text-click">
                                    ${value.work_room.name}
                                </td>
                                <td m-id="${value.member_id}" class="member hover-text-click">
                                    ${value.member.name}
                                </td>
                                <td class="text-center">
                                    <button type="submit" class="btn btn-sm btn-edit">
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
            case 'cabinet':
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Cabinet id:</th>
                            <td>${item.id}</td>
                        </tr>
                        <tr>
                            <th>Work room id:</th>
                            <td>${item.work_room_id}</td>
                        </tr>
                        <tr>
                            <th>Member id:</th>
                            <td>${item.member_id}</td>
                        </tr>
                        <tr>
                            <th>Cabinet name:</th>
                            <td>${item.name}</td>
                        </tr>
                        <tr>
                            <th>Work room name:</th>
                            <td>${item.work_room.name}</td>
                        </tr>
                        <tr>
                            <th>Work room address:</th>
                            <td>${item.work_room.location}</td>
                        </tr>
                        <tr>
                            <th>Member name:</th>
                            <td>${item.member.name}</td>
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
            case 'work-room':
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
            default:
                $.each(data, function (key, item) {
                    if (item.member) {
                        $('.table-show-detail').append(`
                            <tr>
                                <th>Member name:</th>
                                <td>${item.member.name}</td>
                            </tr>
                            <tr>
                                <th>Member email:</th>
                                <td>${item.member.email}</td>
                            </tr>
                            <tr>
                                <th>Member address:</th>
                                <td>${item.member.address}</td>
                            </tr>
                            <tr>
                                <th>Member phone:</th>
                                <td>${item.member.phone_number}</td>
                            </tr>
                            <tr>
                                <th>Work position:</th>
                                <td>${item.member.work_position}</td>
                            </tr>
                            <tr>
                                <th>Company name:</th>
                                <td>${item.member.company_name}</td>
                            </tr>
                            <tr>
                                <th>Company address:</th>
                                <td>${item.member.company_address}</td>
                            </tr>
                            <tr>
                                <th>Company email:</th>
                                <td>${item.member.company_email}</td>
                            </tr>
                            <tr>
                                <th>Date join company:</th>
                                <td>${item.member.date_join_company}</td>
                            </tr>
                            <tr>
                                <th>Date left company:</th>
                                <td>${item.member.date_left_company}</td>
                            </tr>
                            <tr>
                                <th>Date created_at:</th>
                                <td>${item.member.created_at}</td>
                            </tr>
                            <tr>
                                <th>Date updated_at:</th>
                                <td>${item.member.updated_at}</td>
                            </tr>
                        `);
                    }
                });
                break;
        }
    }

    // Function show content detail
    function showContentDetail(url, table) {
        $.get({
            url: url,
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
        let url = urlApiEdit + id;
        showContentDetail(url, table = 'cabinet');
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
                    contentTableDetail(response.data, table = 'cabinet');
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
        selectOption(urlApiForeignKey, workRoom, select1);
        selectOption(urlApiForeignKey, member, select2);
    });

    // Add content
    $(document).on('click', '.btn-add', function () {
        let workRoomId = $('#select-1').val();
        let memberId = $('#select-2').val();
        let formData = new FormData($('#form')[0]);
        formData.append('work_room_id', workRoomId);
        formData.append('member_id', memberId);
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
            }
        });
    });

    // Edit content
    $(document).on('click', '.btn-edit', function () {
        let id = $(this).closest('tr').attr('data-id')
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
                        $('input[name=input_id]').val(item.id);
                        $('input[name=name]').val(item.name);
                        selectOption(urlApiForeignKey, workRoom, select1);
                        selectOption(urlApiForeignKey, member, select2);
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
        let id = $('input[name=input_id]').val();
        let workRoomId = $('#select-1').val();
        let memberId = $('#select-2').val();
        let formData = new FormData($('#form')[0]);
        formData.append('work_room_id', workRoomId);
        formData.append('member_id', memberId);
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
            }
        });
    });

    // Click name content show detail
    $(document).on('click', '.table-name', function () {
        let id = $(this).closest('tr').attr('data-id');
        let url = urlApiEdit + id;
        showContentDetail(url, table = 'cabinet');
    });

    // Click name content show detail
    $(document).on('click', '.work-room', function () {
        let id = $(this).closest('tr').attr('data-id');
        let wId = $(this).closest('tr').attr('w-id');
        let url = urlApiEdit + id + '/' + wId;
        showContentDetail(url, table = 'work-room');
    });

    // Click name content show detail
    $(document).on('click', '.member', function () {
        let id = $(this).closest('tr').attr('data-id');
        let wId = $(this).closest('tr').attr('w-id');
        let mId = $(this).attr('m-id');
        let url = urlApiEdit + id + '/' + wId + '/' + mId;
        showContentDetail(url, table = '');
    });
});