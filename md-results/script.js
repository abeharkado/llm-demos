// Election data
const electionData = [
    {jurisdiction: "Allegany", harris: 9231, trump: 22141, oliver: 130, stein: 136, kennedy: 363, others: 136, total: 32137},
    {jurisdiction: "Anne Arundel", harris: 171945, trump: 128892, oliver: 2141, stein: 2429, kennedy: 3375, others: 2790, total: 311572},
    {jurisdiction: "Baltimore City", harris: 195109, trump: 27984, oliver: 892, stein: 3222, kennedy: 1875, others: 1672, total: 230754},
    {jurisdiction: "Baltimore County", harris: 249958, trump: 149560, oliver: 2240, stein: 4195, kennedy: 3858, others: 3104, total: 412915},
    {jurisdiction: "Calvert", harris: 23438, trump: 29361, oliver: 297, stein: 232, kennedy: 554, others: 309, total: 54191},
    {jurisdiction: "Caroline", harris: 4860, trump: 11053, oliver: 84, stein: 99, kennedy: 180, others: 54, total: 16330},
    {jurisdiction: "Carroll", harris: 36867, trump: 62273, oliver: 845, stein: 629, kennedy: 1182, others: 855, total: 102651},
    {jurisdiction: "Cecil", harris: 17628, trump: 33871, oliver: 291, stein: 286, kennedy: 536, others: 219, total: 52831},
    {jurisdiction: "Charles", harris: 63454, trump: 26145, oliver: 334, stein: 828, kennedy: 889, others: 447, total: 92097},
    {jurisdiction: "Dorchester", harris: 6954, trump: 9390, oliver: 57, stein: 138, kennedy: 191, others: 42, total: 16772},
    {jurisdiction: "Frederick", harris: 82409, trump: 68753, oliver: 970, stein: 1378, kennedy: 1494, others: 1110, total: 156114},
    {jurisdiction: "Garrett", harris: 3456, trump: 11983, oliver: 75, stein: 48, kennedy: 223, others: 53, total: 15838},
    {jurisdiction: "Harford", harris: 62453, trump: 83050, oliver: 1023, stein: 935, kennedy: 1559, others: 1070, total: 150090},
    {jurisdiction: "Howard", harris: 124764, trump: 49425, oliver: 1246, stein: 3341, kennedy: 1712, others: 1803, total: 182291},
    {jurisdiction: "Kent", harris: 5251, trump: 5561, oliver: 60, stein: 82, kennedy: 114, others: 60, total: 11128},
    {jurisdiction: "Montgomery", harris: 386581, trump: 112637, oliver: 2416, stein: 8009, kennedy: 4276, others: 5302, total: 519221},
    {jurisdiction: "Prince George's", harris: 347038, trump: 45008, oliver: 1038, stein: 5369, kennedy: 3428, others: 2128, total: 404009},
    {jurisdiction: "Queen Anne's", harris: 11273, trump: 20200, oliver: 174, stein: 153, kennedy: 336, others: 211, total: 32347},
    {jurisdiction: "Saint Mary's", harris: 23531, trump: 33582, oliver: 409, stein: 352, kennedy: 669, others: 411, total: 58954},
    {jurisdiction: "Somerset", harris: 4054, trump: 5805, oliver: 32, stein: 85, kennedy: 114, others: 47, total: 10137},
    {jurisdiction: "Talbot", harris: 11119, trump: 11125, oliver: 109, stein: 120, kennedy: 194, others: 163, total: 22830},
    {jurisdiction: "Washington", harris: 27260, trump: 44054, oliver: 363, stein: 513, kennedy: 811, others: 331, total: 73332},
    {jurisdiction: "Wicomico", harris: 21513, trump: 24065, oliver: 205, stein: 371, kennedy: 544, others: 214, total: 46912},
    {jurisdiction: "Worcester", harris: 12431, trump: 19632, oliver: 139, stein: 184, kennedy: 342, others: 153, total: 32881}
];

// Candidate colors for charts
const candidateColors = {
    harris: "#3366CC",
    trump: "#DC3912",
    oliver: "#FF9900",
    stein: "#109618",
    kennedy: "#990099",
    others: "#0099C6"
};

// Candidate full names
const candidateNames = {
    harris: "Harris",
    trump: "Trump",
    oliver: "Oliver",
    stein: "Stein",
    kennedy: "Kennedy",
    others: "Others"
};

