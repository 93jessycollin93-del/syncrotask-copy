import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Code2, Gamepad2, Globe, ArrowRight, Star, CheckCircle, Sparkles, Terminal, Layers, Shield, BookOpen } from 'lucide-react';
import HeroOrb from '../components/HeroOrb';
import FeatureCard from '../components/FeatureCard';
import ProjectShowcase from '../components/ProjectShowcase';
import StatsBanner from '../components/StatsBanner';

const TYPED_WORDS = ['Video Games', 'Web Apps', 'UI Systems', '3D Worlds', 'Dashboards', 'Platforms'];

export default function Home() {
  const [typedIndex, setTypedIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const word = TYPED_WORDS[typedIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(word.slice(0, charIndex + 1));
        if (charIndex + 1 === word.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        setDisplayText(word.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTypedIndex(i => (i + 1) % TYPED_WORDS.length);
          setCharIndex(0);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typedIndex]);

  const features = [
    {
      icon: Gamepad2,
      color: 'neon-purple',
      title: 'Game Development',
      description: 'From 2D platformers to 3D worlds — FORGE builds complete game systems with physics, AI, and interactive mechanics fully wired.',
    },
    {
      icon: Globe,
      color: 'neon-cyan',
      title: 'Web Applications',
      description: 'Production-ready dashboards, SaaS platforms, and websites. Every component responsive, every interaction polished.',
    },
    {
      icon: Layers,
      color: 'neon-pink',
      title: 'Full-Stack Systems',
      description: 'Backend, frontend, database — architected as one cohesive system. No siloed pieces, no half-measures.',
    },
    {
      icon: Terminal,
      color: 'neon-purple',
      title: 'AI-Powered Logic',
      description: 'Intelligent NPCs, adaptive difficulty, recommendation engines — complex AI behavior built clean and fast.',
    },
    {
      icon: Shield,
      color: 'neon-cyan',
      title: 'Quality Verified',
      description: 'Every build is tested, verified, and publishing-ready. Zero placeholders. Zero stubs. Zero TODOs.',
    },
    {
      icon: Sparkles,
      color: 'neon-pink',
      title: 'Design-First Code',
      description: 'Spacing, typography, color hierarchy — the visual layer gets the same precision as the logic layer.',
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-border/50 backdrop-blur-xl bg-background/70">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-primary rounded-lg opacity-20 blur-sm" />
            <div className="relative w-8 h-8 bg-primary/10 border border-primary/40 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
          </div>
          <span className="font-space font-700 text-lg tracking-tight text-foreground">FORGE<span className="text-primary">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#showcase" className="hover:text-foreground transition-colors">Showcase</a>
          <Link to="/knowledge" className="hover:text-foreground transition-colors flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Knowledge
          </Link>
        </div>

        <Link
          to="/studio"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/25"
        >
          <Zap className="w-3.5 h-3.5" />
          Launch Studio
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 grid-bg">
        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            AI-Powered. Publishing Ready. No Compromises.
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-space font-bold leading-[0.95] tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            <span className="text-foreground">Build </span>
            <span className="gradient-text">{displayText}</span>
            <span className="cursor-blink text-primary ml-1">|</span>
            <br />
            <span className="text-foreground">Flawlessly.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up animate-delay-200">
            FORGE listens to your vision, analyzes requirements, creates production-ready code, 
            and delivers a fully functioning mirrored reality — every time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <Link
              to="/studio"
              className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-base hover:opacity-90 transition-all glow-purple hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Start Building Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#showcase"
              className="flex items-center gap-2 px-8 py-4 bg-surface-2 border border-border text-foreground rounded-xl font-semibold text-base hover:border-primary/50 transition-all hover:bg-surface-3"
            >
              <Star className="w-4 h-4 text-neon-cyan" />
              See Examples
            </a>
          </div>

          {/* Trust line */}
          <div className="flex items-center justify-center gap-6 mt-12 text-xs text-muted-foreground animate-fade-in-up animate-delay-400">
            {['No placeholders', 'Fully functional', 'Publish ready'].map((label) => (
              <div key={label} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-neon-cyan" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Orb */}
        <div className="relative z-10 mt-16">
          <HeroOrb />
        </div>
      </section>

      {/* Stats */}
      <section id="stats">
        <StatsBanner />
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs text-accent font-medium mb-4">
            <Code2 className="w-3.5 h-3.5" />
            Full Capability Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need.<br />
            <span className="gradient-text">Nothing you don't.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From concept to deployment — FORGE handles every layer of the stack with zero half-measures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Project Showcase
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built by FORGE.<br />
            <span className="gradient-text">Ready to ship.</span>
          </h2>
        </div>
        <ProjectShowcase />
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
          <div className="relative border-gradient rounded-3xl bg-surface-1 p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your vision.<br />
              <span className="gradient-text">Fully realized.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Describe what you want to build. FORGE will listen, analyze, create, verify, and deliver.
            </p>
            <Link
              to="/studio"
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:opacity-90 transition-all glow-purple hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Open FORGE Studio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-space font-bold text-foreground">FORGE<span className="text-primary">.</span></span>
          </div>
          <p className="text-muted-foreground text-sm">Build flawlessly. Ship confidently.</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-cyan"></span>
            </span>
            All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
}