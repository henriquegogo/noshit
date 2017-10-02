var selectors = [];
//var attempts = 0;
//var scroll_timeout = null;

selectors.push('#ad', '.ad', '#teadsusersync ~ div'); 
selectors.push('[id^=pagelet_].pagelet'); // Facebook Ads
/*
selectors.push('[id^=ads_]', '[id^=ads-]', '[id^=ad_]', '[id^=ad-]',);
selectors.push('[id$=_ads]', '[id$=-ads]', '[id$=_ad]', '[id$=-ad]');
selectors.push('[class^=ads_]', '[class^=ads-]', '[class^=ad_]', '[class^=ad-]');
selectors.push('[class$=_ads]', '[class$=-ads]', '[class$=_ad]', '[class$=-ad]');
*/

[/*'_ads_', '-ads-', '_ad_', '-ad-',
 ' ads_', ' ads-', ' ad_', ' ad-',
 '_ads ', '-ads ', '_ad ', '-ad ',*/
 'patrocin', 'sponsor', 'publici', 'promoted', 'promovido', 'paywall',
 'shopping', 'advertis', 'dynad', 'aswift', 'adzerk', 'adcriteo',
 'cto_iframe', 'carbonads', 'teads', 'taboola', 'outbrain', '_OAS_',
 'abrAD_', 'google_ads', 'aep-ads']
.forEach(word => {
  selectors.push('iframe[src*="'+word+'"]');
  selectors.push('[id*="'+word+'"]');
  selectors.push('[class*="'+word+'"]');
});

// Exceptions: OLX, YouTube, Spotify
var not = ':not([id$=-ad-list]):not(.html5-video-player):not([class$=-has-ads])';

// Hide Selectors
function hide_selectors() {
  //console.log('No Shit!');
  document.querySelectorAll('body, object').forEach(item => {
    var body = item.contentWindow ? item.contentWindow.document.body : item;
    selectors.forEach(selector => {
      body.querySelectorAll(selector + not).forEach(element => {
        element.parentElement.removeChild(element);
      });
    });
   
    // Video skip. YouTube 
    var video_played = document.querySelector(".ad-interrupting video");
    if (video_played) video_played.currentTime = video_played.duration;
  });
};

var tryToFind = setInterval(function() {
  hide_selectors();
  //attempts++;
  //if (attempts > 5) { clearInterval(tryToFind); attempts = 0; } 
}, 1000);

// Call hide selectors function
/*
window.addEventListener('scroll', function() {
  clearTimeout(scroll_timeout);
  scroll_timeout = setTimeout(hide_selectors, 500);
});
*/

// Some injected hacks
var script = document.createElement('script');
script.id = 'noshit';

if (location.host == 'www.facebook.com') {
  script.textContent += "setInterval(function() { document.querySelectorAll('a').forEach(element => { if (element.innerHTML == 'Sponsored') element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none' }); }, 1000);";
}
if (location.host.endsWith('infomoney.com.br')) { script.textContent += 'const unload = false;' }
if (location.host.endsWith('gazetadopovo.com.br')) { script.textContent += 'const loganApi = null;' }
if (location.host.endsWith('folha.uol.com.br')) { script.textContent += 'const folha_ads = false;' }
if (location.host.endsWith('abril.com.br')) { script.textContent += 'const startPiano = null;' }
if (location.host.endsWith('globo.com')) { script.textContent += 'const Piano = null;' }

if (script.textContent) document.documentElement.appendChild(script);
