interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const allPostsURL = 'https://jsonplaceholder.typicode.com/posts';
const filteredPostsURL = 'https://jsonplaceholder.typicode.com/posts/';

const postsList = document.querySelector('.postsList') as HTMLElement;
const filterButton = document.querySelector('.filterButton') as HTMLButtonElement;
const showAllButton = document.querySelector('.showAllButton') as HTMLButtonElement;
const input = document.querySelector('.actions__input') as HTMLInputElement;
const errorMessage = document.querySelector('.error') as HTMLElement;

input.addEventListener("keypress", (e: KeyboardEvent) => {
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

async function createAllPostsList (): Promise<void>  {
  postsList.innerHTML = "";

  const posts = await fetchData(allPostsURL) as IPost[];

  if(posts) {
    if(posts.length > 0) {
      const allPosts = posts.map(post => renderPost(post)).join('');
  
      postsList.innerHTML = allPosts;
    } else {
      postsList.innerHTML = "No posts available";
    }
  }

};

async function createSelectedPost (id: number): Promise<void> {
  postsList.innerHTML = "";

  const post = await fetchData(`${filteredPostsURL}${id}`) as IPost;
  
  postsList.innerHTML = renderPost(post);
};

async function fetchData<T>(URL: string): Promise<T | void> {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    if(!Array.isArray(data) && Object.keys(data).length === 0) {
      throw Error();
    } else {
      return data;
    }

  } catch (e) {
    console.log(e);

    errorMessage.innerHTML = 'Oooops! Something went wrong. Please, try again later.';

  }
};


function renderPost (post: IPost): string {

  if("id" in post) {
    const {userId, id, title, body} = post;
    
    return `<li class="post" id=${id}>
              <p class="post__userId">User:${userId}</p>
              <h4 class="post__title">${title}</h4>
              <p class="post__id">Post id:${id}</p>
              <p class="post__body">${body}</p>
            </li>`
  } else {
    return `<li class="post">There is no such post</li>`
  }

}
