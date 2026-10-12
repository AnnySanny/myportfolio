
import {
    Children,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

const SECTION_IDS = [
    "home",
    "about",
    "projects",
    "pricing",
    "contact",
];

const SECTION_TITLES = [
    "Головна",
    "Про мене",
    "Мої проєкти",
    "Вартість розробки",
    "Контакти",
];

const SITE_TITLE = "Портфоліо веброзробника";

const ANIMATION_DURATION = 750;
const NAVBAR_HEIGHT = 72;

const SCROLL_TOLERANCE = 3;
const WHEEL_THRESHOLD = 15;
const TOUCH_THRESHOLD = 60;

// ======================================
// ПЕРЕВІРКА ВНУТРІШНЬОЇ ПРОКРУТКИ
// ======================================

const canScrollInside = (target, direction, page) => {
    let element =
        target instanceof Element ? target : null;

    while (element) {
        const style = window.getComputedStyle(element);

        const isScrollable =
            style.overflowY === "auto" ||
            style.overflowY === "scroll";

        if (isScrollable) {
            const maxScroll =
                element.scrollHeight - element.clientHeight;

            if (maxScroll > SCROLL_TOLERANCE) {
                const atTop =
                    element.scrollTop <= SCROLL_TOLERANCE;

                const atBottom =
                    element.scrollTop >=
                    maxScroll - SCROLL_TOLERANCE;

                if (direction > 0 && !atBottom) {
                    return true;
                }

                if (direction < 0 && !atTop) {
                    return true;
                }
            }
        }

        // Перевіряємо також саму сторінку
        if (element === page) {
            break;
        }

        element = element.parentElement;
    }

    return false;
};

// ======================================
// SECTION SWITCHER
// ======================================

const SectionSwitcher = ({ children }) => {
    const sections = Children.toArray(children);

    const getInitialIndex = () => {
        const hash = window.location.hash.slice(1);
        const index = SECTION_IDS.indexOf(hash);

        return index >= 0 ? index : 0;
    };

    const [activeIndex, setActiveIndex] = useState(getInitialIndex);
    const [previousIndex, setPreviousIndex] = useState(null);
    const [direction, setDirection] = useState(1);

    const activeRef = useRef(activeIndex);
    const lockedRef = useRef(false);
    const touchStartRef = useRef(null);
    const timeoutRef = useRef(null);
    const pagesRef = useRef([]);

    // ======================================
    // ПЕРЕХІД МІЖ СЕКЦІЯМИ
    // ======================================

    const navigateTo = useCallback(
        (nextIndex) => {
            if (
                lockedRef.current ||
                nextIndex < 0 ||
                nextIndex >= sections.length ||
                nextIndex === activeRef.current
            ) {
                return;
            }

            lockedRef.current = true;

            const currentIndex = activeRef.current;

            const nextDirection =
                nextIndex > currentIndex ? 1 : -1;

            setDirection(nextDirection);
            setPreviousIndex(currentIndex);
            setActiveIndex(nextIndex);

            activeRef.current = nextIndex;

            // Скидаємо прокрутку нової секції
            const nextPage = pagesRef.current[nextIndex];

            if (nextPage) {
                nextPage.scrollTop = 0;

                // Також скидаємо вкладені скрол-контейнери
                nextPage
                    .querySelectorAll("*")
                    .forEach((element) => {
                        const style =
                            window.getComputedStyle(element);

                        if (
                            style.overflowY === "auto" ||
                            style.overflowY === "scroll"
                        ) {
                            element.scrollTop = 0;
                        }
                    });
            }

            window.history.replaceState(
                null,
                "",
                `#${SECTION_IDS[nextIndex]}`
            );

            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                setPreviousIndex(null);
                lockedRef.current = false;
            }, ANIMATION_DURATION);
        },
        [sections.length]
    );

    // ======================================
    // ДИНАМІЧНИЙ TITLE
    // ======================================

    useEffect(() => {
        const sectionTitle =
            SECTION_TITLES[activeIndex] || "Головна";

        document.title = `${sectionTitle} | ${SITE_TITLE}`;
    }, [activeIndex]);

    // ======================================
    // WHEEL / TOUCH / NAVIGATION
    // ======================================

    useEffect(() => {
        // ----------------------------------
        // КОЛЕСО МИШІ / ТАЧПАД
        // ----------------------------------

        const handleWheel = (event) => {
            const page =
                pagesRef.current[activeRef.current];

            if (!page) return;

            if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
                return;
            }

            const scrollDirection =
                event.deltaY > 0 ? 1 : -1;

            // Якщо можна прокрутити внутрішній контент,
            // НЕ перемикаємо секцію
            if (
                canScrollInside(
                    event.target,
                    scrollDirection,
                    page
                )
            ) {
                return;
            }

            event.preventDefault();

            if (lockedRef.current) return;

            navigateTo(
                activeRef.current + scrollDirection
            );
        };

        // ----------------------------------
        // ПОЧАТОК СВАЙПУ
        // ----------------------------------

        const handleTouchStart = (event) => {
            if (event.touches.length !== 1) {
                touchStartRef.current = null;
                return;
            }

            touchStartRef.current = {
                y: event.touches[0].clientY,
                target: event.target,
            };
        };

        // ----------------------------------
        // ЗАВЕРШЕННЯ СВАЙПУ
        // ----------------------------------

        const handleTouchEnd = (event) => {
            const touchStart = touchStartRef.current;

            touchStartRef.current = null;

            if (!touchStart) return;

            const delta =
                touchStart.y -
                event.changedTouches[0].clientY;

            if (Math.abs(delta) < TOUCH_THRESHOLD) {
                return;
            }

            const page =
                pagesRef.current[activeRef.current];

            if (!page) return;

            const scrollDirection =
                delta > 0 ? 1 : -1;

            // Перевіряємо вкладену прокрутку
            if (
                canScrollInside(
                    touchStart.target,
                    scrollDirection,
                    page
                )
            ) {
                return;
            }

            if (lockedRef.current) return;

            navigateTo(
                activeRef.current + scrollDirection
            );
        };

        // ----------------------------------
        // ЯКОРІ НАВБАРУ
        // ----------------------------------

        const handleClick = (event) => {
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            const link = target.closest('a[href^="#"]');

            if (!link) return;

            const id = link.getAttribute("href").slice(1);

            const index = SECTION_IDS.indexOf(id);

            if (index < 0) return;

            event.preventDefault();

            navigateTo(index);
        };

        // ----------------------------------
        // ЗМІНА URL
        // ----------------------------------

        const handleHashChange = () => {
            const index = SECTION_IDS.indexOf(
                window.location.hash.slice(1)
            );

            if (index >= 0) {
                navigateTo(index);
            }
        };

        window.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        window.addEventListener(
            "touchstart",
            handleTouchStart,
            { passive: true }
        );

        window.addEventListener(
            "touchend",
            handleTouchEnd,
            { passive: true }
        );

        document.addEventListener("click", handleClick);

        window.addEventListener(
            "hashchange",
            handleHashChange
        );

        return () => {
            window.removeEventListener(
                "wheel",
                handleWheel
            );

            window.removeEventListener(
                "touchstart",
                handleTouchStart
            );

            window.removeEventListener(
                "touchend",
                handleTouchEnd
            );

            document.removeEventListener(
                "click",
                handleClick
            );

            window.removeEventListener(
                "hashchange",
                handleHashChange
            );

            clearTimeout(timeoutRef.current);
        };
    }, [navigateTo]);

    // ======================================
    // RENDER
    // ======================================

    return (
        <div
            className="section-switcher"
            style={{
                "--navbar-height": `${NAVBAR_HEIGHT}px`,
            }}
        >
            {sections.map((section, index) => {
                const isActive = index === activeIndex;
                const isLeaving = index === previousIndex;

                let animationClass = "";

                if (
                    isActive &&
                    previousIndex !== null
                ) {
                    animationClass =
                        direction === 1
                            ? "page-enter-from-bottom"
                            : "page-enter-from-top";
                } else if (isLeaving) {
                    animationClass =
                        direction === 1
                            ? "page-exit-to-top"
                            : "page-exit-to-bottom";
                }

                return (
                    <div
                        key={SECTION_IDS[index]}
                        ref={(element) => {
                            pagesRef.current[index] = element;
                        }}
                        className={`
                            section-switcher-page
                            ${isActive ? "is-active" : ""}
                            ${isLeaving ? "is-leaving" : ""}
                            ${animationClass}
                        `}
                        aria-hidden={!isActive}
                        inert={!isActive}
                    >
                        {section}
                    </div>
                );
            })}
        </div>
    );
};

export default SectionSwitcher;
