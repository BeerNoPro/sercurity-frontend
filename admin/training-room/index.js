$(document).ready(function () {
    // Link url request
    var urlApi = 'http://127.0.0.1:8000/api/admin/training-room/';
    var urlApiEdit = 'http://127.0.0.1:8000/api/admin/training-room-edit/';
    var urlApiUpdate = 'http://127.0.0.1:8000/api/admin/training-room-update/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/admin/training-room-search/';
    var urlApiSupQuery = 'http://127.0.0.1:8000/api/admin/training-room-sub-query/';
    var urlApiForeignKey = 'http://127.0.0.1:8000/api/admin/training-room-foreign/';

    var urlApiShowMember = 'http://127.0.0.1:8000/api/admin/member-edit/';
    var urlApiShowProject = 'http://127.0.0.1:8000/api/admin/project-edit/';

    var table1 = 'training';
    var table2 = 'member';
    var select1 = $('#select-1');
    var select2 = $('#select-2');

    // Edit placeholder
    $('input[name=search]').attr('placeholder', 'Search name trainer...');

    // Add background color sidebar 
    $('.training-room').addClass('sidebar-color');
   
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
                            <tr t-id="${value.training_id}" m-id="${value.member_id}">
                                <th>${response.index++}</th>
                                <td data-id="${value.training.trainer}" class="member hover-text-click">
                                    ${value.training.trainer_name}
                                </td>
                                <td data-id="${value.member_id}" class="member hover-text-click">
                                    ${value.trained.name}
                                </td>
                                <td data-id="${value.training.project_id}" class="project hover-text-click">
                                    ${value.training.project_name}
                                </td>
                                <td>${value.training.content}</td>
                                <td>${value.date_start}</td>
                                <td>${value.date_completed}</td>
                                <td>${value.result}</td>
                                <td>${value.note}</td>
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
            case 'member':
                $.each(data, function (key, item) {
                    // console.log(item);
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
                break;
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
            default:
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Trainer id:</th>
                            <td>${item.trainer_id}</td>
                        </tr>
                        <tr>
                            <th>Trainer name:</th>
                            <td>${item.trainer_name}</td>
                        </tr>
                        <tr>
                            <th>Trained id:</th>
                            <td>${item.trained_id}</td>
                        </tr>
                        <tr>
                            <th>Trained name:</th>
                            <td>${item.trained_name}</td>
                        </tr>
                        <tr>
                            <th>Time start:</th>
                            <td>${item.date_start}</td>
                        </tr>
                        <tr>
                            <th>Time completed:</th>
                            <td>${item.date_completed}</td>
                        </tr>
                        <tr>
                            <th>Result:</th>
                            <td>${item.result}</td>
                        </tr>
                        <tr>
                            <th>Note:</th>
                            <td>${item.note}</td>
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

    // Function show select option 
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

    // Function show select option sub query
    function selectOptionSubQuery(url, select) {
        $.get({
            url: url,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                $(select).html('')
                if (response.status == 200) {
                    $.each(response.data, function (key, item) {
                        $(select).append(`<option value="${item.id}">${item.trainer_name}</option>`);
                    });
                } else {
                    // Alert notification error
                    alertError(response.message);
                }
            }
        });
    }

    // Click name content show detail
    $(document).on('click', '.member', function () {
        let mId = $(this).attr('data-id');
        let url = urlApiShowMember + mId
        showContentDetail(url, table = 'member');
    });

    // Click name content show detail
    $(document).on('click', '.project', function () {
        let pId = $(this).attr('data-id');
        let url = urlApiShowProject + pId;
        showContentDetail(url, table = 'project');
    });

    // Get content foreign key in table
    $(document).on('click', '.show-modal', function () {
        selectOptionSubQuery(urlApiSupQuery, select1);
        selectOption(urlApiForeignKey, table2, select2);
    });

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
                            if (item.training) {
                                $('.result-search').append(`
                                    <li class="hover-text-click" data-id="${item.training.trainer}">
                                        ${item.training.trainer_name}
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
        let id = $(this).attr('data-id');
        let content = $(this).text().trim();
        let url = urlApiShowMember + id;
        $('input[name=search]').val(content);
        $('.result-search').addClass('d-none');
        showContentDetail(url, table = 'member');
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
                    $.each(response.data, function (key, item) { 
                        if (item.training) {
                            // console.log(item);
                            var id = item.training.trainer;
                            var url = urlApiShowMember + id;
                            showContentDetail(url, table = 'member');
                        }
                    });
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

    // Add content
    $(document).on('click', '.btn-add', function () {
        let id1 = $('#select-1').val();
        let id2 = $('#select-2').val();
        let formData = new FormData($('#form')[0]);
        formData.append('training_id', id1);
        formData.append('member_id', id2);
        $.post({
            url: urlApi,
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response);
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
        let tId = $(this).closest('tr').attr('t-id');
        let mId = $(this).closest('tr').attr('m-id');
        $.get({
            url: urlApiEdit + tId + '/' + mId,
            dataType: "json",
            success: function (response) {
                // console.log(response);
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
                        $('input[name=input_id_1]').val(item.training_id);
                        $('input[name=input_id_2]').val(item.member_id);
                        $('input[name=date_start]').val(item.date_start);
                        $('input[name=date_completed]').val(item.date_completed);
                        $('textarea[name=result]').val(item.result);
                        $('textarea[name=note]').val(item.note);
                        selectOptionSubQuery(urlApiSupQuery, select1);
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
        formData.append('training_id', id1New);
        formData.append('member_id', id2New);
        $.post({
            url: urlApiUpdate + id1 + '/' + id2,
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

});
