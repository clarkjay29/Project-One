import React, { useState, useEffect } from 'react';
import { BookOpen, Library, Users, MapPin, Clock, BarChart3, Lightbulb, Home } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SeriesOverview from './components/SeriesOverview';
import ManageBooks from './components/ManageBooks';
import BookEditor from './components/BookEditor';
import MasterCodex from './components/MasterCodex';
import MasterTimeline from './components/MasterTimeline';
import SeriesAnalysis from './components/SeriesAnalysis';
import OracleAdvice from './components/OracleAdvice';

export interface SeriesData {
  id: string;
  title: string;
  genre: string;
  logline: string;
  plannedBooks: number;
  interconnectionStyle: string;
  protagonistArc: string;
  createdAt: Date;
}

export interface BookData {
  id: string;
  seriesId: string;
  title: string;
  bookNumber: number;
  plotOutline: string;
  status: 'planned' | 'in-progress' | 'completed';
  characters: BookCharacter[];
  timeline: BookEvent[];
  createdAt: Date;
}

export interface BookCharacter {
  id: string;
  masterId?: string;
  name: string;
  role: string;
  bookSpecificArc: string;
  importance: 'main' | 'supporting' | 'minor';
}

export interface BookEvent {
  id: string;
  title: string;
  description: string;
  chapter?: number;
  relativeTime: string;
}

export interface MasterCharacter {
  id: string;
  name: string;
  seriesWideArc: string;
  personality: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  motivation: string;
  bookAppearances: string[];
  createdAt: Date;
}

export interface MasterLocation {
  id: string;
  name: string;
  description: string;
  seriesEvolution: string;
  bookAppearances: string[];
  createdAt: Date;
}

export interface LoreElement {
  id: string;
  title: string;
  category: 'magic' | 'history' | 'culture' | 'technology' | 'other';
  description: string;
  rules: string;
  evolution: string;
  createdAt: Date;
}

function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  
  // Series Data
  const [seriesData, setSeriesData] = useState<SeriesData | null>(null);
  const [books, setBooks] = useState<BookData[]>([]);
  const [masterCharacters, setMasterCharacters] = useState<MasterCharacter[]>([]);
  const [masterLocations, setMasterLocations] = useState<MasterLocation[]>([]);
  const [loreElements, setLoreElements] = useState<LoreElement[]>([]);

  useEffect(() => {
    const savedSeries = localStorage.getItem('seriesCodexData');
    if (savedSeries) {
      const data = JSON.parse(savedSeries);
      setSeriesData(data.series);
      setBooks(data.books || []);
      setMasterCharacters(data.masterCharacters || []);
      setMasterLocations(data.masterLocations || []);
      setLoreElements(data.loreElements || []);
    }
  }, []);

  useEffect(() => {
    const data = {
      series: seriesData,
      books,
      masterCharacters,
      masterLocations,
      loreElements
    };
    localStorage.setItem('seriesCodexData', JSON.stringify(data));
  }, [seriesData, books, masterCharacters, masterLocations, loreElements]);

  const updateSeriesData = (data: SeriesData) => {
    setSeriesData(data);
  };

  const addBook = (book: BookData) => {
    setBooks(prev => [...prev, book]);
  };

  const updateBook = (id: string, updatedBook: Partial<BookData>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const addMasterCharacter = (character: MasterCharacter) => {
    setMasterCharacters(prev => [...prev, character]);
  };

  const updateMasterCharacter = (id: string, updatedCharacter: Partial<MasterCharacter>) => {
    setMasterCharacters(prev => prev.map(char => 
      char.id === id ? { ...char, ...updatedCharacter } : char
    ));
  };

  const deleteMasterCharacter = (id: string) => {
    setMasterCharacters(prev => prev.filter(char => char.id !== id));
  };

  const addMasterLocation = (location: MasterLocation) => {
    setMasterLocations(prev => [...prev, location]);
  };

  const updateMasterLocation = (id: string, updatedLocation: Partial<MasterLocation>) => {
    setMasterLocations(prev => prev.map(loc => 
      loc.id === id ? { ...loc, ...updatedLocation } : loc
    ));
  };

  const deleteMasterLocation = (id: string) => {
    setMasterLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const addLoreElement = (lore: LoreElement) => {
    setLoreElements(prev => [...prev, lore]);
  };

  const updateLoreElement = (id: string, updatedLore: Partial<LoreElement>) => {
    setLoreElements(prev => prev.map(lore => 
      lore.id === id ? { ...lore, ...updatedLore } : lore
    ));
  };

  const deleteLoreElement = (id: string) => {
    setLoreElements(prev => prev.filter(lore => lore.id !== id));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            seriesData={seriesData}
            books={books}
            masterCharacters={masterCharacters}
            masterLocations={masterLocations}
            loreElements={loreElements}
            onNavigate={setCurrentView}
          />
        );
      case 'series-overview':
        return (
          <SeriesOverview 
            seriesData={seriesData}
            onUpdateSeries={updateSeriesData}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'manage-books':
        return (
          <ManageBooks 
            books={books}
            seriesData={seriesData}
            onAddBook={addBook}
            onSelectBook={(bookId) => {
              setSelectedBookId(bookId);
              setCurrentView('book-editor');
            }}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'book-editor':
        return (
          <BookEditor 
            book={books.find(b => b.id === selectedBookId) || null}
            masterCharacters={masterCharacters}
            onUpdateBook={updateBook}
            onBack={() => setCurrentView('manage-books')}
          />
        );
      case 'master-codex':
        return (
          <MasterCodex 
            masterCharacters={masterCharacters}
            masterLocations={masterLocations}
            loreElements={loreElements}
            books={books}
            onAddCharacter={addMasterCharacter}
            onUpdateCharacter={updateMasterCharacter}
            onDeleteCharacter={deleteMasterCharacter}
            onAddLocation={addMasterLocation}
            onUpdateLocation={updateMasterLocation}
            onDeleteLocation={deleteMasterLocation}
            onAddLore={addLoreElement}
            onUpdateLore={updateLoreElement}
            onDeleteLore={deleteLoreElement}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'master-timeline':
        return (
          <MasterTimeline 
            books={books}
            seriesData={seriesData}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'series-analysis':
        return (
          <SeriesAnalysis 
            seriesData={seriesData}
            books={books}
            masterCharacters={masterCharacters}
            masterLocations={masterLocations}
            loreElements={loreElements}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'oracle-advice':
        return (
          <OracleAdvice 
            seriesData={seriesData}
            books={books}
            masterCharacters={masterCharacters}
            masterLocations={masterLocations}
            loreElements={loreElements}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return (
          <Dashboard 
            seriesData={seriesData}
            books={books}
            masterCharacters={masterCharacters}
            masterLocations={masterLocations}
            loreElements={loreElements}
            onNavigate={setCurrentView}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Library className="w-8 h-8 text-indigo-600" />
              <h1 className="text-xl font-bold text-slate-900">Series Codex</h1>
              {seriesData && (
                <span className="text-sm text-slate-500 ml-2">• {seriesData.title}</span>
              )}
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === 'dashboard'
                    ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Main Menu
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;