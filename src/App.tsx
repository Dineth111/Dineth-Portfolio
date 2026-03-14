import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    MessageSquare,
    Send,
    Menu,
    X,
    ArrowUpRight,
    Layout,
    Code2,
    Terminal,
    Smartphone,
    Database,
    Cloud,
    Cpu,
    Briefcase,
    Zap,
    ChevronRight,
    Download,
    Globe
} from 'lucide-react';
import profilePhoto from './assets/profile.jpg';

const BackgroundLayer = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Moving Grid */}
            <div className="absolute inset-0 animate-grid opacity-[0.03]" />

            {/* Ambient Drifting Nebulae */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] mask-radial opacity-10 bg-emerald-500/20 blur-[120px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -50, 0],
                    y: [0, 40, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] mask-radial opacity-10 bg-cyan-500/20 blur-[120px] rounded-full"
            />
        </div>
    );
};

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
                setCursorText("VIBE");
            } else if (target.closest('.project-card')) {
                setIsHovering(true);
                setCursorText("VIEW");
            } else {
                setIsHovering(false);
                setCursorText("");
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:flex items-center justify-center text-[10px] font-black tracking-tight"
            animate={{
                x: position.x - (isHovering ? 40 : 8),
                y: position.y - (isHovering ? 40 : 8),
                width: isHovering ? 80 : 16,
                height: isHovering ? 80 : 16,
                backgroundColor: isHovering ? 'rgba(16, 185, 129, 1)' : 'white'
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
        >
            {isHovering && <span className="text-black">{cursorText}</span>}
        </motion.div>
    );
};

const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className?: string, href?: string }) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * 0.35;
        const y = (e.clientY - (top + height / 2)) * 0.35;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const content = (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </motion.div>
    );

    if (!href) return content;

    // Check if it's an internal anchor link (starts with #)
    const isInternal = href.startsWith('#');
    
    return (
        <a 
            href={href} 
            download={href.endsWith('.pdf') ? 'Dineth_Sanjula_Resume.pdf' : undefined}
            target={isInternal ? undefined : "_blank"}
            rel={isInternal ? undefined : "noopener noreferrer"}
        >
            {content}
        </a>
    );
};

