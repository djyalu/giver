
import React, { useState, useEffect, useRef } from 'react';
import { AppSection, Character, ChapterSummary, Theme, QuizQuestion, VocabularyWord } from './types';
import { 
  BOOK_TITLE, AUTHOR, CHARACTERS, CHAPTERS, THEMES, COMMUNITY_RULES, QUIZ_QUESTIONS, VOCABULARY_WORDS 
} from './constants';
import { chatWithTutor, generatePortrait } from './services/geminiService';

// Character Image Component with AI Generation and 'Seeing Beyond' Effect
const CharacterImage: React.FC<{ char: Character }> = ({ char }) => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      if (!char.image) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      const url = await generatePortrait(char.image);
      
      if (isMounted) {
        if (url) {
          setGeneratedImageUrl(url);
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      }
    };

    fetchImage();
    return () => { isMounted = false; };
  }, [char.image]);

  return (
    <div className="relative h-72 overflow-hidden bg-gray-200 flex items-center justify-center">
      {isLoading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Receiving Memory...</p>
        </div>
      ) : !hasError && generatedImageUrl ? (
        <img 
          src={generatedImageUrl} 
          alt={char.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-gray-300 text-red-300">
          <span className="text-8xl font-black opacity-20">{char.name[0]}</span>
          <p className="absolute bottom-4 text-[10px] font-bold tracking-widest uppercase opacity-40">Vision Blurred</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
      <div className="absolute bottom-4 left-5 text-white">
        <h3 className="text-2xl font-bold tracking-tight">{char.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-widest text-red-400">{char.role}</p>
      </div>
    </div>
  );
};

// Markdown-like text renderer to handle bold and line breaks
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="whitespace-pre-wrap leading-relaxed">
      {text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.OVERVIEW);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
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

  const toggleLearnedWord = (word: string) => {
    setLearnedWords(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word);
      else next.add(word);
      return next;
    });
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
                  <li className="flex gap-2"><i className="fas fa-check text-green-500 mt-1"></i> Expand your <strong>Vocabulary</strong> to understand "Precision of Language".</li>
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
            <div className="flex justify-between items-end">
              <div>
                <h2 className="serif text-3xl font-bold text-gray-800">Character Analysis</h2>
                <p className="text-gray-500 text-sm mt-1">Discover the unique traits and symbolism of key individuals, rendered by Gemini AI.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CHARACTERS.map(char => (
                <div key={char.name} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col">
                  <CharacterImage char={char} />
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1">
                      {char.description}
                    </p>
                    {char.symbolism && (
                      <div className="pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                           <i className="fas fa-sparkles text-[10px] text-red-400"></i>
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Symbolism</span>
                        </div>
                        <p className="text-sm text-gray-800 italic font-medium leading-snug">{char.symbolism}</p>
                      </div>
                    )}
                  </div>
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

      case AppSection.VOCABULARY:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="serif text-3xl font-bold text-gray-800">Vocabulary Hall</h2>
              <div className="text-sm font-medium text-gray-500">
                Learned: <span className="text-red-600">{learnedWords.size}</span> / {VOCABULARY_WORDS.length}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VOCABULARY_WORDS.map((v) => (
                <div key={v.word} className={`relative bg-white p-6 rounded-xl shadow-sm border transition-all ${learnedWords.has(v.word) ? 'border-green-200 bg-green-50/30' : 'border-gray-100'}`}>
                  <button 
                    onClick={() => toggleLearnedWord(v.word)}
                    className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${learnedWords.has(v.word) ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-300 hover:text-gray-400'}`}
                  >
                    <i className="fas fa-check text-xs"></i>
                  </button>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{v.word}</h3>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Chapter {v.chapter}</span>
                  <p className="text-gray-700 text-sm mt-3 mb-4 font-medium leading-relaxed">{v.definition}</p>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 italic">"{v.context}"</p>
                  </div>
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
          <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gray-900 p-4 text-white flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-inner">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <div>
                  <h3 className="font-bold tracking-tight">AI Study Tutor</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Hall of Memories Access</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
              {chatMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-8">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                    <i className="fas fa-brain text-3xl text-red-500"></i>
                  </div>
                  <p className="serif text-xl italic text-gray-500 max-w-sm">"The worst part of holding the memories is not the pain. It's the loneliness of it. Memories need to be shared."</p>
                  <p className="text-sm text-gray-400 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">Start a conversation to share the burden of knowledge.</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[85%] px-5 py-4 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-red-600 text-white rounded-tr-none font-medium' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <FormattedText text={msg.text} />
                    )}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-sm text-gray-400 font-medium italic">Consulting memories...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-200 flex gap-2 items-center">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your question with 'Precision of Language'..."
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isChatLoading || !chatInput.trim()}
                className="bg-red-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-red-700 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
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
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Study Companion</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {renderSidebarItem(AppSection.OVERVIEW, 'fa-home', 'Overview')}
          {renderSidebarItem(AppSection.CHAPTERS, 'fa-list-ol', 'Chapters')}
          {renderSidebarItem(AppSection.CHARACTERS, 'fa-users', 'Characters')}
          {renderSidebarItem(AppSection.THEMES, 'fa-mountain', 'Themes')}
          {renderSidebarItem(AppSection.RULES, 'fa-gavel', 'Community Rules')}
          {renderSidebarItem(AppSection.VOCABULARY, 'fa-spell-check', 'Vocabulary')}
          {renderSidebarItem(AppSection.QUIZ, 'fa-vial', 'Comprehension Quiz')}
          {renderSidebarItem(AppSection.CHAT, 'fa-comment-dots', 'Ask AI Tutor')}
        </nav>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[10px] text-gray-400 mb-2 uppercase font-black tracking-tighter">Current Assignment</p>
          <p className="text-sm font-bold text-gray-700">Receiver-in-training</p>
          <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-1/3"></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
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
            <option value={AppSection.VOCABULARY}>Vocabulary</option>
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
