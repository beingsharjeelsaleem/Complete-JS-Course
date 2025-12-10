const searchForm = document.querySelector("#searchForm");
let profileContainer = document.querySelector("#profileContainer");
let errorMessage = document.querySelector("#errorMessage");

async function getGithubUser(user) {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`);

    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();
    console.log(data);

    profileContainer.innerHTML = "";

    const userProfile = document.createElement("div");
    userProfile.classList.add("user-profile");

    const userImg = document.createElement("img");
    userImg.src = data.avatar_url;
    userImg.alt = `${data.name} Avatar`;

    const userName = document.createElement("h2");
    userName.textContent = data.name;

    const userUN = document.createElement("p");
    userUN.innerHTML = `<strong>Username:</strong> ${data.login}`;

    const userBio = document.createElement("p");
    userBio.innerHTML = `<strong>Bio:</strong> ${data.bio}`;

    const userFollowers = document.createElement("p");
    userFollowers.innerHTML = `<strong>Followers:</strong> ${data.followers}`;

    const userRepos = document.createElement("p");
    userRepos.innerHTML = `<strong>Repositories:</strong> ${data.public_repos}`;

    const userProfileLink = document.createElement("a");
    userProfileLink.href = data.html_url;
    userProfileLink.target = "_blank";
    userProfileLink.classList.add("profile-link");
    userProfileLink.textContent = "Visit GitHub Profile";

    profileContainer.appendChild(userProfile);
    userProfile.appendChild(userImg);
    userProfile.appendChild(userName);
    userProfile.appendChild(userUN);
    userProfile.appendChild(userBio);
    userProfile.appendChild(userFollowers);
    userProfile.appendChild(userRepos);
    userProfile.appendChild(userProfileLink);

    errorMessage.style.display = "none";
  } catch (error) {
    errorMessage.style.display = "initial";
    errorMessage.textContent = error;
    profileContainer.innerHTML = "";
  }
}

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let usernameInput = document.querySelector("#username").value;

  if (usernameInput.trim() === "") {
    alert("please fillout the user field to before submitting the form");
  }

  getGithubUser(usernameInput);

  searchForm.reset();
});
