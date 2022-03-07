<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View security</title>
    <!-- bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- custom css link -->
    <link rel="stylesheet" href="./asset/style.css">

    <!-- bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" ></script>
    <!-- jquery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <div class="container">
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
</body>
<script src="./asset/index.js"></script>
</html>