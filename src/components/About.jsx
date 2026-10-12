
import { useState } from "react";
import {
    Code2,
    Monitor,
    Smartphone,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

// Іконка Telegram
const TelegramIcon = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M21.944 4.667a1.5 1.5 0 0 0-1.73-.38L2.9 10.963a1.5 1.5 0 0 0 .094 2.83l4.415 1.442 1.7 5.205a1.5 1.5 0 0 0 2.514.58l2.56-2.55 4.445 3.27a1.5 1.5 0 0 0 2.36-.9l2.455-14.59a1.5 1.5 0 0 0-1.499-1.583ZM9.45 14.58l8.88-6.72-6.86 8.19-.45 2.45-1.57-3.92Z" />
    </svg>
);

const services = [
    {
        title: "Вебсайти",
        description: "Сучасні та адаптивні сайти",
        icon: Code2,
    },
    {
        title: "Telegram-боти",
        description: "Автоматизація та інтеграції",
        icon: TelegramIcon,
    },
    {
        title: "Програми для ПК",
        description: "Програмні рішення під задачі",
        icon: Monitor,
    },
    {
        title: "Android-додатки",
        description: "Мобільні застосунки",
        icon: Smartphone,
    },
];

const About = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section
            id="about"
            className="
                relative flex min-h-full w-full
                items-center
                bg-[#F8FAF9]
                px-5 py-8
                min-[375px]:px-6
                sm:px-8 sm:py-12
                lg:px-10 lg:py-16
                transition-colors duration-300
                dark:bg-[#111111]
            "
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* ВЕРХНІЙ БЛОК */}
                <div
                    className="
                        grid items-start
                        gap-5
                        sm:gap-8
                        lg:grid-cols-[0.85fr_1.15fr]
                        lg:gap-16
                    "
                >
                    {/* ЗАГОЛОВОК */}
                    <div>
                        <span
                            className="
                                mb-3 inline-block
                                text-[11px] font-semibold
                                uppercase tracking-[0.2em]
                                text-emerald-600
                                sm:mb-4 sm:text-sm
                                dark:text-emerald-400
                            "
                        >
                            Знайомство
                        </span>

                        <h2
                            className="
                                text-[clamp(2rem,9vw,3rem)]
                                font-black
                                leading-[1.12]
                                tracking-tight
                                text-slate-900
                                sm:text-5xl
                                lg:text-6xl
                                dark:text-white
                            "
                        >
                            Трохи{" "}
                            <span
                                className="
                                    text-emerald-600
                                    dark:text-emerald-400
                                "
                            >
                                про мене
                            </span>
                        </h2>
                    </div>

                    {/* ОПИС */}
                    <div>
                        {/* Коротке представлення завжди видно */}
                        <p
                            className="
                                text-base font-semibold
                                leading-[1.65]
                                text-slate-900
                                min-[375px]:text-lg
                                sm:text-xl
                                lg:text-2xl
                                dark:text-white
                            "
                        >
                            Привіт! Я Назар — веброзробник
                            із 5-річним досвідом створення
                            програмних рішень та сайтів.
                        </p>

                        {/* Додатковий текст */}
                        <div
                            id="about-more"
                            className={`
                                about-details
                                ${expanded ? "about-details-open" : ""}
                            `}
                        >
                            <div
                                className="
                                    space-y-3 pt-4
                                    sm:space-y-4
                                "
                            >
                                <p
                                    className="
                                        text-[13px]
                                        leading-[1.75]
                                        text-slate-600
                                        min-[375px]:text-sm
                                        sm:text-base
                                        sm:leading-8
                                        dark:text-slate-400
                                    "
                                >
                                    За цей час я працював над різноманітними
                                    проєктами, використовуючи різні мови
                                    програмування, технології та інструменти.
                                    Від невеликих сайтів до складніших
                                    вебзастосунків із власною логікою,
                                    базами даних та інтеграціями.
                                </p>

                                <p
                                    className="
                                        text-[13px]
                                        leading-[1.75]
                                        text-slate-600
                                        min-[375px]:text-sm
                                        sm:text-base
                                        sm:leading-8
                                        dark:text-slate-400
                                    "
                                >
                                    Для мене кожен проєкт — це окреме завдання,
                                    яке потребує індивідуального підходу.
                                    Приділяю увагу не лише зовнішньому вигляду,
                                    а й швидкості роботи, зручності користування
                                    та можливості подальшого розвитку.
                                </p>
                            </div>
                        </div>

                        {/* КНОПКА ТІЛЬКИ НА МОБІЛЬНИХ */}
                        <button
                            type="button"
                            onClick={() => setExpanded((prev) => !prev)}
                            aria-expanded={expanded}
                            aria-controls="about-more"
                            className="
                                mt-4 inline-flex items-center
                                gap-2 rounded-xl
                                bg-emerald-100
                                px-4 py-2.5
                                text-sm font-semibold
                                text-emerald-700
                                transition-colors
                                hover:bg-emerald-200
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-emerald-500
                                sm:hidden
                                dark:bg-emerald-500/10
                                dark:text-emerald-400
                                dark:hover:bg-emerald-500/20
                            "
                        >
                            {expanded ? (
                                <>
                                    Згорнути
                                    <ChevronUp size={17} />
                                </>
                            ) : (
                                <>
                                    Детальніше
                                    <ChevronDown size={17} />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* НАПРЯМКИ РОБОТИ */}
                <div
                    className="
                        mt-7
                        border-t border-slate-200
                        pt-6
                        sm:mt-12 sm:pt-10
                        lg:mt-16
                        dark:border-white/10
                    "
                >
                    <div
                        className="
                            grid grid-cols-1
                            gap-x-4 gap-y-5
                            min-[420px]:grid-cols-2
                            sm:gap-x-6 sm:gap-y-7
                            lg:grid-cols-4
                        "
                    >
                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={service.title}
                                    className="
                                        group flex items-start
                                        gap-3
                                        sm:gap-4
                                    "
                                >
                                    {/* ІКОНКА */}
                                    <div
                                        className="
                                            flex h-11 w-11
                                            shrink-0 items-center
                                            justify-center
                                            rounded-xl
                                            bg-emerald-100
                                            text-emerald-700
                                            transition-all duration-300
                                            group-hover:-translate-y-1
                                            group-hover:bg-emerald-200
                                            sm:h-12 sm:w-12
                                            sm:rounded-2xl
                                            dark:bg-emerald-500/10
                                            dark:text-emerald-400
                                            dark:group-hover:bg-emerald-500/20
                                        "
                                    >
                                        <Icon
                                            size={22}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    {/* ТЕКСТ */}
                                    <div className="min-w-0 pt-0.5">
                                        <h3
                                            className="
                                                text-[15px] font-bold
                                                leading-tight
                                                text-slate-900
                                                sm:text-lg
                                                lg:text-xl
                                                dark:text-white
                                            "
                                        >
                                            {service.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-1 text-xs
                                                leading-relaxed
                                                text-slate-500
                                                sm:mt-1.5
                                                sm:text-sm
                                                dark:text-slate-400
                                            "
                                        >
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
