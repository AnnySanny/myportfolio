
import { useMemo, useState } from "react";
import {
    Globe,
    Database,
    Cloud,
    Shield,
    Send,
    Smartphone,
    Check,
    ArrowRight,
    RotateCcw,
    Calculator,
    Plus,
    Info,
    ChevronDown,
    ChevronUp,
    ClipboardList,
    AlertCircle,
} from "lucide-react";

// ======================================
// НАЛАШТУВАННЯ ЦІН
// ======================================

const BASE_PRICE = 300;

const BASE_DESCRIPTION =
    "Створення сучасного адаптивного вебсайту. " +
    "Базова вартість передбачає нескладний сайт " +
    "із погодженою структурою та дизайном. " +
    "Складні вебсервіси оцінюються окремо.";

const features = [
    {
        id: "database",
        title: "База даних",
        shortDescription: "Зберігання даних сайту",
        description:
            "Потрібна, якщо сайт має зберігати заявки, " +
            "облікові записи користувачів, оголошення " +
            "або іншу інформацію. Можливе використання " +
            "локальної бази даних чи Firebase Firestore. " +
            "Технологію та остаточну вартість визначаємо " +
            "відповідно до потреб проєкту.",
        price: 150,
        icon: Database,
    },
    {
        id: "hosting",
        title: "Публікація на Netlify",
        shortDescription: "Розміщення сайту в інтернеті",
        description:
            "Налаштування проєкту, збірки та публікації " +
            "сайту на Netlify. Для відповідних невеликих " +
            "проєктів можна використовувати безкоштовний " +
            "тариф платформи. Оплата $40 — саме за мою " +
            "роботу з налаштування, а не за послуги Netlify. " +
            "Домен і платні сервіси оплачуються окремо.",
        price: 20,
        icon: Cloud,
    },
    {
        id: "admin",
        title: "Адмінпанель",
        shortDescription: "Керування вмістом сайту",
        description:
            "Індивідуальна панель для керування " +
            "користувачами, заявками, оголошеннями " +
            "та іншими даними сайту. Передбачає " +
            "авторизацію та налаштування прав доступу. " +
            "Для роботи потрібна база даних, тому " +
            "вона додається автоматично.",
        price: 250,
        icon: Shield,
        requires: ["database"],
    },
    {
        id: "telegram",
        title: "Telegram-бот",
        shortDescription: "Заявки та автоматизація",
        description:
            "Розробка бота для приймання заявок, " +
            "надсилання сповіщень або автоматизації " +
            "простих процесів. Інтеграція зі складними " +
            "системами, платежами чи додатковими " +
            "сервісами оцінюється окремо.",
        price: 200,
        icon: Send,
    },
    {
        id: "android",
        title: "Android-додаток",
        shortDescription: "Мобільний застосунок",
        description:
            "Розробка окремого Android-застосунку " +
            "з погодженим набором екранів і функцій. " +
            "Вартість залежить від дизайну, авторизації, " +
            "роботи з даними, інтеграцій та складності. " +
            "Публікація в Google Play і сторонні " +
            "платні сервіси обговорюються окремо.",
        price: 1000,
        icon: Smartphone,
    },
    {
        id: "consultation",
        title: "Консультація та ТЗ",
        shortDescription: "Допомога з плануванням",
        description:
            "Якщо готового технічного завдання немає, " +
            "ми обговоримо ідею, основні функції, " +
            "структуру сайту та побажання до дизайну. " +
            "За результатом підготуємо базовий опис " +
            "вимог, який допоможе погодити обсяг роботи. " +
            "Розширене ТЗ оцінюється окремо.",
        price: 10,
        icon: ClipboardList,
    },
];

// ======================================
// ДОПОМІЖНІ ФУНКЦІЇ
// ======================================

const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);

// ======================================
// КОМПОНЕНТ ОПЦІЇ
// ======================================

