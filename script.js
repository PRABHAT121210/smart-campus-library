const materials = [

    // ---------------- CSE ----------------
    {id:1, title:"Data Structures", branch:"CSE", type:"Book", copies:5},
    {id:2, title:"Operating Systems", branch:"CSE", type:"Book", copies:4},
    {id:3, title:"Machine Learning", branch:"CSE", type:"Book", copies:3},
    {id:4, title:"AI in Healthcare", branch:"CSE", type:"Research", copies:2},
    {id:5, title:"Blockchain Security", branch:"CSE", type:"Research", copies:2},

    // ---------------- ECE ----------------
    {id:6, title:"Digital Communication", branch:"ECE", type:"Book", copies:5},
    {id:7, title:"VLSI Design", branch:"ECE", type:"Book", copies:3},
    {id:8, title:"5G Technology", branch:"ECE", type:"Research", copies:2},
    {id:9, title:"Signal Processing", branch:"ECE", type:"Book", copies:4},
    {id:10, title:"IoT Systems", branch:"ECE", type:"Research", copies:2},

    // ---------------- MECH ----------------
    {id:11, title:"Thermodynamics", branch:"MECH", type:"Book", copies:6},
    {id:12, title:"Machine Design", branch:"MECH", type:"Book", copies:3},
    {id:13, title:"Robotics in Manufacturing", branch:"MECH", type:"Research", copies:2},
    {id:14, title:"Fluid Mechanics", branch:"MECH", type:"Book", copies:4},
    {id:15, title:"Automobile Hybrid Systems", branch:"MECH", type:"Research", copies:2},

    // ---------------- CIVIL ----------------
    {id:16, title:"Structural Analysis", branch:"CIVIL", type:"Book", copies:5},
    {id:17, title:"Geotechnical Engineering", branch:"CIVIL", type:"Book", copies:4},
    {id:18, title:"Smart Cities Research", branch:"CIVIL", type:"Research", copies:2},
    {id:19, title:"Environmental Engineering", branch:"CIVIL", type:"Book", copies:3},
    {id:20, title:"Green Building Materials", branch:"CIVIL", type:"Research", copies:2},

    // ---------------- EEE ----------------
    {id:21, title:"Power Systems", branch:"EEE", type:"Book", copies:5},
    {id:22, title:"Electrical Machines", branch:"EEE", type:"Book", copies:4},
    {id:23, title:"Renewable Energy Systems", branch:"EEE", type:"Book", copies:3},
    {id:24, title:"Smart Grid Technology", branch:"EEE", type:"Research", copies:2},
    {id:25, title:"EV Charging Infrastructure", branch:"EEE", type:"Research", copies:2}
];

let borrowedMaterials = [];

function updateDisplay() {

    const list = document.getElementById("book-list");
    const borrowedList = document.getElementById("borrowed-list");
    const search = document.getElementById("search").value.toLowerCase();
    const branch = document.getElementById("branchFilter").value;

    list.innerHTML = "";
    borrowedList.innerHTML = "";

    let filtered = materials.filter(item =>
        item.title.toLowerCase().includes(search) &&
        (branch === "All" || item.branch === branch)
    );

    filtered.forEach(item => {

        list.innerHTML += `
            <div class="book">
                <h3>${item.title}</h3>
                <span class="branch ${item.branch}">${item.branch}</span>
                <p>Type: ${item.type}</p>
                <p>Available Copies: ${item.copies}</p>
                ${item.copies > 0 ? 
                `<button onclick="borrowItem(${item.id})">Borrow</button>` 
                : 
                `<p style="color:red;">Out of Stock</p>`}
            </div>
        `;
    });

    borrowedMaterials.forEach(item => {
        borrowedList.innerHTML += `
            <div class="book">
                <h3>${item.title}</h3>
                <span class="branch ${item.branch}">${item.branch}</span>
                <p>Type: ${item.type}</p>
                <button onclick="returnItem(${item.id})">Return</button>
            </div>
        `;
    });

    document.getElementById("totalBooks").innerText = materials.length;
    document.getElementById("borrowCount").innerText = borrowedMaterials.length;
}

function borrowItem(id) {
    const item = materials.find(m => m.id === id);

    if (item.copies > 0) {
        item.copies--;
        borrowedMaterials.push(item);
        updateDisplay();
    }
}

function returnItem(id) {
    const index = borrowedMaterials.findIndex(m => m.id === id);
    if (index !== -1) {
        const item = borrowedMaterials[index];
        item.copies++;
        borrowedMaterials.splice(index, 1);
        updateDisplay();
    }
}

updateDisplay();
