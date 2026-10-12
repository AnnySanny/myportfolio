
import { ArrowDown } from "lucide-react";

const Hero = () => {
    return (
        <section
            id="home"
            className="
                relative flex min-h-full
                items-center justify-center
                overflow-hidden
                bg-white
                px-5
                min-[375px]:px-6
                sm:px-8
                transition-colors duration-300
                dark:bg-[#0A0A0A]
            "
        >
            {/* Основний вміст */}
            <div
                className="
                    mx-auto w-full max-w-5xl
                    pb-12
                    text-center
                    min-[375px]:pb-14
                    sm:pb-16
                "
            >
                {/* Заголовок */}
                <h1
                    className="
                        text-[clamp(2.5rem,11vw,3.5rem)]
                        font-black
                        leading-[1.12]
                        tracking-tight
                        text-slate-900
                        sm:text-6xl
                        md:text-7xl
                        lg:text-8xl
                        dark:text-white
                    "
                >
                    Потрібен{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">
                        сайт
                    </span>
                    ?
                </h1>

                {/* Опис */}
                <p
                    className="
                        mx-auto
                        mt-5
                        max-w-[320px]
                        text-[14px]
                        leading-[1.75]
                        text-slate-600

                        min-[375px]:max-w-[350px]
                        min-[375px]:text-[15px]

                        sm:mt-7
                        sm:max-w-2xl
                        sm:text-lg
                        sm:leading-8

                        dark:text-slate-400
                    "
                >
                    Створюю сучасні, швидкі та адаптивні вебсайти,
                    які допомагають представити ваш бізнес,
                    послуги або ідею в інтернеті.
                </p>
            </div>

            {/* Гортайте вниз */}
            <a
                href="#about"
                aria-label="Прокрутити до секції Про мене"
                className="
                    absolute
                    bottom-5
                    left-1/2
                    flex
                    -translate-x-1/2
                    flex-col
                    items-center
                    gap-2
                    text-xs
                    font-medium
                    text-slate-400
                    transition-colors duration-300

                    min-[375px]:bottom-6

                    sm:bottom-8
                    sm:gap-3
                    sm:text-sm

                    hover:text-emerald-600
                    dark:text-slate-500
                    dark:hover:text-emerald-400
                "
            >
                <span className="whitespace-nowrap">
                    Гортайте вниз
                </span>

                <ArrowDown
                    size={22}
                    strokeWidth={1.7}
                    className="animate-bounce"
                />
            </a>
        </section>
    );
};

export default Hero;
