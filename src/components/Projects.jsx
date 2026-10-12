
import { useState } from "react";
import {
    ArrowUpRight,
    Image as ImageIcon,
    X,
} from "lucide-react";

// =====================================
// СПИСОК ПРОЄКТІВ
// =====================================



const projects = [
    {
        id: 1,
        title: "RBoard",
        category: "Дошка оголошень",
        description:
            "Локальна платформа оголошень для Рахова та району. " +
            "Пошук, фільтри, особисті кабінети, публікація " +
            "оголошень та адміністративна панель.",
        image: "/projects/rboard.webp",
        url: "https://rboard.netlify.app/",
    },
    {
        id: 2,
        title: "CourseCraft",
        category: "Освітня платформа",
        description:
            "Вебплатформа для представлення навчальних курсів. " +
            "Сучасний інтерфейс для освітнього онлайн-проєкту.",
        image: "/projects/coursecraft.webp",
        url: "https://coursecraftwor.netlify.app/",
    },
    {
        id: 3,
        title: "TechShop",
        category: "Інтернет-магазин",
        description:
            "Сучасний інтернет-магазин електроніки " +
            "з каталогом техніки та зручним інтерфейсом " +
            "для перегляду товарів.",
        image: "/projects/techshop.webp",
        url: "https://techshop12.netlify.app/",
    },
    {
        id: 4,
        title: "CyberMap",
        category: "Вебплатформа",
        description:
            "Вебпроєкт CyberMap із тематичним інтерфейсом " +
            "та адаптивним дизайном для різних пристроїв.",
        image: "/projects/cybermap.webp",
        url: "https://cybermap-hostv.netlify.app/",
    },
    {
        id: 5,
        title: "MoodBloom",
        category: "Вебзастосунок",
        description:
            "Вебзастосунок MoodBloom для відстеження настрою та емоційної підтримки, " +
            "зручним інтерфейсом та адаптивною структурою.",
        image: "/projects/moodbloom.webp",
        url: "https://moodbloomv1.netlify.app/",
    },
    {
        id: 6,
        title: "HireFlow",
        category: "HR-платформа",
        description:
            "Вебплатформа, присвячена процесам найму " +
            "та підбору персоналу, із сучасним " +
            "користувацьким інтерфейсом.",
        image: "/projects/hireflow.webp",
        url: "https://hireflowv1.netlify.app/",
    },
    {
        id: 7,
        title: "Statify",
        category: "Аналітика",
        description:
            "Аналітичний вебінтерфейс для представлення " +
            "статистичної інформації та показників " +
            "у зручному форматі.",
        image: "/projects/statify.webp",
        url: "https://statifyv1.netlify.app/",
    },
    {
        id: 8,
        title: "StockFlow",
        category: "Облік та управління",
        description:
            "Вебпроєкт для роботи з товарними запасами " +
            "та організації складського обліку.",
        image: "/projects/stockflow.webp",
        url: "https://stockflowv1.netlify.app/",
    },
    {
        id: 9,
        title: "Montana Resort",
        category: "Туризм та відпочинок",
        description:
            "Сучасний вебсайт туристичного комплексу " +
            "з презентацією відпочинку, послуг " +
            "та привабливим адаптивним дизайном.",
        image: "/projects/montana.webp",
        url: "https://montanaresort.netlify.app/",
    },
    {
        id: 10,
        title: "BeautyBook",
        category: "Сфера краси",
        description:
            "Вебплатформа для салону краси " +
            "із сучасним інтерфейсом для представлення " +
            "послуг та взаємодії з клієнтами.",
        image: "/projects/beautybook.webp",
        url: "https://beatybook.netlify.app/",
    },
];


// =====================================
// КАРТКА ПРОЄКТУ
// =====================================

const ProjectCard = ({ project }) => {
    const [opened, setOpened] = useState(false);

    return (
        <article
            className={`
                project-card group
                relative isolate
                w-full min-w-0
                overflow-hidden
                ${opened ? "is-open" : ""}
            `}
        >
            {/* Зображення */}
            <div className="project-card-image">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div
                        className="
                            flex h-full w-full
                            flex-col items-center justify-center
                            gap-2
                            bg-gradient-to-br
                            from-slate-100 to-emerald-100
                            dark:from-[#1C1C1C]
                            dark:to-[#15392C]
                            sm:gap-3
                        "
                    >
                        <ImageIcon
                            size={38}
                            strokeWidth={1.3}
                            className="text-emerald-500"
                        />

                        <span
                            className="
                                px-3 text-center
                                text-sm font-semibold
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            {project.title}
                        </span>
                    </div>
                )}
            </div>

            {/* Відкрити опис на смартфонах */}
            <button
                type="button"
                onClick={() => setOpened(true)}
                aria-label={`Відкрити опис ${project.title}`}
                aria-expanded={opened}
                className={`
                    absolute inset-0 z-10
                    cursor-pointer
                    focus-visible:outline-2
                    focus-visible:outline-emerald-500
                    md:hidden
                    ${opened ? "pointer-events-none" : ""}
                `}
            >
                <span className="sr-only">
                    Переглянути проєкт
                </span>
            </button>

            {/* Інформаційна панель */}
            <div className="project-card-content">
                {/* Закрити опис на смартфонах */}
                <button
                    type="button"
                    onClick={() => setOpened(false)}
                    aria-label={`Закрити опис ${project.title}`}
                    className="
                        absolute right-3 top-3 z-30
                        flex h-8 w-8
                        items-center justify-center
                        rounded-full bg-slate-100
                        text-slate-600
                        md:hidden
                        dark:bg-white/10
                        dark:text-white
                    "
                >
                    <X size={17} />
                </button>

                <div
                    className="
                        flex h-full min-h-0
                        flex-col justify-center
                        overflow-y-auto
                        pr-1
                    "
                >
                    <span
                        className="
                            text-[10px] font-semibold
                            uppercase tracking-[0.15em]
                            text-emerald-600
                            dark:text-emerald-400
                        "
                    >
                        Веброзробка
                    </span>

                    <h3
                        className="
                            mt-1.5 text-lg font-black
                            leading-tight
                            text-slate-900
                            sm:mt-2 sm:text-xl
                            dark:text-white
                        "
                    >
                        {project.title}
                    </h3>

                    <p
                        className="
                            mt-2 text-xs leading-5
                            text-slate-600
                            sm:mt-3 sm:text-sm sm:leading-6
                            dark:text-slate-400
                        "
                    >
                        {project.description}
                    </p>

                    {project.url ? (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                relative z-20 mt-4
                                inline-flex w-fit
                                items-center gap-2
                                rounded-xl bg-emerald-600
                                px-4 py-2.5
                                text-xs font-semibold text-white
                                transition-colors
                                hover:bg-emerald-700
                                dark:bg-emerald-500
                                dark:text-[#0A0A0A]
                            "
                        >
                            Відвідати сайт
                            <ArrowUpRight size={16} />
                        </a>
                    ) : (
                        <span
                            className="
                                mt-3 text-xs
                                text-emerald-600
                                dark:text-emerald-400
                            "
                        >
                            Посилання незабаром
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};

// =====================================
// СЕКЦІЯ ПРОЄКТІВ
// =====================================

const Projects = () => {
    return (
        <section
            id="projects"
            className="
                h-full min-h-0 w-full
                overflow-x-hidden
                overflow-y-auto
                overscroll-y-contain
                bg-white
                px-4 py-6
                min-[375px]:px-5
                sm:px-6 sm:py-10
                lg:px-8
                dark:bg-[#0A0A0A]
            "
        >
            <div className="mx-auto w-full max-w-[1800px]">

                {/* Заголовок */}
                <div className="mb-6 text-center sm:mb-8">
                    <span
                        className="
                            text-[11px] font-semibold
                            uppercase tracking-[0.2em]
                            text-emerald-600
                            sm:text-xs
                            dark:text-emerald-400
                        "
                    >
                        Портфоліо
                    </span>

                    <h2
                        className="
                            mt-2 text-[clamp(1.9rem,8vw,2.5rem)]
                            font-black leading-tight
                            tracking-tight text-slate-900
                            sm:mt-3 sm:text-4xl
                            lg:text-5xl
                            dark:text-white
                        "
                    >
                        Мої{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                            проєкти
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto mt-3 max-w-xl
                            text-[13px] leading-6
                            text-slate-500
                            sm:text-sm
                            dark:text-slate-400
                        "
                    >
                        Деякі з моїх реалізованих робіт.
                        Натисніть на картку, щоб дізнатися більше.
                    </p>
                </div>

                {/* Сітка проєктів */}
                <div
                    className="
                        grid grid-cols-1
                        gap-3
                        min-[480px]:grid-cols-2
                        sm:gap-4
                        md:grid-cols-3
                        lg:grid-cols-4
                        2xl:grid-cols-5
                        lg:gap-5
                    "
                >
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>

                <div className="h-6 sm:h-10" aria-hidden="true" />
            </div>
        </section>
    );
};

export default Projects;
