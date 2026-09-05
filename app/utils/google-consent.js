// Basic Google Consent Mode: queue defaults before loading any Google tag.
(function () {
  var measurementId = 'G-E4XF1JFR2H';
  var storageKey = 'portfolio-analytics-consent-v1';
  var maxAge = 180 * 24 * 60 * 60 * 1000;
  var loaded = false;
  var choice = null;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  function consent(analytics) {
    return { analytics_storage: analytics, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  }
  window.gtag('consent', 'default', consent('denied'));
  window['ga-disable-' + measurementId] = true;
  function clearCookies() {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      var parts = location.hostname.split('.');
      document.cookie = name + '=; Max-Age=0; path=/';
      while (parts.length > 1) {
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + parts.join('.');
        parts.shift();
      }
    });
  }
  function apply(value) {
    choice = value;
    var accepted = value === 'accepted';
    window['ga-disable-' + measurementId] = !accepted;
    window.gtag('consent', 'update', consent(accepted ? 'granted' : 'denied'));
    if (!accepted) { clearCookies(); return; }
    if (loaded) return;
    loaded = true;
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var script = document.createElement('script');
    script.id = 'google-tag-loader';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }
  try {
    var saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && (saved.value === 'accepted' || saved.value === 'rejected') &&
      typeof saved.at === 'number' && saved.at <= Date.now() && Date.now() - saved.at < maxAge) apply(saved.value);
  } catch (_) { /* Storage may be unavailable; consent still works for this visit. */ }
  if (choice === null) clearCookies();
  window.portfolioAnalytics = {
    getChoice: function () { return choice; },
    choose: function (value) {
      if (value !== 'accepted' && value !== 'rejected') return;
      var revoke = loaded && value === 'rejected';
      try { localStorage.setItem(storageKey, JSON.stringify({ value: value, at: Date.now() })); } catch (_) {}
      apply(value);
      // Remove the running tag after withdrawal; the next load stays blocked.
      if (revoke) location.reload();
    }
  };
})();
