const page = new Page('https://randomuser.me/api/?results=12&nat=us');
page.getUsers();
page.createSearch();

$('.gallery').on('click', (e)=>{
    let selected = e.target;
    
    if(selected.className!=='gallery'){
        while(selected.className!=="card"){ 
            selected = selected.parentElement;
        }
        const index = parseInt(selected.id);
        page.users[index].modal.style.display = '';
    }
});
page.searchBtn.addEventListener('click', (event)=>{
    if(page.searchBox.value!==''){
        page.searching = true;
    }else{
        page.searching = false;
    }
    if(page.searching){
        page.searchUsers()
    }else{
        page.matched = [];
        page.users.forEach(user => user.card.style.display = '');
    }
});
