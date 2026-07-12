const BASE_URL = "https://manitconnect-2.onrender.com";

const insightForm = document.getElementById("insightForm");

const tagInput = document.getElementById("tagInput");

const selectedTags = document.getElementById("selectedTags");

let tags = [];

insightForm.addEventListener("submit", publishInsight);

/* TAGS */

tagInput.addEventListener("keydown", (event) => {

    if (event.key !== "Enter") {

        return;

    }

    event.preventDefault();

    const value = tagInput.value.trim();

    if (value === "") {

        return;

    }

    if (tags.includes(value)) {

        tagInput.value = "";

        return;

    }

    tags.push(value);

    renderTags();

    tagInput.value = "";

});

function renderTags() {

    selectedTags.innerHTML = "";

    tags.forEach((tag, index) => {

        const chip = document.createElement("div");

        chip.className = "selected-tag";

        chip.innerHTML = `

            ${tag}

            <span onclick="removeTag(${index})">

                ×

            </span>

        `;

        selectedTags.appendChild(chip);

    });

}

function removeTag(index) {

    tags.splice(index, 1);

    renderTags();

}

async function publishInsight(event) {

    event.preventDefault();

    const mentorId = sessionStorage.getItem("mentor_id");

    if (!mentorId) {

        alert("Only mentors can publish insights.");

        return;

    }

    const insight = {

        mentor_id: mentorId,

        title: document.getElementById("title").value,

        category: document.getElementById("category").value,

        tags: document.getElementById("tags").value,

        content: document.getElementById("content").value

    };

    try {

        const response = await fetch(

            `${BASE_URL}/api/insight`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(insight)

            }

        );

        if (!response.ok) {

            throw new Error("Unable to publish insight.");

        }

        alert("Insight published successfully!");

        window.location.href = "insights.html";

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

}