document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("suggestions");

    if (!searchInput) return;


    // ================= SEARCH =================

    searchInput.addEventListener("input", () => {

        const query = searchInput.value
            .toLowerCase()
            .trim();

        suggestionsBox.innerHTML = "";

        if (!query) {
            suggestionsBox.classList.remove("show");
            return;
        }


        // Search destinations
        const placeResults = destinations.filter(place => {

            const text = `
                ${place.name}
                ${place.location}
                ${place.categoryName}
                ${place.tags.join(" ")}
            `.toLowerCase();

            return text.includes(query);
        });


        // Search categories
        const categoryResults = categories.filter(category => {

            return (
                category.name.toLowerCase().includes(query) ||
                category.id.toLowerCase().includes(query)
            );

        });


        if (
            placeResults.length === 0 &&
            categoryResults.length === 0
        ) {

            suggestionsBox.innerHTML = `
                <div class="no-result">
                    No destination found
                </div>
            `;

            suggestionsBox.classList.add("show");

            return;
        }


        // Categories first

        categoryResults.forEach(category => {

            const item = document.createElement("div");

            item.className = "suggestion category-suggestion";

            item.innerHTML = `
                <span class="suggestion-icon">
                    ${category.icon}
                </span>

                <div>
                    <strong>${category.name}</strong>
                    <small>Category</small>
                </div>
            `;

            item.addEventListener("click", () => {

                window.location.href =
                    `category.html?category=${category.id}`;

            });

            suggestionsBox.appendChild(item);

        });


        // Places

        placeResults.slice(0, 8).forEach(place => {

            const item = document.createElement("div");

            item.className = "suggestion";

            item.innerHTML = `
                <img
                    src="${place.image}"
                    alt="${place.name}"
                >

                <div class="suggestion-info">

                    <strong>${place.name}</strong>

                    <small>
                        ${place.categoryName} •
                        ${place.location}
                    </small>

                </div>
            `;

            item.addEventListener("click", () => {

                window.location.href =
                    `place.html?id=${place.id}`;

            });

            suggestionsBox.appendChild(item);

        });


        suggestionsBox.classList.add("show");

    });


    // ================= ENTER =================

    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            const query = searchInput.value
                .toLowerCase()
                .trim();

            if (!query) return;


            // Exact destination
            const exactPlace = destinations.find(place =>

                place.name.toLowerCase() === query ||
                place.id.toLowerCase() === query

            );


            if (exactPlace) {

                window.location.href =
                    `place.html?id=${exactPlace.id}`;

                return;
            }


            // Category
            const exactCategory = categories.find(category =>

                category.name.toLowerCase() === query ||
                category.id.toLowerCase() === query

            );


            if (exactCategory) {

                window.location.href =
                    `category.html?category=${exactCategory.id}`;

                return;
            }


            // First matching place
            const firstMatch = destinations.find(place => {

                const text = `
                    ${place.name}
                    ${place.location}
                    ${place.tags.join(" ")}
                `.toLowerCase();

                return text.includes(query);

            });


            if (firstMatch) {

                window.location.href =
                    `place.html?id=${firstMatch.id}`;

            }

        }

    });


    // ================= CLOSE SUGGESTIONS =================

    document.addEventListener("click", (event) => {

        if (
            !searchInput.contains(event.target) &&
            !suggestionsBox.contains(event.target)
        ) {

            suggestionsBox.classList.remove("show");

        }

    });

});