const list = document.getElementById("user-list");
const input = document.getElementById("input");
getData();
let users = [];

async function getData(){
    const res = await fetch("https://randomuser.me/api?results=50");
    const { results } = await res.json();
    users = results;
    await generateList();
}

async function generateList(filter=""){
    list.innerHTML = "";
    users.forEach((user, idx) => {
        const picture = user.picture.large;
        const name = user.name.first+" "+user.name.last;
        const location = user.location.city+", "+user.location.country;

        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${picture}" alt="imagen ${idx+1}" loading="lazy">
            <div class="content">
                <h2>${name}</h2>
                <span>${location}</span>
            </div>
        `;
        if(name.toLowerCase().includes(filter.toLowerCase())||location.toLowerCase().includes(filter.toLowerCase())){
            list.appendChild(li);
        }

        if(filter == ""){
            list.appendChild(li);
        }

    });
}

input.addEventListener("input", ()=>{
    generateList(input.value);
});
