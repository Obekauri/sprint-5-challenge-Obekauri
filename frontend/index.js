async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇


  // Create function that can have an acces into API data
  async function getDataFromAPI(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // Save API data as an array into variable
  const learnersJS = await getDataFromAPI('http://localhost:3003/api/learners');
  const mentorsJS = await getDataFromAPI('http://localhost:3003/api/mentors');

  // Select target elemnd into HTML
  const mainDiv = document.querySelector('.cards');
  const headerText = document.querySelector('.info')


  // forEach loop for manipulate the DOM
  learnersJS.forEach((element, index) => {
    
    // Main div in HTML
    const divsForCard = document.createElement('div');
    divsForCard.classList.toggle('card');

    // h3 tag into HTML
    const h3Tag = document.createElement('h3');
    h3Tag.textContent = element.fullName;

    // div card into HTML
    const emailDiv = document.createElement('div');
    emailDiv.textContent = element.email;

    // h4 tag into HTML
    const h4Tag = document.createElement('h4');
    h4Tag.classList.toggle('closed');
    h4Tag.textContent = "Mentors";

    const learnersWithMentors = [];
    const ulTag = document.createElement('ul');

    // Push combined learners and mentors into array
    learnersJS.forEach(learner => {
      for (let i = 0; i < (learner.mentors).length; i++) {
        mentorsJS.forEach(mentor => {
          if (learner.mentors[i] == mentor.id) {

            learnersWithMentors.push({
              learnerss: learner.fullName,
              mentorss: `${mentor.firstName} ${mentor.lastName}`,
              learnersID: learner.id
            });
          }
        });
      }
    });

    // Loop for learners mentors it will add mentors into li tag
    learnersWithMentors.forEach(subject => {
      if (subject.learnerss == element.fullName) {
        const liTag = document.createElement('li');
        liTag.textContent = subject.mentorss;
        ulTag.appendChild(liTag);
      }
    });


    
      
    mainDiv.appendChild(divsForCard);
    divsForCard.appendChild(h3Tag);
    divsForCard.appendChild(emailDiv);
    divsForCard.appendChild(h4Tag);
    divsForCard.appendChild(ulTag);

  });


  const divExpand = document.querySelectorAll('.card');
  const h3Tags = document.querySelectorAll('h3');
  const h4Tags = document.querySelectorAll('h4');

  // Variables for divs
  let arrayOfDivs = [];
  let secondDiv = null

  // Variavle for h4 tag
  let h4Array = [];
  let secondH2 = null

  headerText.textContent = 'No learner is selected';

  divExpand.forEach((div, index) => {

    div.addEventListener('click', () => {
      
      arrayOfDivs.push(index);
      if (arrayOfDivs.length == 2) { 
        secondDiv = arrayOfDivs.shift();
        if (secondDiv != arrayOfDivs[0]) {
            
          divExpand[secondDiv].classList.remove('selected');
          h3Tags[secondDiv].textContent =`${learnersJS[secondDiv].fullName}`;
          headerText.textContent = 'No learner is selected';
        }
      }

      if(div.className == 'card selected') {
        div.classList.toggle('selected');
        h3Tags[index].textContent = `${learnersJS[index].fullName}`;
        headerText.textContent = 'No learner is selected';
        return;
      }

      div.classList.toggle('selected');
      h3Tags[index].textContent = `${learnersJS[index].fullName}, ${learnersJS[index].id}`;
      headerText.textContent = `The selected learner is ${learnersJS[index].fullName}`;

      if (h4Array.length > 0) {
        if (h4Array[0] != arrayOfDivs[0]) {
          divExpand[h4Array[0]].classList.remove('selected');
          h3Tags[h4Array[0]].textContent =`${learnersJS[h4Array[0]].fullName}`;
        }
      }
    })


    // H4 tag listener (inner click listener, bubble up event)
    h4Tags[index].addEventListener('click', function(event) {

      console.log(event.target)
      if (h4Tags[index].className == 'open') {

        h4Tags[index].classList.remove('open');
        h4Tags[index].classList.add('closed');
        headerText.textContent = `The selected learner is ${learnersJS[index].fullName}`;


      }else if (h4Tags[index].className == 'closed'){
        if(divExpand[index].className == 'card') {

          h4Array.push(index)
          
          if (h4Array.length == 2) {

            secondH2 = h4Array.shift()

            if(secondH2 != h4Array[0]) {
              divExpand[secondH2].classList.remove('selected');
              h3Tags[secondH2].textContent = `${learnersJS[secondH2].fullName}`;

            }
          }
          divExpand[index].classList.toggle('selected')
          h3Tags[index].textContent = `${learnersJS[index].fullName}, ${learnersJS[index].id}`;
          headerText.textContent = `The selected learner is ${learnersJS[index].fullName}`;

        }
        h4Tags[index].classList.remove('closed');
        h4Tags[index].classList.add('open')
      }
      event.stopPropagation();
    })
  })





  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
