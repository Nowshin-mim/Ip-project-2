function displayResults(data) {

    const results = document.getElementById("results");

    results.innerHTML = "";


    if (data.length === 0) {

        results.innerHTML = `
            <div class="no-result">
                <h3>No result found 😔</h3>
                <p>Try another keyword.</p>
            </div>
        `;

        return;
    }


    data.forEach(place => {

        results.innerHTML += `

            <div class="card">

                <span class="category">
                    ${place.category}
                </span>

                <h2>
                    ${place.name}
                </h2>

                <p>
                    📍 ${place.location}
                </p>

                <p>
                    🏷 ${place.type}
                </p>

                <p>
                    💰 ${place.price}
                </p>

                <p>
                    ${place.description}
                </p>

                <div class="tags">

                    ${place.tags.map(tag =>
                        `<span>${tag}</span>`
                    ).join("")}

                </div>

                <button class="details-btn">
                    View Details
                </button>

            </div>

        `;

    });

}


// SEARCH

function searchTravel() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    if (input === "") {

        displayResults(travelData);

        return;
    }


    const filtered = travelData.filter(place => {

        return (

            place.name.toLowerCase().includes(input) ||

            place.category.toLowerCase().includes(input) ||

            place.type.toLowerCase().includes(input) ||

            place.location.toLowerCase().includes(input) ||

            place.price.toLowerCase().includes(input) ||

            place.tags.some(tag =>
                tag.toLowerCase().includes(input)
            )

        );

    });


    displayResults(filtered);

}


// CATEGORY FILTER

function filterCategory(category) {

    const filtered = travelData.filter(place =>
        place.category === category
    );

    displayResults(filtered);

}


// SHOW ALL

function showAll() {

    displayResults(travelData);

}


// ENTER KEY SEARCH

document
    .getElementById("searchInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            searchTravel();

        }

    });


// INITIAL DATA

displayResults(travelData);