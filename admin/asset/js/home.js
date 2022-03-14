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

    // Get new date today
    var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

    // Get list content
    getContent(urlApi)
    function getContent(url) {
        $.get({
            url: url,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if (response.status == 200) {
                    console.log(response.data);
                    // Render first value work room in array
                    $('.box-body-wr, .project-done, .project-doing, .tbody-work-room, .tbody-project').html('');
                    $.each(response.data, function (key, valWorkRoom) {
                        if (key == 0) {
                            // Render project
                            $index = 1;
                            $.each(valWorkRoom.project, function (keyProject, valProject) {
                                if (new Date(valProject.time_completed) <= new Date(strDate)) {
                                    // Render project done
                                    $('.project-done').append(`
                                        <div class="btn-project mb-2 p-1 fs-14 
                                            hover border rounded-3"
                                        >
                                            ${valProject.name}
                                        </div>
                                    `);
                                } else {
                                    // Render project doing
                                    if (keyProject == 0) {
                                        // Add color in first item
                                        $('.project-doing').append(`
                                            <div class="btn-project mb-2 p-1 fs-14 
                                                hover border rounded-3 btn-primary"
                                            >
                                                ${valProject.name}
                                            </div>
                                        `);
                                    } else {
                                        $('.project-doing').append(`
                                            <div class="btn-project mb-2 p-1 fs-14 
                                                hover border rounded-3"
                                            >
                                                ${valProject.name}
                                            </div>
                                        `);
                                    }
                                }
                                // Render project details
                                $('.tbody-project').append(`
                                    <tr>
                                        <td>${$index++}</td>
                                        <td class="hover-text-click">${valProject.name}</td>
                                        <td>${valProject.time_start}</td>
                                        <td>${valProject.time_completed}</td>
                                    </tr>
                                `);
                            });
                            // Add color in first item work room
                            $('.box-body-wr').append(`
                                <div class="btn-work-room mb-2 p-1 fs-14 border btn-primary rounded-3">
                                    ${valWorkRoom.name}
                                </div>
                            `);
                            // Render work room detail
                            $('.tbody-work-room').append(`
                                <tr>
                                    <td>1</td>
                                    <td class="hover-text-click">${valWorkRoom.name}</td>
                                    <td>${valWorkRoom.location}</td>
                                </tr>
                            `);
                        } else {
                            $('.box-body-wr').append(`
                                <div class="btn-work-room mb-2 p-1 fs-14 border rounded-3">
                                    ${valWorkRoom.name}
                                </div>
                            `);
                        }
                    });
                } else {
                    // Alert notification error
                    alertError(response.message);
                }
            }, error: function(error) {
                console.log(error);
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