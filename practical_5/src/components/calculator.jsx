import { useEffect, useMemo, useState } from "react";
import "../assets/calculator.css";

export default function Calculator() {
    const [expr, setExpr] = useState("");
    const [history, setHistory] = useState([]); // {expr, result, time}
    const [theme, setTheme] = useState("dark");

    const sanitize = (s) => s
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("−", "-");

    const safeEval = (s) => {
        const x = sanitize(s);
        if (!x) throw new Error("empty");
        if (!/^[0-9+\-*/().\s]+$/.test(x)) throw new Error("bad");
        // Using Function to evaluate arithmetic only
        // eslint-disable-next-line no-new-func
        return Function(`"use strict"; return (${x})`)();
    };

    const preview = useMemo(() => {
        try {
            if (!expr.trim()) return "";
            const val = safeEval(expr);
            if (Number.isFinite(val)) return String(val);
            return "";
        } catch {
            return "";
        }
    }, [expr]);

    const append = (val) => setExpr((p) => p + val);
    const clearAll = () => setExpr("");
    const del = () => setExpr((p) => p.slice(0, -1));

    const calculate = () => {
        try {
            const res = safeEval(expr);
            const time = new Date().toLocaleTimeString();
            const resultStr = String(res);
            setHistory((h) => [{ expr, result: resultStr, time }, ...h].slice(0, 5));
            setExpr(resultStr); // continue calculation from result
        } catch {
            setExpr("Error");
            setTimeout(() => setExpr(""), 900);
        }
    };

    useEffect(() => {
        const onKey = (e) => {
            const k = e.key;
            if (/^[0-9.+\-*/() ]$/.test(k)) {
                append(k);
            } else if (k === "Enter") {
                e.preventDefault();
                calculate();
            } else if (k === "Backspace") {
                del();
            } else if (k === "Escape") {
                clearAll();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [expr]);

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return (
        <div className={`calc-page theme-${theme}`}>
            <div className="calc">
                <header className="calc-header">
                    <h1>Calculator — Mittal Domadiya (D24CS122)</h1>
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                </header>

                <div className="display">
                    <div className="expr" title={expr || "0"}>{expr || "0"}</div>
                    <div className="preview" aria-live="polite">{preview ? `= ${preview}` : ''}</div>
                </div>

                <div className="keys">
                    <button className="key op" onClick={() => append("(")}>(</button>
                    <button className="key op" onClick={() => append(")")}>)</button>
                    <button className="key warn" onClick={del}>DEL</button>
                    <button className="key danger" onClick={clearAll}>AC</button>

                    <button className="key" onClick={() => append("7")}>7</button>
                    <button className="key" onClick={() => append("8")}>8</button>
                    <button className="key" onClick={() => append("9")}>9</button>
                    <button className="key op" onClick={() => append("÷")}>÷</button>

                    <button className="key" onClick={() => append("4")}>4</button>
                    <button className="key" onClick={() => append("5")}>5</button>
                    <button className="key" onClick={() => append("6")}>6</button>
                    <button className="key op" onClick={() => append("×")}>×</button>

                    <button className="key" onClick={() => append("1")}>1</button>
                    <button className="key" onClick={() => append("2")}>2</button>
                    <button className="key" onClick={() => append("3")}>3</button>
                    <button className="key op" onClick={() => append("−")}>−</button>

                    <button className="key zero" onClick={() => append("0")}>0</button>
                    <button className="key" onClick={() => append(".")}>.</button>
                    <button className="key op" onClick={() => append("+")}>+</button>
                    <button className="key equals" onClick={calculate}>=</button>
                </div>

                <section className="history" aria-label="History (last 5)">
                    <div className="history-title">History (last 5)</div>
                    {history.length === 0 && <div className="history-empty">No history yet</div>}
                    {history.map((h, i) => (
                        <button key={i} className="history-item" onClick={() => setExpr(h.expr)}>
                            <span className="time">{h.time}</span>
                            <span className="eq">{h.expr} = <strong>{h.result}</strong></span>
                        </button>
                    ))}
                </section>

                <footer className="byline">Built for FSD Practical — Mittal Domadiya (D24CS122)</footer>
            </div>
        </div>
    );
}