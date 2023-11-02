document.getElementById("searchTrailsButton").addEventListener("click", async function() {
    const searchTerm = document.getElementById("trailSearchInput").value;
    
    try {
        const response = await fetch(`/api/searchTrails?q=${searchTerm}`);
        const trails = await response.json();
        
        // Compile the Handlebars template
        const source = document.getElementById("trails-template").innerHTML;
        const template = Handlebars.compile(source);
    
        // Render the results
        const rendered = template({ trails: trails });
        document.getElementById("searchResults").innerHTML = rendered;
    } catch (error) {
        console.error('Error fetching and displaying trails:', error);
    }
});
