import React, { useState } from 'react';
import { ArrowLeft, Library, Save, Sparkles } from 'lucide-react';
import { SeriesData } from '../App';

interface SeriesOverviewProps {
  seriesData: SeriesData | null;
  onUpdateSeries: (data: SeriesData) => void;
  onBack: () => void;
}

const SeriesOverview: React.FC<SeriesOverviewProps> = ({ seriesData, onUpdateSeries, onBack }) => {
  const [formData, setFormData] = useState({
    title: seriesData?.title || '',
    genre: seriesData?.genre || '',
    logline: seriesData?.logline || '',
    plannedBooks: seriesData?.plannedBooks || 3,
    interconnectionStyle: seriesData?.interconnectionStyle || '',
    protagonistArc: seriesData?.protagonistArc || ''
  });

  const genres = [
    'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Historical Fiction',
    'Contemporary Fiction', 'Young Adult', 'Urban Fantasy', 'Space Opera', 'Cyberpunk',
    'Steampunk', 'Post-Apocalyptic', 'Dystopian', 'Literary Fiction', 'Horror'
  ];

  const interconnectionStyles = [
    'Standalone novels with shared world and recurring characters',
    'Sequential saga with continuous overarching plot',
    'Anthology series with thematic connections',
    'Character-focused series following the same protagonist',
    'Multi-generational saga spanning different time periods',
    'Parallel storylines that converge in later books'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.genre || !formData.logline) return;

    const seriesEntry: SeriesData = {
      id: seriesData?.id || Date.now().toString(),
      ...formData,
      createdAt: seriesData?.createdAt || new Date()
    };

    onUpdateSeries(seriesEntry);
  };

  const handleChange = (field: string, value: string | number) => {
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
          <Library className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-slate-900">Series Overview</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Series Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your series title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Overall Genre *
              </label>
              <select
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a genre...</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Series Logline *
              </label>
              <textarea
                value={formData.logline}
                onChange={(e) => handleChange('logline', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                rows={3}
                placeholder="A one-sentence summary of the entire series arc..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Planned Books
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.plannedBooks}
                onChange={(e) => handleChange('plannedBooks', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interconnection Style
              </label>
              <select
                value={formData.interconnectionStyle}
                onChange={(e) => handleChange('interconnectionStyle', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="">Select interconnection style...</option>
                {interconnectionStyles.map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Protagonist's Overall Arc
              </label>
              <textarea
                value={formData.protagonistArc}
                onChange={(e) => handleChange('protagonistArc', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                rows={4}
                placeholder="How will the protagonist change from the beginning to the end of the series?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{seriesData ? 'Update Series' : 'Create Series'}</span>
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-3">
              <Sparkles className="w-5 h-5 inline mr-2" />
              Series Planning Tips
            </h3>
            <ul className="space-y-2 text-indigo-800">
              <li>• Your logline should capture the central conflict of the entire series</li>
              <li>• Consider how each book will advance the overarching narrative</li>
              <li>• Plan character growth that spans multiple volumes</li>
              <li>• Think about how your world will evolve throughout the series</li>
              <li>• Balance standalone satisfaction with series continuity</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">Interconnection Styles</h3>
            <div className="space-y-3 text-amber-800 text-sm">
              <div>
                <strong>Sequential Saga:</strong> Each book directly continues the previous story
              </div>
              <div>
                <strong>Standalone Series:</strong> Each book is complete but shares world/characters
              </div>
              <div>
                <strong>Anthology:</strong> Connected by theme, setting, or recurring elements
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3">Essential Questions</h3>
            <ul className="space-y-2 text-emerald-800">
              <li>• What is the central question your series explores?</li>
              <li>• How will your protagonist be different at the end?</li>
              <li>• What major events will shape the series arc?</li>
              <li>• How do individual book conflicts serve the larger story?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesOverview;