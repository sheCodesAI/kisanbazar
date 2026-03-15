// ============================================================
//  KisanBazaar — Shared App JS (include on ALL pages)
//  Handles: Mobile nav toggle, active link, smooth scroll,
//           Back-to-top, keyboard shortcuts
// ============================================================

/* ── Mobile Hamburger Menu ────────────────────────────────── */
function initMobileNav() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Inject hamburger button
    if (!document.getElementById('hamburger')) {
        const ham = document.createElement('button');
        ham.id = 'hamburger';
        ham.innerHTML = '☰';
        ham.setAttribute('aria-label', 'Toggle menu');
        ham.style.cssText = 'display:none;background:none;border:none;font-size:24px;cursor:pointer;color:var(--primary);padding:4px 8px;';
        navbar.appendChild(ham);

        // Mobile drawer
        const drawer = document.createElement('div');
        drawer.id = 'mobile-drawer';
        drawer.style.cssText = `
      display:none; position:fixed; top:68px; left:0; right:0; bottom:0;
      background:rgba(255,255,255,0.98); backdrop-filter:blur(20px);
      z-index:99; padding:24px; overflow-y:auto;
      flex-direction:column; gap:8px;
      border-top:1px solid var(--border);
    `;

        // Clone nav links into drawer
        const nav = document.querySelector('.navbar-nav');
        if (nav) {
            const clonedNav = nav.cloneNode(true);
            clonedNav.style.cssText = 'list-style:none; display:flex; flex-direction:column; gap:4px;';
            Array.from(clonedNav.querySelectorAll('a')).forEach(a => {
                a.style.cssText = 'display:block; padding:14px 16px; font-size:17px; font-weight:600; border-radius:var(--radius-sm); color:var(--text);';
            });
            drawer.appendChild(clonedNav);
        }

        const actions = document.querySelector('.navbar-actions');
        if (actions) {
            const clonedActions = actions.cloneNode(true);
            clonedActions.style.cssText = 'display:flex; flex-direction:column; gap:12px; margin-top:20px;';
            Array.from(clonedActions.querySelectorAll('.btn')).forEach(b => {
                b.style.justifyContent = 'center';
                b.style.padding = '14px 20px';
            });
            drawer.appendChild(clonedActions);
        }

        document.body.appendChild(drawer);

        ham.addEventListener('click', () => {
            const open = drawer.style.display === 'flex';
            drawer.style.display = open ? 'none' : 'flex';
            ham.innerHTML = open ? '☰' : '✕';
        });

        // Close on outside click
        document.addEventListener('click', e => {
            if (!navbar.contains(e.target) && !drawer.contains(e.target)) {
                drawer.style.display = 'none';
                ham.innerHTML = '☰';
            }
        });
    }

    // Show/hide based on viewport
    const mq = window.matchMedia('(max-width: 768px)');
    function onResize(e) {
        const ham = document.getElementById('hamburger');
        const nav = document.querySelector('.navbar-nav');
        const actions = document.querySelector('.navbar-actions');
        if (e.matches) {
            if (ham) ham.style.display = 'block';
            if (nav) nav.style.display = 'none';
            if (actions) actions.style.display = 'none';
        } else {
            if (ham) ham.style.display = 'none';
            const drawer = document.getElementById('mobile-drawer');
            if (drawer) { drawer.style.display = 'none'; ham.innerHTML = '☰'; }
            if (nav) nav.style.display = 'flex';
            if (actions) actions.style.display = 'flex';
        }
    }
    mq.addEventListener('change', onResize);
    onResize(mq);
}

/* ── Active nav link ─────────────────────────────────────── */
function highlightActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav a').forEach(a => {
        const href = (a.getAttribute('href') || '').split('/').pop();
        a.classList.toggle('active', href === path);
    });
}

/* ── Back to top button ──────────────────────────────────── */
function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '↑';
    btn.title = 'Back to top';
    btn.style.cssText = `
    position:fixed; bottom:80px; right:24px; width:44px; height:44px;
    border-radius:50%; background:var(--primary); color:#fff;
    border:none; font-size:20px; font-weight:700; cursor:pointer;
    box-shadow:0 4px 16px rgba(46,125,50,0.35);
    opacity:0; transform:translateY(16px);
    transition:opacity 0.3s, transform 0.3s; z-index:90;
  `;
    document.body.appendChild(btn);
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
        const show = window.scrollY > 400;
        btn.style.opacity = show ? '1' : '0';
        btn.style.transform = show ? 'translateY(0)' : 'translateY(16px)';
        btn.style.pointerEvents = show ? 'auto' : 'none';
    });
}

/* ── Smooth fade-in on scroll ────────────────────────────── */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .cat-card, .stat-card, .hero-stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