// Calculate statewide totals
function calculateStateTotals() {
    return electionData.reduce((acc, county) => {
        for (const key in county) {
            if (key !== "jurisdiction") {
                acc[key] = (acc[key] || 0) + county[key];
            }
        }
        return acc;
    }, {});
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate and format percentage
function calculatePercentage(value, total) {
    return ((value / total) * 100).toFixed(2) + "%";
}

// Populate the county dropdown
function populateCountyDropdown() {
    const dropdown = document.getElementById("county-dropdown");
    electionData.forEach(county => {
        const option = document.createElement("option");
        option.value = county.jurisdiction;
        option.textContent = county.jurisdiction;
        dropdown.appendChild(option);
    });
}

// Display results in grid
function displayResults(containerId, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    
    // Header row
    const headerRow = document.createElement("div");
    headerRow.className = "results-row header";
    
    const candidateHeader = document.createElement("div");
    candidateHeader.textContent = "Candidate";
    headerRow.appendChild(candidateHeader);
    
    const votesHeader = document.createElement("div");
    votesHeader.textContent = "Votes";
    headerRow.appendChild(votesHeader);
    
    const percentHeader = document.createElement("div");
    percentHeader.textContent = "Percentage";
    headerRow.appendChild(percentHeader);
    
    container.appendChild(headerRow);
    
    // Data rows for each candidate
    const candidates = ["harris", "trump", "oliver", "stein", "kennedy", "others"];
    candidates.forEach(candidate => {
        const row = document.createElement("div");
        row.className = "results-row";
        
        const nameCell = document.createElement("div");
        nameCell.textContent = candidateNames[candidate];
        nameCell.style.borderLeft = `4px solid ${candidateColors[candidate]}`;
        row.appendChild(nameCell);
        
        const votesCell = document.createElement("div");
        votesCell.textContent = formatNumber(data[candidate]);
        row.appendChild(votesCell);
        
        const percentCell = document.createElement("div");
        percentCell.textContent = calculatePercentage(data[candidate], data.total);
        row.appendChild(percentCell);
        
        container.appendChild(row);
    });
    
    // Total row
    const totalRow = document.createElement("div");
    totalRow.className = "results-row total";
    
    const totalLabel = document.createElement("div");
    totalLabel.textContent = "Total";
    totalRow.appendChild(totalLabel);
    
    const totalVotes = document.createElement("div");
    totalVotes.textContent = formatNumber(data.total);
    totalRow.appendChild(totalVotes);
    
    const totalPercent = document.createElement("div");
    totalPercent.textContent = "100.00%";
    totalRow.appendChild(totalPercent);
    
    container.appendChild(totalRow);
}

// Create horizontal bar chart for results
function createChart(containerId, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    
    const candidates = ["harris", "trump", "oliver", "stein", "kennedy", "others"];
    const total = data.total;
    
    // Create chart container
    const chartContainer = document.createElement("div");
    chartContainer.className = "bar-chart-container";
    
    // Find the max value for scaling
    const maxVotes = Math.max(...candidates.map(candidate => data[candidate]));
    
    // Create bars for each candidate
    candidates.forEach(candidate => {
        const percentage = data[candidate] / total;
        const barContainer = document.createElement("div");
        barContainer.className = "bar-container";
        
        // Label
        const label = document.createElement("div");
        label.className = "bar-label";
        label.textContent = candidateNames[candidate];
        barContainer.appendChild(label);
        
        // Bar wrapper (for animation and hover effects)
        const barWrapper = document.createElement("div");
        barWrapper.className = "bar-wrapper";
        
        // Actual bar
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.width = `${(data[candidate] / maxVotes) * 100}%`;
        bar.style.backgroundColor = candidateColors[candidate];
        bar.setAttribute("data-candidate", candidateNames[candidate]);
        bar.setAttribute("data-votes", formatNumber(data[candidate]));
        bar.setAttribute("data-percentage", calculatePercentage(data[candidate], total));
        
        // Value label on the bar
        const valueLabel = document.createElement("span");
        valueLabel.className = "bar-value";
        valueLabel.textContent = `${calculatePercentage(data[candidate], total)} (${formatNumber(data[candidate])})`;
        
        // Add tooltip behavior
        barWrapper.addEventListener("mouseover", function(e) {
            const tooltip = document.createElement("div");
            tooltip.className = "chart-tooltip";
            tooltip.innerHTML = `
                <strong>${bar.getAttribute("data-candidate")}</strong><br>
                Votes: ${bar.getAttribute("data-votes")}<br>
                Percentage: ${bar.getAttribute("data-percentage")}
            `;
            document.body.appendChild(tooltip);
            
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
            
            bar.setAttribute("data-tooltip-id", Date.now().toString());
            tooltip.id = bar.getAttribute("data-tooltip-id");
        });
        
        barWrapper.addEventListener("mousemove", function(e) {
            const tooltip = document.getElementById(bar.getAttribute("data-tooltip-id"));
            if (tooltip) {
                tooltip.style.left = `${e.pageX + 10}px`;
                tooltip.style.top = `${e.pageY + 10}px`;
            }
        });
        
        barWrapper.addEventListener("mouseout", function() {
            const tooltip = document.getElementById(bar.getAttribute("data-tooltip-id"));
            if (tooltip) {
                document.body.removeChild(tooltip);
            }
        });
        
        bar.appendChild(valueLabel);
        barWrapper.appendChild(bar);
        barContainer.appendChild(barWrapper);
        chartContainer.appendChild(barContainer);
    });
    
    container.appendChild(chartContainer);
}

// Display county results
function displayCountyResults(countyName) {
    const countyData = electionData.find(county => county.jurisdiction === countyName);
    if (countyData) {
        document.getElementById("county-title").textContent = `${countyName} County Results`;
        displayResults("county-results", countyData);
        createChart("county-chart", countyData);
    }
}

// Initialize the page
function initializePage() {
    // Calculate and display statewide results
    const stateTotals = calculateStateTotals();
    displayResults("state-results", stateTotals);
    createChart("state-chart", stateTotals);
    
    // Populate county dropdown
    populateCountyDropdown();
    
    // Display first county by default
    displayCountyResults(electionData[0].jurisdiction);
    
    // Set up event listeners
    document.getElementById("county-dropdown").addEventListener("change", function() {
        displayCountyResults(this.value);
    });
    
    // View toggle buttons
    document.getElementById("statewide-btn").addEventListener("click", function() {
        document.getElementById("statewide-view").classList.remove("hidden");
        document.getElementById("county-view").classList.add("hidden");
        document.getElementById("statewide-btn").classList.add("active");
        document.getElementById("county-btn").classList.remove("active");
    });
    
    document.getElementById("county-btn").addEventListener("click", function() {
        document.getElementById("statewide-view").classList.add("hidden");
        document.getElementById("county-view").classList.remove("hidden");
        document.getElementById("statewide-btn").classList.remove("active");
        document.getElementById("county-btn").classList.add("active");
    });
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);