
import React, { useState, useEffect, useRef } from 'react';
import { AppSection, Character, ChapterSummary, Theme, QuizQuestion } from './types';
import { 
  BOOK_TITLE, AUTHOR, CHARACTERS, CHAPTERS, THEMES, COMMUNITY_RULES, QUIZ_QUESTIONS 
} from './constants';
import { chatWithTutor } from './services/geminiService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.OVERVIEW);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    const history = chatMessages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithTutor(userMsg, history);
    setChatMessages(prev => [...prev, { role: 'model', text: responseText || "..." }]);
    setIsChatLoading(false);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
  };

  const renderSidebarItem = (section: AppSection, icon: string, label: string) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        activeSection === section 
        ? 'bg-red-600 text-white shadow-lg scale-105' 
        : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <i className={`fas ${icon} w-5`}></i>
      <span className="font-medium">{label}</span>
    </button>
  );

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.OVERVIEW:
        return (
          <div className="animate-fade-in space-y-6">
            <div className="relative rounded-2xl overflow-hidden h-64 bg-gray-900 flex items-center justify-center p-8">
              <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/seed/giver/1200/400')] bg-cover bg-center"></div>
              <div className="relative text-center">
                <h1 className="serif text-5xl font-bold text-white mb-2">{BOOK_TITLE}</h1>
                <p className="text-xl text-gray-200">by {AUTHOR}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="serif text-2xl font-bold text-gray-800 mb-4">Setting the Stage</h2>
                <p className="text-gray-600 leading-relaxed">
                  Imagine a world without color, without pain, without choices. A world of total Sameness. 
                  This is the world of <strong>The Giver</strong>. For the inhabitants of this community, 
                  life is orderly, predictable, and devoid of conflict. But at a high cost: they have 
                  lost the ability to feel true joy, love, and the depth of human history.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="serif text-2xl font-bold text-gray-800 mb-4">Study Strategy</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-2"><i className="fas fa-check text-green-500 mt-1"></i> Use the <strong>AI Tutor</strong> to ask deep questions about Jonas's journey.</li>
                  <li className="flex gap-2"><i className="fas fa-check text-green-500 mt-1"></i> Review <strong>Themes</strong> to understand Lowry's message.</li>
                  <li className="flex gap-2"><i className="fas fa-check text-green-500 mt-1"></i> Take the <strong>Comprehension Quiz</strong> after reading each section.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case AppSection.CHAPTERS:
        return (
          <div className="space-y-6">
            <h2 className="serif text-3xl font-bold text-gray-800">Chapter Explorations</h2>
            {CHAPTERS.map(ch => (
              <div key={ch.chapter} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">Chapter {ch.chapter}: {ch.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 italic">{ch.summary}</p>
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-2">Key Events</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {ch.keyEvents.map((event, i) => (
                      <li key={i} className="text-gray-600 text-sm bg-gray-50 p-2 rounded flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        {event}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );

      case AppSection.CHARACTERS:
        return (
          <div className="space-y-6">
            <h2 className="serif text-3xl font-bold text-gray-800">Character Analysis</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {CHARACTERS.map(char => (
                <div key={char.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                      {char.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{char.name}</h3>
                      <p className="text-sm text-red-600 font-medium">{char.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{char.description}</p>
                  {char.symbolism && (
                    <div className="pt-3 border-t border-gray-50">
                      <span className="text-xs font-bold text-gray-400 uppercase">Symbolism</span>
                      <p className="text-sm text-gray-700 italic">{char.symbolism}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case AppSection.THEMES:
        return (
          <div className="space-y-6">
             <h2 className="serif text-3xl font-bold text-gray-800">Deep Themes</h2>
             <div className="space-y-4">
               {THEMES.map(theme => (
                 <div key={theme.title} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="serif text-2xl font-bold text-red-700 mb-2">{theme.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{theme.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {theme.examples.map((ex, i) => (
                        <div key={i} className="bg-red-50 p-4 rounded-lg text-sm text-red-800 border border-red-100">
                          <i className="fas fa-book-open mr-2 opacity-50"></i> {ex}
                        </div>
                      ))}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        );

      case AppSection.RULES:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="serif text-3xl font-bold text-gray-800 text-center">Community Rules</h2>
            <p className="text-gray-500 text-center text-sm mb-8">Maintain precision of language. Obedience is required.</p>
            <div className="space-y-3">
              {COMMUNITY_RULES.map((rule, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <span className="text-2xl font-bold text-gray-200">#{i+1}</span>
                  <p className="text-gray-700 font-medium">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case AppSection.QUIZ:
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="serif text-3xl font-bold text-gray-800">Knowledge Check</h2>
            {quizScore === null ? (
              <div className="space-y-8">
                {QUIZ_QUESTIONS.map((q) => (
                  <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="font-bold text-gray-800 mb-4">{q.id}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                          <input 
                            type="radio" 
                            name={`q-${q.id}`} 
                            checked={selectedAnswers[q.id] === idx}
                            onChange={() => setSelectedAnswers(prev => ({...prev, [q.id]: idx}))}
                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                          <span className="text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button 
                  onClick={handleQuizSubmit}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-lg"
                >
                  Submit Quiz
                </button>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl shadow-xl text-center space-y-6 border-t-8 border-red-600">
                <div className="text-6xl mb-4">
                  {quizScore === QUIZ_QUESTIONS.length ? '🎓' : quizScore > QUIZ_QUESTIONS.length / 2 ? '👍' : '📖'}
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Quiz Complete!</h3>
                <p className="text-5xl font-black text-red-600">{quizScore} / {QUIZ_QUESTIONS.length}</p>
                <p className="text-gray-600 max-w-md mx-auto">
                  {quizScore === QUIZ_QUESTIONS.length 
                    ? "Exceptional! You have the wisdom of a Receiver." 
                    : "Good effort! Review the Themes and Chapters to improve your score."}
                </p>
                <button 
                  onClick={() => {setQuizScore(null); setSelectedAnswers({});}}
                  className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        );

      case AppSection.CHAT:
        return (
          <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gray-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <div>
                  <h3 className="font-bold">AI Study Tutor</h3>
                  <p className="text-xs text-gray-400">Ask about Sameness, Jonas, or The Giver</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="italic">"The worst part of holding the memories is not the pain. It's the loneliness of it. Memories need to be shared."</p>
                  <p className="text-sm mt-4">Start a conversation to share the burden of knowledge.</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-red-600 text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl animate-pulse text-gray-400 italic">
                    The Tutor is consulting the Hall of Memories...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your question here..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isChatLoading}
                className="bg-red-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 p-6 space-y-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white shadow-lg">
            <i className="fas fa-book text-xl"></i>
          </div>
          <div>
            <h1 className="serif font-bold text-xl leading-none">GIVER</h1>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Study Companion</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {renderSidebarItem(AppSection.OVERVIEW, 'fa-home', 'Overview')}
          {renderSidebarItem(AppSection.CHAPTERS, 'fa-list-ol', 'Chapters')}
          {renderSidebarItem(AppSection.CHARACTERS, 'fa-users', 'Characters')}
          {renderSidebarItem(AppSection.THEMES, 'fa-mountain', 'Themes')}
          {renderSidebarItem(AppSection.RULES, 'fa-gavel', 'Community Rules')}
          {renderSidebarItem(AppSection.QUIZ, 'fa-vial', 'Comprehension Quiz')}
          {renderSidebarItem(AppSection.CHAT, 'fa-comment-dots', 'Ask AI Tutor')}
        </nav>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-400 mb-2 uppercase font-bold tracking-tighter">Current Assignment</p>
          <p className="text-sm font-bold text-gray-700">Receiver-in-training</p>
          <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-1/3"></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header - Mobile only toggle needed here ideally, but keeping it simple */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white">
              <i className="fas fa-book"></i>
            </div>
            <h1 className="serif font-bold text-lg">The Giver</h1>
          </div>
          <select 
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value as AppSection)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none"
          >
            <option value={AppSection.OVERVIEW}>Overview</option>
            <option value={AppSection.CHAPTERS}>Chapters</option>
            <option value={AppSection.CHARACTERS}>Characters</option>
            <option value={AppSection.THEMES}>Themes</option>
            <option value={AppSection.RULES}>Rules</option>
            <option value={AppSection.QUIZ}>Quiz</option>
            <option value={AppSection.CHAT}>AI Tutor</option>
          </select>
        </header>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>

        <footer className="bg-white border-t border-gray-100 p-4 text-center text-xs text-gray-400">
          Designed for Middle School Students • Lois Lowry Study Project
        </footer>
      </main>
    </div>
  );
};

export default App;