/* ── Loading overlay ─────────────────────────────────────── */
function showLoading(msg) {
    let overlay = document.getElementById('kb-loading');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'kb-loading';
        overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(255,255,255,0.9);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      z-index:9999; gap:16px; backdrop-filter:blur(4px);
    `;
        overlay.innerHTML = `
      <div style="width:48px;height:48px;border:4px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:kb-spin 0.8s linear infinite;"></div>
      <p style="font-weight:600;color:var(--primary);font-family:'DM Sans',sans-serif;" id="kb-loading-msg">${msg || 'Loading…'}</p>
      <style>@keyframes kb-spin{to{transform:rotate(360deg)}}</style>
    `;
        document.body.appendChild(overlay);
    } else {
        document.getElementById('kb-loading-msg').textContent = msg || 'Loading…';
        overlay.style.display = 'flex';
    }
}

function hideLoading() {
    const overlay = document.getElementById('kb-loading');
    if (overlay) overlay.style.display = 'none';
}

/* ── Shared toast (overrides the one in cart.js if present) ─ */
if (typeof showToast !== 'function') {
    window.showToast = function (msg, type) {
        let c = document.getElementById('toast-container');
        if (!c) { c = document.createElement('div'); c.id = 'toast-container'; c.className = 'toast-container'; document.body.appendChild(c); }
        const t = document.createElement('div'); t.className = 'toast ' + (type || ''); t.textContent = msg; c.appendChild(t);
        setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100%)'; setTimeout(() => t.remove(), 300); }, 3000);
    };
}

/* ── Confirm dialog (styled) ─────────────────────────────── */
window.kbConfirm = function (msg, onYes) {
    let modal = document.getElementById('kb-confirm');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'kb-confirm';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9998;display:flex;align-items:center;justify-content:center;';
        modal.innerHTML = `
      <div style="background:#fff;border-radius:var(--radius-lg);padding:36px;max-width:380px;width:90%;text-align:center;box-shadow:var(--shadow-lg);">
        <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
        <p id="kb-confirm-msg" style="font-size:17px;font-weight:600;margin-bottom:24px;"></p>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button id="kb-confirm-yes" class="btn btn-primary">Yes, confirm</button>
          <button id="kb-confirm-no"  class="btn btn-outline">Cancel</button>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
    }
    document.getElementById('kb-confirm-msg').textContent = msg;
    modal.style.display = 'flex';
    document.getElementById('kb-confirm-yes').onclick = () => { modal.style.display = 'none'; onYes(); };
    document.getElementById('kb-confirm-no').onclick = () => { modal.style.display = 'none'; };
};

/* ── Format currency ─────────────────────────────────────── */
window.formatINR = function (n) {
    return '₹' + Number(n).toLocaleString('en-IN');
};

/* ── API Helper ─────────────────────────────────────────── */
window.KBApi = {
    async request(url, method = 'GET', body = null) {
        const user = KBSession.getUser();
        const headers = { 'Content-Type': 'application/json' };
        if (user) {
            headers['x-user-id'] = user.id;
            headers['x-user-role'] = user.role;
        }

        const options = {
            method,
            headers
        };
        if (body) options.body = JSON.stringify(body);
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Request failed');
            return data;
        } catch (err) {
            console.error('[API Error]', err);
            throw err;
        }
    }
};

/* ── Session: simple user state ──────────────────────────── */
window.KBSession = {
    getUser() { try { return JSON.parse(localStorage.getItem('kb_user')) || null; } catch { return null; } },
    setUser(u) { localStorage.setItem('kb_user', JSON.stringify(u)); },
    logout() { localStorage.removeItem('kb_user'); window.location.href = '/pages/login.html'; },
    isLoggedIn() { return !!this.getUser(); },

    async login(email, password) {
        const res = await KBApi.request('/api/auth/login', 'POST', { email, password });
        if (res.success) this.setUser(res.user);
        return res;
    },

    async register(data) {
        const res = await KBApi.request('/api/auth/register', 'POST', data);
        if (res.success) this.setUser(res.user);
        return res;
    }
};

/* ── Update navbar based on login state ──────────────────── */
function updateNavbarAuth() {
    const user = KBSession.getUser();
    const navActions = document.querySelector('.navbar-actions');
    if (!navActions) return;

    if (user) {
        // Replace Sign In button with User profile link
        const signInBtn = Array.from(navActions.querySelectorAll('a')).find(a => a.textContent.includes('Sign In'));
        if (signInBtn) {
            signInBtn.innerHTML = `👤 ${user.name.split(' ')[0]}`;
            signInBtn.href = user.role === 'farmer' ? '/pages/farmer-dashboard.html' : '/pages/buyer-dashboard.html';

            // Add Logout button if not present
            if (!document.getElementById('logout-btn')) {
                const logout = document.createElement('a');
                logout.id = 'logout-btn';
                logout.href = '#';
                logout.className = 'btn btn-outline btn-sm';
                logout.textContent = 'Logout';
                logout.onclick = (e) => { e.preventDefault(); KBSession.logout(); };
                navActions.appendChild(logout);
            }
        }
    }
}

/* ── Init on DOM ready ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    highlightActiveNav();
    initBackToTop();
    setTimeout(initScrollReveal, 100);
    updateNavbarAuth();
});
