// CACHE DOM SELECTORS
const main = document.getElementById('main');
const filterContainer = document.querySelector('.filter-Container');
let filterCriteria = [];
async function getJobs() {
    const job = await fetch('./data.json');
    const jobData = await job.json();
    
    let toolss = 'React'; 
    let onlyCss = jobData.filter(x => 
      x.languages.includes('Python') &&
      x.tools.includes('Django')
    );

    jobData.forEach(job => {
        const {company, contract, featured, languages, level, location, logo, position, postedAt, role, tools} = job;
        function jobIsNew() {
            if(job.new == true) {
                return `<li class='new'>NEW!</li>`
            } else {
                return '';
            }
        }
        function jobIsFeatured() {
            if(featured == true) {
                return `<li class='new featured'>FEATURED</li>`
            } else {
                return '';
            }
        }
        function jobLanguage() {
            let count = '';
            if(languages.length == 0) {
                return ''
            } else {
                for(let i = 0; i < languages.length; i++) {
                    count += `<li><a href='#' class='filterItem'>${languages[i]}</a></li>`
                }
            }
            return count;
        }
        function jobTools() {
            let count = '';
            if(tools.length == 0) {
                return ''
            } else {
                for(let i = 0; i < tools.length; i++) {
                    count += `<li><a href='#' class='filterItem'>${tools[i]}</a></li>`
                }
            }
            return count;
        }
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-Container');
        jobCard.innerHTML = `
        
        <div class="job-Description">
          <div class='job-image'>
            <img src="${logo}">
          </div>
          <div class='jobLeft'>
            <div class='jobLeft1st'>
              <ul>
                <li class='companyTitle'>${company}</li>
                ${jobIsNew()}
                ${jobIsFeatured()}
              </ul>
            </div>
            <div class='jobLeft2nd'>
              <h4>${position}</h4>
              <h2><span>${postedAt} . </span><span>${contract} . </span><span>${location}</span></h2>
            </div>
          </div>
        </div>
        <div class="job-Keyword">
          <ul>
            <li><a href="#" class='filterItem'>${role}</a></li>
            <li><a href="#" class='filterItem'>${level}</a></li>
            ${jobLanguage()}
            ${jobTools()}
          </ul>
        </div>
        `

        main.appendChild(jobCard);
    })
} 

getJobs();

main.addEventListener('click', e => {
  e.preventDefault();
  let item = (e.target);
  function getFilterData() {
    let count = '';
    filterCriteria.forEach(item => {
      count += `<li>${item}<a href="#" class='close_btn'><img src="./images/icon-remove.svg"></a></li> `
    });
    return count;
  }
  if(item.classList.value == 'filterItem') {
    if(!(filterCriteria.includes(item.textContent))){
      filterCriteria.push(item.textContent);
    } 
    const jobfilter = document.createElement('div');
    jobfilter.classList.add('job-filter');
    jobfilter.innerHTML = `
      <ul>
        ${getFilterData()}
      </ul>
      <a href="#" class="clear">Clear</a>
    `
    filterContainer.innerHTML = '';
    filterContainer.appendChild(jobfilter);
    filterContainer.classList.remove('remove-display');
  } 
  
  

  async function getfilteredJobs() {
    const job = await fetch('./data.json');
    const jobData = await job.json();
    
    let toolss = 'React'; 
    
    // let count = '';
    // for(let i = 0; i < filterCriteria.length; i++){
    //   count += x.role == filterCriteria[i] || 
    //   x.level == filterCriteria[i] ||
    //   x.languages.includes(filterCriteria[i]) ||
    //   x.tools.includes(filterCriteria[i])
    // }
    let filter = jobData.filter(x => {
      let currentCheck = 1;
      let previousCheck;
      let CheckStatus = '';
      for(let i = 0; i < filterCriteria.length; i++){
        previousCheck = currentCheck;
        currentCheck = (x.role == filterCriteria[i] ||
        x.level == filterCriteria[i] ||
        x.languages.includes(filterCriteria[i]) ||
        x.tools.includes(filterCriteria[i]))
        CheckStatus = previousCheck && currentCheck
        
        // console.log(filterCriteria[i])
      }
      // return x.languages.includes('CSS');
      return CheckStatus;
    })
    
    console.log(filter);
    // jobData.forEach(job => {
    //     const {company, contract, featured, languages, level, location, logo, position, postedAt, role, tools} = job;
    //     function jobIsNew() {
    //         if(job.new == true) {
    //             return `<li class='new'>NEW!</li>`
    //         } else {
    //             return '';
    //         }
    //     }
    //     function jobIsFeatured() {
    //         if(featured == true) {
    //             return `<li class='new featured'>FEATURED</li>`
    //         } else {
    //             return '';
    //         }
    //     }
    //     function jobLanguage() {
    //         let count = '';
    //         if(languages.length == 0) {
    //             return ''
    //         } else {
    //             for(let i = 0; i < languages.length; i++) {
    //                 count += `<li><a href='#' class='filterItem'>${languages[i]}</a></li>`
    //             }
    //         }
    //         return count;
    //     }
    //     function jobTools() {
    //         let count = '';
    //         if(tools.length == 0) {
    //             return ''
    //         } else {
    //             for(let i = 0; i < tools.length; i++) {
    //                 count += `<li><a href='#' class='filterItem'>${tools[i]}</a></li>`
    //             }
    //         }
    //         return count;
    //     }
    //     const jobCard = document.createElement('div');
    //     jobCard.classList.add('job-Container');
    //     jobCard.innerHTML = `
        
    //     <div class="job-Description">
    //       <div class='job-image'>
    //         <img src="${logo}">
    //       </div>
    //       <div class='jobLeft'>
    //         <div class='jobLeft1st'>
    //           <ul>
    //             <li class='companyTitle'>${company}</li>
    //             ${jobIsNew()}
    //             ${jobIsFeatured()}
    //           </ul>
    //         </div>
    //         <div class='jobLeft2nd'>
    //           <h4>${position}</h4>
    //           <h2><span>${postedAt} . </span><span>${contract} . </span><span>${location}</span></h2>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="job-Keyword">
    //       <ul>
    //         <li><a href="#" class='filterItem'>${role}</a></li>
    //         <li><a href="#" class='filterItem'>${level}</a></li>
    //         ${jobLanguage()}
    //         ${jobTools()}
    //       </ul>
    //     </div>
    //     `

    //     main.appendChild(jobCard);
    // })
} 

getfilteredJobs();






});

filterContainer.addEventListener('click', e => {
  e.preventDefault();
  let item = e.target;
  if(item.classList.value == 'clear') {
    let container = item.parentElement.parentElement;
    container.classList.add('remove-display');
    filterCriteria = []
  } 

  if(item.classList.value == 'close_btn') {
    let removeItem = item.previousSibling.textContent;
    filterCriteria =  filterCriteria.filter(x => x != removeItem)
    itemContainer = item.parentElement;
    itemContainer.classList.add('remove-display');
    if(filterCriteria.length == 0) {
      let filterHolder = itemContainer.parentElement.parentElement.parentElement;
      filterHolder.classList.add('remove-display');
    }
  }
})

//Add styling to jobCard that is featured.
let featureStyle = setInterval(() => {
  let feature = document.getElementsByClassName('featured');
  if(feature) {
    feature = Array.from(feature);
    feature.forEach(feat => {
      let borderLeft = feat.parentElement.parentElement.parentElement.parentElement.parentElement;
      borderLeft.classList.add('featureStyle');
    })
    clearInterval(featureStyle);
  }
}, (100));