// ==UserScript==
// @name         Security Center Auto Refresh (on Idle) - SCARi for Defender
// @namespace    https://security.microsoft.com/
// @description  tries to automate the Security Incident refresh button when idle
// @version      0.5
// @match        https://security.microsoft.com/incidents?*
// @grant        none
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/TristankMS/comfort-defender/refs/heads/main/autorefresh.js
// ==/UserScript==

(function() {
  const refreshInSeconds = 6;
  const idleThresholdInSeconds = 30;

  const refreshInterval = refreshInSeconds * 1000; // how often to *check*
  const idleThreshold = idleThresholdInSeconds * 1000; // if > threshold, hit refresh

  let lastActivity = Date.now();

  // update on any user interaction
  ['mousemove','keydown','mousedown','touchstart'].forEach(evt =>
    document.addEventListener(evt, () => { lastActivity = Date.now(); }, true)
  );

  setInterval(() => {
    if (Date.now() - lastActivity >= idleThreshold) {
      const btn = document.getElementById('SyncIncidents');
      if (btn) btn.click();
    }
    // else: user was active recently, so skip this cycle
  }, refreshInterval);
})();
