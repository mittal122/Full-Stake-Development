import { useEffect, useMemo, useState } from "react";
import "../assets/todo.css";

export default function Todo(){
  const STORAGE_KEY = 'todo-v2';
  const [tasks, setTasks] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch{ return []; }
  }); // [{id, text, done}]
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState('all'); // all|active|done
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const t = newTask.trim();
    if(!t) return;
    setTasks(prev => [{ id: Date.now(), text: t, done: false }, ...prev]);
    setNewTask('');
  };
  const onNewKey = (e) => {
    if(e.key === 'Enter') addTask();
  };

  const toggleDone = (id) => setTasks(prev => prev.map(it => it.id === id ? { ...it, done: !it.done } : it));
  const deleteTask = (id) => setTasks(prev => prev.filter(it => it.id !== id));

  const startEditing = (id, text) => { setEditingId(id); setEditingText(text); };
  const cancelEdit = () => { setEditingId(null); setEditingText(''); };
  const saveEdit = () => {
    const t = editingText.trim();
    if(!t) return;
    setTasks(prev => prev.map(it => it.id === editingId ? { ...it, text: t } : it));
    cancelEdit();
  };
  const onEditKey = (e) => {
    if(e.key === 'Enter') saveEdit();
    else if(e.key === 'Escape') cancelEdit();
  };

  const clearCompleted = () => setTasks(prev => prev.filter(it => !it.done));
  const markAllDone = () => setTasks(prev => prev.map(it => ({...it, done:true})));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter(it => {
      const match = !q || it.text.toLowerCase().includes(q);
      const keep = filter === 'all' || (filter === 'active' ? !it.done : it.done);
      return match && keep;
    });
  }, [tasks, filter, query]);

  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const pct = total === 0 ? 0 : Math.round((completed/total)*100);

  return (
    <div className="todo-page">
      <header className="todo-header">
        <h1>Todo Manager — Mittal Domadiya (D24CS122)</h1>
        <p className="subtitle">Filters, search, progress, and persistence</p>
      </header>

      <div className="todo-card">
        <div className="top-row">
          <div className="add-box">
            <input
              className="new-input"
              type="text"
              placeholder="Add a new task and press Enter"
              value={newTask}
              onChange={(e)=>setNewTask(e.target.value)}
              onKeyDown={onNewKey}
            />
            <button className="btn primary" onClick={addTask}>Add</button>
          </div>
          <div className="filters">
            <button className={`chip ${filter==='all'?'active':''}`} onClick={()=>setFilter('all')}>All</button>
            <button className={`chip ${filter==='active'?'active':''}`} onClick={()=>setFilter('active')}>Active</button>
            <button className={`chip ${filter==='done'?'active':''}`} onClick={()=>setFilter('done')}>Done</button>
          </div>
          <div className="search-box">
            <input
              type="search"
              placeholder="Search tasks..."
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <span style={{width: pct + '%'}} />
          <div className="progress-info">{completed} of {total} done • {pct}%</div>
        </div>

        <ul className="list">
          {filtered.map(item => (
            <li className={`item ${item.done? 'done':''}`} key={item.id}>
              <label className="left">
                <input type="checkbox" checked={item.done} onChange={()=>toggleDone(item.id)} />
                {editingId === item.id ? (
                  <input
                    className="edit-input"
                    value={editingText}
                    onChange={(e)=>setEditingText(e.target.value)}
                    onKeyDown={onEditKey}
                    autoFocus
                  />
                ) : (
                  <span className="text" onDoubleClick={()=>startEditing(item.id, item.text)}>{item.text}</span>
                )}
              </label>
              <div className="right">
                {editingId === item.id ? (
                  <>
                    <button className="btn save" onClick={saveEdit}>Save</button>
                    <button className="btn ghost" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn" onClick={()=>startEditing(item.id, item.text)}>Edit</button>
                    <button className="btn danger" onClick={()=>deleteTask(item.id)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="empty">No tasks match your filters.</li>
          )}
        </ul>

        <div className="bulk">
          <button className="btn" onClick={markAllDone}>Mark all done</button>
          <button className="btn danger" onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>

      <footer className="todo-footer">Built by Mittal Domadiya (D24CS122)</footer>
    </div>
  );
}
