loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data, dataLimit);
}

displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // * display 10 phones only
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    
    //* display no phone found
    const noFoundMsg = document.getElementById('no-found-message');
    if(phones.length === 0){
        noFoundMsg.classList.remove('d-none');
    }else{
        noFoundMsg.classList.add('d-none')
    }

    //* display all phones
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                </div>
            </div>  
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    //* stop loader
    toggleSpinner(false)
}
//* handle search button key
processSearch = (dataLimit) => {
    //* start loader
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}
//* search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', (e) => {
    // console.log(e.key)
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

document.getElementById('search-btn').addEventListener('click', () => {
    processSearch(10);
})

//* spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }else{
        loaderSection.classList.add('d-none')
    }
}

//* not the best way to show all 
document.getElementById('btn-show-all').addEventListener('click', () => {
    processSearch();
})

//* phone details
loadPhoneDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

displayPhoneDetails = phone => {
    console.log(phone)
    const phoneName = document.getElementById('phoneDetailModalLabel');
    phoneName.innerText = phone.name;

    const releaseDate = document.getElementById('phone-details');
    releaseDate.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage found'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth information'}</p>
    `
}

loadPhone('apple')
