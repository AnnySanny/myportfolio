
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

const ANIMATION_DURATION = 750;
const NAVBAR_HEIGHT = 72;
const SECTION_TITLES = [
    "Головна",
    "Про мене",
    "Мої проєкти",
    "Вартість розробки",
    "Контакти",
];

const SITE_TITLE = "Портфоліо веброзробника";
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

            // Повертаємо нову секцію на початок
            if (pagesRef.current[nextIndex]) {
                pagesRef.current[nextIndex].scrollTop = 0;
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
    useEffect(() => {
        const sectionTitle =
            SECTION_TITLES[activeIndex] || "Головна";

        document.title = `${sectionTitle} | ${SITE_TITLE}`;
    }, [activeIndex]);
    useEffect(() => {
        const handleWheel = (event) => {
            const page = pagesRef.current[activeRef.current];

            if (!page) return;

            const { scrollTop, scrollHeight, clientHeight } = page;

            const canScrollDown =
                scrollTop + clientHeight < scrollHeight - 2;

            const canScrollUp = scrollTop > 2;

            // Якщо всередині секції ще є контент,
            // спочатку прокручуємо його
            if (
                (event.deltaY > 0 && canScrollDown) ||
                (event.deltaY < 0 && canScrollUp)
            ) {
                return;
            }

            event.preventDefault();

            if (lockedRef.current) return;
            if (Math.abs(event.deltaY) < 15) return;

            navigateTo(
                activeRef.current + (event.deltaY > 0 ? 1 : -1)
            );
        };

        const handleTouchStart = (event) => {
            touchStartRef.current = event.touches[0].clientY;
        };

        const handleTouchEnd = (event) => {
            if (touchStartRef.current === null) return;

            const delta =
                touchStartRef.current -
                event.changedTouches[0].clientY;

            touchStartRef.current = null;

            if (Math.abs(delta) < 60) return;

            const page = pagesRef.current[activeRef.current];

            if (!page) return;

            const { scrollTop, scrollHeight, clientHeight } = page;

            const canScrollDown =
                scrollTop + clientHeight < scrollHeight - 2;

            const canScrollUp = scrollTop > 2;

            if (
                (delta > 0 && canScrollDown) ||
                (delta < 0 && canScrollUp)
            ) {
                return;
            }

            navigateTo(
                activeRef.current + (delta > 0 ? 1 : -1)
            );
        };

        const handleClick = (event) => {
            const link = event.target.closest('a[href^="#"]');

            if (!link) return;

            const id = link.getAttribute("href").slice(1);
            const index = SECTION_IDS.indexOf(id);

            if (index < 0) return;

            event.preventDefault();
            navigateTo(index);
        };

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

        window.addEventListener("touchstart", handleTouchStart, {
            passive: true,
        });

        window.addEventListener("touchend", handleTouchEnd, {
            passive: true,
        });

        document.addEventListener("click", handleClick);
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
            document.removeEventListener("click", handleClick);
            window.removeEventListener("hashchange", handleHashChange);

            clearTimeout(timeoutRef.current);
        };
    }, [navigateTo]);

    return (
        <div
            className="section-switcher"
            style={{ "--navbar-height": `${NAVBAR_HEIGHT}px` }}
        >
            {sections.map((section, index) => {
                const isActive = index === activeIndex;
                const isLeaving = index === previousIndex;

                let animationClass = "";

                if (isActive && previousIndex !== null) {
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
