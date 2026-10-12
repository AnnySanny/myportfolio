
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import SectionSwitcher from "./components/SectionSwitcher";

function App() {
    return (
        <div
            className="
                h-[100svh] overflow-hidden
                bg-white text-slate-900
                dark:bg-[#0A0A0A]
                dark:text-white
            "
        >
            <Navbar />

            <main>
                <SectionSwitcher>
                    <Hero />
                    <About />
                    <Projects />
                    <Pricing />

                    <div className="min-h-full bg-white dark:bg-[#0A0A0A]">
                        <Contact />
                    </div>
                </SectionSwitcher>
            </main>
        </div>
    );
}

export default App;
