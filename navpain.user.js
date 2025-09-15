// ==UserScript==
// @name         Defender navigation pane (sic) helper
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  The (floating) favourites bar *they* didn't want you to have. It's a conspiracy!
// @match        https://security.microsoft.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/TristankMS/comfort-defender/refs/heads/main/navpain.js
// ==/UserScript==

(function() {
    'use strict';

    const favourites = [
        { name: "INC", url: "https://security.microsoft.com/incidents", tip: "Incidents" },
        { name: "Alr", url: "https://security.microsoft.com/alerts", tip: "Alerts" },
        { name: "Wbk", url: "https://security.microsoft.com/sentinel/workbooks", tip: "Workbooks"},
        { name: "LOG", url: "https://security.microsoft.com/hunting", tip: "Advanced Hunting/Logs" },
        { name: "Lak", url: "https://security.microsoft.com/lake-explorer", tip: "KQL Lake Explorer" },
        { name: "DET", url: "https://security.microsoft.com/custom_detection", tip: "Custom Detections" },
        { name: "Ana", url: "https://security.microsoft.com/sentinel/analytics", tip: "Analytics Rules" }
    ];

    const bar = document.createElement('div');
    bar.id = 'favBar';
    bar.innerHTML = favourites
        .map(f => `<a href="${f.url}" title="${f.tip}">${f.name}</a>`)
        .join('<span class="sep"> | </span>');

    Object.assign(bar.style, {
        position: 'fixed',
        top: '50px',
        left: '50px',
        background: '#585654', // dark grey Defender-like background
        color: '#ffffff',
        padding: '5px 8px',
        borderRadius: '5px',
        fontSize: '14px',
        zIndex: 99999,
        whiteSpace: 'nowrap',
        fontFamily: 'Segoe UI, sans-serif',
        opacity: '0.8',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
    });

    // Style links
    bar.querySelectorAll('a').forEach(a => {
        a.style.color = '#ffffff'; // white text
        a.style.textDecoration = 'none';
        a.style.margin = '0 4px';
    });

    // Style separators
    bar.querySelectorAll('.sep').forEach(span => {
        span.style.color = '#cccccc'; // light grey separators
    });

    document.body.appendChild(bar);
})();
