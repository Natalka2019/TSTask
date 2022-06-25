"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
const allPostsURL = 'https://jsonplaceholder.typicode.com/posts';
const filteredPostsURL = 'https://jsonplaceholder.typicode.com/posts/';
const postsList = document.querySelector('.postsList');
const filterButton = document.querySelector('.filterButton');
const showAllButton = document.querySelector('.showAllButton');
const input = document.querySelector('.actions__input');
const errorMessage = document.querySelector('.error');
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createSelectedPost(+input.value);
    }
});
filterButton.addEventListener("click", () => {
    createSelectedPost(+input.value);
});
showAllButton.addEventListener("click", () => {
    input.value = '';
    createAllPostsList();
});
function createAllPostsList() {
    return __awaiter(this, void 0, void 0, function* () {
        postsList.innerHTML = "";
        const posts = yield fetchData(allPostsURL);
        if (posts) {
            if (posts.length > 0) {
                const allPosts = posts.map(post => renderPost(post)).join('');
                postsList.innerHTML = allPosts;
            }
            else {
                postsList.innerHTML = "No posts available";
            }
        }
    });
}
;
function createSelectedPost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        postsList.innerHTML = "";
        const post = yield fetchData(`${filteredPostsURL}${id}`);
        postsList.innerHTML = renderPost(post);
    });
}
;
function fetchData(URL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(URL);
            const data = yield response.json();
            if (!Array.isArray(data) && Object.keys(data).length === 0) {
                throw Error();
            }
            else {
                return data;
            }
        }
        catch (e) {
            console.log(e);
            errorMessage.innerHTML = 'Oooops! Something went wrong. Please, try again later.';
        }
    });
}
;
function renderPost(post) {
    if ("id" in post) {
        const { userId, id, title, body } = post;
        return `<li class="post" id=${id}>
              <p class="post__userId">User:${userId}</p>
              <h4 class="post__title">${title}</h4>
              <p class="post__id">Post id:${id}</p>
              <p class="post__body">${body}</p>
            </li>`;
    }
    else {
        return `<li class="post">There is no such post</li>`;
    }
}
