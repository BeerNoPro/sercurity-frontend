$(document).ready(function () {
    // Link url request
    var urlApiForeignKey = 'http://127.0.0.1:8000/api/admin/device-foreign/';
    var urlApi = 'http://127.0.0.1:8000/api/admin/device/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/device-search/';
   
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
                                <td>${value.ip_address}</td>
                                <td>${value.ip_mac}</td>
                                <td>${value.user_login}</td>
                                <td>${value.version_win}</td>
                                <td>${value.version_virus}</td>
                                <td>${value.update_win}</td>
                                <td>${value.member_name}</td>
                                <td>
                                    <button type="submit" value="${value.id}" class="btn btn-warning btn-sm btn-edit">Edit</button>
                                </td>
                                <td>
                                    <button type="submit" value="${value.id}" class="btn btn-primary btn-sm btn-show">Show</button>
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
    function contentTableDetail(data) {
        $('.table-show-detail').html('');
        $('#modalShowDetail').modal('show');
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
                    <td>${item.member_id}</td>
                </tr>
                <tr>
                    <th>Member name:</th>
                    <td>${item.member_name}</td>
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
                                <li class="hover-text-click" data-id="${item.id}" >${item.user_login}</li>
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
                console.log(response);
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
                    alertify.set('notifier','position', 'top-right');
                    alertify.error(response.message);
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
    $(document).on('click', '.btn-show', function () {
        let id = $(this).val();
        showContentDetail(urlApi, id);
    });
});