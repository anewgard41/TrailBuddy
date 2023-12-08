document.getElementById("searchTrailsButton").addEventListener("click", async function() {
    const searchTerm = document.getElementById("trailSearchInput").value;

    try {
        const response = await fetch(`/api/searchTrails?q=${searchTerm}`);
        const trails = await response.json(); 
        
        console.log("API Data in web:", trails);
        
        const searchResults = document.getElementById("searchResults")
        searchResults.innerHTML = ''; // Clear existing results
        trails.forEach(element => {
            // Create a new <li> element for each trail and append it to the search results <ul>. 
            const trailEl = document.createElement("li")
            trailEl.textContent = element.name;
            // apply some styles to the <li> element.
            trailEl.style.backgroundColor = "lightgreen";
            trailEl.style.padding = "5px";
            trailEl.style.margin = "2px";
            trailEl.style.border = "1px solid #ccc";
            trailEl.style.borderRadius = "5px";
            trailEl.style.listStyle = "none"
            const lengthDiv = document.createElement("div");
            lengthDiv.textContent = 'Length: ' + element.length + ' miles'; // assuming length is a property
            trailEl.appendChild(lengthDiv);

    // Create a div or span for the surface type and append it
    const surfTypeDiv = document.createElement("div");
    surfTypeDiv.textContent = 'Surface Type: ' + element.surftype; // assuming surftype is a property
    trailEl.appendChild(surfTypeDiv);
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
