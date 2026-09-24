
<script>

const API = "https://script.google.com/macros/s/AKfycbzzfABuEW0Mh2pCQnWMo35GlZWjaJOl1DOBnpm8M6a-DFFqhyA9UERqlXu6Wrqby109gQ/exec";

// Embedded Base64 Image string for the Principal Signature
const principalSignatureSrc = "data:image/png;base64,iVBORw0KGgoAAAANSU6グラフィックデータ...省略...";

function getResult() {

    const rollInput = document.getElementById("roll");
    const roll = rollInput.value.trim();

    const resultDiv = document.getElementById("result");
    const fetchBtn = document.getElementById("fetch-btn");


    if (!roll) {

        rollInput.style.borderColor = "#e74c3c";

        setTimeout(() => {
            rollInput.style.borderColor = "#e0e0e0";
        }, 2000);

        return;
    }


    fetchBtn.disabled = true;

    fetchBtn.innerHTML = '<div class="spinner"></div>';

    resultDiv.innerHTML =
        "<p style='color:#666; font-style:italic;'>Verifying credentials...</p>";


    fetch(`${API}?roll=${encodeURIComponent(roll)}`)

    .then(r => r.json())

    .then(d => {

        fetchBtn.disabled = false;
        fetchBtn.innerText = "GO";


        if (d.error) {

            resultDiv.innerHTML = `
                <p style="
                    color:#e74c3c;
                    font-weight:bold;
                    animation:slideIn 0.3s ease;
                ">
                    ❌ ${d.error}
                </p>
            `;

            return;
        }


        const statusText =
            (d.result || "")
            .toString()
            .toUpperCase();


        const statusClass =
            statusText.includes("PASS")
            ? "status-pass"
            : "status-fail";


        const totalObtained =
            d.total ?? "-";


        const maxMarks =
            d.max_marks ?? "-";


        const percentage =
            d.percentage !== undefined &&
            d.percentage !== null &&
            d.percentage !== ""
            ? parseFloat(d.percentage).toFixed(2) + "%"
            : "-";


        const overallGrade =
            d.overall_grade ?? "-";


        /* ATTENDANCE */

        const attendance =
            d.attendance ?? "-";


        const attendanceGrade =
            d.attendance_grade ?? "-";


        /* CONFETTI */

        if (statusClass === "status-pass") {

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });

        }


        /* SUBJECTS - MATCHED WITH GOOGLE APPS SCRIPT KEYS */

        const subjects = [

            {
                name: "Attendance",
                mark: d.attendance,
                grade: d.attendance_grade
            },

            {
                name: "Economics",
                mark: d.economics,
                grade: d.economics_grade
            },

            {
                name: "English",
                mark: d.english,
                grade: d.english_grade
            },

            {
                name: "Politics",
                mark: d.politics,
                grade: d.politics_grade
            },

            {
                name: "History & Accountancy",
                mark: d.history_acc,
                grade: d.history_acc_grade
            },

            {
                name: "Sociology & Business Studies",
                mark: d.sociology_bs,
                grade: d.sociology_bs_grade
            },

            {
                name: "T&C",
                mark: d.tc,
                grade: d.tc_grade
            },

            {
                name: "Arabic",
                mark: d.arabic,
                grade: d.arabic_grade
            },

            {
                name: "Hadees",
                mark: d.hadees,
                grade: d.hadees_grade
            },

            {
                name: "Lugathul Arabiya",
                mark: d.luath_arabi,
                grade: d.luath_arabi_grade
            },

            {
                name: "Fathhul Muheen",
                mark: d.fathuhul_mueen,
                grade: d.fathuhul_mueen_grade
            },

            {
                name: "Urdu",
                mark: d.urdu,
                grade: d.urdu_grade
            },

            {
                name: "Alfiya",
                mark: d.alfiya,
                grade: d.alfiya_grade
            },

            {
                name: "Balaga & Mandhiq & Nahv",
                mark: d.nahav_mandhiq_balaga,
                grade: d.nahav_mandhiq_balaga_grade
            }

        ];


        /* CREATE SUBJECT ROWS */

        let subjectRows = subjects.map(s => `

            <tr>

                <td>
                    ${s.name}
                </td>

                <td style="text-align:center;">
                    ${s.mark ?? "-"}
                </td>

                <td style="text-align:right;">
                    <span class="grade-badge">
                        ${s.grade ?? "-"}
                    </span>
                </td>

            </tr>

        `).join("");


        /* RESULT */

        resultDiv.innerHTML = `

        <div id="marksheet">

            <div class="student-info">

                <p>
                    <b>Class:</b>
                    ${d.className || "Plus One"}
                </p>

                <p>
                    <b>Reg No:</b>
                    ${d.roll || roll}
                </p>

                <p>
                    <b>Name:</b>
                    ${d.name || "-"}
                </p>

            </div>


            <table>

                <thead>

                    <tr>

                        <th>
                            Subject
                        </th>

                        <th style="text-align:center;">
                            Marks
                        </th>

                        <th style="text-align:right;">
                            Grade
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${subjectRows}


                    <tr class="highlight">

                        <td colspan="2">
                            Total Obtained
                        </td>

                        <td style="text-align:right;">
                            ${totalObtained}
                        </td>

                    </tr>


                    <tr>

                        <td colspan="2">
                            Maximum Marks
                        </td>

                        <td style="text-align:right;">
                            ${maxMarks}
                        </td>

                    </tr>


                    <tr class="highlight">

                        <td colspan="2">
                            Percentage
                        </td>

                        <td style="text-align:right;">
                            ${percentage}
                        </td>

                    </tr>


                    <tr>

                        <td colspan="2">
                            Overall Grade
                        </td>

                        <td style="text-align:right;">
                            <b>${overallGrade}</b>
                        </td>

                    </tr>


                    <tr class="rank-box">

                        <td colspan="2">
                            Class Rank
                        </td>

                        <td style="text-align:right;">
                            #${d.rank || "N/A"}
                        </td>

                    </tr>


                    <tr>

                        <td
                            colspan="3"
                            class="result-status ${statusClass}"
                        >
                            ${statusText}
                        </td>

                    </tr>

                </tbody>

            </table>

            <div class="signature-container">
                <div class="signature-box">
                    <img src="musthafa usthad.png" alt="Authorized Signature" class="signature-img">
                    <div class="signature-label">SIGNATURE OF PRINCIPAL</div>
                </div>
            </div>
        </div>


        <div class="actions">

            <button
                class="btn-action btn-print"
                onclick="window.print()"
            >
                📄 Print Result
            </button>


            <button
                class="btn-action btn-share"
                onclick="shareResults(
                    '${escapeQuotes(d.name)}',
                    '${escapeQuotes(d.roll)}',
                    '${totalObtained}',
                    '${maxMarks}',
                    '${overallGrade}',
                    '${attendance}',
                    '${attendanceGrade}',
                    '${d.rank || "N/A"}',
                    '${statusText}'
                )"
            >
                💬 WhatsApp
            </button>

        </div>

        `;

    })


    .catch(err => {

        fetchBtn.disabled = false;

        fetchBtn.innerText = "GO";

        resultDiv.innerHTML =
            "<p style='color:#e74c3c'>Connection Error. Please try again.</p>";

        console.error(err);

    });

}


/* ESCAPE QUOTES FOR WHATSAPP BUTTON */

function escapeQuotes(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return value
        .toString()
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');

}


/* WHATSAPP SHARE */

function shareResults(
    name,
    roll,
    total,
    maxMarks,
    grade,
    attendance,
    attendanceGrade,
    rank,
    result
) {

    const message =
        `*NAVAVIYYA ARABIC COLLEGE*%0A` +
        `*Plus One First Term Result 2026-27*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Reg No:* ${roll}%0A` +
        `*Total:* ${total}/${maxMarks}%0A` +
        `*Overall Grade:* ${grade}%0A` +
        `*Attendance:* ${attendance} (${attendanceGrade})%0A` +
        `*Rank:* ${rank}%0A` +
        `*Result:* ${result}`;


    window.open(
        `https://api.whatsapp.com/send?text=${message}`,
        "_blank"
    );

}

</script>