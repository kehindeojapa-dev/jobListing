// CACHE DOM SELECTORS
const main = document.getElementById('main');
const filterContainer = document.querySelector('.filter-Container');
let filterCriteria = []; // To hold filter items



/**
 * Function for displaying jobs according to the filtered job available.
 */
const getCurrentJob = (job) => {
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
}


async function getJobs() {
    const job = await fetch('./data.json');
    const jobData = await job.json();
    //Get all entries of the job listing.
    jobData.forEach(job => {
      getCurrentJob(job);
    })
        
} 

// Initial generated job listing
getJobs();



/**
 * 
 * Filter Function
 */
main.addEventListener('click', e => {
  e.preventDefault();
  let item = (e.target);
  
  // get clicked item into the filter container
  function getFilterData() {
    let count = '';
    filterCriteria.forEach(item => {
      count += `<li>${item}<a href="#" class='close_btn'><img src="./images/icon-remove.svg"></a></li> `
    });
    return count;
  }

  //Create the filter container to contain the filter item,
  //and updates the filter criteria with the filter item.
  if(item.classList.value == 'filterItem') {

    //Check to see if the filter item is already in the
    //filterCriteria.
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
    
    
    //Filter function to get jobs that belong
    //to the filter items
    let filter = jobData.filter(x => {
      let currentCheck = 1;
      let previousCheck;
      let CheckStatus = 1;
      for(let i = 0; i < filterCriteria.length; i++){
        previousCheck = CheckStatus;
        currentCheck = (x.role == filterCriteria[i] ||
        x.level == filterCriteria[i] ||
        x.languages.includes(filterCriteria[i]) ||
        x.tools.includes(filterCriteria[i]))
        CheckStatus = previousCheck && currentCheck;
      }
      return CheckStatus;
    })

    main.innerHTML = '';
    filter.forEach(job => {
      getCurrentJob(job);
    }) 
} 

getfilteredJobs();

});


/**
 * Clear function,
 * close_button of filter item function,
 * function to update job_feed as filter item is been removed
 */

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
    let itemContainer = item.parentElement;
    itemContainer.classList.add('remove-display');
    if(filterCriteria.length == 0) {
      let filterHolder = itemContainer.parentElement.parentElement.parentElement;
      filterHolder.classList.add('remove-display');
    }
  }  
  
  async function getfilteredJobs() {
    const job = await fetch('./data.json');
    const jobData = await job.json();
    
    
    //Filter function to get jobs that belong
    //to the filter items
    let filter = jobData.filter(x => {
      let currentCheck = 1;
      let previousCheck;
      let CheckStatus = 1;
      for(let i = 0; i < filterCriteria.length; i++){
        previousCheck = CheckStatus;
        currentCheck = (x.role == filterCriteria[i] ||
        x.level == filterCriteria[i] ||
        x.languages.includes(filterCriteria[i]) ||
        x.tools.includes(filterCriteria[i]))
        CheckStatus = previousCheck && currentCheck
      }
      return CheckStatus;
    })
    

    main.innerHTML = '';
    filter.forEach(job => {
      getCurrentJob(job);
    }) 
  }

  getfilteredJobs();
})




// Add styling to jobCard that is featured.

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