import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Custom Cursor Logic
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => cursorRef.current?.classList.add('big');
    const handleMouseLeave = () => cursorRef.current?.classList.remove('big');

    document.addEventListener('mousemove', handleMouseMove);
    
    const interactables = document.querySelectorAll('a, button, .rcard, .bc, .s-card, .step');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Intersection Observer Logic
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
        }
      });
    }, { threshold: 0.1 });

    const reveals = document.querySelectorAll('.rv');
    reveals.forEach(el => io.observe(el));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      reveals.forEach(el => io.unobserve(el));
    };
  }, []);

  return (
    <div className="landing-acid-wrap">
      {/* Dynamic Font Imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');

        .landing-acid-wrap {
          --ink: #111827; /* System Slate 900 */
          --ink2: #1f2937; /* Slightly lighter slate */
          --paper: #f8f9fb; /* System BG */
          --paper2: #f3f4f6; /* Surface Dim */
          --acid: #7c3aed; /* System Brand Purple */
          --acid2: #6d28d9; /* Brand Purple Dark */
          --muted: #6b7280; /* Slate 500ish */
          --border: #e5e7eb;
          --white: #ffffff;
          
          background: var(--ink);
          color: var(--paper);
          font-family: 'Syne', sans-serif;
          cursor: none;
          min-height: 100vh;
        }

        #cursor {
          position: fixed;
          width: 12px; height: 12px;
          background: var(--acid);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.18s, height 0.18s;
          mix-blend-mode: difference;
        }
        #cursor.big { width: 40px; height: 40px; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 2.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(18px);
          background: rgba(10, 10, 10, 0.75);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-size: 1.05rem; font-weight: 700; letter-spacing: -0.02em;
          color: var(--paper); text-decoration: none;
        }
        .logo-hex {
          width: 30px; height: 30px; background: var(--acid);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex; align-items: center; justify-content: center;
        }
        .logo-hex span { font-size: 10px; font-weight: 800; color: var(--ink); }
        .nav-links { display: flex; gap: 2.5rem; }
        .nav-links a {
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(244, 241, 235, 0.4); text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--paper); }
        .nav-btns { display: flex; gap: 10px; }
        .nbtn {
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          padding: 8px 18px; border-radius: 100px;
          cursor: none; text-decoration: none; transition: all 0.18s; border: none;
        }
        .nbtn-ghost { background: transparent; color: var(--paper); border: 1px solid rgba(255, 255, 255, 0.14); }
        .nbtn-ghost:hover { border-color: var(--acid); color: var(--acid); }
        .nbtn-acid { background: var(--acid); color: var(--ink); }
        .nbtn-acid:hover { background: var(--acid2); }

        /* HERO */
        .hero {
          min-height: 100vh; padding: 9rem 2.5rem 5rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
          position: relative; overflow: hidden;
        }
        .hero::after {
          content: ''; position: absolute; top: -200px; right: -200px;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-left { position: relative; z-index: 1; }
        .h-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--acid); margin-bottom: 2rem;
        }
        .h-line { width: 28px; height: 1px; background: var(--acid); }
        .hero h1 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(3rem, 5.5vw, 4.8rem); font-weight: 400;
          line-height: 1.06; letter-spacing: -0.025em; color: var(--paper);
          margin-bottom: 2rem;
        }
        .hero h1 .it { font-style: italic; color: var(--acid); }
        .hero h1 .ot { -webkit-text-stroke: 1.5px rgba(244, 241, 235, 0.5); color: transparent; }
        .hero-body {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem; font-weight: 300;
          color: rgba(244, 241, 235, 0.45); line-height: 1.85;
          max-width: 380px; margin-bottom: 2.5rem;
        }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
        .hcta-main {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 700;
          padding: 14px 28px; border-radius: 100px;
          background: var(--acid); color: var(--ink);
          text-decoration: none; cursor: none; transition: all 0.2s; border: none;
        }
        .hcta-main:hover { background: var(--acid2); transform: translateY(-1px); }
        .hcta-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 600;
          padding: 14px 28px; border-radius: 100px;
          background: transparent; color: var(--paper);
          border: 1px solid rgba(255, 255, 255, 0.16);
          text-decoration: none; cursor: none; transition: all 0.2s;
        }
        .hcta-ghost:hover { border-color: rgba(255, 255, 255, 0.4); background: rgba(255, 255, 255, 0.04); }

        .hero-right { display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 1; }
        .s-card {
          border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 16px;
          padding: 1.4rem 1.6rem;
          background: rgba(255, 255, 255, 0.025); backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: space-between;
          transition: border-color 0.2s; cursor: none;
        }
        .s-card:hover { border-color: rgba(124, 58, 237, 0.25); }
        .s-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244, 241, 235, 0.3); margin-bottom: 5px; }
        .s-val {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem; color: var(--paper); line-height: 1;
        }
        .s-val .u { font-size: 0.9rem; color: rgba(244, 241, 235, 0.35); margin-left: 3px; }
        .s-pill {
          font-size: 0.67rem; font-weight: 700; letter-spacing: 0.06em;
          padding: 5px 11px; border-radius: 100px;
        }
        .sp-g { background: rgba(124, 58, 237, 0.1); color: var(--acid); }
        .sp-b { background: rgba(100, 160, 255, 0.1); color: #6ab4ff; }
        .sp-o { background: rgba(255, 160, 60, 0.1); color: #ffa03c; }

        /* MARQUEE */
        .marquee {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.85rem 0; overflow: hidden;
          background: rgba(124, 58, 237, 0.03);
        }
        .marquee-inner { display: flex; width: max-content; animation: mq 24s linear infinite; }
        .mq-item {
          white-space: nowrap; padding: 0 2rem;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(244, 241, 235, 0.28);
          display: flex; align-items: center; gap: 2rem;
        }
        .mq-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--acid); }
        @keyframes mq { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        /* PIPELINE */
        .pipeline { padding: 7rem 2.5rem; background: var(--paper); color: var(--ink); position: relative; overflow: hidden; }
        .pipeline::before {
          content: 'ATS';
          position: absolute; right: -20px; top: 50%; transform: translateY(-50%);
          font-family: 'Instrument Serif', serif;
          font-size: clamp(8rem, 18vw, 16rem);
          color: rgba(0, 0, 0, 0.035); line-height: 1; pointer-events: none; letter-spacing: -0.05em;
        }
        .pipe-top {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 4rem; flex-wrap: wrap; gap: 1.5rem;
        }
        .p-ey { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.75rem; }
        .p-ti {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          color: var(--ink); line-height: 1.1; letter-spacing: -0.02em;
        }
        .p-ti em { font-style: italic; color: var(--muted); }
        .p-note {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem; color: var(--muted);
          max-width: 260px; line-height: 1.65; text-align: right;
        }
        .steps { display: flex; flex-direction: column; }
        .step {
          display: grid; grid-template-columns: 72px 1fr auto;
          align-items: center; gap: 2rem;
          padding: 1.6rem 0; border-bottom: 1px solid var(--border);
          transition: background 0.18s;
        }
        .step:first-child { border-top: 1px solid var(--border); }
        .step:hover { background: rgba(0, 0, 0, 0.018); }
        .sn {
          font-family: 'Instrument Serif', serif;
          font-size: 2.8rem; color: var(--border);
          line-height: 1; letter-spacing: -0.03em;
          transition: color 0.18s;
        }
        .step:hover .sn { color: var(--ink); }
        .sname { font-size: 1.05rem; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
        .sdesc { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--muted); }
        .schip {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em;
          padding: 6px 14px; border-radius: 100px; white-space: nowrap;
        }
        .c-pu { background: #f0eeff; color: #534AB7; }
        .c-te { background: #e0f5ef; color: #0a6048; }
        .c-am { background: #fef3e2; color: #8a5200; }
        .c-gr { background: #e8f5d8; color: #3a6910; }
        .c-re { background: #fdeaea; color: #c0292a; }

        /* ROLES */
        .roles { padding: 7rem 2.5rem; background: var(--ink2); }
        .r-ey { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244, 241, 235, 0.3); margin-bottom: 0.75rem; }
        .r-ti {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          color: var(--paper); line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 3.5rem;
        }
        .r-ti em { font-style: italic; color: var(--acid); }
        .rgrid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: stretch; }
        .rcard { border-radius: 20px; padding: 2rem; position: relative; overflow: hidden; transition: transform 0.22s; cursor: none; }
        .rcard:hover { transform: translateY(-3px); }
        .rcard.feat { background: var(--acid); }
        .rcard.feat .rtag, .rcard.feat .rdesc, .rcard.feat .rli { color: rgba(10, 10, 10, 0.55); }
        .rcard.feat .rtitle { color: var(--ink); }
        .rcard.feat .rcheck { background: rgba(0, 0, 0, 0.12); color: rgba(10, 10, 10, 0.7); }
        .rcard.dk { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); }
        .rcard.dk .rtag, .rcard.dk .rdesc, .rcard.dk .rli { color: rgba(244, 241, 235, 0.4); }
        .rcard.dk .rtitle { color: var(--paper); }
        .rcard.dk .rcheck { background: rgba(124, 58, 237, 0.12); color: var(--acid); }
        .rtag { font-size: 0.67rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-bottom: 2rem; }
        .ric { font-size: 2.2rem; display: block; margin-bottom: 0.85rem; line-height: 1; }
        .rtitle { font-family: 'Instrument Serif', serif; font-size: 1.75rem; line-height: 1.1; margin-bottom: 0.65rem; letter-spacing: -0.01em; }
        .rdesc { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; line-height: 1.65; margin-bottom: 1.4rem; }
        .rlist { display: flex; flex-direction: column; gap: 8px; }
        .rli { display: flex; align-items: center; gap: 9px; font-size: 0.78rem; font-weight: 500; }
        .rcheck { width: 19px; height: 19px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; flex-shrink: 0; }

        /* BENTO */
        .features { padding: 7rem 2.5rem; background: var(--paper); color: var(--ink); }
        .f-ey { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.75rem; }
        .f-ti {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          color: var(--ink); line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 3.5rem;
        }
        .bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .bc {
          border-radius: 18px; padding: 1.65rem;
          border: 1px solid var(--border); background: var(--white);
          position: relative; overflow: hidden;
          transition: border-color 0.2s, transform 0.2s; cursor: none;
        }
        .bc:hover { border-color: var(--ink); transform: translateY(-2px); }
        .bc.sp2 { grid-column: span 2; }
        .bc.bd { background: var(--ink); border-color: transparent; }
        .bc.bd .btit { color: var(--paper); }
        .bc.bd .bdes { color: rgba(244, 241, 235, 0.4); }
        .bc.bd .btag { background: rgba(255, 255, 255, 0.07); color: rgba(244, 241, 235, 0.35); }
        .bc.bac { background: var(--acid); border-color: transparent; }
        .bc.bac .btit { color: var(--white); }
        .bc.bac .bdes { color: rgba(255, 255, 255, 0.65); }
        .bc.bac .btag { background: rgba(0, 0, 0, 0.08); color: rgba(255, 255, 255, 0.5); }
        .bc.bac .bic { color: var(--white); }
        .btag {
          position: absolute; top: 1.1rem; right: 1.1rem;
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 100px;
          background: rgba(0, 0, 0, 0.05); color: var(--muted);
        }
        .bic { font-size: 1.4rem; display: block; margin-bottom: 0.85rem; line-height: 1; color: var(--ink); }
        .btit { font-size: 0.95rem; font-weight: 700; color: var(--ink); margin-bottom: 5px; line-height: 1.25; }
        .bdes { font-family: 'JetBrains Mono', monospace; font-size: 0.77rem; color: var(--muted); line-height: 1.65; }

        /* TECH STRIP */
        .tech {
          padding: 4rem 2.5rem; background: var(--ink);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tech-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; }
        .tech-lbl { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244, 241, 235, 0.25); }
        .tech-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .tpill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem; font-weight: 400;
          padding: 7px 14px; border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          color: rgba(244, 241, 235, 0.5); background: rgba(255, 255, 255, 0.025);
        }

        /* CTA */
        .cta {
          padding: 8rem 2.5rem; background: var(--paper); color: var(--ink);
          text-align: center; position: relative; overflow: hidden;
        }
        .cta::before {
          content: ''; position: absolute; inset: 0;
          background:
            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.025) 0px, rgba(0, 0, 0, 0.025) 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.025) 0px, rgba(0, 0, 0, 0.025) 1px, transparent 1px, transparent 72px);
          pointer-events: none;
        }
        .cta-in { position: relative; z-index: 1; }
        .cta-ey { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.25rem; display: block; }
        .cta-h {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          line-height: 1.05; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 1.5rem;
        }
        .cta-h em { font-style: italic; color: var(--muted); }
        .cta-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem; color: var(--muted); margin-bottom: 2.5rem; line-height: 1.75;
        }
        .cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .cbtn-dark {
          font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700;
          padding: 15px 34px; border-radius: 100px;
          background: var(--ink); color: var(--paper); border: none;
          cursor: none; text-decoration: none; display: inline-block; transition: all 0.2s;
        }
        .cbtn-dark:hover { background: var(--ink2); transform: translateY(-2px); }
        .cbtn-acid {
          font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700;
          padding: 15px 34px; border-radius: 100px;
          background: var(--acid); color: var(--ink); border: none;
          cursor: none; text-decoration: none; display: inline-block; transition: all 0.2s;
        }
        .cbtn-acid:hover { background: var(--acid2); transform: translateY(-2px); }

        /* FOOTER */
        footer {
          background: var(--ink2); border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem 2.5rem;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .fl { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1rem; color: var(--paper); text-decoration: none; }
        .fc { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: rgba(244, 241, 235, 0.28); }
        .flinks { display: flex; gap: 1.5rem; list-style: none; }
        .flinks a { font-size: 0.75rem; color: rgba(244, 241, 235, 0.3); text-decoration: none; transition: color 0.18s; }
        .flinks a:hover { color: var(--paper); }

        /* REVEAL */
        .rv { opacity: 0; transform: translateY(22px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .rv.on { opacity: 1; transform: none; }

        @media(max-width: 900px) {
          .hero { grid-template-columns: 1fr; padding: 7rem 1.5rem 4rem; }
          .hero-right { display: none; }
          .rgrid { grid-template-columns: 1fr; }
          .bento { grid-template-columns: 1fr 1fr; }
          .bc.sp2 { grid-column: span 1; }
          nav { padding: 1rem 1.5rem; }
          .nav-links { display: none; }
          .pipeline, .roles, .features, .cta { padding: 5rem 1.5rem; }
          .pipeline::before { display: none; }
          .pipe-top { flex-direction: column; }
          .p-note { text-align: left; }
        }
        @media(max-width: 580px) {
          .bento { grid-template-columns: 1fr; }
          .step { grid-template-columns: 50px 1fr; } .schip { display: none; }
          .tech-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div id="cursor" ref={cursorRef}></div>

      <nav>
        <Link className="nav-logo" to="/">
          <div className="logo-hex"><span>IB</span></div>
          InternBridge
        </Link>
        <div className="nav-links">
          <a href="#pipeline">Pipeline</a>
          <a href="#roles">Roles</a>
          <a href="#features">Features</a>
          <a href="#cta">Join</a>
        </div>
        <div className="nav-btns">
          <Link to="/login" className="nbtn nbtn-ghost">Sign in</Link>
          <Link to="/login" className="nbtn nbtn-acid">Get started</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h1>
            The recruitment<br />
            <span className="ot">pipeline</span> built<br />
            for <span className="it">talent</span>
          </h1>
          <p className="hero-body">
            // Digitizing internship recruitment end-to-end.<br />
            // From discovery to placement — one platform,<br />
            // zero spreadsheets, zero email chaos.
          </p>
          <div className="hero-ctas">
            <Link to="/login" className="hcta-main">Find internships <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M6.5 1.5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
            <Link to="/login" className="hcta-ghost">Post a vacancy</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="s-card">
            <div><div className="s-label">API response time</div><div className="s-val">&lt;200<span className="u">ms</span></div></div>
            <span className="s-pill sp-g">Fast</span>
          </div>
          <div className="s-card">
            <div><div className="s-label">Platform uptime</div><div className="s-val">99.9<span className="u">%</span></div></div>
            <span className="s-pill sp-b">SLA</span>
          </div>
          <div className="s-card">
            <div><div className="s-label">REST endpoints</div><div className="s-val">50<span className="u">+</span></div></div>
            <span className="s-pill sp-o">Spring Boot</span>
          </div>
          <div className="s-card">
            <div><div className="s-label">Access tiers</div><div className="s-val">5<span className="u"> roles</span></div></div>
            <span className="s-pill sp-g">RBAC</span>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-inner">
          <div className="mq-item">JWT Auth<span className="mq-dot"></span>BCrypt Hashing<span className="mq-dot"></span>PostgreSQL<span className="mq-dot"></span>Spring Security 6<span className="mq-dot"></span>React + Vite<span className="mq-dot"></span>Tailwind CSS<span className="mq-dot"></span>Multi-tenant<span className="mq-dot"></span>UUID Keys<span className="mq-dot"></span>Stateless API<span className="mq-dot"></span>ACID Compliant<span className="mq-dot"></span>Maven<span className="mq-dot"></span>Axios</div>
          <div className="mq-item">JWT Auth<span className="mq-dot"></span>BCrypt Hashing<span className="mq-dot"></span>PostgreSQL<span className="mq-dot"></span>Spring Security 6<span className="mq-dot"></span>React + Vite<span className="mq-dot"></span>Tailwind CSS<span className="mq-dot"></span>Multi-tenant<span className="mq-dot"></span>UUID Keys<span className="mq-dot"></span>Stateless API<span className="mq-dot"></span>ACID Compliant<span className="mq-dot"></span>Maven<span className="mq-dot"></span>Axios</div>
        </div>
      </div>

      <section className="pipeline" id="pipeline">
        <div className="pipe-top rv">
          <div>
            <div className="p-ey">Applicant tracking system</div>
            <div className="p-ti">Every step,<br /><em>accounted for</em></div>
          </div>
          <div className="p-note">No more black holes. Every state change is timestamped and surfaced to candidates in real time.</div>
        </div>
        <div className="steps rv">
          <div className="step">
            <div className="sn">01</div>
            <div><div className="sname">Applied</div><div className="sdesc">// candidate.submit(profile, vacancy_id)</div></div>
            <span className="schip c-pu">Entry point</span>
          </div>
          <div className="step">
            <div className="sn">02</div>
            <div><div className="sname">Reviewing</div><div className="sdesc">// hr.screen(application) → async</div></div>
            <span className="schip c-te">HR action</span>
          </div>
          <div className="step">
            <div className="sn">03</div>
            <div><div className="sname">Interviewing</div><div className="sdesc">// schedule.interview(candidate, company)</div></div>
            <span className="schip c-am">Live stage</span>
          </div>
          <div className="step">
            <div className="sn">04</div>
            <div><div className="sname">Hired</div><div className="sdesc">// placement.auto_create() → notify(intern)</div></div>
            <span className="schip c-gr">Auto-triggers</span>
          </div>
          <div className="step">
            <div className="sn">05</div>
            <div><div className="sname">Rejected</div><div className="sdesc">// notify(candidate) → pipeline.close()</div></div>
            <span className="schip c-re">Terminal</span>
          </div>
        </div>
      </section>

      <section className="roles" id="roles">
        <div className="r-ey rv">Role-based access control</div>
        <div className="r-ti rv">Three portals.<br /><em>One platform.</em></div>
        <div className="rgrid rv">
          <div className="rcard feat">
            <span className="rtag">Primary user</span>
            <span className="ric">🎓</span>
            <div className="rtitle">Interns</div>
            <div className="rdesc">Discover verified opportunities. Build a profile that follows you across every application. Track every status update in real time.</div>
            <div className="rlist">
              <div className="rli"><div className="rcheck">✓</div>Progressive 2-step onboarding</div>
              <div className="rli"><div className="rcheck">✓</div>Real-time status tracking</div>
              <div className="rli"><div className="rcheck">✓</div>Keyword &amp; industry search</div>
              <div className="rli"><div className="rcheck">✓</div>Duplicate guard protection</div>
            </div>
          </div>
          <div className="rcard dk">
            <span className="rtag">Employer</span>
            <span className="ric">🏢</span>
            <div className="rtitle">Company HR</div>
            <div className="rdesc">Manage your full pipeline from a dedicated portal. No noise from generic job boards.</div>
            <div className="rlist">
              <div className="rli"><div className="rcheck">✓</div>Vacancy CRUD</div>
              <div className="rli"><div className="rcheck">✓</div>Kanban pipeline</div>
              <div className="rli"><div className="rcheck">✓</div>Candidate CV hub</div>
              <div className="rli"><div className="rcheck">✓</div>Auto-notifications</div>
            </div>
          </div>
          <div className="rcard dk">
            <span className="rtag">System level</span>
            <span className="ric">⚙️</span>
            <div className="rtitle">Super Admin</div>
            <div className="rdesc">Onboard companies, monitor global health, configure policies.</div>
            <div className="rlist">
              <div className="rli"><div className="rcheck">✓</div>Company verification</div>
              <div className="rli"><div className="rcheck">✓</div>Health monitoring</div>
              <div className="rli"><div className="rcheck">✓</div>Global config</div>
              <div className="rli"><div className="rcheck">✓</div>Tenant isolation</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="f-ey rv">Platform features</div>
        <div className="f-ti rv">Enterprise grade.<br />Zero overhead.</div>
        <div className="bento rv">
          <div className="bc bd sp2">
            <span className="btag">Security</span>
            <span className="bic">🔐</span>
            <div className="btit">Stateless JWT authentication</div>
            <div className="bdes">HMAC-SHA256 signed tokens · 24h expiry · BCrypt hashing · Spring Security 6 filter chain. Zero session memory — scales horizontally with no sync overhead.</div>
          </div>
          <div className="bc bac">
            <span className="btag">Multi-tenant</span>
            <span className="bic">🏗️</span>
            <div className="btit">Complete data isolation</div>
            <div className="bdes">Each company is a sealed tenant. UUID keys. RBAC at the API layer, not just the UI.</div>
          </div>
          <div className="bc">
            <span className="btag">Automation</span>
            <span className="bic">⚡</span>
            <div className="btit">Auto-placement engine</div>
            <div className="bdes">APPROVED status triggers a full placement contract, calculates 3-month duration, and fires notifications instantly.</div>
          </div>
          <div className="bc">
            <span className="btag">Search</span>
            <span className="bic">🔍</span>
            <div className="btit">Dynamic JPQL search</div>
            <div className="bdes">Sub-string matching on title + description. Filter by keyword, industry, or status in one request.</div>
          </div>
          <div className="bc bd">
            <span className="btag">Alerts</span>
            <span className="bic">🔔</span>
            <div className="btit">Event-driven notifications</div>
            <div className="bdes">Every pipeline state change dispatches a targeted notification. Candidates are never left guessing.</div>
          </div>
          <div className="bc">
            <span className="btag">Reliability</span>
            <span className="bic">🛡️</span>
            <div className="btit">Global error handling</div>
            <div className="bdes">@RestControllerAdvice intercepts every exception and returns clean JSON with timestamp, status, and message.</div>
          </div>
        </div>
      </section>

      <div className="tech rv">
        <div className="tech-row">
          <span className="tech-lbl">Built with</span>
          <div className="tech-pills">
            <span className="tpill">Java 21</span>
            <span className="tpill">Spring Boot 3</span>
            <span className="tpill">PostgreSQL</span>
            <span className="tpill">React + Vite</span>
            <span className="tpill">TypeScript</span>
            <span className="tpill">Tailwind CSS</span>
            <span className="tpill">JWT · BCrypt</span>
            <span className="tpill">Maven</span>
            <span className="tpill">Axios</span>
            <span className="tpill">Render · Vercel</span>
          </div>
        </div>
      </div>

      <section className="cta" id="cta">
        <div className="cta-in rv">
          <span className="cta-ey">Ready to start?</span>
          <h2 className="cta-h">Bridge the gap.<br /><em>Today.</em></h2>
          <p className="cta-sub">
            Join as an intern to discover your first role,<br />
            or onboard your company to build a real talent pipeline.
          </p>
          <div className="cta-row">
            <Link to="/login" className="cbtn-acid">Find internships →</Link>
            <Link to="/login" className="cbtn-dark">Onboard my company</Link>
          </div>
        </div>
      </section>

      <footer>
        <Link className="fl" to="/">
          <div className="logo-hex"><span>IB</span></div>
          InternBridge
        </Link>
        <span className="fc">© 2026 InternBridge · Spring Boot + React · All rights reserved</span>
        <ul className="flinks">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Security</a></li>
          <li><a href="#">API docs</a></li>
          <li><a href="https://github.com/meekness12/internbridge">GitHub</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Landing;