const TechStack = () => {
    const skills = [
        "React", "Node.js", "MongoDB", "Express", "TypeScript", "Next.js",
        "Spring Boot", "MySQL", "Java", "Python", "Kotlin", "Dart", "Tailwind CSS", "Framer Motion"
    ];

    return (
        <div className="py-24 border-y border-white/5 bg-slate-950/30 backdrop-blur-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
            <motion.div
                animate={{ x: [0, -2000] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="flex gap-24 whitespace-nowrap"
            >
                {[...skills, ...skills, ...skills].map((skill, idx) => (
                    <span key={idx} className="text-5xl md:text-8xl font-black text-white/5 uppercase tracking-tight hover:text-emerald-500/20 transition-colors cursor-default">
                        {skill} <span className="text-emerald-500/20 px-10">✦</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Works', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-4 bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-8 flex justify-between items-center whitespace-nowrap">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        D
                    </div>
                    <span className="text-xl font-bold tracking-tight uppercase hidden sm:block">Sanjula<span className="text-emerald-500">.</span></span>
                </motion.div>

                <div className="hidden md:flex items-center space-x-12">
                    {navLinks.map((link, idx) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-emerald-400 transition-all relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ))}
                    <MagneticButton href="#contact" className="px-8 py-3 bg-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2">
                        Hire Me <ArrowUpRight className="w-4 h-4" />
                    </MagneticButton>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="md:hidden fixed inset-0 z-[90] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center space-y-10"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-5xl font-black uppercase tracking-tight hover:text-emerald-500 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 250]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section id="home" className="min-h-screen relative flex items-center px-8 overflow-hidden bg-[#030014] pt-20">
            {/* Ambient Blobs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, -50, 0] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-violet-900/10 blur-[180px] rounded-full"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 100, 0] }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full"
            />

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
                <motion.div style={{ y, opacity }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-12"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Web & Mobile Developer</span>
                    </motion.div>

                    <h1 className="text-7xl md:text-[100px] font-black tracking-tight leading-[0.9] mb-12 uppercase italic">
                        Dineth <br />
                        <span className="text-emerald-500">Sanjula<span className="text-white">.</span></span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 font-light max-w-xl mb-16 leading-relaxed">
                        I build <span className="text-white font-medium">high-quality apps</span> with clean code and <span className="text-emerald-400">modern designs.</span>
                    </p>

                    <div className="flex flex-wrap gap-10 items-center">
                        <MagneticButton href="#projects" className="px-12 py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                            View My Work <Zap size={16} fill="currentColor" />
                        </MagneticButton>
                        <a href="#contact" className="text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-emerald-500 flex items-center gap-2 group transition-colors">
                            Contact Me <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.5 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative z-10 p-4 glass-card rounded-[80px] overflow-hidden group">
                        <img
                            src={profilePhoto}
                            alt="Dineth Sanjula"
                            className="w-full aspect-square object-cover rounded-[70px] grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-50" />
                    </div>

                    {/* Floating Data Card */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute -bottom-10 -left-10 glass-card p-10 rounded-3xl z-20 border-emerald-500/20"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                <Code2 className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-3xl font-black italic text-white text-glow-emerald">15+</h4>
                                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Projects Done</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                        className="absolute top-10 -right-10 glass-card p-6 rounded-3xl z-20 border-emerald-500/20"
                    >
                        <span className="text-emerald-400 font-black text-xs block mb-1">SLIIT KANDY UNI</span>
                        <div className="h-1 w-full bg-emerald-500/50 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about" className="py-40 px-8 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.8em] block mb-6">About Me</span>
                    <h2 className="text-6xl md:text-[100px] font-black tracking-tight leading-none uppercase">
                        My <span className="text-white/10 italic">Core</span> <br />Skills.
                    </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="lg:col-span-2 glass-card p-12 rounded-[50px] flex flex-col justify-end group border-emerald-500/10"
                    >
                        <Briefcase className="w-12 h-12 text-emerald-500 mb-10 group-hover:scale-110 transition-transform" />
                        <h3 className="text-3xl font-black uppercase tracking-tight mb-4 italic">The Journey</h3>
                        <p className="text-slate-400 font-light leading-[1.8] [word-spacing:0.12em] tracking-wide max-w-xl">
                            <span className="text-white font-medium">Dineth Sanjula</span> — I am currently pursuing my IT degree at <span className="text-white font-medium">SLIIT Kandy</span>. My journey in development started with a curiosity for how complex systems work. Today, I am a dedicated <span className="text-white font-medium">MERN Stack Enthusiast</span> committed to building software that is not only functional but also visually captivating and highly efficient.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-emerald-600 p-12 rounded-[50px] flex flex-col items-center justify-center text-center text-white relative overflow-hidden group shadow-2xl shadow-emerald-900/20"
                    >
                        <div className="absolute inset-0 bg-noise opacity-20" />
                        <Terminal className="w-20 h-20 mb-8 opacity-20 absolute -top-4 -right-4 group-hover:rotate-12 transition-transform" />
                        <h3 className="text-4xl font-black uppercase tracking-tight leading-none mb-4 italic">MERN <br />Expert</h3>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] [word-spacing:0.5em] opacity-60">Full-Stack Capability</span>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-12 rounded-[50px] flex flex-col justify-center border-emerald-500/10 overflow-hidden relative"
                    >
                        <Smartphone className="w-10 h-10 text-emerald-500 mb-6" />
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Mobile Apps</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">Cross-platform development using Kotlin & Dart for high-performance applications.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="lg:col-span-2 glass-card p-12 rounded-[50px] border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent flex flex-col justify-center gap-10"
                    >
                        <div className="flex gap-12">
                            <div>
                                <h4 className="text-emerald-400 text-5xl font-black italic mb-2">24/7</h4>
                                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Service Availability</p>
                            </div>
                            <div className="w-px h-16 bg-white/10 shrink-0" />
                            <div>
                                <h4 className="text-cyan-400 text-5xl font-black italic mb-2">100%</h4>
                                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Project Commitment</p>
                            </div>
                        </div>
                        <p className="text-slate-400 font-light italic">"Code is the tool I use to solve problems, but design is the language I use to communicate solutions."</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-12 rounded-[50px] flex flex-col justify-center border-emerald-500/10"
                    >
                        <Layout className="w-10 h-10 text-emerald-500 mb-6" />
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">My Vision</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">To become a world-class Full Stack Architect, contributing to innovative open-source projects and enterprise-level applications.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-12 rounded-[50px] flex flex-col justify-center border-emerald-500/10"
                    >
                        <Code2 className="w-10 h-10 text-emerald-500 mb-6" />
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Core Values</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">Clean code Architecture, scalability-first mindset, and obsessive attention to pixel-perfect design elements.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="lg:col-span-1 glass-card p-12 rounded-[50px] flex flex-col justify-center border-emerald-500/10 bg-white/5"
                    >
                        <Zap className="w-10 h-10 text-emerald-500 mb-6" />
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Ongoing Research</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">Currently exploring Emerging Technologies and AI-driven development workflows to stay ahead in the digital landscape.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="lg:col-span-2 glass-card p-12 rounded-[50px] flex flex-col justify-center border-emerald-500/10"
                    >
                        <div className="flex items-center gap-6 mb-4">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                                <Globe className="text-emerald-500" />
                            </div>
                            <h4 className="text-xl font-bold uppercase tracking-tight">Global Outreach</h4>
                        </div>
                        <p className="text-slate-400 font-light leading-relaxed">Collaborating with international teams and clients to deliver digital solutions that transcend borders. Focused on cross-cultural design systems and inclusive accessibility standards.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Skills = () => {
    const skills = [
        {
            name: "Kotlin",
            icon: <Smartphone />,
            color: "#10b981",
            degree: 0,
            level: "Advanced",
            details: "Native Android development, Jetpack Compose, MVVM Architecture"
        },
        {
            name: "Dart",
            icon: <Smartphone />,
            color: "#06b6d4",
            degree: 40,
            level: "Advanced",
            details: "Flutter cross-platform apps, State management (Riverpod/Provider)"
        },
        {
            name: "React",
            icon: <Layout />,
            color: "#10b981",
            degree: 80,
            level: "Expert",
            details: "Enterprise-grade web apps, Framer Motion, Tailwind CSS excellence"
        },
        {
            name: "Node.js",
            icon: <Terminal />,
            color: "#06b6d4",
            degree: 120,
            level: "Intermediate",
            details: "Scalable REST APIs, Express, JWT Authentication, Microservices"
        },
        {
            name: "Java",
            icon: <Code2 />,
            color: "#10b981",
            degree: 160,
            level: "Advanced",
            details: "Spring Boot mastery, Object-Oriented patterns, Multi-threading"
        },
        {
            name: "Python",
            icon: <Terminal />,
            color: "#06b6d4",
            degree: 200,
            level: "Intermediate",
            details: "Automated scripts, NLP tools, Flask backend development"
        },
        {
            name: "MERN Stack",
            icon: <Database />,
            color: "#10b981",
            degree: 240,
            level: "Expert",
            details: "Full stack ecosystem, MongoDB modeling, complex real-time apps"
        },
        {
            name: "SQL/DB",
            icon: <Database />,
            color: "#06b6d4",
            degree: 280,
            level: "Advanced",
            details: "Relational database design, Complex queries, Optimization"
        },
        {
            name: "AWS/Cloud",
            icon: <Cloud />,
            color: "#10b981",
            degree: 320,
            level: "Intermediate",
            details: "Deployment strategies, EC2 management, Serverless functions"
        },
    ];

    const [activeSkill, setActiveSkill] = useState(skills[0]);
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section id="skills" className="py-60 px-8 relative overflow-hidden bg-background perspective-2000">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="text-center mb-44 relative z-10">
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[1em] block mb-6">My Skills</span>
                    <h2 className="text-6xl md:text-[100px] font-black tracking-tight leading-none uppercase text-white">
                        My Technical <br /><span className="text-white/10 italic">Skills.</span>
                    </h2>
                </div>

                <div
                    className="relative w-full max-w-[600px] aspect-square flex items-center justify-center transform-gpu"
                >
                    {/* Dynamic Central Hub */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSkill.name}
                            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                            className="w-48 h-48 md:w-64 md:h-64 rounded-full glass-card border-2 border-emerald-500/30 flex flex-col items-center justify-center z-20 shadow-[0_0_80px_rgba(16,185,129,0.2)] p-8 text-center"
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{ color: activeSkill.color }}
                            >
                                {React.cloneElement(activeSkill.icon as React.ReactElement, { size: 40 })}
                            </motion.div>
                            <h3 className="text-white font-black text-2xl mt-4 uppercase tracking-tight italic">{activeSkill.name}</h3>
                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mt-2">{activeSkill.level}</span>
                            <p className="text-slate-500 text-[10px] leading-relaxed mt-4 font-light max-w-[80%] mx-auto">{activeSkill.details}</p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Background Core Glow */}
                    <div className="w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] absolute z-0 animate-pulse" />

                    {/* Rotating Intelligence Ring */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: isPaused ? undefined : 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {skills.map((skill, idx) => (
                            <div
                                key={idx}
                                className="absolute w-24 h-24 md:w-28 md:h-28"
                                style={{
                                    transform: `rotate(${skill.degree}deg) translateY(-300px) rotate(-${skill.degree}deg)`,
                                }}
                            >
                                <motion.div
                                    onMouseEnter={() => {
                                        setActiveSkill(skill);
                                        setIsPaused(true);
                                    }}
                                    onMouseLeave={() => setIsPaused(false)}
                                    whileHover={{ scale: 1.2, zIndex: 100 }}
                                    className={`w-full h-full rounded-2xl glass-card border flex flex-col items-center justify-center gap-2 p-4 shadow-3xl cursor-pointer transition-all backdrop-blur-3xl
                                        ${activeSkill.name === skill.name ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-white/10'}`}
                                >
                                    <div className="transition-transform duration-500 group-hover:scale-110" style={{ color: skill.color }}>
                                        {React.cloneElement(skill.icon as React.ReactElement, { size: 24 })}
                                    </div>
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest text-center">{skill.name}</span>
                                </motion.div>
                                <div className="absolute top-1/2 left-1/2 w-0.5 h-[300px] bg-gradient-to-t from-emerald-500/20 to-transparent -translate-x-1/2 origin-bottom -z-10" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Orbital Paths */}
                    <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full z-0 pointer-events-none" />
                    <div className="absolute w-[450px] h-[450px] border border-emerald-500/5 rounded-full z-0 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
}

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="project-card group relative h-[500px] rounded-[50px] overflow-hidden border border-white/5 bg-[#05001a] perspective-2000"
        >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030014] via-[#030014]/40 to-transparent opacity-80" />
            <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:blur-sm opacity-50"
            />

            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end transform-gpu transition-transform duration-700">
                <div className="mb-6 flex items-center justify-between overflow-hidden">
                    <span className="text-[10px] uppercase font-black tracking-[0.4em] text-emerald-500">{project.category}</span>
                    <div className="h-px bg-white/10 flex-grow mx-6" />
                </div>

                <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tight italic">{project.title}</h3>
                <p className="text-slate-400 font-light text-sm mb-10 leading-[1.8] [word-spacing:0.12em] tracking-wide max-w-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 text-[8px] font-black uppercase text-slate-500 tracking-widest border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center group/btn">
                    <a href={project.link} target="_blank" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white hover:text-emerald-400 transition-colors">
                        Inspect Source <Github size={16} />
                    </a>
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-500 group-hover:rotate-45">
                        <ArrowUpRight strokeWidth={3} className="text-white" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const projects: Project[] = [
        {
            title: "Tournament System",
            category: "Logic Engine",
            description: "Advanced tournament management engine with automated scheduling and real-time ranking algorithms.",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
            tags: ["Java", "Spring Boot", "MySQL"],
            link: "https://github.com/Dineth111/Tournament-Management-system"
        },
        {
            title: "Singlish Translator",
            category: "NLP/AI",
            description: "Sophisticated phonetical conversion engine for Singlish to Sinhala automated translation testing.",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
            tags: ["Python", "NLTK", "Flask"],
            link: "https://github.com/Dineth111/Singlish-Sinhala-Automated-Translator-Testing"
        },
        {
            title: "Airport Web Core",
            category: "Enterprise",
            description: "High-performance national airport portal with flight tracking and secure terminal systems.",
            image: "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&q=80&w=800",
            tags: ["React", "Node.js", "Express"],
            link: "https://github.com/Dineth111/srilanka-airport-website"
        },
        {
            title: "Food Cloud App",
            category: "MERN Stack",
            description: "Complete order-to-delivery ecosystem featuring real-time kitchen tracking systems.",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
            tags: ["MongoDB", "Express", "React"],
            link: "https://github.com/Dineth111/food-ordering-app"
        },
        {
            title: "Inventory OS",
            category: "System Dev",
            description: "Cross-modular inventory system integrated with employee performance analytics.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
            tags: ["MERN", "Redux", "JWT"],
            link: "https://github.com/Dineth111/Inventory_Management_System-MERN-STAC-Project"
        },
        {
            title: "AI Vision Gen",
            category: "Gen AI",
            description: "Cloud-based visual generation platform using advanced transformers for assets.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
            tags: ["OpenAI API", "Node", "React"],
            link: "https://github.com/Dineth111/AI-Image-Genarator"
        }
    ];

    return (
        <section id="projects" className="py-40 px-8 bg-background relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32">
                    <span className="text-emerald-500 text-xs font-black uppercase tracking-[0.5em] block mb-6">My Work</span>
                    <h2 className="text-6xl md:text-[120px] font-black tracking-tight leading-none uppercase">
                        Selected <br /><span className="text-slate-900 border-text">Projects.</span>
                    </h2>
                </div>
                <div className="max-w-xs text-right hidden lg:block">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-relaxed [word-spacing:0.2em] mb-8">Selected works representing the intersection of high-end design and robust performance architecture.</p>
                    <MagneticButton className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest [word-spacing:0.2em] hover:bg-white/10">Browse GitHub Archive</MagneticButton>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.title} project={project} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Experience = () => {
    const experiences = [
        {
            title: "MERN Stack Developer",
            company: "SLIIT KANDY UNI",
            period: "2023 - PRESENT",
            type: "ACADEMIC LEAD",
            details: "Leading specialized web projects using the MERN ecosystem. I design database structures, build robust APIs, and create high-end user interfaces.",
            achievements: [
                "Developed a student portal handling 500+ daily active users.",
                "Optimized database queries, reducing load times by 40%.",
                "Integrated real-time notification systems using Socket.io."
            ],
            tech: ["React.js", "Node.js", "Express", "MongoDB", "Redux"],
            icon: <Zap className="text-emerald-500" />
        },
        {
            title: "Backend Architect",
            company: "System Design Lab",
            period: "2022 - 2023",
            type: "PROFESSIONAL",
            details: "Architecting scalable server-side systems with a focus on high availability and secure data flow. I implement complex business logic and microservices.",
            achievements: [
                "Designed a scalable microservices architecture for a logistics app.",
                "Implemented secure JWT-based authentication protocols.",
                "Automated CI/CD pipelines using GitHub Actions."
            ],
            tech: ["Java Spring Boot", "MySQL", "AWS", "Microservices"],
            icon: <Database className="text-emerald-500" />
        },
        {
            title: "Software Developer",
            company: "Freelance Solution",
            period: "2021 - PRESENT",
            type: "FREELANCE",
            details: "Creating custom digital tools for international clients. I focus on writing secure code and building mobile-first applications that solve real business problems.",
            achievements: [
                "Delivered over 10+ professional web projects for global clients.",
                "Built cross-platform apps using Flutter and Firebase.",
                "Provided technical consultancy for local startups."
            ],
            tech: ["Kotlin", "Dart", "Firebase", "TypeScript"],
            icon: <Cpu className="text-cyan-500" />
        },
        {
            title: "Frontend Engineer",
            company: "Project Base",
            period: "2021 - 2022",
            type: "PROJECT BASED",
            details: "Specializing in premium web aesthetics and performance. I turn complex designs into interactive, fast-loading websites with 3D animations.",
            achievements: [
                "Created highly immersive 3D landing pages using Three.js.",
                "Ensured 100/100 Lighthouse performance scores on key pages.",
                "Developed a modular UI kit used across multiple company projects.",
                "Implemented complex state management using Context API and Redux."
            ],
            tech: ["Framer Motion", "Tailwind CSS", "Next.js"],
            icon: <Smartphone className="text-emerald-500" />
        }
    ];

    return (
        <section id="experience" className="py-40 px-8 relative bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto border-t border-white/5 pt-32">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/3">
                        <h2 className="text-7xl font-black uppercase tracking-tight leading-none mb-10">My <br /><span className="text-emerald-500">Experience.</span></h2>
                        <MagneticButton
                            href="/resume.pdf"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-emerald-900/50"
                        >
                            Download Résumé <Download size={14} />
                        </MagneticButton>
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                        {experiences.map((exp: any, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-10 glass-card rounded-[40px] flex flex-col md:flex-row md:items-start justify-between hover:bg-white/5 transition-all gap-8"
                            >
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors shrink-0">
                                        {exp.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-3xl font-black uppercase tracking-tight italic">{exp.title}</h3>
                                                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{exp.company}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[9px] font-black tracking-widest uppercase [word-spacing:0.2em] bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">{exp.period}</span>
                                                <p className="text-[8px] font-black tracking-[0.2em] text-slate-600 uppercase mt-2">{exp.type}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-400 font-light leading-[1.8] [word-spacing:0.12em] tracking-wide max-w-md mb-6">{exp.details}</p>

                                        <ul className="mb-6 space-y-2">
                                            {exp.achievements.map((item: string, i: number) => (
                                                <li key={i} className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                                                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((t: string) => (
                                                <span key={t} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-emerald-400/60 border border-white/5">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight strokeWidth={3} className="text-emerald-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name');
        const email = formData.get('email');
        const project = formData.get('project');
        const message = formData.get('message');

        const body = `Hello Dineth,%0D%0A%0D%0AYou have a new project inquiry from your portfolio.%0D%0A%0D%0A--- INQUIRY DETAILS ---%0D%0AClient Name: ${name}%0D%0AEmail: ${email}%0D%0AProject Type: ${project}%0D%0A%0D%0A--- MESSAGE ---%0D%0A${message}%0D%0A%0D%0ABest regards,%0D%0A${name}`;

        const mailtoLink = `mailto:dinethsanjula647@gmail.com?subject=New Project Request: ${project} - From ${name}&body=${body}`;
        window.location.href = mailtoLink;
    };

    return (
        <section id="contact" className="py-40 px-8 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.05),transparent_40%)]" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-32">
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[1em] block mb-10 text-center mx-auto">Contact</span>
                    <h2 className="text-7xl md:text-[150px] font-black tracking-tight leading-none uppercase italic border-text mx-auto">Let's Work<span className="text-white font-black not-italic">.</span></h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="glass-card p-16 rounded-[60px] flex flex-col justify-between group overflow-hidden relative border-emerald-500/10">
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-emerald-600/10 blur-[100px] rounded-full" />
                        <div>
                            <h3 className="text-4xl font-black uppercase tracking-tight mb-4 italic">Contact Info</h3>
                            <p className="text-slate-400 font-light text-xl max-w-sm mb-12">I'm available for full-time roles, freelance projects, and tech consulting.</p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 text-white group/link cursor-pointer" onClick={() => window.location.href = "mailto:dinethsanjula647@gmail.com"}>
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover/link:bg-emerald-600 transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Email Me</p>
                                        <span className="text-sm font-bold tracking-widest uppercase [word-spacing:0.2em]">dinethsanjula647@gmail.com</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-white group/link cursor-pointer" onClick={() => window.open("https://wa.me/94766320647", "_blank")}>
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover/link:bg-emerald-600 transition-colors">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">WhatsApp</p>
                                        <span className="text-sm font-bold tracking-widest uppercase [word-spacing:0.2em]">+94 76 632 0647</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-white group/link">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                                        <Layout size={24} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Location</p>
                                        <span className="text-sm font-bold tracking-widest uppercase [word-spacing:0.2em]">Kandy, Sri Lanka</span>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4">Availability</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Mon - Fri</p>
                                            <p className="text-xs font-bold text-white uppercase tracking-tight italic">09:00 AM - 06:00 PM</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Response Time</p>
                                            <p className="text-xs font-bold text-emerald-500 uppercase tracking-tight italic">Within 24 Hours</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-10 border-t border-white/5 mt-auto">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Status: <span className="text-emerald-500">Open for Work</span></span>
                            <div className="flex gap-4">
                                <MagneticButton href="https://github.com/Dineth111" className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"><Github size={18} /></MagneticButton>
                                <MagneticButton href="https://linkedin.com/in/dineth-sanjula" className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"><Linkedin size={18} /></MagneticButton>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="glass-card p-16 rounded-[60px] flex flex-col gap-8 relative overflow-hidden border-emerald-500/5">
                        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4">Your Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="YOUR NAME"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-white/20"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4">Your Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="EMAIL ADDRESS"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-white/20"
                                />
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4">Project Type</label>
                                <input
                                    name="project"
                                    type="text"
                                    required
                                    placeholder="e.g. Mobile App, Web Portal, UI Design"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-white/20"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4">Your Message</label>
                            <textarea
                                name="message"
                                rows={4}
                                required
                                placeholder="HOW CAN WE COLLABORATE?"
                                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-white/20 resize-none"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full">
                            <MagneticButton className="w-full py-6 bg-emerald-600 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] group transition-all">
                                Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </MagneticButton>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="py-24 px-8 bg-background border-t border-white/5 relative overflow-hidden font-outfit">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10 text-glow">
                <div className="flex flex-col items-center lg:items-start select-none">
                    <div className="text-4xl font-black tracking-tightest uppercase mb-4">
                        D<span className="text-emerald-500">.</span>SANJULA
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-[0.8em] text-slate-600">Building Great Experiences Since 2022</p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex gap-12">
                        {[
                            { name: 'Home', href: '#home' },
                            { name: 'Work', href: '#projects' },
                            { name: 'Skills', href: '#skills' }
                        ].map(link => (
                            <a key={link.name} href={link.href} className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors cursor-pointer">{link.name}</a>
                        ))}
                    </div>
                    <div className="h-px w-32 bg-white/5" />
                    <p className="text-[10px] font-medium text-slate-700 uppercase tracking-widest">© {new Date().getFullYear()}. All Rights Reserved.</p>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex -space-x-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-emerald-600/20 backdrop-blur-xl" />
                        ))}
                    </div>
                    <div className="h-10 w-px bg-white/5" />
                    <div className="text-right">
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-500 block mb-1">Status</span>
                        <span className="text-white text-xs font-bold uppercase tracking-widest [word-spacing:0.3em] group">Available for Hire</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

function App() {
    return (
        <div className="bg-background text-slate-100 selection:bg-emerald-500/30 selection:text-white font-outfit scroll-smooth">
            <BackgroundLayer />
            <CustomCursor />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <TechStack />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
