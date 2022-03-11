$(document).ready(function () {
    // Link url request
    var urlApi = 'http://127.0.0.1:8000/api/admin/member/';
    var urlApiForeignKey = 'http://127.0.0.1:8000/api/admin/member-foreign/';
    var urlApiEdit = 'http://127.0.0.1:8000/api/admin/member-edit/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/member-search/';

    // Edit placeholder
    $('input[name=search]').attr('placeholder', 'Search name member...');

    // Add background color sidebar 
    $('.member').addClass('sidebar-color');
   
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
                            <tr>
                                <th>${response.index++}</th>
                                <td data-id="${value.id}" class="table-name hover-text-click">
                                    ${value.name}
                                </td>
                                <td>${value.email}</td>
                                <td>${value.phone_number}</td>
                                <td>${value.work_position}</td>
                                <td>${value.date_join_company}</td>
                                <td m-id="${value.id}" c-id="${value.company.id}" class="company hover-text-click">
                                    ${value.company.name}
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

    // Function content table detail
    function contentTableDetail(data, table) {
        $('.table-show-detail').html('');
        $('#modalShowDetail').modal('show');
        if (table == 'company') {
            $.each(data, function (key, item) {
                $('.table-show-detail').append(`
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
        } else {
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
                        <th>Email:</th>
                        <td>${item.email}</td>
                    </tr>
                    <tr>
                        <th>Address:</th>
                        <td>${item.address}</td>
                    </tr>
                    <tr>
                        <th>Phone number:</th>
                        <td>${item.phone_number}</td>
                    </tr>
                    <tr>
                        <th>Work position:</th>
                        <td>${item.work_position}</td>
                    </tr>
                    <tr>
                        <th>Date join company:</th>
                        <td>${item.date_join_company}</td>
                    </tr>
                    <tr>
                        <th>Date left company:</th>
                        <td>${item.date_left_company}</td>
                    </tr>
                    <tr>
                        <th>Company id:</th>
                        <td>${item.company.id}</td>
                    </tr>
                    <tr>
                        <th>Company name:</th>
                        <td>${item.company.name}</td>
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
    function showContentDetail(urlApi, id) {
        let table = 'member';
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

    // Function show select option
    function selectOption(url) {
        let table = 'company';
        $.get({
            url: url + table,
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
        let table = 'member';
        $.get({
            url: urlApiSearch + contentSearch,
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
        let companyId = $('#select-1').val();
        let formData = new FormData($('#form')[0]);
        formData.append('company_id', companyId);
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
                        $('input[name=email]').val(item.email);
                        $('input[name=address]').val(item.address);
                        $('input[name=phone_number]').val(item.phone_number);
                        $('input[name=work_position]').val(item.work_position);
                        $('input[name=date_join_company]').val(item.date_join_company);
                        $('input[name=date_left_company]').val(item.date_left_company);
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
        let id = $('input[name=id]').val();
        let companyId = $('#select-1').val();
        let formData = new FormData($('#form')[0]);
        formData.append('company_id', companyId)
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

    // Click name member show content detail
    $(document).on('click', '.table-name', function () {
        let id = $(this).attr('data-id');
        showContentDetail(urlApiEdit, id);
    });

    // Click name member show content detail
    $(document).on('click', '.company', function () {
        let companyId = $(this).attr('c-id');
        let memberId = $(this).attr('m-id');
        let table = 'company';
        $.get({
            url: urlApiEdit + memberId + '/' + companyId,
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