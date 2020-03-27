document.querySelector("button").addEventListener('click', addToList);

function clickButton() {
    const list = document.querySelector("ul");

    list.addEventListener('click', (event) => {
        if(event.target.matches(".checkButton")) {
            var item = event.target.parentNode.querySelector("h3");

            if (item.style.textDecorationLine == "line-through") {
                item.style.textDecorationLine =  "none";
            } else {
                item.style.textDecorationLine = "line-through";
            }
        }

        else if (event.target.matches(".deleteButton")) {
            event.target.parentNode.parentNode.remove();
        }
    })
}

function addToList(event) {
    event.preventDefault();

    const item = document.querySelector("input").value;
    if (item == null) {
        return;
    }

    document.querySelector("ul").innerHTML += `
                            <li style="list-style-type:none;">
                                <div style="border: 1px solid gray; padding: 0px 20px;">
                                    <h3>`+ item + `</h3>
                                    <button class="checkButton"> Check </button>
                                    <button class="deleteButton"> Delete </button>
                                </div>
                            </li>
    
    `;
    document.querySelector("input").value = null;
    return;
}

clickButton();