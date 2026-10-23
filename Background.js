// -------- HEURISTIC ANALYSIS --------
function heuristicAnalysis(url) {
  let risk = 0;

  // Long URL
  if (url.length > 75) risk += 2;

  // IP address instead of domain
  if (/\d+\.\d+\.\d+\.\d+/.test(url)) risk += 3;

  // Suspicious keywords
  if (/login|verify|bank|secure|update|account|free/i.test(url)) risk += 2;

  // No HTTPS
  if (!url.startsWith("https://")) risk += 1;

  // Too many dots (fake subdomains)
  if ((url.match(/\./g) || []).length > 5) risk += 1;

  // Hyphen in domain
  if (url.includes("-")) risk += 1;

  // URL shorteners
  if (/bit\.ly|tinyurl|t\.co|goo\.gl/i.test(url)) risk += 3;

  // Suspicious TLDs
  if (/\.(xyz|top|tk|ml|ga)$/i.test(url)) risk += 2;

  return risk;
}

// -------- AI PREDICTION (SIMULATED ML MODEL) --------
function aiPrediction(url) {
  let probability = Math.random() * 40;

  if (/login|bank|verify|secure/i.test(url)) probability += 20;
  if (url.length > 80) probability += 10;
  if (!url.startsWith("https://")) probability += 10;
  if (/\d+\.\d+\.\d+\.\d+/.test(url)) probability += 20;

  if (probability > 100) probability = 100;
  return Math.round(probability);
}

// -------- AUTOMATIC INTERCEPTION --------
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const url = details.url;

  // Ignore chrome internal pages
  if (url.startsWith("chrome://") || url.startsWith("edge://")) return;

  const heuristicScore = heuristicAnalysis(url);
  const aiScore = aiPrediction(url);

  // HYBRID DECISION ENGINE
  if (heuristicScore >= 6 || aiScore >= 70) {
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL(
        `warning.html?h=${heuristicScore}&ai=${aiScore}`
      )
    });
  }
});