const form = document.getElementById("marksForm");
const result = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");
const markInputs = Array.from(document.querySelectorAll(".mark"));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.hidden = true;

  const name = document.getElementById("studentName").value.trim();
  const marks = markInputs.map((input) => Number(input.value));

  if (!name) {
    showError("Please enter the student's name.");
    return;
  }

  if (markInputs.some((input) => input.value.trim() === "") ||
      marks.some((mark) => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
    showError("Enter a valid mark from 0 to 100 for every subject.");
    return;
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = total / marks.length;
  const passed = marks.every((mark) => mark >= 35);
  let grade;

  if (!passed) grade = "F";
  else if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";
  else grade = "E";

  document.getElementById("resultName").textContent = name;
  document.getElementById("totalMarks").textContent = `${total} / 500`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = grade;
  document.getElementById("status").textContent = passed ? "PASS" : "FAIL";
  document.getElementById("status").style.color = passed ? "#067647" : "#b42318";
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

form.addEventListener("reset", () => {
  result.hidden = true;
  errorMessage.hidden = true;
  document.getElementById("status").style.color = "";
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  result.hidden = true;
}
