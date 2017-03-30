$(document).ready(function () {
    $('.switch-version').change(function () {
        window.location = '/demo/' + $(this).val();
    });
});