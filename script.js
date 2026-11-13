/* Renders the public profile from window.PROFILE (content/profile.js). */
(function (global) {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function icon(name) {
    var paths = {
      github: '<path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.65.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>',
      linkedin: '<path fill="currentColor" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18.34H6.07V9.75h2.27v8.59zM7.2 8.63a1.32 1.32 0 1 1 0-2.63 1.32 1.32 0 0 1 0 2.63zM18.34 18.34h-2.26v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.09-1.6 2.21v4.25h-2.26V9.75h2.17v1.17h.03c.3-.57 1.04-1.17 2.14-1.17 2.29 0 2.71 1.51 2.71 3.47v5.12z"/>',
      email: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M3.5 6.5h17v11h-17z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="m3.8 6.8 8.2 6.4 8.2-6.4"/>',
      download: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 4v10m0 0 4-4m-4 4-4-4M5 17.5h14"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || "") + "</svg>";
  }

  function initials(name) {
    return String(name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) { return part.charAt(0).toUpperCase(); })
      .join("");
  }

  function applySeo(profile, doc) {
    doc = doc || document;
    var site = profile.site || {};
    var title = site.title || (profile.name + " — " + (profile.headline || ""));
    var description = site.description || profile.summary || "";
    if (title) doc.title = title;
    function setMeta(selector, attr, value) {
      if (!value) return;
      var el = doc.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    }
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="author"]', "content", profile.name || "");
    if (site.url) {
      var canon = doc.querySelector('link[rel="canonical"]');
      if (!canon) {
        canon = doc.createElement("link");
        canon.rel = "canonical";
        doc.head.appendChild(canon);
      }
      canon.href = site.url;
      setMeta('meta[property="og:url"]', "content", site.url);
      if (!doc.querySelector('meta[property="og:url"]')) {
        var og = doc.createElement("meta");
        og.setAttribute("property", "og:url");
        og.setAttribute("content", site.url);
        doc.head.appendChild(og);
      }
    }
  }

  function render(profile) {
    var contact = profile.contact || {};
    var name = profile.name || "";
    var marks = initials(name) || "KT";

    var nav = [
      ["#about", "About"],
      ["#highlights", "Highlights"],
      ["#experience", "Experience"],
      ["#skills", "Skills"],
      ["#education", "Education"],
      ["#contact", "Contact"]
    ].map(function (item) {
      return '<a href="' + item[0] + '">' + esc(item[1]) + "</a>";
    }).join("");

    var ctas = "";
    if (contact.github) {
      ctas += '<a class="btn" href="' + esc(contact.github) + '" target="_blank" rel="noopener noreferrer">' +
        icon("github") + "<span>GitHub</span></a>";
    }
    if (contact.linkedin) {
      ctas += '<a class="btn btn-ghost" href="' + esc(contact.linkedin) + '" target="_blank" rel="noopener noreferrer">' +
        icon("linkedin") + "<span>LinkedIn</span></a>";
    }
    if (contact.email) {
      ctas += '<a class="btn btn-ghost" href="mailto:' + esc(contact.email) + '" target="_blank" rel="noopener">' +
        icon("email") + "<span>Email</span></a>";
    }
    if (contact.resume) {
      ctas += '<a class="btn btn-ghost" href="' + esc(contact.resume) + '" target="_blank" rel="noopener">' +
        icon("download") + "<span>" + esc(contact.resumeLabel || "Download resume") + "</span></a>";
    }

    var highlights = (profile.highlights || []).map(function (item) {
      return '<li><article class="highlight-card">' +
        '<span class="highlight-value">' + esc(item.value) + "</span>" +
        '<span class="highlight-label">' + esc(item.label) + "</span>" +
        "</article></li>";
    }).join("");

    var jobs = (profile.experience || []).map(function (job) {
      var roles = (job.roles || []).map(function (role) {
        return '<p class="job-role"><span class="job-title">' + esc(role.title) +
          '</span><span class="job-dates">' + esc(role.dates) + "</span></p>";
      }).join("");
      var bullets = (job.bullets || []).map(function (b) {
        return "<li>" + esc(b) + "</li>";
      }).join("");
      var badge = job.current ? '<span class="badge">Present</span>' : "";
      return '<li class="job' + (job.current ? " is-current" : "") + '">' +
        "<h3 class=\"job-company\">" + esc(job.company) + "</h3>" +
        ((job.location || badge)
          ? '<p class="job-location">' + (job.location ? esc(job.location) : "") + badge + "</p>"
          : "") +
        '<div class="job-roles">' + roles + "</div>" +
        (bullets ? '<ul class="job-bullets">' + bullets + "</ul>" : "") +
        "</li>";
    }).join("");

    var skills = (profile.skills || []).map(function (group) {
      var items = (group.items || []).map(function (item) {
        return "<li>" + esc(item) + "</li>";
      }).join("");
      return '<section class="skill-card"><h3>' + esc(group.group) + "</h3>" +
        '<ul class="skill-list">' + items + "</ul></section>";
    }).join("");

    var education = (profile.education || []).map(function (ed) {
      return '<article class="edu-card"><p class="edu-kicker">Education</p>' +
        "<h3>" + esc(ed.degree) + "</h3>" +
        '<p class="edu-meta">' + esc(ed.school) + "</p>" +
        '<p class="edu-dates">' + esc(ed.dates) + "</p></article>";
    }).join("");

    var certs = (profile.certifications || []).map(function (cert) {
      return '<article class="edu-card"><p class="edu-kicker">Certification</p>' +
        "<h3>" + esc(cert.name) + "</h3>" +
        '<p class="edu-meta">' + esc(cert.issuer) + "</p>" +
        '<p class="edu-dates">' + esc(cert.dates) + "</p></article>";
    }).join("");

    var contactBits = [];
    if (contact.email) {
      contactBits.push('<a class="btn" href="mailto:' + esc(contact.email) + '" target="_blank" rel="noopener">' + icon("email") +
        "<span>" + esc(contact.email) + "</span></a>");
    }
    if (contact.github) {
      contactBits.push('<a class="btn btn-ghost" href="' + esc(contact.github) + '" target="_blank" rel="noopener noreferrer">' +
        icon("github") + "<span>" + esc(contact.githubLabel || contact.github) + "</span></a>");
    }
    if (contact.linkedin) {
      contactBits.push('<a class="btn btn-ghost" href="' + esc(contact.linkedin) + '" target="_blank" rel="noopener noreferrer">' +
        icon("linkedin") + "<span>" + esc(contact.linkedinLabel || contact.linkedin) + "</span></a>");
    }
    if (contact.resume) {
      contactBits.push('<a class="btn btn-ghost" href="' + esc(contact.resume) + '" target="_blank" rel="noopener">' +
        icon("download") + "<span>" + esc(contact.resumeLabel || "Download resume") + "</span></a>");
    }

    return (
      '<header class="site-header"><div class="header-inner">' +
        '<a class="logo" href="#top">' +
          '<span class="logo-mark">' + esc(marks) + "</span>" +
          '<span class="logo-name">' + esc(name) + "</span>" +
        "</a>" +
        '<nav class="nav" aria-label="Primary">' + nav + "</nav>" +
      "</div></header>" +
      '<main id="main">' +
        '<section class="hero" id="top"><div class="section-inner">' +
          (profile.location ? '<p class="hero-kicker">' + esc(profile.location) + "</p>" : "") +
          "<h1>" + esc(name) + "</h1>" +
          (profile.headline ? '<p class="hero-headline">' + esc(profile.headline) + "</p>" : "") +
          '<div class="cta-row">' + ctas + "</div>" +
        "</div></section>" +
        (highlights
          ? '<section class="highlights" id="highlights" aria-label="Key highlights"><div class="section-inner"><ul class="highlight-grid">' +
            highlights + "</ul></div></section>"
          : "") +
        '<section class="section about" id="about"><div class="section-inner">' +
          '<div class="section-head"><h2>About</h2></div>' +
          '<p class="about-text">' + esc(profile.summary || "") + "</p>" +
        "</div></section>" +
        '<section class="section experience" id="experience"><div class="section-inner">' +
          '<div class="section-head"><h2>Experience</h2></div>' +
          '<ol class="timeline">' + jobs + "</ol>" +
        "</div></section>" +
        '<section class="section skills" id="skills"><div class="section-inner">' +
          '<div class="section-head"><h2>Skills</h2></div>' +
          '<div class="skill-grid">' + skills + "</div>" +
        "</div></section>" +
        '<section class="section education" id="education"><div class="section-inner">' +
          '<div class="section-head"><h2>Education and certifications</h2></div>' +
          '<div class="edu-grid">' + education + certs + "</div>" +
        "</div></section>" +
        '<section class="section contact" id="contact"><div class="section-inner">' +
          '<div class="section-head"><h2>Contact</h2></div>' +
          '<p class="contact-lead">The best way to reach ' + esc(name.split(" ")[0] || name) +
          " is by email. GitHub and LinkedIn are also linked below, and the resume is available as a PDF.</p>" +
          '<div class="cta-row">' + contactBits.join("") + "</div>" +
        "</div></section>" +
      "</main>" +
      '<footer class="footer"><div class="footer-inner">' +
        "<span>" + esc(name) + (profile.location ? " · " + esc(profile.location) : "") + "</span>" +
        "<span>" + esc(profile.headline || "") + "</span>" +
      "</div></footer>"
    );
  }

  function mount(root, profile, options) {
    options = options || {};
    if (!root) return;
    if (!profile) {
      root.innerHTML = '<p class="js-required">The profile data file could not be loaded. Open content/profile.js and make sure window.PROFILE is set.</p>';
      return;
    }
    if (!options.skipSeo) applySeo(profile, options.document || document);
    root.innerHTML = render(profile);
  }

  global.KrishnaSite = {
    render: render,
    mount: mount,
    applySeo: applySeo,
    escapeHtml: esc
  };
})(window);
