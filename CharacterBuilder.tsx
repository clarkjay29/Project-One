import React, { useState } from 'react';
import { ArrowLeft, Users, Heart, Target, Brain, Star } from 'lucide-react';
import { CharacterEntry } from '../App';

interface CharacterBuilderProps {
  onAddEntry: (entry: CharacterEntry) => void;
  onBack: () => void;
}

const CharacterBuilder: React.FC<CharacterBuilderProps> = ({ onAddEntry, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    motivation: '',
    personality: {
      openness: 3,
      conscientiousness: 3,
      extraversion: 3,
      agreeableness: 3,
      neuroticism: 3
    }
  });
  const [feedback, setFeedback] = useState<string>('');
  const [personalityAnalysis, setPersonalityAnalysis] = useState<string>('');

  const personalityTraits = [
    { key: 'openness', label: 'Openness', description: 'Creative, curious, and open to new experiences' },
    { key: 'conscientiousness', label: 'Conscientiousness', description: 'Organized, responsible, and disciplined' },
    { key: 'extraversion', label: 'Extraversion', description: 'Outgoing, energetic, and social' },
    { key: 'agreeableness', label: 'Agreeableness', description: 'Cooperative, trusting, and empathetic' },
    { key: 'neuroticism', label: 'Emotional Stability', description: 'Calm, secure, and emotionally stable (low = stable)' }
  ];

  const generatePersonalityAnalysis = (personality: typeof formData.personality) => {
    const traits = [];
    
    if (personality.openness >= 4) traits.push("highly creative and imaginative");
    else if (personality.openness <= 2) traits.push("practical and conventional");
    
    if (personality.conscientiousness >= 4) traits.push("extremely organized and reliable");
    else if (personality.conscientiousness <= 2) traits.push("spontaneous and flexible");
    
    if (personality.extraversion >= 4) traits.push("outgoing and energetic");
    else if (personality.extraversion <= 2) traits.push("reserved and introspective");
    
    if (personality.agreeableness >= 4) traits.push("very cooperative and trusting");
    else if (personality.agreeableness <= 2) traits.push("competitive and skeptical");
    
    if (personality.neuroticism >= 4) traits.push("emotionally sensitive and reactive");
    else if (personality.neuroticism <= 2) traits.push("emotionally stable and resilient");

    const behaviorPredictions = [];
    
    if (personality.conscientiousness >= 4 && personality.neuroticism <= 2) {
      behaviorPredictions.push("They will likely be a reliable planner who handles stress well");
    }
    
    if (personality.agreeableness <= 2 && personality.extraversion >= 4) {
      behaviorPredictions.push("They may be confrontational but charismatic in their interactions");
    }
    
    if (personality.openness >= 4 && personality.conscientiousness <= 2) {
      behaviorPredictions.push("They'll likely pursue creative solutions but may struggle with follow-through");
    }

    return `This character is ${traits.join(", ")}. ${behaviorPredictions.join(". ")}.`;
  };

  const generateFeedback = (data: typeof formData) => {
    const feedbacks = [
      `"${data.name}" sounds like a compelling character. What obstacles will they face in pursuing their goal of "${data.motivation}"?`,
      `The role of ${data.role} creates interesting story possibilities. How does "${data.name}" view their responsibility in this position?`,
      `"${data.name}"'s motivation to "${data.motivation}" is a strong driving force. What personal sacrifices might they have to make?`,
      `This character's personality profile suggests fascinating internal conflicts. How do these traits create challenges for "${data.name}"?`,
      `The combination of being a ${data.role} with the goal of "${data.motivation}" could lead to intriguing moral dilemmas. What lines won't they cross?`
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;

    const analysis = generatePersonalityAnalysis(formData.personality);
    
    const newCharacter: CharacterEntry = {
      id: Date.now().toString(),
      type: 'character',
      ...formData,
      personalityAnalysis: analysis,
      createdAt: new Date()
    };

    onAddEntry(newCharacter);
    setFeedback(generateFeedback(formData));
    setPersonalityAnalysis(analysis);
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: '',
        role: '',
        motivation: '',
        personality: {
          openness: 3,
          conscientiousness: 3,
          extraversion: 3,
          agreeableness: 3,
          neuroticism: 3
        }
      });
      setFeedback('');
      setPersonalityAnalysis('');
    }, 4000);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePersonalityChange = (trait: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      personality: { ...prev.personality, [trait]: value }
    }));
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
          <Users className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl font-bold text-slate-900">Character Builder</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Star className="w-4 h-4 inline mr-2" />
                Character Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter character name..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Role in Story *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Protagonist, antagonist, mentor, ally, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Target className="w-4 h-4 inline mr-2" />
                Motivation & Goal
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => handleChange('motivation', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                rows={3}
                placeholder="What drives this character? What do they want to achieve?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                <Brain className="w-4 h-4 inline mr-2" />
                Personality Traits (Big Five Model)
              </label>
              <div className="space-y-4">
                {personalityTraits.map((trait) => (
                  <div key={trait.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{trait.label}</span>
                      <span className="text-lg font-bold text-emerald-600">
                        {formData.personality[trait.key as keyof typeof formData.personality]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.personality[trait.key as keyof typeof formData.personality]}
                      onChange={(e) => handlePersonalityChange(trait.key, parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <p className="text-xs text-slate-500">{trait.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Create Character
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {personalityAnalysis && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-900 mb-3">
                <Brain className="w-5 h-5 inline mr-2" />
                Personality Analysis
              </h3>
              <p className="text-emerald-800">{personalityAnalysis}</p>
            </div>
          )}

          {feedback && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                <Heart className="w-5 h-5 inline mr-2" />
                Creative Insight
              </h3>
              <p className="text-blue-800">{feedback}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Character Development Tips</h3>
            <ul className="space-y-2 text-purple-800">
              <li>• Give your character clear wants and needs (often different)</li>
              <li>• Create internal conflicts that mirror external challenges</li>
              <li>• Develop a unique voice and way of speaking</li>
              <li>• Consider their backstory and formative experiences</li>
              <li>• Plan a character arc showing growth or change</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">Essential Questions</h3>
            <ul className="space-y-2 text-amber-800">
              <li>• What is their greatest fear or weakness?</li>
              <li>• What do they value most in life?</li>
              <li>• How do they handle stress and conflict?</li>
              <li>• What are their relationships like with others?</li>
              <li>• What would they never forgive?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilder;