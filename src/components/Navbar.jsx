
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
    { label: "Про мене", href: "#about" },
    { label: "Проєкти", href: "#projects" },
    { label: "Ціни", href: "#pricing" },
    { label: "Написати мені", href: "#contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            return savedTheme === "dark";
        }

        return false;
    });

    // Перемикання теми
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );
    }, [isDark]);

    // Відстеження прокручування
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 15);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Закриття мобільного меню
    const closeMenu = () => setIsOpen(false);

    return (
        <header
            className={`
                fixed left-0 top-0 z-50 w-full
                border-b transition-all duration-300
                ${
                    scrolled || isOpen
                        ? "border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#0A0A0A]/95"
                        : "border-transparent bg-white/90 backdrop-blur-md dark:bg-[#0A0A0A]/90"
                }
            `}
        >
            <nav
                className="
                    relative mx-auto flex h-[72px]
                    max-w-7xl items-center justify-end
                    px-5 sm:px-8 lg:justify-center lg:px-10
                "
                aria-label="Основна навігація"
            >
                {/* Навігація ПК */}
                <div className="hidden items-center gap-2 lg:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="
                                rounded-xl px-5 py-2.5
                                text-sm font-medium
                                text-slate-600
                                transition-all duration-200
                                hover:bg-emerald-50
                                hover:text-emerald-700
                                dark:text-slate-300
                                dark:hover:bg-white/10
                                dark:hover:text-emerald-400
                            "
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Права частина */}
                <div
                    className="
                        flex items-center gap-2
                        lg:absolute lg:right-10
                    "
                >
                    {/* Перемикач теми */}
                    <button
                        type="button"
                        onClick={() => setIsDark((prev) => !prev)}
                        aria-label={
                            isDark
                                ? "Увімкнути світлу тему"
                                : "Увімкнути темну тему"
                        }
                        title={isDark ? "Світла тема" : "Темна тема"}
                        className="
                            flex h-10 w-10 cursor-pointer
                            items-center justify-center
                            rounded-xl
                            border border-slate-200
                            bg-slate-50 text-slate-700
                            transition-all duration-200
                            hover:border-emerald-200
                            hover:bg-emerald-50
                            hover:text-emerald-700
                            dark:border-white/10
                            dark:bg-[#1A1A1A]
                            dark:text-slate-200
                            dark:hover:border-emerald-500/30
                            dark:hover:text-emerald-400
                        "
                    >
                        {isDark ? (
                            <Sun size={20} strokeWidth={1.8} />
                        ) : (
                            <Moon size={20} strokeWidth={1.8} />
                        )}
                    </button>

                    {/* Мобільне меню */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={
                            isOpen ? "Закрити меню" : "Відкрити меню"
                        }
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                        className="
                            flex h-10 w-10 cursor-pointer
                            items-center justify-center
                            rounded-xl text-slate-700
                            transition-colors
                            hover:bg-emerald-50
                            dark:text-slate-200
                            dark:hover:bg-white/10
                            lg:hidden
                        "
                    >
                        {isOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </div>
            </nav>

            {/* Мобільна навігація */}
            {isOpen && (
                <div
                    id="mobile-navigation"
                    className="
                        border-t border-slate-100
                        bg-white px-5 pb-5 pt-3
                        shadow-lg
                        dark:border-white/10
                        dark:bg-[#0A0A0A]
                        lg:hidden
                    "
                >
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className="
                                    rounded-xl px-4 py-3.5
                                    text-base font-medium
                                    text-slate-700
                                    transition-colors
                                    hover:bg-emerald-50
                                    hover:text-emerald-700
                                    dark:text-slate-200
                                    dark:hover:bg-white/10
                                    dark:hover:text-emerald-400
                                "
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
