// auth.js - Passwortschutz für alle Seiten
// Diese Datei muss in jede HTML-Seite eingebunden werden

(function() {
    // Das Passwort - ÄNDERN SIE DIES!
    const correctPassword = "Portfolio2025";
    
    // Prüfen ob authentifiziert
    function checkAuth() {
        const isAuthenticated = sessionStorage.getItem('portfolio_auth') === 'true';
        
        if (!isAuthenticated) {
            // Nicht authentifiziert - zur Login-Seite umleiten
            if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
                window.location.href = '/index.html';
                return false;
            }
        }
        return true;
    }
    
    // Login-Funktion für index.html
    window.portfolioLogin = function(inputPassword) {
        if (inputPassword === correctPassword) {
            sessionStorage.setItem('portfolio_auth', 'true');
            return true;
        }
        return false;
    }
    
    // Logout-Funktion
    window.portfolioLogout = function() {
        sessionStorage.removeItem('portfolio_auth');
        window.location.href = '/index.html';
    }
    
    // Auth-Check beim Laden der Seite
    document.addEventListener('DOMContentLoaded', function() {
        checkAuth();
    });
    
    // Zusätzlicher Schutz: Verstecke Inhalt bis Auth geprüft ist
    if (!sessionStorage.getItem('portfolio_auth')) {
        document.documentElement.style.visibility = 'hidden';
        
        setTimeout(function() {
            if (sessionStorage.getItem('portfolio_auth') === 'true') {
                document.documentElement.style.visibility = 'visible';
            } else if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
                window.location.href = '/index.html';
            } else {
                document.documentElement.style.visibility = 'visible';
            }
        }, 100);
    }
})();
