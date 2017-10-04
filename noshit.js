var selectors = [];

selectors.push('#ad', '.ad', '.ads-ad', '#teadsusersync ~ div');
selectors.push('#masthead-ad', '.video-ads', '#player-ads'); // YouTube Ads
selectors.push('[id^=pagelet_].pagelet'); // Facebook Ads

['patrocin', 'sponsor', 'publici', 'promoted', 'promovido', 'paywall',
 'shopping', 'advertis', 'dynad', 'aswift', 'adzerk', 'adcriteo',
 'cto_iframe', 'carbonads', 'teads', 'taboola', 'outbrain', '_OAS_',
 'abrAD_', 'google_ads', 'aep-ads', 'adplugg']
.forEach(word => {
  selectors.push('iframe[src*="'+word+'"]');
  selectors.push('[id*="'+word+'"]');
  selectors.push('[class*="'+word+'"]');
});

// Exceptions: OLX, YouTube, Spotify
var not = ':not([id$=-ad-list]):not(.html5-video-player):not([class$=-has-ads])';

// Hide Selectors
function hide_selectors() {
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

setInterval(hide_selectors, 1000);

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
