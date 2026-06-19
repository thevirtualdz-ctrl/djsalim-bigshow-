const url = "https://djsalim-bigshow.vercel.app/";

async function getScores(strategy) {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`API returned ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const categories = data.lighthouseResult.categories;
  return {
    performance: Math.round((categories.performance?.score || 0) * 100),
    accessibility: Math.round((categories.accessibility?.score || 0) * 100),
    bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
    seo: Math.round((categories.seo?.score || 0) * 100)
  };
}

async function run() {
  try {
    console.log("Fetching Mobile Scores...");
    const mobile = await getScores("mobile");
    console.log("MOBILE_SCORES:", mobile);

    console.log("Fetching Desktop Scores...");
    const desktop = await getScores("desktop");
    console.log("DESKTOP_SCORES:", desktop);
  } catch (err) {
    console.error(err);
  }
}

run();