const FeatureCard = ({
    feature,
    active,
    expanded,
    onToggle,
    onExpand,
}) => {
    const Icon = feature.icon;

    return (
        <div
            className={`
                overflow-hidden rounded-2xl border
                transition-colors duration-300
                ${
                    active
                        ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10"
                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-[#1A1A1A]"
                }
            `}
        >
            <div className="flex items-stretch">
                {/* ВИБІР ФУНКЦІЇ */}
                <button
                    type="button"
                    onClick={onToggle}
                    aria-pressed={active}
                    className="
                        flex min-w-0 flex-1
                        items-center gap-2.5
                        px-3 py-3 text-left
                        transition-colors
                        hover:bg-emerald-500/5
                        focus-visible:outline-2
                        focus-visible:outline-emerald-500
                        sm:gap-3 sm:p-4
                    "
                >
                    {/* ІКОНКА */}
                    <div
                        className={`
                            flex h-10 w-10 shrink-0
                            items-center justify-center
                            rounded-xl transition-colors
                            sm:h-11 sm:w-11
                            ${
                                active
                                    ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-[#0A0A0A]"
                                    : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400"
                            }
                        `}
                    >
                        <Icon size={20} />
                    </div>

                    {/* НАЗВА */}
                    <div className="min-w-0 flex-1">
                        <h4
                            className="
                                text-[13px] font-bold
                                leading-snug text-slate-900
                                min-[375px]:text-sm
                                sm:text-base
                                dark:text-white
                            "
                        >
                            {feature.title}
                        </h4>

                        <p
                            className="
                                mt-1 hidden text-xs
                                leading-5 text-slate-500
                                sm:block
                                dark:text-slate-400
                            "
                        >
                            {feature.shortDescription}
                        </p>

                        {feature.requires && (
                            <p
                                className="
                                    mt-1 text-[10px]
                                    leading-tight
                                    text-emerald-600
                                    sm:text-[11px]
                                    dark:text-emerald-400
                                "
                            >
                                + база даних
                            </p>
                        )}
                    </div>

                    {/* ЦІНА */}
                    <span
                        className={`
                            shrink-0 whitespace-nowrap
                            text-xs font-bold
                            sm:text-sm
                            ${
                                active
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-slate-600 dark:text-slate-300"
                            }
                        `}
                    >
                        +{formatPrice(feature.price)}
                    </span>

                    {/* ІНДИКАТОР */}
                    <div
                        className={`
                            flex h-6 w-6 shrink-0
                            items-center justify-center
                            rounded-full border
                            sm:h-7 sm:w-7
                            ${
                                active
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : "border-slate-300 text-slate-400 dark:border-white/20"
                            }
                        `}
                    >
                        {active ? (
                            <Check size={14} />
                        ) : (
                            <Plus size={14} />
                        )}
                    </div>
                </button>

                {/* ОКРЕМА КНОПКА ОПИСУ */}
                <button
                    type="button"
                    onClick={onExpand}
                    aria-expanded={expanded}
                    aria-controls={`feature-details-${feature.id}`}
                    aria-label={
                        expanded
                            ? `Приховати опис: ${feature.title}`
                            : `Детальніше про: ${feature.title}`
                    }
                    className="
                        flex w-9 shrink-0
                        items-center justify-center
                        border-l border-slate-200
                        text-slate-500
                        transition-colors
                        hover:bg-emerald-500/10
                        hover:text-emerald-600
                        focus-visible:outline-2
                        focus-visible:outline-emerald-500
                        sm:w-11
                        dark:border-white/10
                        dark:text-slate-400
                    "
                >
                    {expanded ? (
                        <ChevronUp size={18} />
                    ) : (
                        <Info size={18} />
                    )}
                </button>
            </div>

            {/* РОЗГОРНУТИЙ ОПИС */}
            {expanded && (
                <div
                    id={`feature-details-${feature.id}`}
                    className="
                        border-t border-slate-200
                        px-4 py-3
                        dark:border-white/10
                        sm:px-5 sm:py-4
                    "
                >
                    <p
                        className="
                            text-xs leading-[1.8]
                            text-slate-600
                            sm:text-sm
                            dark:text-slate-300
                        "
                    >
                        {feature.description}
                    </p>
                </div>
            )}
        </div>
    );
};

// ======================================
// КОМПОНЕНТ СУМИ
// ======================================

const TotalAmount = ({ totalPrice, mobile = false }) => (
    <div
        className={
            mobile
                ? "flex items-center justify-between gap-3"
                : ""
        }
    >
        <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                Орієнтовна вартість від
            </p>

            <div
                key={totalPrice}
                className={`
                    pricing-total-enter
                    mt-1 font-black tracking-tight
                    text-slate-900 dark:text-white
                    ${
                        mobile
                            ? "text-[clamp(1.6rem,7vw,2.2rem)]"
                            : "text-4xl sm:text-5xl"
                    }
                `}
            >
                {formatPrice(totalPrice)}
            </div>
        </div>

        {mobile && (
            <div
                className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl bg-emerald-100
                    text-emerald-600
                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                "
            >
                <Calculator size={21} />
            </div>
        )}
    </div>
);

// ======================================
// ПОПЕРЕДЖЕННЯ ПРО ЦІНУ
// ======================================

