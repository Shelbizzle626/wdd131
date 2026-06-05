const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

let chaptersArray = getChapterList() || [];

chaptersArray.forEach((chapter) => {
    displayList(chapter);
})

function addChapter() {
    if (input.value !== '') {
        const chapter = titleCase(input.value);
        displayList(chapter);
        chaptersArray.push(chapter);
        setChapterList();
        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
}

function titleCase(str) {
    return str
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

button.addEventListener('click', addChapter);

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addChapter();
    }
});

function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    li.textContent = item;
    deleteButton.textContent = '❌';
    li.append(deleteButton);
    list.append(li);
    deleteButton.addEventListener('click', function () {
        deleteChapter(li.textContent);
        li.remove();
    });
}

function setChapterList() {
    localStorage.setItem('favBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('favBOMList'));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
}