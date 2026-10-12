
const contacts = [
    {
        id: "instagram",
        title: "Instagram",
        description: "Мої публікації та повідомлення",
        button: "Відкрити Instagram",
        href: "https://www.instagram.com/deti_xoronyat_konya/",
    },
    {
        id: "telegram",
        title: "Telegram",
        button: "Написати в Telegram",
        href: "https://t.me/ChildrenBuryHorse",
    },
];

// Іконка Instagram
const InstagramIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
);

// Іконка Telegram
const TelegramIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M21.94 4.66a1.5 1.5 0 0 0-1.62-.22L2.9 11.7a1.3 1.3 0 0 0 .12 2.44l4.45 1.48 1.72 5.17a1.1 1.1 0 0 0 1.9.38l2.6-2.68 4.67 3.44a1.5 1.5 0 0 0 2.34-.9L22.5 6.1a1.5 1.5 0 0 0-.56-1.44ZM9.2 14.98l9.67-7.35-7.7 8.65-.45 2.16-1.52-3.46Z" />
    </svg>
);

// Стрілка
const ArrowIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
    </svg>
);

const Contact = () => {
    return (
        <section
            id="contact"
            className="
                flex min-h-full w-full
                items-center justify-center
                bg-white px-5 py-10
                sm:px-8
                dark:bg-[#0A0A0A]
            "
        >
            <div className="mx-auto w-full max-w-4xl">

                {/* ЗАГОЛОВОК */}
                <div className="mb-10 text-center">
                    <span
                        className="
                            text-xs font-semibold
                            uppercase tracking-[0.2em]
                            text-emerald-600
                            dark:text-emerald-400
                        "
                    >
                        Контакти
                    </span>

                    <h2
                        className="
                            mt-3 text-4xl font-black
                            tracking-tight text-slate-900
                            sm:text-5xl
                            lg:text-6xl
                            dark:text-white
                        "
                    >
                        Зв'яжіться{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                            зі мною
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto mt-5 max-w-xl
                            text-sm leading-7
                            text-slate-500
                            sm:text-base
                            dark:text-slate-400
                        "
                    >
                        Маєте ідею для проєкту або хочете
                        обговорити співпрацю?
                        Оберіть зручний спосіб зв'язку.
                    </p>
                </div>

                {/* СОЦІАЛЬНІ МЕРЕЖІ */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
                    {contacts.map((contact) => (
                        <a
                            key={contact.id}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                contact-social-card
                                contact-${contact.id}
                                group relative flex flex-col
                                items-center justify-center
                                overflow-hidden rounded-3xl
                                border border-slate-200
                                bg-[#F8FAF9]
                                px-5 py-9 text-center
                                transition-all duration-300
                                dark:border-white/10
                                dark:bg-[#171717]
                                sm:min-h-[290px]
                                lg:min-h-[320px]
                            `}
                        >
                            {/* ІКОНКА */}
                            <div
                                className="
                                    contact-social-icon
                                    flex h-20 w-20
                                    items-center justify-center
                                    rounded-3xl
                                    transition-transform duration-300
                                    group-hover:scale-110
                                    lg:h-24 lg:w-24
                                "
                            >
                                {contact.id === "instagram" ? (
                                    <InstagramIcon />
                                ) : (
                                    <TelegramIcon />
                                )}
                            </div>

                            {/* НАЗВА */}
                            <h3
                                className="
                                    mt-6 text-2xl font-black
                                    tracking-tight
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                {contact.title}
                            </h3>

                            {/* ОПИС */}
                            <p
                                className="
                                    mt-2 text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                {contact.description}
                            </p>

                            {/* ПОСИЛАННЯ */}
                            <div
                                className="
                                    mt-6 flex items-center gap-2
                                    text-sm font-semibold
                                    text-slate-700
                                    transition-all duration-300
                                    group-hover:gap-3
                                    dark:text-slate-200
                                "
                            >
                                {contact.button}
                                <ArrowIcon />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
