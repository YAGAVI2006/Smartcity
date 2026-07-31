import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { 
  MessageSquareWarning, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  ThumbsUp, 
  Filter, 
  X,
  Send,
  ShieldAlert
} from 'lucide-react';

export const ComplaintsView = () => {
  const { complaints, addComplaint, updateComplaintStatus } = useCity();

  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Traffic & Roads',
    sector: 'Downtown',
    priority: 'Medium',
    reporter: '',
    description: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.reporter) return;
    addComplaint(formData);
    setFormData({
      title: '',
      category: 'Traffic & Roads',
      sector: 'Downtown',
      priority: 'Medium',
      reporter: '',
      description: ''
    });
    setIsModalOpen(false);
  };

  const filteredComplaints = complaints.filter(item => {
    if (filterCategory !== 'All' && item.category !== filterCategory) return false;
    if (filterPriority !== 'All' && item.priority !== filterPriority) return false;
    return true;
  });

  const getPriorityBadge = (priority) => {
    if (priority === 'Critical') return 'bg-rose-500/20 text-rose-400 border-rose-500';
    if (priority === 'High') return 'bg-amber-500/20 text-amber-400 border-amber-500';
    if (priority === 'Medium') return 'bg-cyan-500/20 text-cyan-400 border-cyan-500';
    return 'bg-slate-500/20 text-slate-400 border-slate-500';
  };

  const getStatusBadge = (status) => {
    if (status === 'Resolved') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500';
    if (status === 'In Progress') return 'bg-amber-500/20 text-amber-400 border-amber-500';
    return 'bg-slate-500/20 text-slate-300 border-slate-600';
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-rose-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquareWarning className="w-6 h-6 text-rose-400" />
            <span>Citizen Complaints & Civic Portal</span>
          </h2>
          <p className="text-xs text-slate-400">Crowdsourced citizen reporting, municipal ticket routing, and AI triage.</p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          <span>Submit Citizen Complaint Ticket</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card rose">
          <span className="metric-label">Active Tickets</span>
          <div className="metric-val text-rose-400">{complaints.filter(c => c.status !== 'Resolved').length}</div>
          <span className="text-xs text-slate-400 font-mono">Requires field action</span>
        </div>

        <div className="glass-panel metric-card emerald">
          <span className="metric-label">Resolution Rate</span>
          <div className="metric-val text-emerald-400">92.4%</div>
          <span className="text-xs text-slate-400 font-mono">+4% vs last week</span>
        </div>

        <div className="glass-panel metric-card">
          <span className="metric-label">Avg Response Time</span>
          <div className="metric-val text-cyan-400">1.4 Hours</div>
          <span className="text-xs text-slate-400 font-mono">AI Auto-Triage Response</span>
        </div>

        <div className="glass-panel metric-card purple">
          <span className="metric-label">Total Submissions</span>
          <div className="metric-val text-purple-400">{complaints.length}</div>
          <span className="text-xs text-slate-400 font-mono">Logged across 6 sectors</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filter Category:</span>
          </div>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select-glass text-xs py-1"
          >
            <option value="All">All Categories</option>
            <option value="Traffic & Roads">Traffic & Roads</option>
            <option value="Water Infrastructure">Water Infrastructure</option>
            <option value="Electricity Grid">Electricity Grid</option>
            <option value="Waste Management">Waste Management</option>
            <option value="Pollution & Environment">Pollution & Environment</option>
          </select>

          <div className="flex items-center gap-1.5 text-slate-400 ml-2">
            <span>Priority:</span>
          </div>
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="select-glass text-xs py-1"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Showing {filteredComplaints.length} tickets
        </span>
      </div>

      {/* Tickets List */}
      <div className="flex flex-col gap-3">
        {filteredComplaints.map((ticket) => (
          <div 
            key={ticket.id}
            className="glass-panel p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800 hover:border-cyan-500/30 transition"
          >
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-cyan-400 font-bold">{ticket.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${getPriorityBadge(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className="text-xs font-semibold text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                  {ticket.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-rose-400" /> {ticket.sector}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mt-1">{ticket.title}</h4>
              <p className="text-xs text-slate-400">{ticket.description}</p>

              <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 mt-1">
                <span>Reporter: <strong className="text-slate-300">{ticket.reporter}</strong></span>
                <span>Date: {ticket.date}</span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <ThumbsUp className="w-3 h-3" /> {ticket.upvotes} Citizens Confirmed
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-lg text-xs font-mono border font-bold ${getStatusBadge(ticket.status)}`}>
                {ticket.status}
              </span>

              {ticket.status !== 'Resolved' && (
                <div className="flex items-center gap-1">
                  {ticket.status === 'Pending' && (
                    <button 
                      onClick={() => updateComplaintStatus(ticket.id, 'In Progress')}
                      className="px-2.5 py-1 bg-amber-500/10 border border-amber-500 text-amber-300 hover:bg-amber-500/20 rounded-lg text-xs font-mono"
                    >
                      Assign Field Unit
                    </button>
                  )}
                  <button 
                    onClick={() => updateComplaintStatus(ticket.id, 'Resolved')}
                    className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 rounded-lg text-xs font-mono flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Ticket Modal */}
      {isModalOpen && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-content">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                Submit New Citizen Issue Ticket
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-xs font-mono">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Issue Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Water leak near central park" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-glass"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="select-glass w-full"
                  >
                    <option value="Traffic & Roads">Traffic & Roads</option>
                    <option value="Water Infrastructure">Water Infrastructure</option>
                    <option value="Electricity Grid">Electricity Grid</option>
                    <option value="Waste Management">Waste Management</option>
                    <option value="Pollution & Environment">Pollution & Environment</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">District / Sector</label>
                  <select 
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="select-glass w-full"
                  >
                    <option value="Downtown">Downtown</option>
                    <option value="Tech Park">Tech Park</option>
                    <option value="Residential">Residential Bay</option>
                    <option value="Industrial">Industrial Hub</option>
                    <option value="Eco Park">Eco Park</option>
                    <option value="Harbor">Harbor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Priority (AI Suggested)</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="select-glass w-full"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Reporter Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your Name" 
                    value={formData.reporter}
                    onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
                    className="input-glass"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Issue Description & Location Context</label>
                <textarea 
                  rows="3"
                  placeholder="Provide precise location or observations..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-glass"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
