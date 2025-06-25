import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Calendar, Flag, Filter, Search, Star, Zap, Heart } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ 
    text: '', 
    category: 'personal', 
    priority: 'medium',
    dueDate: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [confetti, setConfetti] = useState([]);

  const categories = [
    { 
      value: 'personal', 
      label: 'Personal', 
      color: 'from-pink-400 to-purple-500',
      bg: 'bg-gradient-to-r from-pink-100 to-purple-100',
      text: 'text-purple-800',
      icon: '🌟'
    },
    { 
      value: 'work', 
      label: 'Work', 
      color: 'from-blue-400 to-cyan-500',
      bg: 'bg-gradient-to-r from-blue-100 to-cyan-100',
      text: 'text-blue-800',
      icon: '💼'
    },
    { 
      value: 'shopping', 
      label: 'Shopping', 
      color: 'from-green-400 to-emerald-500',
      bg: 'bg-gradient-to-r from-green-100 to-emerald-100',
      text: 'text-green-800',
      icon: '🛒'
    },
    { 
      value: 'health', 
      label: 'Health', 
      color: 'from-red-400 to-pink-500',
      bg: 'bg-gradient-to-r from-red-100 to-pink-100',
      text: 'text-red-800',
      icon: '💪'
    },
    { 
      value: 'education', 
      label: 'Education', 
      color: 'from-yellow-400 to-orange-500',
      bg: 'bg-gradient-to-r from-yellow-100 to-orange-100',
      text: 'text-orange-800',
      icon: '📚'
    }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-emerald-500', bgColor: 'bg-emerald-100', icon: '🐌', emoji: '💚' },
    { value: 'medium', label: 'Medium', color: 'text-amber-500', bgColor: 'bg-amber-100', icon: '🚀', emoji: '💛' },
    { value: 'high', label: 'High', color: 'text-red-500', bgColor: 'bg-red-100', icon: '⚡', emoji: '❤️' }
  ];

  const addTask = () => {
    if (newTask.text.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.text.trim(),
        completed: false,
        category: newTask.category,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        createdAt: new Date().toISOString()
      };
      setTasks([task, ...tasks]);
      setNewTask({ text: '', category: 'personal', priority: 'medium', dueDate: '' });
      
      // Add celebration animation
      createConfetti();
    }
  };

  const createConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          createConfetti();
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(tasks.map(task => 
        task.id === editingId ? { ...task, text: editText.trim() } : task
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date().setHours(0, 0, 0, 0);
  };

  const filteredTasks = tasks.filter(task => {
    if (!showCompleted && task.completed) return false;
    if (filter !== 'all' && task.category !== filter) return false;
    if (searchTerm && !task.text.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed - b.completed;
    }
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length
  };

  const getCategoryData = (category) => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  const getPriorityData = (priority) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti Animation */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-bounce"
          style={{
            backgroundColor: piece.color,
            left: `${piece.left}%`,
            top: '-10px',
            animationDelay: `${piece.delay}s`,
            animationDuration: '3s'
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              ✨ Dream Task Hub ✨
            </h1>
            <p className="text-white text-xl font-medium drop-shadow-md">
              Transform your goals into reality with style! 🚀
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
              <div className="text-blue-100 font-medium">Total Tasks</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-3xl font-bold text-white">{stats.completed}</div>
              <div className="text-green-100 font-medium">Completed</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="text-4xl mb-2">⏳</div>
              <div className="text-3xl font-bold text-white">{stats.pending}</div>
              <div className="text-yellow-100 font-medium">Pending</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-400 to-pink-500 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-white">{stats.overdue}</div>
              <div className="text-red-100 font-medium">Overdue</div>
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-10 border border-white/20">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
            <Star className="text-yellow-500" size={32} />
            Create Your Next Adventure
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <input
                type="text"
                value={newTask.text}
                onChange={(e) => setNewTask({...newTask, text: e.target.value})}
                placeholder="What amazing thing will you accomplish? ✨"
                className="flex-1 px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 outline-none text-lg font-medium transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className="px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 outline-none font-medium transition-all duration-300"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
                ))}
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className="px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 outline-none font-medium transition-all duration-300"
              >
                {priorities.map(p => (
                  <option key={p.value} value={p.value}>{p.emoji} {p.label}</option>
                ))}
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 outline-none font-medium transition-all duration-300"
              />
              <button
                onClick={addTask}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-3 font-bold text-lg shadow-lg transform hover:scale-105"
              >
                <Plus size={24} />
                Add Magic ✨
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-10 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl px-6 py-3">
              <Search size={24} className="text-purple-600" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your dreams..."
                className="bg-transparent outline-none text-lg font-medium text-purple-800 placeholder-purple-500"
              />
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl px-6 py-3">
              <Filter size={24} className="text-blue-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent outline-none text-lg font-medium text-blue-800"
              >
                <option value="all">🌟 All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-pink-100 to-yellow-100 rounded-2xl px-6 py-3 font-medium text-pink-800">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="w-5 h-5 rounded border-pink-300 text-pink-600 focus:ring-pink-500"
              />
              <Heart size={20} className="text-pink-600" />
              Show completed
            </label>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
              <Zap className="text-yellow-500" size={32} />
              Your Epic Quest List ({filteredTasks.length})
            </h2>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🎯</div>
                <p className="text-2xl font-bold text-gray-600 mb-2">
                  {tasks.length === 0 ? "Ready to start your journey?" : "No tasks match your magical filters!"}
                </p>
                <p className="text-lg text-gray-500">
                  {tasks.length === 0 ? "Add your first task above and watch the magic happen! ✨" : "Try adjusting your search or filters 🔍"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map(task => {
                  const categoryData = getCategoryData(task.category);
                  const priorityData = getPriorityData(task.priority);
                  
                  return (
                    <div
                      key={task.id}
                      className={`p-6 border-2 rounded-3xl transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] ${
                        task.completed 
                          ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300' 
                          : isOverdue(task.dueDate)
                          ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300 shadow-red-200'
                          : `bg-gradient-to-r ${categoryData.bg} border-purple-200 shadow-lg`
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className={`w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                            task.completed
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-500 text-white shadow-lg'
                              : 'border-purple-400 hover:border-green-500 bg-white hover:bg-green-50'
                          }`}
                        >
                          {task.completed && <Check size={18} className="font-bold" />}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          {editingId === task.id ? (
                            <div className="flex gap-3">
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 px-4 py-2 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none font-medium"
                                onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                autoFocus
                              />
                              <button
                                onClick={saveEdit}
                                className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl hover:from-green-500 hover:to-emerald-600 transition-all duration-300 shadow-lg"
                              >
                                <Check size={18} />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <span className={`${task.completed ? 'line-through text-gray-500' : categoryData.text} font-bold text-lg`}>
                                  {task.text}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${priorityData.bgColor} ${priorityData.color} flex items-center gap-1`}>
                                  <span>{priorityData.icon}</span>
                                  {priorityData.emoji}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <span className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${categoryData.color} text-white shadow-md flex items-center gap-2`}>
                                  <span className="text-lg">{categoryData.icon}</span>
                                  {categoryData.label}
                                </span>
                                {task.dueDate && (
                                  <span className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium ${
                                    isOverdue(task.dueDate) && !task.completed 
                                      ? 'bg-red-100 text-red-700' 
                                      : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    <Calendar size={16} />
                                    {new Date(task.dueDate).toLocaleDateString()}
                                    {isOverdue(task.dueDate) && !task.completed && (
                                      <span className="text-red-600 font-bold">🔥 OVERDUE</span>
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {editingId !== task.id && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(task.id, task.text)}
                              className="p-3 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-2xl transition-all duration-300 transform hover:scale-110"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-3 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-2xl transition-all duration-300 transform hover:scale-110"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default TodoApp;