const PriceNotice = ({ compact = false }) => (
    <div
        className={`
            rounded-xl border border-amber-200
            bg-amber-50
            dark:border-amber-500/20
            dark:bg-amber-500/5
            ${compact ? "p-3" : "p-4"}
        `}
    >
        <div className="flex items-start gap-2.5">
            <AlertCircle
                size={18}
                className="
                    mt-0.5 shrink-0
                    text-amber-600
                    dark:text-amber-400
                "
            />

            <div>
                <p className="text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                    Це попередній розрахунок
                </p>

                <p className="mt-1 text-xs leading-[1.7] text-slate-600 dark:text-slate-400">
                    Остаточна ціна залежить від складності,
                    обсягу функцій, дизайну та інтеграцій.
                    Точну вартість погоджуємо після
                    обговорення вимог до проєкту.
                </p>
            </div>
        </div>
    </div>
);

// ======================================
// ОСНОВНИЙ КАЛЬКУЛЯТОР
// ======================================

const Pricing = () => {
    const [selected, setSelected] = useState([]);
    const [expandedFeature, setExpandedFeature] = useState(null);
    const [showBaseDetails, setShowBaseDetails] = useState(false);
    const [lastChanged, setLastChanged] = useState(null);

    // ======================================
    // ДОДАВАННЯ / ВИДАЛЕННЯ
    // ======================================

    const toggleFeature = (feature) => {
        setSelected((previous) => {
            const isSelected = previous.includes(feature.id);

            if (isSelected) {
                const removed = new Set([feature.id]);

                let changed = true;

                while (changed) {
                    changed = false;

                    features.forEach((item) => {
                        if (
                            !removed.has(item.id) &&
                            item.requires?.some((id) =>
                                removed.has(id)
                            )
                        ) {
                            removed.add(item.id);
                            changed = true;
                        }
                    });
                }

                return previous.filter(
                    (id) => !removed.has(id)
                );
            }

            const next = new Set(previous);

            const addWithRequirements = (item) => {
                item.requires?.forEach((requiredId) => {
                    const required = features.find(
                        (f) => f.id === requiredId
                    );

                    if (required) {
                        addWithRequirements(required);
                    }
                });

                next.add(item.id);
            };

            addWithRequirements(feature);

            return [...next];
        });

        setLastChanged(feature.id);
    };

    // ======================================
    // РОЗРАХУНОК
    // ======================================

    const selectedFeatures = useMemo(
        () =>
            features.filter((item) =>
                selected.includes(item.id)
            ),
        [selected]
    );

    const extrasPrice = selectedFeatures.reduce(
        (sum, item) => sum + item.price,
        0
    );

    const totalPrice = BASE_PRICE + extrasPrice;

    const resetCalculator = () => {
        setSelected([]);
        setLastChanged(null);
        setExpandedFeature(null);
    };

    // ======================================
    // ЗАЯВКА
    // ======================================

    const createRequest = () => {
        const items = selectedFeatures.length
            ? selectedFeatures
                  .map(
                      (item) =>
                          `• ${item.title}: ${formatPrice(item.price)}`
                  )
                  .join("\n")
            : "Без додаткових можливостей";

        const message = [
            "Вітаю! Хочу обговорити розробку сайту.",
            "",
            `Базовий вебсайт: ${formatPrice(BASE_PRICE)}`,
            "",
            "Додаткові можливості:",
            items,
            "",
            `Орієнтовна вартість від: ${formatPrice(totalPrice)}`,
            "",
            "Розумію, що остаточна ціна залежить від вимог проєкту.",
        ].join("\n");

        sessionStorage.setItem(
            "portfolioPricingRequest",
            message
        );

        window.location.hash = "contact";
    };

    return (
        <section
            id="pricing"
            className="
                h-full min-h-0 w-full
                overflow-x-hidden overflow-y-auto
                overscroll-y-contain
                bg-[#F8FAF9]
                px-4 py-6
                sm:px-8 sm:py-10
                lg:py-12
                dark:bg-[#111111]
            "
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* ЗАГОЛОВОК */}
                <div className="mb-5 text-center sm:mb-8">
                    <span
                        className="
                            text-[11px] font-semibold
                            uppercase tracking-[0.2em]
                            text-emerald-600
                            sm:text-xs
                            dark:text-emerald-400
                        "
                    >
                        Вартість розробки
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
                        Збери свій{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                            проєкт
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto mt-3 hidden max-w-xl
                            text-sm leading-6
                            text-slate-500
                            sm:block
                            dark:text-slate-400
                        "
                    >
                        Обирай потрібні можливості та отримуй
                        попередню оцінку вартості розробки.
                    </p>
                </div>

                {/* МОБІЛЬНИЙ ПІДСУМОК */}
                <div
                    className="
                        sticky top-0 z-20
                        mb-4 rounded-2xl
                        border border-emerald-300
                        bg-white/95 p-4
                        shadow-sm backdrop-blur-xl
                        lg:hidden
                        dark:border-emerald-500/40
                        dark:bg-[#1A1A1A]/95
                    "
                >
                    <TotalAmount
                        totalPrice={totalPrice}
                        mobile
                    />

                    <div
                        className="
                            mt-3 flex items-center
                            justify-between gap-3
                            border-t border-slate-100
                            pt-3
                            dark:border-white/10
                        "
                    >
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            Обрано доповнень:{" "}
                            <strong className="text-emerald-600 dark:text-emerald-400">
                                {selected.length}
                            </strong>
                        </span>

                        {selected.length > 0 && (
                            <button
                                type="button"
                                onClick={resetCalculator}
                                className="
                                    inline-flex items-center gap-1
                                    text-xs font-semibold
                                    text-slate-500
                                    hover:text-emerald-600
                                    dark:text-slate-400
                                    dark:hover:text-emerald-400
                                "
                            >
                                <RotateCcw size={13} />
                                Скинути
                            </button>
                        )}
                    </div>
                </div>

                {/* ОСНОВНА СІТКА */}
                <div
                    className="
                        grid items-start gap-6
                        lg:grid-cols-[1.2fr_0.8fr]
                        lg:gap-8
                    "
                >
                    {/* ЛІВА КОЛОНКА */}
                    <div className="space-y-3 sm:space-y-4">

                        {/* БАЗОВИЙ САЙТ */}
                        <div
                            className="
                                overflow-hidden rounded-2xl
                                border border-emerald-300
                                bg-white
                                dark:border-emerald-500/40
                                dark:bg-[#1A1A1A]
                            "
                        >
                            <div className="flex items-stretch">
                                <div
                                    className="
                                        flex min-w-0 flex-1
                                        items-center justify-between
                                        gap-3 p-3.5
                                        sm:p-5
                                    "
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div
                                            className="
                                                flex h-10 w-10 shrink-0
                                                items-center justify-center
                                                rounded-xl bg-emerald-100
                                                text-emerald-600
                                                sm:h-12 sm:w-12
                                                dark:bg-emerald-500/10
                                                dark:text-emerald-400
                                            "
                                        >
                                            <Globe size={22} />
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                                                Вебсайт
                                            </h3>

                                            <p className="mt-1 hidden text-xs text-slate-500 sm:block dark:text-slate-400">
                                                Базова розробка
                                            </p>
                                        </div>
                                    </div>

                                    <div className="shrink-0 text-right">
                                        <p className="text-sm font-black text-emerald-600 sm:text-lg dark:text-emerald-400">
                                            {formatPrice(BASE_PRICE)}
                                        </p>

                                        <span className="hidden text-[11px] text-slate-400 sm:block">
                                            Основа
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowBaseDetails((prev) => !prev)
                                    }
                                    aria-expanded={showBaseDetails}
                                    aria-controls="base-price-details"
                                    aria-label="Детальніше про базовий сайт"
                                    className="
                                        flex w-9 shrink-0
                                        items-center justify-center
                                        border-l border-emerald-200
                                        text-emerald-600
                                        hover:bg-emerald-50
                                        sm:w-11
                                        dark:border-emerald-500/20
                                        dark:text-emerald-400
                                        dark:hover:bg-emerald-500/10
                                    "
                                >
                                    {showBaseDetails ? (
                                        <ChevronUp size={18} />
                                    ) : (
                                        <Info size={18} />
                                    )}
                                </button>
                            </div>

                            {showBaseDetails && (
                                <div
                                    id="base-price-details"
                                    className="
                                        border-t border-emerald-200
                                        px-4 py-3
                                        dark:border-emerald-500/20
                                        sm:px-5 sm:py-4
                                    "
                                >
                                    <p className="text-xs leading-[1.8] text-slate-600 sm:text-sm dark:text-slate-300">
                                        {BASE_DESCRIPTION}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ПІДКАЗКА */}
                        <p className="px-1 text-xs text-slate-500 dark:text-slate-400">
                            Натисни на послугу, щоб додати її.
                            <span className="hidden sm:inline">
                                {" "}Значок інформації відкриває опис.
                            </span>
                        </p>

                        {/* ДОДАТКОВІ ФУНКЦІЇ */}
                        <div className="space-y-2.5 sm:space-y-3">
                            {features.map((feature) => (
                                <FeatureCard
                                    key={feature.id}
                                    feature={feature}
                                    active={selected.includes(feature.id)}
                                    expanded={
                                        expandedFeature === feature.id
                                    }
                                    onToggle={() =>
                                        toggleFeature(feature)
                                    }
                                    onExpand={() =>
                                        setExpandedFeature((previous) =>
                                            previous === feature.id
                                                ? null
                                                : feature.id
                                        )
                                    }
                                />
                            ))}
                        </div>

                        {/* ПОПЕРЕДЖЕННЯ НА МОБІЛЬНИХ */}
                        <div className="lg:hidden">
                            <PriceNotice compact />
                        </div>

                        {/* КНОПКА НА МОБІЛЬНИХ */}
                        <div className="pt-1 lg:hidden">
                            <button
                                type="button"
                                onClick={createRequest}
                                className="
                                    flex w-full items-center
                                    justify-center gap-2
                                    rounded-xl bg-emerald-600
                                    px-5 py-3.5
                                    text-sm font-semibold text-white
                                    transition-colors
                                    hover:bg-emerald-700
                                    dark:bg-emerald-500
                                    dark:text-[#0A0A0A]
                                    dark:hover:bg-emerald-400
                                "
                            >
                                Обговорити проєкт
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* ПРАВА КОЛОНКА — ПК */}
                    <div
                        className="
                            hidden rounded-3xl
                            border border-slate-200
                            bg-white p-5 shadow-sm
                            lg:sticky lg:top-4
                            lg:block lg:p-7
                            dark:border-white/10
                            dark:bg-[#1A1A1A]
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex h-11 w-11
                                    items-center justify-center
                                    rounded-xl bg-emerald-100
                                    text-emerald-600
                                    dark:bg-emerald-500/10
                                    dark:text-emerald-400
                                "
                            >
                                <Calculator size={22} />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Ваш розрахунок
                                </h3>

                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Оновлюється автоматично
                                </p>
                            </div>
                        </div>

                        {/* СПИСОК ВИБРАНОГО */}
                        <div className="mt-7 space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                    Вебсайт
                                </span>

                                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {formatPrice(BASE_PRICE)}
                                </span>
                            </div>

                            {selectedFeatures.map((item) => (
                                <div
                                    key={item.id}
                                    className={`
                                        flex items-center justify-between gap-3
                                        ${
                                            lastChanged === item.id
                                                ? "pricing-item-enter"
                                                : ""
                                        }
                                    `}
                                >
                                    <div className="flex min-w-0 items-center gap-2">
                                        <Plus
                                            size={13}
                                            className="shrink-0 text-emerald-500"
                                        />

                                        <span className="text-sm text-slate-600 dark:text-slate-300">
                                            {item.title}
                                        </span>
                                    </div>

                                    <span className="shrink-0 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                        +{formatPrice(item.price)}
                                    </span>
                                </div>
                            ))}

                            {selectedFeatures.length === 0 && (
                                <p className="py-3 text-center text-xs text-slate-400">
                                    Додаткові можливості не вибрані
                                </p>
                            )}
                        </div>

                        {/* СУМА */}
                        <div className="mt-7 border-t border-slate-200 pt-6 dark:border-white/10">
                            <TotalAmount totalPrice={totalPrice} />
                        </div>

                        {/* ПОПЕРЕДЖЕННЯ */}
                        <div className="mt-5">
                            <PriceNotice />
                        </div>

                        {/* КНОПКИ */}
                        <div className="mt-6 space-y-3">
                            <button
                                type="button"
                                onClick={createRequest}
                                className="
                                    flex w-full items-center
                                    justify-center gap-2
                                    rounded-xl bg-emerald-600
                                    px-5 py-3.5
                                    text-sm font-semibold text-white
                                    transition-colors
                                    hover:bg-emerald-700
                                    dark:bg-emerald-500
                                    dark:text-[#0A0A0A]
                                    dark:hover:bg-emerald-400
                                "
                            >
                                Обговорити проєкт
                                <ArrowRight size={18} />
                            </button>

                            {selected.length > 0 && (
                                <button
                                    type="button"
                                    onClick={resetCalculator}
                                    className="
                                        flex w-full items-center
                                        justify-center gap-2
                                        py-2 text-xs font-medium
                                        text-slate-500
                                        transition-colors
                                        hover:text-emerald-600
                                        dark:text-slate-400
                                        dark:hover:text-emerald-400
                                    "
                                >
                                    <RotateCcw size={14} />
                                    Скинути вибір
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-6 sm:h-10" aria-hidden="true" />
            </div>
        </section>
    );
};

export default Pricing;
