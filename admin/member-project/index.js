$(document).ready(function () {
    // Link url request
    var urlApi = 'http://127.0.0.1:8000/api/admin/member-project/';
    var urlApiForeignKey = 'http://127.0.0.1:8000/api/admin/member-project-foreign/';
    var urlApiEdit = 'http://127.0.0.1:8000/api/admin/member-project-edit/';
    var urlApiUpdate = 'http://127.0.0.1:8000/api/admin/member-project-update/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/member-project-search/';

    var table1 = 'project';
    var table2 = 'member';
    var select1 = $('#select-1');
    var select2 = $('#select-2');

    // Edit placeholder
    $('input[name=search]').attr('placeholder', 'Search name project...');
   
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
                            <tr p-id="${value.project_id}" m-id="${value.member_id}">
                                <th>${response.index++}</th>
                                <td name="project" class="table-name hover-text-click">
                                    ${value.project.name}
                                </td>
                                <td name="member" class="table-name hover-text-click">
                                    ${value.member.name}
                                </td>
                                <td>${value.role}</td>
                                <td>${value.time_member_join}</td>
                                <td>${value.time_member_completed}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm btn-edit">
                                        Edit
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
                            <td>${item.project.id}</td>
                        </tr>
                        <tr>
                            <th>Project name:</th>
                            <td>${item.project.name}</td>
                        </tr>
                        <tr>
                            <th>Time start:</th>
                            <td>${item.project.time_start}</td>
                        </tr>
                        <tr>
                            <th>Time completed:</th>
                            <td>${item.project.time_completed}</td>
                        </tr>
                        <tr>
                            <th>Date created_at:</th>
                            <td>${item.project.created_at}</td>
                        </tr>
                        <tr>
                            <th>Date updated_at:</th>
                            <td>${item.project.updated_at}</td>
                        </tr>
                    `);
                });
                break;
            case 'member':
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Member id:</th>
                            <td>${item.member.id}</td>
                        </tr>
                        <tr>
                            <th>Member name:</th>
                            <td>${item.member.name}</td>
                        </tr>
                        <tr>
                            <th>Member email:</th>
                            <td>${item.member.email}</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>${item.member.address}</td>
                        </tr>
                        <tr>
                            <th>Phone:</th>
                            <td>${item.member.phone_number}</td>
                        </tr>
                        <tr>
                            <th>Work position:</th>
                            <td>${item.member.work_position}</td>
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
                });
                break;
            case 'search':
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Project name:</th>
                            <td>${item.project_name}</td>
                        </tr>
                        <tr>
                            <th>Member name:</th>
                            <td>${item.member_name}</td>
                        </tr>
                        <tr>
                            <th>Work position in project:</th>
                            <td>${item.role}</td>
                        </tr>
                        <tr>
                            <th>Date member join:</th>
                            <td>${item.time_member_join}</td>
                        </tr>
                        <tr>
                            <th>Date member completed:</th>
                            <td>${item.time_member_completed}</td>
                        </tr>
                        <tr>
                            <th>Date created_at:</th>
                            <td>${item.created_at}</td>
                        </tr>
                        <tr>
                            <th>Date updated_at:</th>
                            <td>${item.updated_at}</td>
                        </tr>
                    `);
                });
                break;
            default:
                $.each(data, function (key, item) {
                    if (item.project) {
                        $('.table-show-detail').append(`
                            <tr>
                                <th>Project name:</th>
                                <td>${item.project.name}</td>
                            </tr>
                            <tr>
                                <th>Member name:</th>
                                <td>${item.member.name}</td>
                            </tr>
                            <tr>
                                <th>Work position in project:</th>
                                <td>${item.role}</td>
                            </tr>
                            <tr>
                                <th>Date member join:</th>
                                <td>${item.time_member_join}</td>
                            </tr>
                            <tr>
                                <th>Date member completed:</th>
                                <td>${item.time_member_completed}</td>
                            </tr>
                            <tr>
                                <th>Date created_at:</th>
                                <td>${item.created_at}</td>
                            </tr>
                            <tr>
                                <th>Date updated_at:</th>
                                <td>${item.updated_at}</td>
                            </tr>
                        `);
                    }
                });
                break;
        }
    }

    // Function show content detail
    function showContentDetail(urlApi, table) {
        $.get({
            url: urlApi,
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
                    // console.log(response);
                    if (response.status == 200) {
                        $('.result-search').removeClass('d-none');
                        $('.result-search').html('');
                        $.each(response.data, function (key, item) {
                            if (item.project) {
                                $('.result-search').append(`
                                    <li class="hover-text-click" p-id="${item.project_id}" 
                                        m-id="${item.member_id}"
                                    >
                                        ${item.project.name}
                                    </li>
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
        let pId = $(this).attr('p-id');
        let mId = $(this).attr('m-id');
        let url = urlApiEdit + pId + '/' + mId;
        let table = '';
        let content = $(this).text().trim();
        $('input[name=search]').val(content);
        $('.result-search').addClass('d-none');
        showContentDetail(url, table);
    });

    // Click button search content
    $(document).on('click', '.btn-search', function (e) {
        e.preventDefault();
        let contentSearch = $('input[name=search]').val();
        let table = '';
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
        selectOption(urlApiForeignKey, table1, select1);
        selectOption(urlApiForeignKey, table2, select2);
    });

    // Add content
    $(document).on('click', '.btn-add', function () {
        let id1 = $('#select-1').val();
        let id2 = $('#select-2').val();
        let formData = new FormData($('#form')[0]);
        formData.append('project_id', id1);
        formData.append('member_id', id2);
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
        let pId = $(this).closest('tr').attr('p-id');
        let mId = $(this).closest('tr').attr('m-id');
        let url = urlApiEdit + pId + '/' + mId;
        $.get({
            url:url,
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
                        $('input[name=input_id_1]').val(item.project_id);
                        $('input[name=input_id_2]').val(item.member_id);
                        $('input[name=role]').val(item.role);
                        $('input[name=time_member_join]').val(item.time_member_join);
                        $('input[name=time_member_completed]').val(item.time_member_completed);
                        selectOption(urlApiForeignKey, table1, select1);
                        selectOption(urlApiForeignKey, table2, select2);
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
        let id1 = $('input[name=input_id_1]').val();
        let id2 = $('input[name=input_id_2]').val();
        let id1New = $('#select-1').val();
        let id2New = $('#select-2').val();
        let formData = new FormData($('#form')[0]);
        formData.append('project_id', id1New);
        formData.append('member_id', id2New);
        $.post({
            url: urlApiUpdate + id1 + '/' + id2,
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
        let pId = $(this).closest('tr').attr('p-id');
        let mId = $(this).closest('tr').attr('m-id');
        let url = urlApiEdit + pId + '/' + mId;
        let table = $(this).attr('name')
        showContentDetail(url, table);
    });
});
