const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

function addChapter() {
    if (input.value !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        li.append(deleteButton);
        list.append(li);
        deleteButton.addEventListener('click', function () {
            li.remove();
        })
        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
}
addButton.addEventListener('click', addChapter);

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addChapter();
    }
});

