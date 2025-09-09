import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, Send, Brain, Zap, MessageCircle } from 'lucide-react';
import { ProjectEntry, WorldEntry, CharacterEntry } from '../App';

interface AdviceEngineProps {
  entries: ProjectEntry[];
  onBack: () => void;
}

const AdviceEngine: React.FC<AdviceEngineProps> = ({ entries, onBack }) => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState<Array<{ query: string; response: string; timestamp: Date }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAdvice = async (userQuery: string) => {
    setIsGenerating(true);
    
    // Simulate AI response generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const worldEntries = entries.filter(entry => entry.type === 'world') as WorldEntry[];
    const characterEntries = entries.filter(entry => entry.type === 'character') as CharacterEntry[];
    
    let response = '';
    
    // Analyze query and generate contextual advice
    if (userQuery.toLowerCase().includes('conflict') && characterEntries.length >= 2) {
      const chars = characterEntries.slice(0, 2);
      response = `Based on your characters ${chars[0].name} and ${chars[1].name}, potential conflicts could arise from their different personality traits. ${chars[0].name} has ${chars[0].personality.agreeableness >= 4 ? 'high' : 'low'} agreeableness while ${chars[1].name} has ${chars[1].personality.agreeableness >= 4 ? 'high' : 'low'} agreeableness. This ${chars[0].personality.agreeableness !== chars[1].personality.agreeableness ? 'difference' : 'similarity'} could create interesting tension in their relationship.`;
    } else if (userQuery.toLowerCase().includes('plot') && worldEntries.length > 0 && characterEntries.length > 0) {
      const world = worldEntries[0];
      const character = characterEntries[0];
      response = `In your ${world.worldType} world "${world.name}", ${character.name} could face challenges related to the key elements you've established: ${world.keyElements}. Consider how ${character.name}'s motivation (${character.motivation}) might conflict with the world's established rules or power structures.`;
    } else if (userQuery.toLowerCase().includes('character development')) {
      if (characterEntries.length > 0) {
        const char = characterEntries[0];
        response = `For ${char.name}, consider developing their arc around their ${char.personality.neuroticism >= 4 ? 'emotional sensitivity' : 'emotional stability'}. Their role as ${char.role} combined with their goal of "${char.motivation}" suggests they'll need to overcome internal conflicts related to their personality traits.`;
      } else {
        response = "To develop compelling characters, start with their core motivation and then create personality traits that both help and hinder their journey. Consider the Big Five personality model to create well-rounded, believable characters.";
      }
    } else if (userQuery.toLowerCase().includes('world building') || userQuery.toLowerCase().includes('worldbuilding')) {
      if (worldEntries.length > 0) {
        const world = worldEntries[0];
        response = `For "${world.name}", consider expanding on how the key elements (${world.keyElements}) affect daily life. Think about: What conflicts arise from your world's unique features? How do different social classes interact? What are the unspoken rules of this society?`;
      } else {
        response = "Effective world-building starts with one unique element and explores its implications. Ask yourself: How does this change society, technology, politics, and daily life? Every fantasy or sci-fi element should have logical consequences that ripple through your world.";
      }
    } else if (userQuery.toLowerCase().includes('motivation') && characterEntries.length > 0) {
      const char = characterEntries[0];
      response = `${char.name}'s motivation "${char.motivation}" is compelling, but consider adding layers. What's their surface want versus their deeper need? What are they afraid of losing? Strong characters have motivations that create internal conflict and drive external action.`;
    } else {
      // Generic creative advice
      const adviceTemplates = [
        "Great stories come from characters who want something badly but face obstacles that force them to grow. What does your protagonist truly need (versus what they think they want)?",
        "Consider the 'what if' question at the heart of your story. Push it to extremes to find the most interesting conflicts and dilemmas for your characters.",
        "Every character should have secrets, flaws, and contradictions. These elements create depth and make characters feel human and relatable.",
        "Your world's rules should create both opportunities and limitations for your characters. The best conflicts arise when characters must choose between competing values or desires.",
        "Think about the theme of your story. What question about life, society, or human nature are you exploring? Let this guide your character arcs and plot development."
      ];
      response = adviceTemplates[Math.floor(Math.random() * adviceTemplates.length)];
    }
    
    setResponses(prev => [...prev, { query: userQuery, response, timestamp: new Date() }]);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    generateAdvice(query);
    setQuery('');
  };

  const suggestedQueries = [
    "What conflicts could arise between my characters?",
    "How can I develop my character's personality further?",
    "What plot possibilities exist in my world?",
    "How do I create compelling character arcs?",
    "What world-building elements should I expand?",
    "How do I make my characters more relatable?"
  ];

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
          <Lightbulb className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-slate-900">Advice Engine</h2>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">
          <Brain className="w-5 h-5 inline mr-2" />
          How It Works
        </h3>
        <p className="text-purple-800">
          Ask me specific questions about your project and I'll analyze your worlds and characters to provide 
          tailored creative advice. The more detailed your query, the more personalized the response will be.
        </p>
      </div>

      {/* Query Input */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Ask Your Question
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              rows={3}
              placeholder="e.g., 'What are the possible conflicts between Character A and Character B?' or 'How can I expand the world-building for my fantasy setting?'"
            />
          </div>
          
          <button
            type="submit"
            disabled={!query.trim() || isGenerating}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 animate-spin" />
                <span>Generating Advice...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Get Advice</span>
              </>
            )}
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Suggested Questions:</h4>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((suggested, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggested)}
                className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-colors"
              >
                {suggested}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Responses */}
      <div className="space-y-4">
        {responses.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Your Question:</p>
                  <p className="text-slate-700">{item.query}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-purple-900">Creative Advice:</p>
                    <span className="text-xs text-purple-600">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-purple-800">{item.response}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {responses.length === 0 && !isGenerating && (
        <div className="text-center py-12">
          <Lightbulb className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">Ask a question to get personalized creative advice!</p>
          <p className="text-slate-400 mt-2">
            I'll analyze your project entries to provide tailored suggestions.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdviceEngine;