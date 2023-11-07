document.getElementById("searchTrailsButton").addEventListener("click", async function() {
    const searchTerm = document.getElementById("trailSearchInput").value;

    try {
        const response = await fetch(`/api/searchTrails?q=${searchTerm}`);
        const trails = await response.json(); 

        console.log("API Data:", trails);

        // Compile the Handlebars template
        const source = document.getElementById("trails-template").innerHTML;
        const template = Handlebars.compile(source);

        // Render the results
        const rendered = template({ trails: trails });

        // Populate the search results into the 'searchResults' div
        document.getElementById("searchResults").innerHTML = "rendered";

        // Debugging logs
        console.log("Attempting to search for:", searchTerm);
        console.log("Rendered HTML:", rendered);
        console.log("API Response:", response);
        
    } catch (error) {
        console.error('Error fetching and displaying trails:', error);
    }
});
