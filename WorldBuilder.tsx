import React, { useState } from 'react';
import { ArrowLeft, Globe, Sparkles, BookOpen, Clock } from 'lucide-react';
import { WorldEntry } from '../App';

interface WorldBuilderProps {
  onAddEntry: (entry: WorldEntry) => void;
  onBack: () => void;
}

const WorldBuilder: React.FC<WorldBuilderProps> = ({ onAddEntry, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    worldType: '',
    keyElements: '',
    loreHistory: ''
  });
  const [feedback, setFeedback] = useState<string>('');

  const worldTypes = [
    'High Fantasy', 'Low Fantasy', 'Science Fiction', 'Cyberpunk', 'Steampunk',
    'Post-Apocalyptic', 'Modern Fantasy', 'Historical Fiction', 'Space Opera',
    'Dystopian', 'Utopian', 'Alternate History', 'Contemporary', 'Medieval'
  ];

  const generateFeedback = (data: typeof formData) => {
    const feedbacks = [
      `The concept of a ${data.worldType.toLowerCase()} world called "${data.name}" is intriguing. How do the inhabitants adapt to the unique challenges of this environment?`,
      `"${data.name}" sounds like a fascinating setting. What conflicts might arise from the key elements you've described?`,
      `The world-building details for "${data.name}" create rich storytelling opportunities. Consider what daily life looks like for ordinary people in this world.`,
      `Your ${data.worldType.toLowerCase()} world has strong potential. What are the unspoken rules that govern society in "${data.name}"?`,
      `The historical elements you've outlined suggest deep lore. What ancient mysteries or forgotten knowledge might characters discover?`
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.worldType) return;

    const newWorld: WorldEntry = {
      id: Date.now().toString(),
      type: 'world',
      ...formData,
      createdAt: new Date()
    };

    onAddEntry(newWorld);
    setFeedback(generateFeedback(formData));
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: '', worldType: '', keyElements: '', loreHistory: '' });
      setFeedback('');
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex items-center space-x-3">
          <Globe className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-900">World Builder</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2" />
                World Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter the name of your world..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Sparkles className="w-4 h-4 inline mr-2" />
                World Type *
              </label>
              <select
                value={formData.worldType}
                onChange={(e) => handleChange('worldType', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a type...</option>
                {worldTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Key Elements
              </label>
              <textarea
                value={formData.keyElements}
                onChange={(e) => handleChange('keyElements', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows={4}
                placeholder="Magic systems, technology, unique features, geography, climate, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Lore & History
              </label>
              <textarea
                value={formData.loreHistory}
                onChange={(e) => handleChange('loreHistory', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows={4}
                placeholder="Ancient civilizations, important events, founding myths, wars, discoveries..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Create World
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {feedback && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Creative Insight</h3>
              <p className="text-blue-800">{feedback}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">World-Building Tips</h3>
            <ul className="space-y-2 text-amber-800">
              <li>• Consider how geography shapes culture and society</li>
              <li>• Develop consistent rules for magic or technology</li>
              <li>• Think about economic systems and trade relationships</li>
              <li>• Create conflicts that drive interesting stories</li>
              <li>• Consider how history influences current events</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3">Essential Questions</h3>
            <ul className="space-y-2 text-emerald-800">
              <li>• What makes this world unique and memorable?</li>
              <li>• How do different cultures interact and conflict?</li>
              <li>• What are the major power structures?</li>
              <li>• What mysteries or secrets exist in this world?</li>
              <li>• How do ordinary people live their daily lives?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldBuilder;