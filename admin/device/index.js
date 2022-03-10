$(document).ready(function () {
    // Link url request
    var urlApi = 'http://127.0.0.1:8000/api/admin/device/';
    var urlApiEdit = 'http://127.0.0.1:8000/api/admin/device-edit/';
    var urlApiForeignKey = 'http://127.0.0.1:8000/api/admin/device-foreign/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/device-search/';

    // Edit placeholder
    $('input[name=search]').attr('placeholder', 'Search name member...');

    // Add background color sidebar 
    $('.device').addClass('sidebar-color');
   
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
                            <tr data-id="${value.id}">
                                <th>${response.index++}</th>
                                <td>${value.ip_address}</td>
                                <td>${value.ip_mac}</td>
                                <td>${value.user_login}</td>
                                <td>${value.version_win}</td>
                                <td>${value.version_virus}</td>
                                <td>${value.update_win}</td>
                                <td m-id="${value.member.id}" class="member hover-text-click">
                                    ${value.member.name}
                                </td>
                                <td class="text-center">
                                    <button type="submit" class="btn btn-sm btn-edit">
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                </td>
                                <td class="text-center">
                                    <button type="submit" class="btn btn-sm btn-show">
                                        <i class="fa-solid fa-folder-open"></i>
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

    // Function content table detail
    function contentTableDetail(data, table) {
        $('.table-show-detail').html('');
        $('#modalShowDetail').modal('show');
        if (table == 'member') {
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
        } else {
            $.each(data, function (key, item) {
                $('.table-show-detail').append(`
                    <tr>
                        <th>Id:</th>
                        <td>${item.id}</td>
                    </tr>
                    <tr>
                        <th>Ip address:</th>
                        <td>${item.ip_address}</td>
                    </tr>
                    <tr>
                        <th>Ip mac:</th>
                        <td>${item.ip_mac}</td>
                    </tr>
                    <tr>
                        <th>User login:</th>
                        <td>${item.user_login}</td>
                    </tr>
                    <tr>
                        <th>Version win:</th>
                        <td>${item.version_win}</td>
                    </tr>
                    <tr>
                        <th>Version virus:</th>
                        <td>${item.version_virus}</td>
                    </tr>
                    <tr>
                        <th>Update win:</th>
                        <td>${item.update_win}</td>
                    </tr>
                    <tr>
                        <th>Member id:</th>
                        <td>${item.member.id}</td>
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

    // Function show select option
    function selectOption(url) {
        $.get({
            url: url,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                $('#select-1').html('')
                if (response.status == 200) {
                    $.each(response.data, function (key, item) { 
                        $('#select-1').append(`<option value="${item.id}">${item.name}</option>`);
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
                    // console.log(response);
                    if (response.status == 200) {
                        $('.result-search').removeClass('d-none');
                        $('.result-search').html('');
                        $.each(response.data, function (key, item) {
                            if (item.member) {
                                $('.result-search').append(`
                                    <li class="hover-text-click" data-id="${item.id}" >${item.member.name}</li>
                                `);
                            }
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
        showContentDetail(urlApiEdit + id, table = 'member');
    });

    // Click button search content
    $(document).on('click', '.btn-search', function (e) {
        e.preventDefault();
        let contentSearch = $('input[name=search]').val();
        $.get({
            url: urlApiSearch + contentSearch,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if (response.status == 200) {
                    contentTableDetail(response.data, table = 'member');
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
        selectOption(urlApiForeignKey);
    });

    // Add content
    $(document).on('click', '.btn-add', function () {
        let id1 = $('#select-1').val();
        let formData = new FormData($('#form')[0]);
        formData.append('member_id', id1);
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
        let id = $(this).closest('tr').attr('data-id');
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
                        $('input[name=ip_address]').val(item.ip_address);
                        $('input[name=ip_mac]').val(item.ip_mac);
                        $('input[name=user_login]').val(item.user_login);
                        $('input[name=version_win]').val(item.version_win);
                        $('input[name=version_virus]').val(item.version_virus);
                        $('input[name=update_win]').val(item.update_win);
                        selectOption(urlApiForeignKey);
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
        let memberId = $('#select-1').val();
        let formData = new FormData($('#form')[0]);
        formData.append('member_id', memberId)
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

    // Click button show content detail
    $(document).on('click', '.btn-show', function () {
        let id = $(this).closest('tr').attr('data-id');
        let url = urlApiEdit + id;
        showContentDetail(url, table = '');
    });

    // Click name member show content detail
    $(document).on('click', '.member', function () {
        let id = $(this).closest('tr').attr('data-id');
        let mId = $(this).attr('m-id');
        let url = urlApiEdit + id + '/' + mId;
        showContentDetail(url, table = 'member');
    });
});