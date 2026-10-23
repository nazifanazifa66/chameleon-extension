document.addEventListener("DOMContentLoaded", function () {

  const detailsDiv = document.getElementById("details");
  const riskDiv = document.getElementById("riskLevel");
  const backBtn = document.getElementById("goBackBtn");

  if (!detailsDiv || !riskDiv || !backBtn) {
    console.error("HTML elements missing:", {
      detailsDiv, riskDiv, backBtn
    });
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const heuristic = Number(params.get("h")) || 0;
  const ai = Number(params.get("ai")) || 0;

  let riskText = "";
  let riskClass = "";

  if (ai >= 75 || heuristic >= 6) {
    riskText = "HIGH RISK (AI strongly predicts phishing)";
    riskClass = "high";
  } else if (ai >= 50 || heuristic >= 4) {
    riskText = "MEDIUM RISK (Suspicious patterns detected)";
    riskClass = "medium";
  } else {
    riskText = "LOW RISK (Link appears safe)";
    riskClass = "low";
  }

  detailsDiv.innerHTML =
    `<strong>Heuristic Score:</strong> ${heuristic}<br>
     <strong>AI Confidence:</strong> ${ai}%`;

  riskDiv.textContent = "Risk Level: " + riskText;
  riskDiv.classList.add(riskClass);

  backBtn.addEventListener("click", () => history.back());
});