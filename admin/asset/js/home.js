$(document).ready(function () {
    // Link url api
    var urlApi = 'http://127.0.0.1:8000/api/view/home/';
    var urlApiMember = 'http://127.0.0.1:8000/api/view/member/';
    var urlApiSearch = 'http://127.0.0.1:8000/api/view/search/';
    var urlApiCompanyWorkRoom = 'http://127.0.0.1:8000/api/view/company-workroom/';

    
    // Edit placeholder input search
    $('input[name=search]').attr('placeholder', 'Search name company...');

    // Add background color sidebar 
    $('.home').addClass('sidebar-color');

    // Get list content
    getContent(urlApi)
    function getContent(url) {
        $.get({
            url: url,
            dataType: "json",
            success: function (response) {
                // console.log(response.data.data);
                if (response.status == 200) {
                    $('.tbody-primary').html('');
                    // Render content html
                    $.each(response.data.data, function (key, el) {
                        $.each(el.member, function (key, member) {
                            $('.tbody-primary').append(`
                                <tr>
                                    <td>${response.index++}</td>
                                    <td class="tb-item" data-tb="company" data-id="${el.company.id}">
                                        ${el.company.name}
                                    </td>
                                    <td class="tb-item" data-tb="work_room" data-id="${el.work_room.id}">
                                        ${el.work_room.name}
                                    </td>
                                    <td class="tb-project" data-id="${el.id}">${el.name}</td>
                                    <td class="tb-member" data-id="${member.id}">${member.name}</td>
                                </tr>
                            `);
                        });
                    });
                    // Render pagination
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
                    // Alert notification error
                    alertError(response.message);
                }
            }
        });
    }

    // Function get content table detail
    function contentTableDetail(data, table) {
        $('.table-show-detail').html('');
        $('#modalShowDetail').modal('show');
        switch (table) {
            case 'company':
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
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
            case 'work_room':
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Name:</th>
                            <td>${item.name}</td>
                        </tr>
                        <tr>
                            <th>Location:</th>
                            <td>${item.location}</td>
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
            case 'project':
                $.each(data, function (key, item) {
                    $('.table-show-detail').append(`
                        <tr>
                            <th>Project name:</th>
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
                            <th>Company address:</th>
                            <td>${item.company.address}</td>
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
                    $('.table-show-detail').append(`
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
                            <th>Phone:</th>
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
                            <th>Company name:</th>
                            <td>${item.company.name}</td>
                        </tr>
                        <tr>
                            <th>Company address:</th>
                            <td>${item.company.address}</td>
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
        }
    }

    // Function show content detail
    function showContentDetail(url, table) {
        $.get({
            url: url,
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.status == 200) {
                    contentTableDetail(response.data, table);
                } else {
                    // Alert notification add fail
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
                    // console.log(response.data);
                    if (response.status == 200) {
                        $('.result-search').removeClass('d-none');
                        $('.result-search').html('');
                        $.each(response.data, function (key, item) {
                            // console.log(item);
                            $('.result-search').append(`
                                <li class="hover-text-click" data-id="${item.id}" >${item.company.name}</li>
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
        // showContentDetail(url, table = 'cabinet');
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

    // Click show content detail company and worm room
    $(document).on('click', '.tb-item', function () {
        let id = $(this).attr('data-id');
        let table = $(this).attr('data-tb');
        let url = urlApiCompanyWorkRoom + table + '/' + id;
        showContentDetail(url, table);
    });

    // Click show content detail project
    $(document).on('click', '.tb-project', function () {
        let id = $(this).attr('data-id');
        let table = 'project';
        let url = urlApi + id;
        showContentDetail(url, table);
    });

    // Click show content detail member
    $(document).on('click', '.tb-member', function () {
        let id = $(this).attr('data-id');
        let table = 'member';
        let url = urlApiMember + id;
        showContentDetail(url, table);
    });

    // Click pages pagination
    $(document).on('click', '.page-item', function (e) {
        e.preventDefault();
        let linkPage = $(this).find('a').attr('href');
        if (linkPage != 'null') {
            getContent(linkPage)
        }
    });
});