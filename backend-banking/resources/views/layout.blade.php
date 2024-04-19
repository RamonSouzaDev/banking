@section('title', 'banking')
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>@yield('title', 'Vito - Responsive Bootstrap 4 Admin Dashboard Template')</title>
    <link rel="shortcut icon" href="{{ asset('/images/fav.ico') }}" />
    <link rel="stylesheet" href="{{ asset('/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/typography.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/responsive.css') }}">
    @yield('styles')
</head>
<body>
    @if(!isset($hideMenu) || !$hideMenu)
        @include('menu')
    @endif
    @yield('content')
    @include('footer')
</body>
</html>

<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('js/popper.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<!-- Appear JavaScript -->
<script src="{{ asset('js/jquery.appear.js') }}"></script>
<!-- Countdown JavaScript -->
<script src="{{ asset('js/countdown.min.js') }}"></script>
<!-- Counterup JavaScript -->
<script src="{{ asset('js/waypoints.min.js') }}"></script>
<script src="{{ asset('js/jquery.counterup.min.js') }}"></script>
<!-- Wow JavaScript -->
<script src="{{ asset('js/wow.min.js') }}"></script>
<!-- Apexcharts JavaScript -->
<script src="{{ asset('js/apexcharts.js') }}"></script>
<!-- Slick JavaScript -->
<script src="{{ asset('js/slick.min.js') }}"></script>
<!-- Select2 JavaScript -->
<script src="{{ asset('js/select2.min.js') }}"></script>
<!-- Owl Carousel JavaScript -->
<script src="{{ asset('js/owl.carousel.min.js') }}"></script>
<!-- Magnific Popup JavaScript -->
<script src="{{ asset('js/jquery.magnific-popup.min.js') }}"></script>
<!-- Smooth Scrollbar JavaScript -->
<script src="{{ asset('js/smooth-scrollbar.js') }}"></script>
<!-- Chart Custom JavaScript -->
<!-- Custom JavaScript -->
<script src="{{ asset('js/custom.js') }}"></script>

