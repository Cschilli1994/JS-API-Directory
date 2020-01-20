class Page {
    constructor(userURL){
        this.userURL = userURL;
        this.users = [];
        this.searching = false;
        this.matched = [];
    }
    async getUsers(){
        const res = await fetch(this.userURL);
        const data = await res.json();
        const results = await data.results;
        console.log(results);
        let i = 0;
        //loops thru each employee creating their own card and appends to the page.
        results.forEach(person => {       
            const user = new User(
                person.picture.medium,
                `${person.name.first} ${person.name.last}`,
                person.email,
                person.location.country,
                `${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}`,
                person.cell,
                person.dob.date.slice(0,10)
            );
            user.makeCard(i);
            user.createModal();
            this.users.push(user);
            i++;
        });
    }
    createSearch(){
        const $searchContainer = $('.search-container')[0]; 
        this.searchBox = document.createElement('input');
        this.searchBox.className = 'search-input';
        this.searchBox.type = 'search'
        this.searchBox.placeholder = 'Search by name...';
        $searchContainer.append(this.searchBox);
        this.searchBtn = document.createElement('button');
        this.searchBtn.textContent = 'Search';
        this.searchBtn.className = 'search-submit';
        $searchContainer.append(this.searchBtn);

        
    }
    searchUsers(){
       this.users.forEach(user=>{
           const matched = user.name.toLowerCase().includes(this.searchBox.value.toLowerCase());
           if(matched){
               user.card.style.display = '';
               this.matched.push(user);
           }else{
               user.card.style.display = 'none';
           }
       })

    }
}