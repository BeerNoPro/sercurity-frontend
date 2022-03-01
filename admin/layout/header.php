
<?php
   
//    $baseUrl = '..';
    
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?=$title?></title>

        <!-- bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- custom css link -->
        <link rel="stylesheet" href="<?=$baseUrl?>/asset/css/style.css">

        <!-- bootstrap -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" ></script>
        <!-- jquery -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    </head>
    <body>
        <!-- Icon completed -->
        <div id="icon-loading" class="text-primary d-none">
            <div class="spinner-border icon-loading" role="status"></div>
            <span class="sr-only content-loading">Loading...</span>
        </div>
        <!-- content -->
        <div class="container-fluid">
            <div class="header header-content">
                <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow p-3">
                    <div class="row w-100">
                        <div class="col-md-2">
                            <a class="navbar-brand col-sm-3 col-md-2 mr-0 text-center" href="#">
                                View admin
                            </a>
                        </div>
                        <div class="col-md-10 d-flex ps-0">
                            <input class="form-control form-control-dark w-100 input-search" type="text" name="search"
                            placeholder=" Search..." autocomplete="off">
                            <!-- onkeyup="showHint(this.value)" -->
                            <ul class="navbar-nav px-3 ms-3 btn-search-box">
                                <li class="nav-item-logout text-nowrap btn-search">
                                    <a class="nav-link" href="">Search</a>
                                </li>
                            </ul>
                            <ul class="result-search d-none"></ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="row row-content">
                <nav class="col-md-2 d-md-block bg-dark sidebar">
                    <div class="pt-3 sidebar-custom">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>">
                                    <i class="icon_house_alt"></i>
                                    Home
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/company/">
                                    <i class="icon_folder-alt"></i>
                                    Company
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/work-room/">
                                    <i class="icon_film"></i>
                                    Work room
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/member/">
                                    <i class="icon_cart_alt"></i>
                                    Member
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/project/">
                                    <i class="icon_question_alt2"></i>
                                    Project
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/member-project/">
                                    <i class="icon_profile"></i>
                                    Member project
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/training/">
                                    <i class="icon_profile"></i>
                                    Training
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/training-room/">
                                    <i class="icon_profile"></i>
                                    Training room
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/device/">
                                    <i class="icon_profile"></i>
                                    Device
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?=$baseUrl?>/carbinet/">
                                    <i class="icon_profile"></i>
                                    Carbinet
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main role="main" class="col-md-10">
                    