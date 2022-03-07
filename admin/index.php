<?php 
    $title = 'View home';
    $baseUrl = ".";
    require_once('./layout/header.php');
?>

<!-- Link css alertify -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>

<div class="row">
    <div class="col-md-12">
        <div class="card mt-5">
            <div class="card-header text-center">
                <h2>List content security app</h2>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-responsive table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Company</th>
                            <th>Work room</th>
                            <th>Project</th>
                            <th>Member</th>
                        </tr>
                    </thead>
                    <tbody class="tbody-primary"></tbody>
                </table>
                <!-- Pagination -->
                <div aria-label="..." id="show-pagination" class="custom-pagination">
                    <ul class="pagination justify-content-center mt-4"></ul>
                </div>
            </div>
        </div>
        <!-- Start modal show detail -->
        <div class="modal" tabindex="-1" id="modalShowDetail">
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
    </div>
</div>

<!-- Alertify link -->
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
<!-- Link file js handle -->
<script src="<?=$baseUrl?>/asset/js/home.js"></script>

<?php 
    require_once('./layout/footer.php');
?>