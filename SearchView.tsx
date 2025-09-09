import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Globe, Users, Edit2, Trash2, Eye, Calendar } from 'lucide-react';
import { ProjectEntry, WorldEntry, CharacterEntry } from '../App';

interface SearchViewProps {
  entries: ProjectEntry[];
  onUpdateEntry: (id: string, updatedEntry: Partial<ProjectEntry>) => void;
  onDeleteEntry: (id: string) => void;
  onBack: () => void;
}

const SearchView: React.FC<SearchViewProps> = ({ entries, onUpdateEntry, onDeleteEntry, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'world' | 'character'>('all');
  const [selectedEntry, setSelectedEntry] = useState<ProjectEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.type === 'world' && (entry as WorldEntry).worldType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (entry.type === 'character' && (entry as CharacterEntry).role.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || entry.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDeleteEntry(id);
      if (selectedEntry?.id === id) {
        setSelectedEntry(null);
      }
    }
  };

  const EntryCard: React.FC<{ entry: ProjectEntry }> = ({ entry }) => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${entry.type === 'world' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
            {entry.type === 'world' ? (
              <Globe className={`w-5 h-5 ${entry.type === 'world' ? 'text-blue-600' : 'text-emerald-600'}`} />
            ) : (
              <Users className={`w-5 h-5 ${entry.type === 'world' ? 'text-blue-600' : 'text-emerald-600'}`} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">{entry.name}</h3>
            <p className="text-sm text-slate-600 capitalize">
              {entry.type === 'world' 
                ? `${entry.type} • ${(entry as WorldEntry).worldType}`
                : `${entry.type} • ${(entry as CharacterEntry).role}`
              }
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedEntry(entry)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedEntry(entry);
              setIsEditing(true);
            }}
            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(entry.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const EntryDetail: React.FC<{ entry: ProjectEntry }> = ({ entry }) => {
    if (entry.type === 'world') {
      const world = entry as WorldEntry;
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Globe className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{world.name}</h2>
              <p className="text-slate-600">{world.worldType} World</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Key Elements</h3>
              <p className="text-slate-700">{world.keyElements || 'No key elements defined yet.'}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Lore & History</h3>
              <p className="text-slate-700">{world.loreHistory || 'No lore or history defined yet.'}</p>
            </div>
          </div>
        </div>
      );
    } else {
      const character = entry as CharacterEntry;
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-emerald-600" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{character.name}</h2>
              <p className="text-slate-600">{character.role}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Motivation & Goal</h3>
              <p className="text-slate-700">{character.motivation || 'No motivation defined yet.'}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Personality Profile</h3>
              <div className="space-y-3">
                {Object.entries(character.personality).map(([trait, value]) => (
                  <div key={trait} className="flex justify-between items-center">
                    <span className="capitalize font-medium text-slate-700">
                      {trait === 'neuroticism' ? 'Emotional Stability' : trait}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-emerald-600 w-6">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {character.personalityAnalysis && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Personality Analysis</h3>
                <p className="text-slate-700">{character.personalityAnalysis}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex items-center space-x-3">
          <Search className="w-8 h-8 text-slate-600" />
          <h2 className="text-3xl font-bold text-slate-900">Search & View Entries</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entries by name, type, or role..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-slate-500" />
                <div className="flex space-x-2">
                  {['all', 'world', 'character'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type as any)}
                      className={`px-3 py-2 rounded-lg font-medium capitalize transition-all ${
                        filterType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">
                Results ({filteredEntries.length})
              </h3>
            </div>
            
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No entries found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredEntries.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className="space-y-6">
          {selectedEntry ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <EntryDetail entry={selectedEntry} />
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
              <Eye className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Select an entry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchView;