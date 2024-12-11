$(function () {
    var selected = $();
    const defaultClass = "bg-gray-100 rounded border border-gray-300 p-2 mb-2";
    const selectedClass = "selected bg-orange-200";
    const unselectedClass = "bg-gray-100";

    function createItem() {
        const value = getInputValue();
        const li = $('<li>');
        li.addClass(defaultClass);
        li.text(value);
        return li;
    }

    function getInputValue() {
        return $('#input-text').val().trim() || 'New Item';
    }

    $('#btn-append').on('click', function () {
        const element = createItem();
        $('#item-list').append(element);
        $('#input-text').val('');
    });

    $('#btn-prepend').on('click', function () {
        const element = createItem();
        $('#item-list').prepend(element);
        $('#input-text').val('');
    });

    $('#btn-before').on('click', function () {
        if (selected.length) {
            const element = createItem();
            selected.before(element);
            $('#input-text').val('');
        } else {
            alert('選択中の要素がありません。');
        }
    });

    $('#btn-after').on('click', function () {
        if (selected.length) {
            const element = createItem();
            selected.after(element);
            $('#input-text').val('');
        } else {
            alert('選択中の要素がありません。');
        }
    });

    $('#btn-remove').on('click', function () {
        if (selected) {
            selected.remove();
            selected = $();
        } else {
            alert('選択中の要素がありません。');
        }
    });

    $('#item-list').on('click', 'li', function () {
        $('#item-list li').removeClass(selectedClass).addClass(unselectedClass);
        if ($(this).is(selected)) {
            selected = $();
        } else {
            selected = $(this);
            $(this).addClass(selectedClass).removeClass(unselectedClass);
        }
    });
});