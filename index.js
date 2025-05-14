/**
 * function pureFadeIn(e,o){var i=document.getElementById(e);i.style.opacity=0,i.style.display=o||"block",function e(){var o=parseFloat(i.style.opacity);(o+=.02)>1||(i.style.opacity=o,requestAnimationFrame(e))}()}
 */
function pureFadeIn(e,o) {
    var i = document.getElementById(e);
    i.style.opacity = 0,
    i.style.display = o || "block",

    function e() {
        var o = parseFloat(i.style.opacity);
        (o += .02) > 1 || (
            i.style.opacity = o,
            requestAnimationFrame(e)
        );
    }();
};

/**
 * function pureFadeOut(e){var o=document.getElementById(e);o.style.opacity=1,function e(){(o.style.opacity-=.02)<0?o.style.display="none":requestAnimationFrame(e)}()}
 */
function pureFadeOut(e) {
    var o = document.getElementById(e);
    o.style.opacity = 1,
    function e() {
        (o.style.opacity -= .02) < 0 ? o.style.display="none" : requestAnimationFrame(e)
    }();
};

/**
 * function setCookie(e,o,i){var t="";if(i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3),t="; expires="+n.toUTCString()}document.cookie=e+"="+(o||"")+t+"; path=/"}
 */
function setCookie(e,o,i) {
    var t = "";
    if (i) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3),
        t = "; expires=" + n.toUTCString()
    }
    document.cookie = e + "=" + (o || "") + t + "; path=/";
};

/**
 * function getCookie(e){for(var o=e+"=",i=document.cookie.split(";"),t=0;t<i.length;t++){for(var n=i[t];" "==n.charAt(0);)n=n.substring(1,n.length);if(0==n.indexOf(o))return n.substring(o.length,n.length)}return null}
 */
function getCookie(e) {
    for (var o = e + "=", i = document.cookie.split(";"), t = 0; t < i.length; t++) {
        for (var n = i[t]; " " == n.charAt(0);) n = n.substring(1,n.length);
        if (0 == n.indexOf(o)) return n.substring(o.length,n.length);
    }
    return null;
};

/**
 * function eraseCookie(e){document.cookie=e+"=; Max-Age=-99999999;"}
 */
function eraseCookie(e) {
    document.cookie = e + "=; Max-Age=-99999999;";
};

/**
 * function cookieConsent(){getCookie("purecookieDismiss")||(document.body.innerHTML+='<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>'+purecookieTitle+'</a></div><div class="cookieDesc"><p>'+purecookieDesc+" "+purecookieLink+'</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">'+purecookieButton+"</a></div></div>",pureFadeIn("cookieConsentContainer"))}
 */
function cookieConsent() {
    getCookie("purecookieDismiss") || (
        document.getElementById('cookieConsentContainer').style.display = "block",
        pureFadeIn("cookieConsentContainer")
    );
};

/**
 * function purecookieDismiss(){setCookie("purecookieDismiss","1",7),pureFadeOut("cookieConsentContainer")}
 */
function purecookieDismiss() {
    setCookie("purecookieDismiss", "1", 7),
    pureFadeOut("cookieConsentContainer");
    document.getElementById('politica').classList.remove('show');
};

/**
 * window.onload=function(){cookieConsent()};
 */
window.onload = () => {
    cookieConsent();
};
// Adicione no final do arquivo index.js

// Gerenciamento de modais para mobile
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do modal
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  const openLogin = document.getElementById('openLogin');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const closeButtons = document.querySelectorAll('.close');
  const logoutBtn = document.getElementById('logout');
  
  // Abrir modal de login
  if (openLogin) {
    openLogin.addEventListener('click', function() {
      loginModal.style.display = 'flex';
    });
  }
  
  // Alternar entre login e cadastro
  if (showRegister) {
    showRegister.addEventListener('click', function(e) {
      e.preventDefault();
      loginModal.style.display = 'none';
      registerModal.style.display = 'flex';
    });
  }
  
  if (showLogin) {
    showLogin.addEventListener('click', function(e) {
      e.preventDefault();
      registerModal.style.display = 'none';
      loginModal.style.display = 'flex';
    });
  }
  
  // Fechar modais
  closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      loginModal.style.display = 'none';
      registerModal.style.display = 'none';
    });
  });
  
  // Fechar ao clicar fora
  window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
    if (event.target === registerModal) {
      registerModal.style.display = 'none';
    }
  });
  
  // Simulação de login/logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      // Lógica de logout aqui
      logoutBtn.style.display = 'none';
      if (openLogin) openLogin.style.display = 'block';
    });
  }
  
  // Ajustar carrosséis para mobile
  function adjustCarouselsForMobile() {
    if (window.innerWidth <= 768) {
      carrosseis.doces.totalSlides = Math.ceil(
        document.querySelectorAll('#carrossel-doces .produto').length
      );
      carrosseis.salgados.totalSlides = Math.ceil(
        document.querySelectorAll('#carrossel-salgados .produto').length
      );
    }
  }
  
  // Ajustar inicial e em redimensionamento
  adjustCarouselsForMobile();
  window.addEventListener('resize', adjustCarouselsForMobile);
  
  // Carregar carrinho do localStorage
  loadCart();
});