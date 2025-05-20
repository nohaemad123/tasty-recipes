let posts_div = document.querySelector(".posts");
let latest_div = document.querySelector(".latest");
const posts_url = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  try {
    let response = await fetch(posts_url);
    let data = await response.json();
    displayPosts(data);
    displayLatestPosts(data);
    console.log(data);
  } catch (error) {
    document.querySelector(".posts").innerHTML =
      "<div class='alert alert-danger error_msg' role='alert'>Not posts</div>";
  }
}

fetchPosts();

function displayPosts(posts) {
  let cartona = "";
  for (let i = 15; i < 20; i++) {
    const post = posts[i];
    cartona += `
      <div class="card mb-5">
        <img src="" class="card-img-top post_image" alt="...">
        <div class="card-body">
          <div class="date">15 <br/>Jan</div>
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <div class="d-flex column-gap-4 options">
            <div class="left">
              <p><i class="fa-solid fa-user"></i> Travel, Lifestyle</p>
            </div>
            <div>
              <p><i class="fa-solid fa-comments"></i> 20 comments</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  posts_div.innerHTML = cartona;

  // ✅ Now DOM is updated, we can safely change the image
  $(".post_image").eq(0).attr("src", "imgs/single_blog_1.png");
  $(".post_image").eq(1).attr("src", "imgs/single_blog_2.png");
  $(".post_image").eq(2).attr("src", "imgs/single_blog_3.png");
  $(".post_image").eq(3).attr("src", "imgs/single_blog_4.png");
  $(".post_image").eq(4).attr("src", "imgs/single_blog_5.png");
}

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
