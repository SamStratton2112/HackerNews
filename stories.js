"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  console.log(storyList)

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}" class="notFav">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

async function addStoryFormSubmit(e){
  e.preventDefault();
  const author = $('#authorsName').val();
  const title = $('#storyTitle').val();
  const url = $('#storyURL').val();
  const username = currentUser.username;
  const storyInfo = {title, author, url, username};
  const story = await storyList.addStory(currentUser, storyInfo);
  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);
  console.log (story)
  // $navStoryForm.slideUp("slow");
  $navStoryForm.trigger("reset"); 
}

// $('$allStoriesList').addEventListener('click', function(e){
//   toggleFav(e)
//   $favoritsList.show()
// })

// async function toggleFav(e){
//   const trgt = $(e.target);
//   if(trgt.hasClass("notFav")){
//     trgt.removeClass("notFav")
//     trgt.addClass('fav')
//     let starOn = $(`
//       <span class="star">
//       <i class="fas fa-star"></i>
//       </span>`)
//       trgt.append(starOn)
//     $favoritesList.append(trgt)
//   } else if(trgt.hasClass("fav")){
//     trgt.removeClass("fav")
//     trgt.addClass('notFav')
//     let starOff = $(`
//     <span class="star">
//     <i class="far fa-star"></i>
//     </span>`)
//     trgt.append(starOff)
//     ol.removeChild(`#${trgt.storyId}`)
//   }
// }


// if($('#favoritsList').length === 0){
//   let $noFavsMsg = $("<div><p>No favorite stories...</p></div>");
//   $favoritesList.append($noFavsMsg);
// } 
