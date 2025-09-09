import React from 'react';
import { ArrowLeft, BarChart3, Globe, Users, Calendar, TrendingUp, Target } from 'lucide-react';
import { ProjectEntry, WorldEntry, CharacterEntry } from '../App';

interface StatusUpdateProps {
  entries: ProjectEntry[];
  onBack: () => void;
}

const StatusUpdate: React.FC<StatusUpdateProps> = ({ entries, onBack }) => {
  const worldEntries = entries.filter(entry => entry.type === 'world') as WorldEntry[];
  const characterEntries = entries.filter(entry => entry.type === 'character') as CharacterEntry[];

  // Calculate project statistics
  const totalEntries = entries.length;
  const recentEntries = entries.filter(entry => {
    const entryDate = new Date(entry.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  });

  const worldTypes = worldEntries.reduce((acc, world) => {
    acc[world.worldType] = (acc[world.worldType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const characterRoles = characterEntries.reduce((acc, character) => {
    acc[character.role] = (acc[character.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averagePersonality = characterEntries.length > 0 ? {
    openness: Math.round((characterEntries.reduce((sum, char) => sum + char.personality.openness, 0) / characterEntries.length) * 10) / 10,
    conscientiousness: Math.round((characterEntries.reduce((sum, char) => sum + char.personality.conscientiousness, 0) / characterEntries.length) * 10) / 10,
    extraversion: Math.round((characterEntries.reduce((sum, char) => sum + char.personality.extraversion, 0) / characterEntries.length) * 10) / 10,
    agreeableness: Math.round((characterEntries.reduce((sum, char) => sum + char.personality.agreeableness, 0) / characterEntries.length) * 10) / 10,
    neuroticism: Math.round((characterEntries.reduce((sum, char) => sum + char.personality.neuroticism, 0) / characterEntries.length) * 10) / 10,
  } : null;

  const getProjectInsights = () => {
    const insights = [];
    
    if (worldEntries.length === 0) {
      insights.push("Consider creating a world to establish the setting for your characters.");
    }
    
    if (characterEntries.length === 0) {
      insights.push("Add some characters to populate your creative world.");
    }
    
    if (characterEntries.length > 0 && worldEntries.length > 0) {
      insights.push("Great balance! You have both worlds and characters to develop rich stories.");
    }
    
    if (characterEntries.length > worldEntries.length * 3) {
      insights.push("You have many characters - consider how they interact across different worlds or locations.");
    }
    
    if (recentEntries.length >= 3) {
      insights.push("You've been very productive recently! Your creative momentum is strong.");
    }
    
    return insights;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-slate-900">Project Status</h2>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{totalEntries}</p>
              <p className="text-sm text-slate-600">Total Entries</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Globe className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{worldEntries.length}</p>
              <p className="text-sm text-slate-600">Worlds Created</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{characterEntries.length}</p>
              <p className="text-sm text-slate-600">Characters Developed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{recentEntries.length}</p>
              <p className="text-sm text-slate-600">Recent (7 days)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* World Analysis */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              <Globe className="w-5 h-5 inline mr-2" />
              World Types Distribution
            </h3>
            {Object.keys(worldTypes).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(worldTypes).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-slate-700">{type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(count / worldEntries.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-blue-600 w-6">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No worlds created yet</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              <Users className="w-5 h-5 inline mr-2" />
              Character Roles
            </h3>
            {Object.keys(characterRoles).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(characterRoles).map(([role, count]) => (
                  <div key={role} className="flex justify-between items-center">
                    <span className="text-slate-700">{role}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${(count / characterEntries.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-emerald-600 w-6">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No characters created yet</p>
            )}
          </div>
        </div>

        {/* Character Analysis */}
        <div className="space-y-6">
          {averagePersonality && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Average Character Personality
              </h3>
              <div className="space-y-3">
                {Object.entries(averagePersonality).map(([trait, value]) => (
                  <div key={trait} className="flex justify-between items-center">
                    <span className="capitalize text-slate-700">
                      {trait === 'neuroticism' ? 'Emotional Stability' : trait}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-purple-600 w-8">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">
              <Target className="w-5 h-5 inline mr-2" />
              Project Insights
            </h3>
            <ul className="space-y-2">
              {getProjectInsights().map((insight, index) => (
                <li key={index} className="text-amber-800 flex items-start space-x-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              <Calendar className="w-5 h-5 inline mr-2" />
              Recent Activity
            </h3>
            {entries.length > 0 ? (
              <div className="space-y-2">
                {entries.slice(-5).reverse().map((entry) => (
                  <div key={entry.id} className="flex justify-between items-center text-sm">
                    <span className="text-blue-800">{entry.name}</span>
                    <span className="text-blue-600">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-blue-800 italic">No entries created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdate;