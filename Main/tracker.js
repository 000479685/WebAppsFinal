let entriesList = [];

async function checkIfUserLoggedIn()
{
    const token = localStorage.getItem('token');
    if(!token)
    {
        window.location.href = 'http://localhost:4000';
    }    
    generateAllEntries();
}

async function addEntry(event)
{
    event.preventDefault();
    const title = document.getElementById('title').value;
    const expense = document.getElementById('expense').value;
    const date = document.getElementById('date').value;
    const reason = document.getElementById('reason').value;
    const token = localStorage.getItem('token');

    if (!token)
    {
        alert("Token not found");
        return;
    }

    const newEntry = 
    {
        title,
        expense,
        date,
        reason        
    }

    try
    {
        const createdEntry = await fetch('/api/v1/user/tracker', {
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            },
            body: JSON.stringify(newEntry)
        });
        
        const createdEntryJSON = await createdEntry.json();
        
        generateAllEntries();

    }catch(error)
    {
        alert(`Error: ${error}`);
    }
}

async function getAllEntries()
{
    try
    {
        const allEntries = await fetch('/api/v1/user/tracker')            
        
        const allEntriesJSON = await allEntries.json();                

        entriesList = allEntriesJSON;        
        
    }catch(error)
    {
        alert(`Error: ${error}`);
    }
}

async function generateAllEntries()
{    
    const entriesElement = document.getElementById('entry-list');    
    entriesElement.innerHTML = "";

    await getAllEntries();
        

    let i = 0;
    let total = 0;
    for(let entry of entriesList.data)
    {
        const red = Math.floor(Math.random() * 200) + 55;
        const blue = Math.floor(Math.random() * 200) + 55;
        const green = Math.floor(Math.random() * 200) + 55;
        const newEntryHTML = `<li class="pl-3" style="background-color: rgb(${red},${blue},${green})">${entry.title} <b>\$${entry.expense}</b> ${entry.date} ${entry.reason}</li>
        <button class="bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" id="delete-button" onclick="deleteEntry(${i})">Delete</button>
        `;
        entriesElement.innerHTML += newEntryHTML;
        i++
        total += parseFloat(entry.expense);
    }

    const totalExpensesElement = document.getElementById('total-expenses');    
    totalExpensesElement.textContent = `Total expenses : \$${total.toFixed(2)}`;
}

async function deleteEntry(listIndex)
{    
    const token = localStorage.getItem('token');

    if (!token)
    {
        alert("Token not found");
        return;
    }

    try
    {
        const deletedEntry = await fetch('/api/v1/user/tracker', {
            method:"DELETE",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token                
            },
            body: JSON.stringify(entriesList.data[listIndex])
        });                
        
        generateAllEntries();
    }catch(error)
    {
        alert(`Error deleting: ${error}`);
    }
}

function logout(event)
{
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'https://webappsfinal.onrender.com';
}

function chartExplaination()
{
    alert('Chart js does not function properly at the moment and to research how to get it working is beyond the scope I am willing to study');
}

checkIfUserLoggedIn();