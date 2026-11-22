let searchInput = document.getElementById("searchInput");

let cards = document.querySelectorAll(".recipe-card");

searchInput.addEventListener("input", function () {

    let searchValue = searchInput.value.toLowerCase();

    cards.forEach(function (card) {

        let cardText = card.innerText.toLowerCase();

        if (cardText.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});