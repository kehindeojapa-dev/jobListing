// CACHE DOM SELECTORS
const main = document.getElementById('main');

async function getJobs() {
    const job = await fetch('./data.json');
    const jobData = await job.json();
    console.log(jobData);

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
            if(job.featured == true) {
                return `<li class='featured'>FEATURED</li>`
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
                    count += `<li><a href='#'>${languages[i]}</a></li>`
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
                    count += `<li><a href='#'>${tools[i]}</a></li>`
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
            <div class='JobLeft2nd'>
              <h4>${position}</h4>
              <h2><span>${postedAt} . </span><span>${contract} . </span><span>${location}</span></h2>
            </div>
          </div>
        </div>
        <div class="job-Keyword">
          <ul>
            <li><a href="#">${role}</a></li>
            <li><a href="#">${level}</a></li>
            ${jobLanguage()}
            ${jobTools()}
          </ul>
        </div>
        `

        main.appendChild(jobCard);
    })
} 

getJobs();



// <li><a href="#">${languages[0]}</a></li>
// <li><a href="#">${languages[1]}</a></li>
// <li><a href="#">${languages[2]}</a></li>