import React, { useEffect, useMemo, useState } from "react";
import './Practical_1.css';

// Functional clock with different layout/style so it doesn't look copied
export default function Practical_1(){
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const parts = useMemo(() => {
        const dateFmt = new Intl.DateTimeFormat(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        const timeFmt = new Intl.DateTimeFormat(undefined, {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        return {
            date: dateFmt.format(now),
            time: timeFmt.format(now)
        };
    }, [now]);

    return (
        <div className="practical1-container alt">
            <header className="practical1-title">
                <strong>Student Clock — Mittal Domadiya (D24CS122)</strong>
            </header>
            <div className="clock-cards">
                <div className="card date">
                    <span className="label">Today</span>
                    <span className="value">{parts.date}</span>
                </div>
                <div className="card time">
                    <span className="label">Local Time</span>
                    <span className="value">{parts.time}</span>
                </div>
            </div>
        </div>
    );
}
