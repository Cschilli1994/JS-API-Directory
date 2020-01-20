class User {
    constructor(image, name, email, country, address, phone, birthday){
        this.image = image;
        this.name = name;
        this.email = email;
        this.country = country;
        this.address = address;
        this.phone = phone;
        this.birthday = birthday;
        
    }
    makeElement(ele, nameClass, text, eleID){
        //  <div class="card">
          const newEle = document.createElement(ele);
          newEle.className = nameClass;
          if(eleID){
            newEle.id = eleID;
          }
          if(text){
            newEle.textContent = text;
          }
          
          return newEle;
        }
    makeCard(userNum){
        this.cardNumber = userNum;
        const $gallery = $('.gallery');
        //stores user card w/ this.card
        this.card = this.makeElement('div', 'card', '', `${userNum}-user`);
        $gallery.append(this.card);
        const imgCardContainer = this.makeElement('div','card-img-container');
        imgCardContainer.unselectable = true;
        this.card.appendChild(imgCardContainer);

        //                        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
        const cardImage = this.makeElement('img', 'card-img');
        cardImage.src = this.image;
        cardImage.alt = 'profile picture';
        imgCardContainer.appendChild(cardImage);

        //                    <div class="card-info-container">
        const cardInfo = this.makeElement('div', 'card-info-container');
        this.card.appendChild(cardInfo);

        //                        <h3 id="name" class="card-name cap">first last</h3>
        const cardName = this.makeElement('h3', 'card-name cap', this.name);
        cardInfo.appendChild(cardName);

        //                        <p class="card-text">email</p>
        const cardEmail = this.makeElement('p', 'card-text', this.email);
        cardInfo.appendChild(cardEmail);

        //                        <p class="card-text cap">city, state</p>
        const cardLoc = this.makeElement('p','card-text cap', this.country);
        cardInfo.appendChild(cardLoc);
        this.userNum = userNum;
    }
    createModal(){
        //   <div class="modal-container">
          const modalContainerDiv = this.makeElement('div','modal-container');
          document.body.appendChild(modalContainerDiv);
          this.modal = modalContainerDiv;
          this.modal.style.display = 'none';
         
            modalContainerDiv.addEventListener('click', (event) => {
                if(event.target.id==='modal-close-btn'){
                    this.modal.style.display = 'none';
                }else if(event.target.id==='previous-btn'){
                    if(page.searching===false){
                        if(this.cardNumber!==0){
                            this.modal.style.display = 'none';
                            page.users[this.cardNumber-1].modal.style.display = '';
                        }
                    }else if(page.searching){
                        if(this.matchedIndex!==0){
                            this.modal.style.display = 'none';
                            page.matched[this.matchedIndex-1].modal.style.display = '';
                        }
                    }
                }else if(event.target.id==='next-btn'){
                    if(page.searching===false){
                        if(this.cardNumber!==11){
                            this.modal.style.display = 'none';
                            page.users[this.cardNumber+1].modal.style.display = '';
                        }
                    }else if(page.searching){
                        if(this.matchedIndex<page.matched.length-1){
                            this.modal.style.display = 'none';
                            page.matched[this.matchedIndex+1].modal.style.display = '';
                        }
                    }
                }
            })
         
         
          
        //                <div class="modal">
          const modalDiv = this.makeElement('div','modal');
          modalContainerDiv.appendChild(modalDiv);
        //                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          const modalCloseBtn = this.makeElement('button','modal-close-btn','X', 'modal-close-btn');
          modalCloseBtn.type = 'button';
          modalDiv.appendChild(modalCloseBtn);
          
        //                    <div class="modal-info-container">
          const modalInfoContainer = this.makeElement('div','modal-info-container');
          modalDiv.appendChild(modalInfoContainer);
        //                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
          const modalImg = this.makeElement('img','modal-img');
          modalImg.src = this.image;
          modalInfoContainer.appendChild(modalImg);
        //                        <h3 id="name" class="modal-name cap">name</h3>
          const modalName = this.makeElement('h3','modal-name-cap');
          modalName.textContent = this.name;
          modalInfoContainer.appendChild(modalName);
        //                        <p class="modal-text">email</p>
          const modalEmail = this.makeElement('p','modal-text', this.email);
          modalInfoContainer.appendChild(modalEmail);
          
        //                        <p class="modal-text cap">country</p>
          const modalAddress = this.makeElement('p','modal-text cap', this.country);
           modalInfoContainer.appendChild(modalAddress);
        //                        <hr>
        const br = this.makeElement('br');
        modalInfoContainer.appendChild(br);
        //                        <p class="modal-text">(555) 555-5555</p>
        const phoneNumber = this.makeElement('p', 'modal-text', this.phone);
        modalInfoContainer.appendChild(phoneNumber);
        //                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        const address = this.makeElement('p', 'modal-text', this.address);
        modalInfoContainer.appendChild(address);
        //                        <p class="modal-text">Birthday: 10/21/2015</p>
        const bDay = this.makeElement('p','modal-text', `Birthday: ${this.formattedDate}`);
        modalInfoContainer.appendChild(bDay);
        
        // <div class="modal-btn-container">
        const btnContainer = this.makeElement('div','modal-btn-container');
        modalInfoContainer.appendChild(btnContainer);
        // <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        const prevButton = this.makeElement('button','modal-prev btn', 'Prev','previous-btn');
        prevButton.type ='button';
        btnContainer.appendChild(prevButton);
        const nextButton = this.makeElement('button','modal-next btn', 'Next','next-btn');
        nextButton.type= 'button';
        btnContainer.appendChild(nextButton);
        // <button type="button" id="modal-next" class="modal-next btn">Next</button>
        }
    get formattedDate(){
        const year = this.birthday.slice(0,4);
        const month = this.month(this.birthday.slice(5,7));
        const day = this.birthday.slice(8);
        return `${day} ${month} ${year}`
    }
    month(date){
        switch(date){
            case '01':return 'JAN';
            case '02':return 'FEB';
            case '03':return 'MAR';
            case '04':return 'APR';
            case '05':return 'MAY';
            case '06':return 'JUN';
            case '07':return 'JUL';
            case '08':return 'AUG';
            case '09':return 'SEPT';
            case '10':return 'OCT';
            case '11':return 'NOV';
            case '12':return 'DEC';
        }
    }
}