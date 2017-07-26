<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script type="text/javascript" src="jquery.js"></script>
</head>
<body>
    <div id="asd"><input type="radio" name="asd"></div>
    <div id="zxc"></div>
    <a
        type="radio"
        class="binder"
        data-name="binder-1"
        data-target="#asd"
        data-css="background: red"
        data-radio-inset
        data-addclass="active"
        data-replace="<p>Test-1</p>"
        data-replace-target-0="#asd"
        data-replace-target-1="#zxc"
        data-value="spgimdgmw"
        data-value-target="#zxc"
        style="background: #e6e6e6; padding: 20px; display: inline-block;"
    >
        <input type="radio" name="test">
    </a>
    <a
        type="radio"
        class="binder"
        data-name="binder-1"
        data-target="#asd"
        data-css="background: red"
        data-radio-inset
        data-addclass="active"
        data-replace="<p>Test-2</p>"
        data-replace-target-0="#asd"
        data-replace-target-1="#zxc"
        style="background: #e6e6e6; padding: 20px; display: inline-block;"
    >
        <input type="radio" name="test">
    </a>

    <a
        type="radio"
        class="binder"
        data-name="binder-2"
        data-target="#asd"
        data-css="background: blue"
        data-radio-inset
        data-addclass="active"
        data-replace="<p>Test-3</p>"
        data-replace-target-0="#asd"
        data-replace-target-1="#zxc"
        style="background: #e6e6e6; padding: 20px; display: inline-block;"
    >
        <input type="radio" name="test2">
    </a>
</body>
<script type="text/javascript" src="binder.js"></script>
<script type="text/javascript" src="main.js"></script>
</html>
