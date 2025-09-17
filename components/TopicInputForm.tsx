
import React, { useState } from 'react';

export interface FormState {
    topic: string;
    audience: string;
    articleType: string;
    goals: string[];
    technicalLevel: string;
    budget: string;
    budgetAreas: string[];
    aiEngine: string;
}

interface TopicInputFormProps {
  onSubmit: (formData: FormState) => void;
  isLoading: boolean;
}

const articleTypes = ["General Article", "Article Series", "Case Study", "Interview", "Tutorial / Guide", "News and Updates"];
const availableGoals = ["Educate", "Inform", "Engage", "Establish Authority"];
const technicalLevels = ["Beginner", "Intermediate", "Advanced"];
const budgetLevels = ["Low", "Moderate", "High"];
const availableBudgetAreas = ["Web Development", "Content Creation", "Marketing", "Maintenance"];
const aiEngines = ["Blog Weaver (Default)", "Narrato Style", "Gravity Write Style"];


export const TopicInputForm: React.FC<TopicInputFormProps> = ({ onSubmit, isLoading }) => {
  const [formState, setFormState] = useState<FormState>({
      topic: '',
      audience: '',
      articleType: 'General Article',
      goals: [],
      technicalLevel: 'Intermediate',
      budget: 'Moderate',
      budgetAreas: [],
      aiEngine: 'Blog Weaver (Default)',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleGoalChange = (goal: string) => {
    setFormState(prevState => {
        const newGoals = prevState.goals.includes(goal)
            ? prevState.goals.filter(g => g !== goal)
            : [...prevState.goals, goal];
        return { ...prevState, goals: newGoals };
    });
  };

  const handleBudgetAreaChange = (area: string) => {
    setFormState(prevState => {
        const newAreas = prevState.budgetAreas.includes(area)
            ? prevState.budgetAreas.filter(a => a !== area)
            : [...prevState.budgetAreas, area];
        return { ...prevState, budgetAreas: newAreas };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  const inputStyles = "w-full px-5 py-3 text-base text-white bg-white/5 rounded-full ring-1 ring-white/10 focus:ring-purple-400 focus:outline-none transition-shadow duration-300 shadow-lg";
  const labelStyles = "block mb-2 text-sm font-medium text-gray-300";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="relative">
            <input
              type="text"
              name="topic"
              value={formState.topic}
              onChange={handleInputChange}
              placeholder="e.g., The Future of Renewable Energy"
              className="w-full pl-5 pr-32 py-4 text-base text-white bg-white/5 rounded-full ring-1 ring-white/10 focus:ring-purple-400 focus:outline-none transition-shadow duration-300 shadow-lg"
              disabled={isLoading}
              aria-label="Blog post topic"
            />
            <button
              type="submit"
              className="absolute inset-y-1 right-1 flex items-center justify-center px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-100"
              disabled={isLoading}
            >
              {isLoading ? 'Weaving...' : 'Generate'}
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
                <label htmlFor="audience" className={labelStyles}>Target Audience</label>
                <input
                    id="audience"
                    type="text"
                    name="audience"
                    value={formState.audience}
                    onChange={handleInputChange}
                    placeholder="e.g., Professionals, Students"
                    className={inputStyles}
                    disabled={isLoading}
                    aria-label="Target audience for the blog post"
                />
            </div>
             <div>
                <label htmlFor="aiEngine" className={labelStyles}>AI Writing Engine</label>
                <select 
                    id="aiEngine"
                    name="aiEngine" 
                    value={formState.aiEngine} 
                    onChange={handleInputChange} 
                    className={inputStyles}
                    disabled={isLoading}
                >
                    {aiEngines.map(engine => <option key={engine} value={engine}>{engine}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="articleType" className={labelStyles}>Article Type</label>
                <select 
                    id="articleType"
                    name="articleType" 
                    value={formState.articleType} 
                    onChange={handleInputChange} 
                    className={inputStyles}
                    disabled={isLoading}
                >
                    {articleTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
             <div>
                <label htmlFor="technicalLevel" className={labelStyles}>Technical Level</label>
                <select 
                    id="technicalLevel"
                    name="technicalLevel"
                    value={formState.technicalLevel} 
                    onChange={handleInputChange} 
                    className={inputStyles}
                    disabled={isLoading}
                >
                    {technicalLevels.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
            </div>
        </div>

        <div>
            <label className={labelStyles}>Goals</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableGoals.map(goal => (
                    <button
                        type="button"
                        key={goal}
                        onClick={() => handleGoalChange(goal)}
                        className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                            formState.goals.includes(goal) 
                            ? 'bg-purple-500 text-white ring-2 ring-purple-300' 
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                        disabled={isLoading}
                    >
                        {goal}
                    </button>
                ))}
            </div>
        </div>
        
        <div>
          <label htmlFor="budget" className={labelStyles}>Budget Level</label>
          <select 
              id="budget"
              name="budget"
              value={formState.budget} 
              onChange={handleInputChange} 
              className={inputStyles}
              disabled={isLoading}
          >
              {budgetLevels.map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>


        <div>
            <label className={labelStyles}>Budget Areas</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableBudgetAreas.map(area => (
                    <button
                        type="button"
                        key={area}
                        onClick={() => handleBudgetAreaChange(area)}
                        className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                            formState.budgetAreas.includes(area)
                            ? 'bg-purple-500 text-white ring-2 ring-purple-300' 
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                        disabled={isLoading}
                    >
                        {area}
                    </button>
                ))}
            </div>
        </div>
      </form>
    </div>
  );
};
