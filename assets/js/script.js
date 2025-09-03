window.addEventListener("DOMContentLoaded", async () => {
  const invaders_list = document.querySelector(".invaders_list");
  const wiki_page = document.querySelector(".wiki_page");

  //
  async function FetchData() {
    try {
      const response = await fetch("assets/data/entries.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Could not fetch module data: ", error);
    }
  }
  const data = await FetchData();
  //

  const SmallTemplate = (key) =>
    `
  <a class="entry_link" href="wiki.html?name=${encodeURIComponent(key.name)}">
    <div class="entry small">
     <div class="imag_cont">
        <img src="assets/img/${key.images[0]}" alt="">
      </div>
     <h2 class="name">${key.name}</h2>
     <p class="origin">Origin: ${key.origin}</p>
     <p class="threat">Threat level: ${key.threat}</p>
     <p class="type">Type: ${key.type}</p>
     <p class="behaviour">Behaviour: ${key.behaviour}</p>
    </div>
  </a>
  `;

  const BigTemplate = (key) =>
    `
  <div class="entry full">
    ${key.images
      .map(
        (img) => `
        <div class="imag_cont">
          <img src="assets/img/${img}" alt="">
        </div>
      `
      )
      .join("")}
    <h2 class="name">${key.name}</h2>
    <p class="origin">Origin: ${key.origin}</p>
    <p class="threat">Threat level: ${key.threat}</p>
    <p class="type">Type: ${key.type}</p>
    <p class="behaviour">Behaviour: ${key.behaviour}</p>
    <div class="description">
      ${key.description.map((line) => `<p>${line}</p>`).join("")}
    </div>
  </div>
  `;

  // create list on index, single on wiki
  if (invaders_list) {
    data.forEach((key) => {
      invaders_list.insertAdjacentHTML("beforeend", SmallTemplate(key));
    });
  }
  if (wiki_page) {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");

    if (name) {
      const entry = data.find((e) => e.name === name);
      if (entry) {
        wiki_page.innerHTML = BigTemplate(entry);
      } else {
        wiki_page.innerHTML = `<p style="color:red">No entry found for "${name}"</p>`;
      }
    } else {
      wiki_page.innerHTML = `<p style="color:gray">No entry selected.</p>`;
    }
  }
  //

  console.log("Data loaded:", data);
});
