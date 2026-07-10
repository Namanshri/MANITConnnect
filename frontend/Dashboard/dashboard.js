const BASE_URL = "https://manitconnnect-2.onrender.com";

const mentorCount = document.getElementById("mentorCount");

const placementCount = document.getElementById("placementCount");

const internshipCount = document.getElementById("internshipCount");

const recentMentors = document.getElementById("recentMentors");

const recentinsights = document.getElementById("recentinsights");

let mentors = [];

/* FETCH DASHBOARD DATA */

async function loadDashboard() {

    try {

        const response = await fetch(

            `${BASE_URL}/api/mentor`

        );

        if (!response.ok) {

            throw new Error("Unable to fetch mentors.");

        }

        mentors = await response.json();

        updateStatistics();

        renderRecentMentors();

        loadRecentinsights();

    }

    catch (error) {

        console.log(error);

    }

}

/* STATISTICS */

function updateStatistics() {

    mentorCount.textContent = mentors.length;

    placementCount.textContent = mentors.filter(

        mentor => mentor.experience_type === "Placement"

    ).length;

    internshipCount.textContent = mentors.filter(

        mentor => mentor.experience_type === "Internship"

    ).length;

}

/* LATEST MENTORS */

function renderRecentMentors() {

    recentMentors.innerHTML = "";

    mentors

    .slice(0,6)

    .forEach(mentor => {

        recentMentors.innerHTML += `

        <div class="mentor-card">

            <div class="mentor-image"></div>

            <h3>

                ${mentor.full_name}

            </h3>

            <p>

                ${mentor.company}

            </p>

            <p>

                ${mentor.role}

            </p>

            <p class="package">

                ${mentor.package_lpa} LPA

            </p>

            <p>

                CGPA : ${mentor.cgpa}

            </p>

            <span class="type">

                ${mentor.experience_type}

            </span>

            <button

                class="view-btn"

                onclick="openProfile(${mentor.mentor_id})"

            >

                View Profile

            </button>

        </div>

        `;

    });

}

/* OPEN PROFILE */

function openProfile(id){

    window.location.href =

    `../mentor/mentor.html?id=${id}`;

}

/* insights */

async function loadRecentinsights(){

    try{

        const response = await fetch(

            `${BASE_URL}/api/experience`

        );

        if(!response.ok){

            return;

        }

        const insights = await response.json();

        recentinsights.innerHTML = "";

        insights

        .slice(0,5)

        .forEach(exp=>{

            recentinsights.innerHTML += `

            <div class="experience-card">

                <h3>

                    ${exp.company || "Company"}

                </h3>

                <p>

                    ${exp.preparation_strategy || "-"}

                </p>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

loadDashboard();