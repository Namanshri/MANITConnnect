const BASE_URL = "https://manitconnnect-2.onrender.com";

const mentorCount = document.getElementById("mentorCount");

const placementCount = document.getElementById("placementCount");

const internshipCount = document.getElementById("internshipCount");

const recentMentors = document.getElementById("recentMentors");

const recentInsights =
document.getElementById("recentInsights");

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

        //updateStatistics();

        renderRecentMentors();

        loadRecentInsights();

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

    .forEach(mentor=>{

        recentMentors.innerHTML += `

        <div class="card">

            <div class="top">

                <img

                src="https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.full_name)}&background=8a00ff&color=ffffff"

                >

                <div>

                    <h3>

                        ${mentor.full_name}

                    </h3>

                    <p>

                        ${mentor.company}

                    </p>

                </div>

            </div>

            <span class="tag">

                ${mentor.role}

            </span>

            <h2>

                ${mentor.package_lpa} LPA

            </h2>

            <p>

                ⭐ CGPA : ${mentor.cgpa}

            </p>

            <div class="buttons">

                <button

                onclick="openProfile(${mentor.mentor_id})">

                View Profile

                </button>

                <button

                onclick="openProfile(${mentor.mentor_id})">

                View Journey

                </button>

            </div>

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

async function loadRecentInsights(){

    try{

        const response = await fetch(

        `${BASE_URL}/api/insight`
        );

        if(!response.ok){

            return;

        }

        const insights = await response.json();

        recentInsights.innerHTML = "";

        insights

        .slice(0,5)

        .forEach(exp=>{

            recentInsights.innerHTML += `

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