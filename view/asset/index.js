$(document).ready(function () {
    // Link url api
    const urlApi = 'http://127.0.0.1:8000/api/view/';

    // Get list content
    getContent(urlApi)
    function getContent(url) {
        $.get({
            url: url,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if (response.status == 200) {
                    $('.tbody-primary').html('');
                    // Render content html
                    $.each(response.data.data, function (key, el) {
                        // console.log(key);
                        $('.tbody-primary').append(`
                            <tr>
                                <td>${response.index++}</td>
                                <td class="tb-item" data-tb="company" data-id="${el.company_id}">
                                    ${el.company}
                                </td>
                                <td class="tb-item" data-tb="work_room" data-id="${el.work_room_id}">
                                    ${el.work_room}
                                </td>
                                <td class="tb-project" data-id="${el.project_id}">${el.project}</td>
                                <td class="tb-member" data-id="${el.member_id}">${el.member}</td>
                            </tr>
                        `);
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
                    console.log(response.message);
                }
            }
        });
    }

    // Click show content detail company and worm room
    $(document).on('click', '.tb-item', function () {
        let id = $(this).attr('data-id');
        let table = $(this).attr('data-tb');
        $.get({
            url: urlApi + table + '/' + id,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                if (response.status == 200) {
                    $('.table-show-detail').html('');
                }
            }
        });
        // console.log(id, table);
        // $('#modalShowDetail').modal('show')
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