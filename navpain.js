// ==UserScript==
// @name         Defender navigation pane (sic) helper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  The (floating) favourites bar *they* didn't want you to have. It's a conspiracy!
// @match        https://security.microsoft.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const favourites = [
        { name: "Inc", url: "https://security.microsoft.com/incidents" },
        { name: "Log", url: "https://security.microsoft.com/hunting" },
        { name: "Lak", url: "https://security.microsoft.com/lake-explorer" },
        { name: "Alr", url: "https://security.microsoft.com/alerts" },
        { name: "Det", url: "https://security.microsoft.com/custom_detection" },
        { name: "Ana", url: "https://security.microsoft.com/sentinel/analytics" },
        { name: "Wrk", url: "https://security.microsoft.com/sentinel/workbooks"}
    ];

    const bar = document.createElement('div');
    bar.id = 'favBar';
    bar.innerHTML = favourites
        .map(f => `<a href="${f.url}">${f.name}</a>`)
        .join('<span class="sep"> | </span>');

    Object.assign(bar.style, {
        position: 'fixed',
        top: '50px',
        left: '50px',
        background: '#585654', // dark grey Defender-like background
        color: '#ffffff',
        padding: '6px 10px',
        borderRadius: '6px',
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
        a.style.margin = '0 5px';
    });

    // Style separators
    bar.querySelectorAll('.sep').forEach(span => {
        span.style.color = '#cccccc'; // light grey separators
    });

    document.body.appendChild(bar);
})();