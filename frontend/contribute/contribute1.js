const mentorForm = document.getElementById("mentorForm");

mentorForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();

    const company = document.getElementById("company").value.trim();

    const role = document.getElementById("role").value.trim();

    const packageLPA = document.getElementById("package").value.trim();

    const cgpa = document.getElementById("cgpa").value.trim();

    const experienceType = document.getElementById("experienceType").value;

    const placementMode = document.querySelector(
        'input[name="placementMode"]:checked'
    ).value;

    if (
        fullName === "" ||
        company === "" ||
        role === "" ||
        packageLPA === "" ||
        cgpa === "" ||
        experienceType === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }

    const mentorData = {

        full_name: fullName,

        company: company,

        role: role,

        package_lpa: packageLPA,

        cgpa: Number(cgpa),

        experience_type: experienceType,

        placement_mode: placementMode

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/mentor",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(mentorData)

            }
        );

        if (!response.ok) {

            throw new Error("Failed to save mentor.");

        }

        const data = await response.json();

        sessionStorage.setItem(

            "mentor_id",

            data.mentor_id

        );

        sessionStorage.setItem(

            "mentor_name",

            fullName

        );

        sessionStorage.setItem(

            "company",

            company

        );

        alert("Basic details saved successfully!");

        window.location.href = "contribute2.html";

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

});