const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data, dataLimit))
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    //* display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
       phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }else{
        showAll.classList.add('d-none')
    }

    //* no phones alert
    const noFoundMsg = document.getElementById('no-found-message');
    if(phones.length === 0){
        noFoundMsg.classList.remove('d-none')
    }else{
        noFoundMsg.classList.add('d-none')
    }

    phones.forEach(phone => {
        // console.log(phone)
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
            <div class="card py-4 px-2">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="phoneDetails('${phone.slug}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
            </div>
        `;
        phonesContainer.appendChild(phonesDiv);
    });
    //* stop spinner
    toggleSpinner(false);
}
//* handle search button key
processSearch = (dataLimit) => {
    //* start loader
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
const searchProcess = dataLimit => {
    //* start loader 
    toggleSpinner(true)
    const searchField = document.getElementById('phone-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
//* search input field enter key handler
document.getElementById('phone-field').addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        searchProcess(10)
    }
})

document.getElementById('search-btn').addEventListener('click', () => {
    searchProcess(10)
})
//* spinner
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }else{
        spinner.classList.add('d-none');
    }
}
//* not the best way to do this
document.getElementById('btn-show-all').addEventListener('click', () => {
    searchProcess();
})

//* phone details
const phoneDetails = async(id) => {
   const url = `https://openapi.programming-hero.com/api/phone/${id}`;
   const res = await fetch(url)
   const data = await res.json()
   displayPhonesDetails(data.data)
}
const displayPhonesDetails = (details) => {
    console.log(details)
    const phoneName = document.getElementById('phoneDetailModalLabel');
    phoneName.innerText = details.name;

    const phoneFeatures = document.getElementById('phone-features');
    phoneFeatures.innerHTML = `
        <h5>SOC: ${details.mainFeatures.chipSet}</h5>
    `
}







loadPhones('apple')