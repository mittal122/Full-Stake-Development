import React, { useMemo, useState } from 'react';
import './HookCount.css';

// A distinct Hooks playground: step slider, clamped counter with progress, and name badge
const HookCount = () => {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);
    const [name, setName] = useState({ firstName: '', lastName: '' });

    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    const inc = () => setCount(prev => clamp(prev + step, 0, 100));
    const dec = () => setCount(prev => clamp(prev - step, 0, 100));
    const reset = () => setCount(0);

    const pct = useMemo(() => Math.round((count / 100) * 100), [count]);
    const milestone = useMemo(() => {
        if (count === 0) return 'Start the journey';
        if (count < 25) return 'Getting started';
        if (count < 50) return 'Warming up';
        if (count < 75) return 'Halfway there';
        if (count < 100) return 'Almost done';
        return 'Completed!';
    }, [count]);

    return (
        <div className="hooks-page">
            <header className="hooks-header">
                <h1>Hooks Playground — Mittal Domadiya (D24CS122)</h1>
                <p className="subtitle">Smart Counter and Live Name Badge</p>
            </header>

            <div className="cards">
                {/* Counter Card */}
                <section className="card counter-card" aria-label="Smart counter">
                    <div className="count-display" aria-live="polite">{count}</div>

                    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
                        <span style={{width: pct + '%'}} />
                    </div>
                    <p className="milestone">{milestone} • {pct}%</p>

                    <div className="controls">
                        <button className="btn" onClick={dec} aria-label="Decrement">− Step</button>
                        <button className="btn primary" onClick={inc} aria-label="Increment">+ Step</button>
                        <button className="btn ghost" onClick={reset} aria-label="Reset">Reset</button>
                    </div>

                    <div className="step-control">
                        <label htmlFor="step">Step: <strong>{step}</strong></label>
                        <input id="step" type="range" min={1} max={10} value={step} onChange={e => setStep(Number(e.target.value))} />
                    </div>
                </section>

                {/* Name Card */}
                <section className="card name-card" aria-label="Name badge">
                    <h2 className="card-title">Live Name Preview</h2>
                    <div className="input-row">
                        <label htmlFor="first">First name</label>
                        <input id="first" placeholder="e.g., Mittal" value={name.firstName} onChange={e => setName({...name, firstName: e.target.value})} />
                    </div>
                    <div className="input-row">
                        <label htmlFor="last">Last name</label>
                        <input id="last" placeholder="e.g., Domadiya" value={name.lastName} onChange={e => setName({...name, lastName: e.target.value})} />
                    </div>

                    <div className="badge">
                        <span className="initials">{(name.firstName[0]||'').toUpperCase()}{(name.lastName[0]||'').toUpperCase()}</span>
                        <div className="details">
                            <div className="full">{name.firstName || 'First'} {name.lastName || 'Last'}</div>
                            <div className="id">ID: D24CS122</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HookCount;