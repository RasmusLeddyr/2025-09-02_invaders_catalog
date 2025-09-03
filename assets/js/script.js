const invaders_list = document.querySelector(".invaders_list");

//
async function FetchData() {
  try {
    const response = await fetch("../entries.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch module data: ", error);
  }
}
//

if (invaders_list) {
  const template = (key) =>
    `
    <
    `;
}
