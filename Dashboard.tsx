import React from 'react';
import { BookOpen, Library, Users, MapPin, Clock, BarChart3, Lightbulb, Plus, Scroll } from 'lucide-react';
import { SeriesData, BookData, MasterCharacter, MasterLocation, LoreElement } from '../App';

interface DashboardProps {
  seriesData: SeriesData | null;
  books: BookData[];
  masterCharacters: MasterCharacter[];
  masterLocations: MasterLocation[];
  loreElements: LoreElement[];
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  seriesData, 
  books, 
  masterCharacters, 
  masterLocations, 
  loreElements, 
  onNavigate 
}) => {
  const menuItems = [
    {
      id: 'series-overview',
      title: 'Series Overview',
      description: 'Define and manage the high-level series concept',
      icon: Library,
      color: 'bg-indigo-600',
      hoverColor: 'hover:bg-indigo-700',
      textColor: 'text-white'
    },
    {
      id: 'manage-books',
      title: 'Manage Books',
      description: 'Add, select, or view individual book files',
      icon: BookOpen,
      color: 'bg-emerald-600',
      hoverColor: 'hover:bg-emerald-700',
      textColor: 'text-white'
    },
    {
      id: 'master-codex',
      title: 'Master Codex',
      description: 'Manage characters, locations, and lore across the series',
      icon: Scroll,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      textColor: 'text-white'
    },
    {
      id: 'master-timeline',
      title: 'Master Timeline',
      description: 'Build and review the chronological timeline',
      icon: Clock,
      color: 'bg-amber-600',
      hoverColor: 'hover:bg-amber-700',
      textColor: 'text-white'
    },
    {
      id: 'series-analysis',
      title: 'Series Analysis',
      description: 'Generate reports on continuity and consistency',
      icon: BarChart3,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'oracle-advice',
      title: "The Oracle's Advice",
      description: 'Receive creative advice and plot suggestions',
      icon: Lightbulb,
      color: 'bg-rose-600',
      hoverColor: 'hover:bg-rose-700',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Library className="w-12 h-12 text-indigo-600" />
          <h2 className="text-4xl font-bold text-slate-900">Series Codex</h2>
        </div>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Your sophisticated AI-powered companion for planning and managing multi-book series. 
          Maintain continuity, develop complex character arcs, and build immersive worlds that span multiple volumes.
        </p>
        {seriesData && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-indigo-900">{seriesData.title}</h3>
            <p className="text-indigo-700 mt-1">{seriesData.logline}</p>
            <p className="text-sm text-indigo-600 mt-2">
              {seriesData.genre} • {seriesData.plannedBooks} planned books
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{books.length}</p>
              <p className="text-sm text-slate-600">Books</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{masterCharacters.length}</p>
              <p className="text-sm text-slate-600">Characters</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <MapPin className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{masterLocations.length}</p>
              <p className="text-sm text-slate-600">Locations</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Scroll className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{loreElements.length}</p>
              <p className="text-sm text-slate-600">Lore Elements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Main Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="group">
              <div 
                className={`${item.color} ${item.hoverColor} ${item.textColor} rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl cursor-pointer`}
                onClick={() => onNavigate(item.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="opacity-90 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {(books.length > 0 || masterCharacters.length > 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[...books, ...masterCharacters].slice(-5).reverse().map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  {'bookNumber' in item ? (
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Users className="w-4 h-4 text-indigo-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    {'title' in item ? item.title : item.name}
                  </p>
                  <p className="text-sm text-slate-600">
                    {'bookNumber' in item ? `Book ${item.bookNumber}` : 'Master Character'}
                  </p>
                </div>
                <span className="text-sm text-slate-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!seriesData && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-300 rounded-xl p-12 text-center">
          <Library className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-indigo-900 mb-2">Welcome to Series Codex</h3>
          <p className="text-indigo-700 mb-6">
            Start by defining your series overview to unlock the full potential of this management system.
          </p>
          <button
            onClick={() => onNavigate('series-overview')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Create Series Overview
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;