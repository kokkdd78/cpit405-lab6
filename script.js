// Lab 6: DOM events and cookies (no server/database required).
const VOTE_COOKIE = "cpit405_lab6_vote";
const COMMENTS_COOKIE = "cpit405_lab6_comments";
const COOKIE_LIFETIME = 60 * 60 * 24 * 30; // 30 days
const COOKIE_PATH = window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/") + 1) || "/";

const likeButton = document.getElementById("like-button");
const dislikeButton = document.getElementById("dislike-button");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");
const voteStatus = document.getElementById("vote-status");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const commentsList = document.getElementById("comments-list");
const feedback = document.getElementById("feedback");

function setCookie(name, value) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_LIFETIME}; Path=${COOKIE_PATH}; SameSite=Lax${secure}`;
}

function getCookie(name) {
  const prefix = `${name}=`;
  const cookie = document.cookie.split("; ").find(part => part.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; Path=${COOKIE_PATH}; SameSite=Lax`;
}

// Read saved state each time the page loads.
let userVote = getCookie(VOTE_COOKIE);
if (userVote !== "like" && userVote !== "dislike") userVote = null;

let comments = [];
try {
  const savedComments = JSON.parse(getCookie(COMMENTS_COOKIE) || "[]");
  if (Array.isArray(savedComments)) {
    comments = savedComments.filter(item => typeof item === "string").slice(0, 1);
  }
} catch (error) {
  comments = []; // Ignore a damaged cookie.
}

let likes = 0;
let dislikes = 0;

function render() {
  // One vote per browser => local counts are always 0 or 1.
  likes = userVote === "like" ? 1 : 0;
  dislikes = userVote === "dislike" ? 1 : 0;
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;

  const alreadyVoted = userVote !== null;
  likeButton.disabled = alreadyVoted;
  dislikeButton.disabled = alreadyVoted;
  likeButton.classList.toggle("selected", userVote === "like");
  dislikeButton.classList.toggle("selected", userVote === "dislike");
  voteStatus.textContent = alreadyVoted
    ? `You voted ${userVote}. Reset to vote again.`
    : "You have not voted yet.";

  const alreadyCommented = comments.length > 0;
  commentInput.disabled = alreadyCommented;
  submitButton.disabled = alreadyCommented;
  commentInput.placeholder = alreadyCommented ? "Reset to comment again" : "Write a comment...";

  // textContent avoids interpreting comments as HTML.
  commentsList.replaceChildren();
  if (comments.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty";
    emptyItem.textContent = "No comments yet.";
    commentsList.appendChild(emptyItem);
  } else {
    comments.forEach(comment => {
      const item = document.createElement("li");
      item.textContent = comment;
      commentsList.appendChild(item);
    });
  }
}

function vote(choice) {
  if (userVote !== null) return; // Prevent voting twice.
  userVote = choice;
  setCookie(VOTE_COOKIE, choice);
  feedback.textContent = "Vote saved in cookies.";
  render();
}

likeButton.addEventListener("click", () => vote("like"));
dislikeButton.addEventListener("click", () => vote("dislike"));

commentForm.addEventListener("submit", event => {
  event.preventDefault();
  if (comments.length > 0) return; // Prevent multiple comments.
  const comment = commentInput.value.trim();
  if (!comment) {
    feedback.textContent = "Enter a comment before submitting.";
    return;
  }
  comments.push(comment);
  setCookie(COMMENTS_COOKIE, JSON.stringify(comments));
  commentInput.value = "";
  feedback.textContent = "Comment saved in cookies.";
  render();
});

resetButton.addEventListener("click", () => {
  deleteCookie(VOTE_COOKIE);
  deleteCookie(COMMENTS_COOKIE);
  userVote = null;
  likes = 0;
  dislikes = 0;
  comments = [];
  commentInput.value = "";
  feedback.textContent = "Reset complete. You can vote and comment again.";
  render();
});

render();
