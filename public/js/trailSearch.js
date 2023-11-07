document.getElementById("searchTrailsButton").addEventListener("click", async function() {
    const searchTerm = document.getElementById("trailSearchInput").value;

    try {
        const response = await fetch(`/api/searchTrails?q=${searchTerm}`);
        const trails = await response.json(); 
        
        console.log("API Data:", trails);
        
        const searchResults = document.getElementById("searchResults")
        trails.forEach(element => {
            const trailEl = document.createElement("li")
            trailEl.textContent = element.name;
            searchResults.appendChild(trailEl);
        });

        // Compile the Handlebars template
        const source = document.getElementById("trails-template").innerHTML;
        const template = Handlebars.compile(source);
        console.log(template);
        // Render the results
        console.log("logs the trails : trails", { trails: trails });
        const rendered = template({ trails: trails });
        console.log("rendered before DOM insert", rendered)
        // Populate the search results into the 'searchResults' div
        // document.getElementById("searchResults").innerHTML = rendered;

        // Debugging logs
        console.log("Attempting to search for:", searchTerm);
        console.log("Rendered HTML:", rendered);
        console.log("API Response:", response);
        
        
        // document.location.reload();
    } catch (error) {
        console.error('Error fetching and displaying trails:', error);
    }
});
