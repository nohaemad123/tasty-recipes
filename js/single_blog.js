let single_posts = document.querySelector(".single_posts");
let latest_div = document.querySelector(".latest");
let prev_post = document.querySelector(".prev");
let next_post = document.querySelector(".next");
let comments_count = document.querySelector(".comments_count");
let comments_div = document.querySelector(".comments_div");
let comment_input = document.querySelector(".comment_input");
let name_input = document.querySelector(".name_input");
let email_input = document.querySelector(".email_input");
let website_input = document.querySelector(".website_input");
let send_button = document.querySelector(".send_button");

const posts_url = "https://jsonplaceholder.typicode.com/posts";
const commets_url = "https://jsonplaceholder.typicode.com/posts/10/comments";
const add_comment_url = "https://jsonplaceholder.typicode.com/comments";

async function fetchPosts() {
  try {
    let response = await fetch(posts_url);
    let data = await response.json();
    // displayPosts(data);
    displayLatestPosts(data);
    console.log(data);
  } catch (error) {
    document.querySelector(".posts").innerHTML =
      "<div class='alert alert-danger error_msg' role='alert'>Not posts</div>";
  }
}

async function fetchSinglePost(id) {
  try {
    let response = await fetch(posts_url + "/" + id);
    let data = await response.json();
    displaySinglePost(data);
    displayPrevPost(data);
    console.log(data);
  } catch (error) {
    // document.querySelector(".posts").innerHTML = "<p>Not posts</p>";
  }
}

async function fetchPrevPost(id) {
  try {
    let response = await fetch(posts_url + "/" + id);
    let data = await response.json();
    displayPrevPost(data);
    console.log(data);
  } catch (error) {
    // document.querySelector(".posts").innerHTML = "<p>Not posts</p>";
  }
}

async function fetchNextPost(id) {
  try {
    let response = await fetch(posts_url + "/" + id);
    let data = await response.json();
    displayNextPost(data);
    console.log(data);
  } catch (error) {
    // document.querySelector(".posts").innerHTML = "<p>Not posts</p>";
  }
}

async function fetchComments() {
  try {
    let response = await fetch(commets_url);
    let data = await response.json();
    displayComments(data);
    console.log(data);
  } catch (error) {
    // document.querySelector(".posts").innerHTML = "<p>Not posts</p>";
  }
}

fetchPosts();
fetchSinglePost(10);
fetchPrevPost(9);
fetchNextPost(11);
fetchComments();

function displayLatestPosts(posts) {
  let cartona = "";
  for (let i = 0; i < 4; i++) {
    cartona += `
      <div class="d-md-flex mb-5">
      <div class="flex-shrink-0">
        <img src="" class="latest_post_image" width="150" alt="..." />
      </div>
      <div class="flex-grow-1 ms-md-3 mt-2 mt-md-0">
      <h5 class="card-title mt-0 mb-0">${posts[i].title}</h5>

      </div>
    </div>`;
  }
  latest_div.innerHTML = cartona;
  $(".latest_post_image").eq(0).attr("src", "imgs/single_blog_1.png");
  $(".latest_post_image").eq(1).attr("src", "imgs/single_blog_2.png");
  $(".latest_post_image").eq(2).attr("src", "imgs/single_blog_3.png");
  $(".latest_post_image").eq(3).attr("src", "imgs/single_blog_4.png");
  $(".latest_post_image").eq(4).attr("src", "imgs/single_blog_5.png");
}

function displaySinglePost(post) {
  let cartona = `
                <img src="imgs/single_blog_2.png" class="mb-4 w-100" />
                <h3 class="card-title">${post.title}</h3>
                <div class="d-flex column-gap-4 options">
    <div class="left">
    <p><i class="fa-solid fa-user"></i> Travel, Lifestyle</p>
</div>
  <div class="">
    <p><i class="fa-solid fa-comments"></i> 20 comments</p>
</div>
    </div>
    <p class="card-text">${post.body}</p>
`;
  single_posts.innerHTML = cartona;
}

function displayPrevPost(post) {
  let cartona = `
  <a class="d-flex text-black text-decoration-none prev mt-3" href="#">
  <div class="flex-shrink-0 image_content" >
    <img src="imgs/post_6.png" alt="...">
    <div class="content">
    <i class="fa-solid fa-arrow-left"></i>
</div>
  </div>
  <div class="flex-grow-1 ms-3">
  <h6>Prev post</h6>
                <h3 class="card-title ">${post.title}</h3>
  </div>
</a>
         
`;
  prev_post.innerHTML = cartona;
}

function displayNextPost(post) {
  let cartona = `
  <a class="d-flex text-black justify-content-end text-decoration-none prev mt-3" href="#">
  
  <div class="flex-grow-1 ms-3">
  <h6>Next post</h6>
                <h3 class="card-title ">${post.title}</h3>
  </div>
  <div class="flex-shrink-0 image_content" >
    <img src="imgs/post_7.png" alt="...">
    <div class="content">
    <i class="fa-solid fa-arrow-right"></i>
</div>
  </div>
</a>
`;
  next_post.innerHTML = cartona;
}

function displayComments(comments) {
  let cartona = "";
  for (let i = 0; i < comments.length; i++) {
    cartona += `
      <div class="d-flex mb-5 comment_single">
      <div class="flex-shrink-0">
        <img src="imgs/2_user.png" width="50" alt="..." />
      </div>
      <div class="flex-grow-1 ms-3">
      <p class=" mt-0 ">${comments[i].body}</p>
<div class="d-md-flex justify-content-between">
<div class="d-md-flex column-gap-4">
<h5>${comments[i].name}</h5>
<h3>December 4, 2017 at 3:12 pm</h3>
</div>
<a href="" class="text-text-uppercase text-decoration-none">Reply</a>
</div>
      </div>
    </div>`;
  }
  comments_count.innerHTML = "0" + comments.length + " comments";
  comments_div.innerHTML = cartona;
}

async function addComment(comment_body) {
  try {
    let response = await fetch(add_comment_url, {
      method: "POST",
      body: JSON.stringify(comment_body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let data = await response.json();
    // Manually add to the comments div
    displayNewComment(data);
    console.log("Comment added:", data);
  } catch (error) {
    console.error("Failed to send comment", error);
  }
}

send_button.addEventListener("click", function (e) {
  e.preventDefault();
  let comment_body = {
    postId: 10,
    name: name_input.value,
    email: email_input.value,
    body: comment_input.value,
  };

  addComment(comment_body);
});

function displayNewComment(comment) {
  const newComment = `
    <div class="d-flex mb-5 comment_single">
      <div class="flex-shrink-0">
        <img src="imgs/2_user.png" width="50" alt="..." />
      </div>
      <div class="flex-grow-1 ms-3">
        <p class="mt-0">${comment.body}</p>
        <div class="d-flex justify-content-between">
          <div class="d-flex column-gap-4">
            <h5>${comment.name}</h5>
            <h3>${new Date().toLocaleString()}</h3>
          </div>
          <a href="" class="text-text-uppercase text-decoration-none">Reply</a>
        </div>
      </div>
    </div>
  `;
  comments_div.innerHTML += newComment;

  // Optional: update count
  const currentCount = parseInt(comments_count.innerText) || 0;
  comments_count.innerText = `${currentCount + 1} comments`;
}
