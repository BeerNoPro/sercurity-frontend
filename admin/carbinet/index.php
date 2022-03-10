<?php 
    $title = 'Cabinets';
    $baseUrl = "..";
    require_once($baseUrl . '/layout/header.php');
?>

<!-- Link css datepicker -->
<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
<!-- Link css alertify -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>

<div class="row">
    <div class="col-md-12">
        <div class="row-top mt-3 mb-3 d-flex justify-content-between align-items-center">
            <h1 class="">Lists content cabinets</h1>
            <a href="#" class="btn btn-success show-modal" data-bs-toggle="modal" data-bs-target="#modalContents">
                Add new data
            </a>
        </div>
        <h3 class="alert alert-warning d-none" id="error"></h3>
        <table class="table table-bordered table-responsive">
            <thead>
                <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">Cabinet name</th>
                    <th scope="col">Work room name</th>
                    <th scope="col">Member name</th>
                    <th scope="col" class="text-center">Action</th>
                </tr>
            </thead>
            <tbody class="table-show-lists"></tbody>
        </table>
        <!-- Start modal add -->
        <div class="modal" id="modalContents" tabindex="-1" aria-labelledby="modalContents" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" id="form">
                            <ul class="alert alert-warning d-none" id="save_error_list"></ul>
                            <input type="hidden" value="" name="input_id">
                            <div class="form-group mt-3">
                                <label for="" class="form-label">Name:</label>
                                <input type="text" class="form-control" name="name" placeholder="Name...">
                            </div>
                            <div class="form-group mt-3 box-select">
                                <label for="" class="form-label">Work room name:</label>
                                <select id="select-1" class="form-select"></select>
                            </div>
                            <div class="form-group mt-3 box-select">
                                <label for="" class="form-label">Company name:</label>
                                <select id="select-2" class="form-select"></select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" value="" class="btn btn-success btn-handel btn-add">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End modal add -->
        <!-- Start modal show detail -->
        <div class="modal" tabindex="-1" id="modalShowDetail" aria-labelledby="modalShowDetail" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Show content detail</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-show-detail"></table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End modal show detail -->
        <!-- Div show list suggestions  -->
        <div id="contentSearch"></div>
        <!-- Pagination -->
        <div aria-label="..." id="show-pagination" class="custom-pagination">
            <ul class="pagination justify-content-center mt-4"></ul>
        </div>
    </div>
</div>

<!-- Jquery ui datepicker -->
<script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<!-- Alertify link -->
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
<!-- Import file common js -->
<script src="<?=$baseUrl?>/asset/js/common.js"></script>
<!-- Import file handle js -->
<script src="./index.js"></script>

<?php 
    require_once($baseUrl . '/layout/footer.php');
?>