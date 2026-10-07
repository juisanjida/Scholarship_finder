import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Bookmark, BookmarkCheck, CalendarDays, Check, ChevronRight, CircleHelp, GraduationCap, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

type Scholarship = {
  id: string;
  name: string;
  sponsor: string;
  amount: number;
  deadline: string;
  studyArea: string;
  level: string;
  eligibility: string;
  requirements: string[];
};

const scholarships: Scholarship[] = [
  { id: 'bright-futures', name: 'Bright Futures Community Award', sponsor: 'Northwind Community Foundation', amount: 2500, deadline: '2026-05-18', studyArea: 'Any field', level: 'Undergraduate', eligibility: 'For students who have contributed time to a local organization or community project.', requirements: ['Short personal statement (about 500 words)', 'One reference from a community mentor', 'Current school transcript'] },
  { id: 'makers-grant', name: 'Future Makers STEM Grant', sponsor: 'The Meridian Learning Fund', amount: 4000, deadline: '2026-06-02', studyArea: 'Science & technology', level: 'Undergraduate', eligibility: 'Open to students pursuing a degree in a science, technology, engineering, or mathematics discipline.', requirements: ['Project idea or portfolio', 'Unofficial transcript', 'Two brief responses about your goals'] },
  { id: 'first-gen', name: 'First Generation Pathway Scholarship', sponsor: 'Common Ground Scholars', amount: 1800, deadline: '2026-06-14', studyArea: 'Any field', level: 'Undergraduate', eligibility: 'For first-generation college students enrolled at least half-time at an accredited institution.', requirements: ['Personal statement', 'Proof of enrollment', 'One academic reference'] },
  { id: 'green-horizon', name: 'Green Horizon Design Fellowship', sponsor: 'Fieldwork Sustainability Initiative', amount: 3200, deadline: '2026-07-01', studyArea: 'Arts & design', level: 'Graduate', eligibility: 'Graduate students exploring design, planning, or creative practice with an environmental focus.', requirements: ['Portfolio of up to 8 pieces', 'Statement of purpose', 'Current enrollment confirmation'] },
  { id: 'care-and-community', name: 'Care & Community Nursing Award', sponsor: 'Harborlight Health Partners', amount: 2750, deadline: '2026-07-22', studyArea: 'Health & medicine', level: 'Undergraduate', eligibility: 'For students enrolled in a nursing or allied health program who have volunteered in a care setting.', requirements: ['Volunteer experience summary', 'Transcript', 'One reference from a supervisor or instructor'] },
  { id: 'language-bridge', name: 'Language Bridge Study Award', sponsor: 'Open Atlas Education Trust', amount: 1500, deadline: '2026-08-09', studyArea: 'Humanities', level: 'Any level', eligibility: 'Supports students studying languages, history, literature, or cross-cultural communication.', requirements: ['A 400-word learning plan', 'Unofficial transcript', 'Short recommendation'] },
  { id: 'returning-learners', name: 'New Chapter Returning Learner Bursary', sponsor: 'Cedar & Stone College Access', amount: 2200, deadline: '2026-08-26', studyArea: 'Any field', level: 'Graduate', eligibility: 'For learners returning to higher education after a break of three years or more.', requirements: ['Brief education timeline', 'Current enrollment information', 'Personal statement'] },
  { id: 'young-voices', name: 'Young Voices Public Service Prize', sponsor: 'Civic Thread Foundation', amount: 1250, deadline: '2026-09-12', studyArea: 'Social sciences', level: 'Undergraduate', eligibility: 'For students interested in public policy, social work, civic life, or community leadership.', requirements: ['Essay on a local issue', 'One reference', 'Proof of current or upcoming enrollment'] },
];
const areas = ['Any field', 'Science & technology', 'Arts & design', 'Health & medicine', 'Humanities', 'Social sciences'];
const levels = ['Any level', 'Undergraduate', 'Graduate'];
const savedStorageKey = 'scholarship-finder-saved-v1';
const queryClient = new QueryClient();

function readSaved(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(savedStorageKey) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatDeadline(deadline: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${deadline}T00:00:00Z`));
}

function Home() {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('Any field');
  const [level, setLevel] = useState('Any level');
  const [saved, setSaved] = useState<string[]>(readSaved);
  const [savedOnly, setSavedOnly] = useState(false);
  const [activeScholarship, setActiveScholarship] = useState<Scholarship | null>(null);

  useEffect(() => {
    try { localStorage.setItem(savedStorageKey, JSON.stringify(saved)); } catch { /* Retain state for this visit when storage is unavailable. */ }
  }, [saved]);

  useEffect(() => {
    if (!activeScholarship) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveScholarship(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeScholarship]);

  const results = useMemo(() => {
    const term = search.trim().toLowerCase();
    return scholarships.filter((item) => {
      const text = [item.name, item.sponsor, item.studyArea, item.level, item.eligibility, ...item.requirements].join(' ').toLowerCase();
      return (!term || text.includes(term))
        && (area === 'Any field' || item.studyArea === area || item.studyArea === 'Any field')
        && (level === 'Any level' || item.level === level || item.level === 'Any level')
        && (!savedOnly || saved.includes(item.id));
    });
  }, [area, level, saved, savedOnly, search]);

  const toggleSaved = (id: string) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const clearFilters = () => { setSearch(''); setArea('Any field'); setLevel('Any level'); setSavedOnly(false); };

  return (
    <div className="app-shell min-h-[100dvh]">
      <header className="topbar bg-[#f8f6ef]">
        <div className="page-wrap flex h-[72px] items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-[#214b40] no-underline" data-testid="link-home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#214b40] text-[#f7e7bf]"><GraduationCap size={21} strokeWidth={1.8} /></span>
            <span className="serif text-[21px] font-semibold tracking-[-.03em]">Scholarship Finder</span>
          </a>
          <button type="button" onClick={() => { setSavedOnly((current) => !current); window.scrollTo({ top: 440, behavior: 'smooth' }); }} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${savedOnly ? 'border-[#214b40] bg-[#214b40] text-[#fff9e9]' : 'border-[#d9d4c8] text-[#34594e] hover:bg-[#eeece3]'}`} data-testid="button-saved-header">
            <Bookmark size={15} /> Saved <span className={`rounded-full px-1.5 py-0.5 text-[11px] ${savedOnly ? 'bg-white/15' : 'bg-[#e8e4d9]'}`}>{saved.length}</span>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="page-wrap hero-inner py-12 md:py-[66px]">
          <div className="eyebrow mb-5 flex items-center gap-2 text-[#e9c678]"><Sparkles size={13} /> A more thoughtful way to search</div>
          <div className="max-w-[680px]">
            <h1 className="serif max-w-[670px] text-[42px] font-medium leading-[1.08] tracking-[-.035em] sm:text-[54px] md:text-[62px]">Your next step deserves a little support.</h1>
            <p className="mt-5 max-w-[530px] text-[15px] leading-7 text-[#d6e0d7] md:text-[16px]">Find scholarships that fit your studies, your story, and where you want to go next.</p>
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#f1d18a]/20 bg-[#fff7e7]/[.08] px-4 py-3.5 text-[12px] leading-[1.6] text-[#e9e8d9] md:max-w-[710px]" role="note" data-testid="notice-sample-data">
            <CircleHelp size={16} className="mt-0.5 shrink-0 text-[#e9c678]" />
            <span><strong className="font-semibold text-[#fff5d9]">A note about these listings.</strong> These are illustrative sample scholarships, not verified live opportunities. Confirm current requirements and dates directly with each sponsor before applying.</span>
          </div>
        </div>
      </section>

      <main className="page-wrap pb-20 pt-8 md:pt-10">
        <section aria-label="Find scholarships">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="eyebrow mb-2 text-[#a3712c]">Start with what matters to you</p><h2 className="serif text-[26px] font-semibold tracking-[-.025em] text-[#24493f] md:text-[30px]">Find your possibilities</h2></div>
            <span className="hidden pb-1 text-xs text-[#777d70] sm:block">No account needed. Save as you go.</span>
          </div>
          <div className="grid gap-3 rounded-2xl border border-[#e6e0d3] bg-[#fbfaf5] p-3 shadow-[0_4px_20px_rgba(34,62,51,.035)] md:grid-cols-[minmax(240px,1.55fr)_1fr_1fr_auto] md:items-center md:p-3.5">
            <label className="search-field flex h-12 items-center gap-3 rounded-xl border border-[#e5dfd2] bg-[#fffefa] px-3.5 transition-all">
              <Search size={18} className="shrink-0 text-[#5f7b70]" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search by keyword, sponsor, or study area" className="w-full bg-transparent text-[13px] text-[#263f37] outline-none placeholder:text-[#92978e]" aria-label="Search scholarships" data-testid="input-search" />
              {search && <button type="button" onClick={() => setSearch('')} className="grid h-7 w-7 place-items-center rounded-full text-[#6a786f] hover:bg-[#f1efe7]" aria-label="Clear search" data-testid="button-clear-search"><X size={15} /></button>}
            </label>
            <label className="relative"><span className="sr-only">Study area</span><select value={area} onChange={(event) => setArea(event.target.value)} className="filter-select h-12 w-full rounded-xl border border-[#e5dfd2] bg-[#fffefa] px-3.5 pr-9 text-[13px] text-[#34594e] outline-none focus:border-[#789184] focus:ring-2 focus:ring-[#789184]/20" data-testid="select-study-area">{areas.map((item) => <option key={item} value={item}>{item === 'Any field' ? 'All study areas' : item}</option>)}</select></label>
            <label className="relative"><span className="sr-only">Student level</span><select value={level} onChange={(event) => setLevel(event.target.value)} className="filter-select h-12 w-full rounded-xl border border-[#e5dfd2] bg-[#fffefa] px-3.5 pr-9 text-[13px] text-[#34594e] outline-none focus:border-[#789184] focus:ring-2 focus:ring-[#789184]/20" data-testid="select-student-level">{levels.map((item) => <option key={item} value={item}>{item === 'Any level' ? 'All student levels' : item}</option>)}</select></label>
            <button type="button" onClick={() => setSavedOnly((current) => !current)} aria-pressed={savedOnly} className={`flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-semibold transition-colors ${savedOnly ? 'border-[#214b40] bg-[#214b40] text-[#fff9e9]' : 'border-[#d9d4c8] bg-[#f4f1e8] text-[#31564a] hover:bg-[#ebe8dd]'}`} data-testid="button-saved-filter">
              {savedOnly ? <BookmarkCheck size={16} /> : <Bookmark size={16} />} Saved <span className="rounded-full bg-black/[.07] px-1.5 py-0.5 text-[11px]">{saved.length}</span>
            </button>
          </div>
        </section>

        <section className="mt-8" aria-label="Scholarship results">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#e5dfd2] pb-4">
            <div className="flex items-baseline gap-2.5"><h2 className="serif text-[22px] font-semibold text-[#24493f]" data-testid="text-results-heading">{savedOnly ? 'Saved for later' : 'Opportunities to explore'}</h2><span className="text-[12px] text-[#777d70]" data-testid="text-result-count">{results.length} {results.length === 1 ? 'listing' : 'listings'}</span></div>
            <div className="flex items-center gap-2 text-[11px] text-[#737b70]"><SlidersHorizontal size={14} /> Matching your filters</div>
          </div>
          {results.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((item, index) => (
                <article key={item.id} className="scholarship-card group rounded-2xl border border-[#e6e0d3] bg-[#fffefa] p-5 shadow-[0_3px_14px_rgba(34,62,51,.035)] md:p-6" style={{ animationDelay: `${Math.min(index, 7) * 45}ms` }} data-testid={`card-scholarship-${item.id}`}>
                  <div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="mb-2 text-[12px] font-semibold text-[#8d7042]" data-testid={`text-sponsor-${item.id}`}>{item.sponsor}</p><h3 className="serif text-[21px] font-semibold leading-[1.24] tracking-[-.02em] text-[#27493f] md:text-[23px]" data-testid={`text-scholarship-name-${item.id}`}>{item.name}</h3></div>
                    <button type="button" onClick={() => toggleSaved(item.id)} aria-label={saved.includes(item.id) ? `Remove ${item.name} from saved` : `Save ${item.name}`} aria-pressed={saved.includes(item.id)} className={`save-button grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors ${saved.includes(item.id) ? 'is-saved border-[#eed8ac] bg-[#fbf3e2]' : 'border-[#e6e0d3] text-[#557166] hover:border-[#cfb06c] hover:bg-[#fbf5e7]'}`} data-testid={`button-save-${item.id}`}>{saved.includes(item.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}</button>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#e8efe8] px-3 py-1.5 text-[12px] font-bold text-[#315e4e]" data-testid={`text-amount-${item.id}`}>{formatAmount(item.amount)}</span><span className="rounded-full bg-[#f0eee7] px-3 py-1.5 text-[11px] font-medium text-[#5e7167]">{item.studyArea}</span><span className="rounded-full bg-[#f0eee7] px-3 py-1.5 text-[11px] font-medium text-[#5e7167]">{item.level}</span></div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#eee9de] pt-4"><span className="flex items-center gap-2 text-[12px] text-[#65756b]" data-testid={`text-deadline-${item.id}`}><CalendarDays size={15} className="text-[#ad843a]" /> Deadline <strong className="font-semibold text-[#374f44]">{formatDeadline(item.deadline)}</strong></span><button type="button" onClick={() => setActiveScholarship(item)} className="flex items-center gap-1 rounded-lg px-2 py-2 text-[12px] font-bold text-[#315e4e] transition-colors hover:bg-[#edf1e9]" data-testid={`button-details-${item.id}`}>Details <ChevronRight size={15} /></button></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d7d2c5] bg-[#faf8f1] px-6 py-12 text-center" data-testid="empty-search-results">
              <div className="empty-art mx-auto mb-5 grid h-[74px] w-[74px] place-items-center rounded-full text-[#456a58]"><Search size={26} strokeWidth={1.6} /></div>
              <h3 className="serif text-[23px] font-semibold text-[#27493f]">{savedOnly && saved.length === 0 ? 'Your shortlist starts here.' : 'No matches just yet.'}</h3>
              <p className="mx-auto mt-2 max-w-[370px] text-[13px] leading-6 text-[#707b70]">{savedOnly && saved.length === 0 ? 'Save any opportunity that catches your eye and it will be waiting here.' : 'Try a broader keyword or clear a filter to see more possibilities.'}</p>
              <button type="button" onClick={clearFilters} className="mt-5 rounded-full border border-[#c9d2c6] px-4 py-2 text-[12px] font-semibold text-[#315e4e] transition-colors hover:bg-[#eaf0e8]" data-testid="button-clear-filters">Clear search &amp; filters</button>
            </div>
          )}
        </section>
        <aside className="mt-10 flex items-start gap-3 rounded-xl border border-[#e5dfd2] bg-[#f0ede4] px-4 py-4 text-[12px] leading-5 text-[#6f776b]" data-testid="notice-confirm-details"><CircleHelp size={16} className="mt-0.5 shrink-0 text-[#a57d39]" /><p><strong className="font-semibold text-[#4d5d4f]">Before you apply:</strong> sample listings can help you plan a search, but they are not verified or affiliated with real programs. Always check a sponsor's official website for current eligibility, application instructions, and deadlines.</p></aside>
        <footer className="mt-7 flex flex-col justify-between gap-2 border-t border-[#e5dfd2] pt-5 text-[11px] text-[#899084] sm:flex-row"><span>Made to make the search feel a little smaller.</span><span>Your saved list stays on this device.</span></footer>
      </main>

      {activeScholarship && (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[#172c25]/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveScholarship(null); }} data-testid="dialog-backdrop">
          <section role="dialog" aria-modal="true" aria-labelledby="scholarship-dialog-title" className="modal-panel max-h-[92dvh] w-full overflow-y-auto rounded-t-[24px] border border-[#e8e1d3] bg-[#fffefa] p-6 shadow-[0_24px_80px_rgba(18,40,32,.25)] sm:max-w-[600px] sm:rounded-[24px] sm:p-8" data-testid={`dialog-scholarship-${activeScholarship.id}`}>
            <div className="flex items-start justify-between gap-4"><div><p className="eyebrow mb-2 text-[#a3712c]">{activeScholarship.sponsor}</p><h2 id="scholarship-dialog-title" className="serif max-w-[470px] text-[28px] font-semibold leading-tight tracking-[-.025em] text-[#24493f]">{activeScholarship.name}</h2></div><button type="button" onClick={() => setActiveScholarship(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#e5dfd2] text-[#607268] hover:bg-[#f1efe7]" aria-label="Close scholarship details" data-testid="button-close-details"><X size={17} /></button></div>
            <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#eaf0e9] p-4"><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#698071]">Award amount</span><strong className="serif mt-1 block text-[24px] font-semibold text-[#315e4e]">{formatAmount(activeScholarship.amount)}</strong></div><div className="rounded-xl bg-[#f3efe5] p-4"><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#8b7a5a]">Deadline</span><strong className="mt-2 block text-[14px] font-semibold text-[#43564a]">{formatDeadline(activeScholarship.deadline)}</strong></div></div>
            <div className="mt-6"><h3 className="serif text-[19px] font-semibold text-[#284a40]">Who it may be for</h3><p className="mt-2 text-[13px] leading-6 text-[#626f64]">{activeScholarship.eligibility}</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-[#f0eee7] px-3 py-1.5 text-[11px] text-[#5e7167]">{activeScholarship.studyArea}</span><span className="rounded-full bg-[#f0eee7] px-3 py-1.5 text-[11px] text-[#5e7167]">{activeScholarship.level}</span></div></div>
            <div className="mt-6"><h3 className="serif text-[19px] font-semibold text-[#284a40]">Sample requirements</h3><ul className="mt-3 space-y-2.5">{activeScholarship.requirements.map((requirement) => <li key={requirement} className="flex items-start gap-2.5 text-[13px] leading-5 text-[#626f64]"><Check size={16} className="mt-0.5 shrink-0 text-[#52816a]" />{requirement}</li>)}</ul></div>
            <div className="mt-6 rounded-xl border border-[#ebddb9] bg-[#fcf7e9] p-3.5 text-[11px] leading-5 text-[#796a4d]"><strong className="font-semibold text-[#63583f]">Please verify before applying.</strong> This is an illustrative example only. The sponsor name, award, criteria, and date have not been verified as a live opportunity.</div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between"><button type="button" onClick={() => toggleSaved(activeScholarship.id)} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#d9d4c8] px-4 text-[13px] font-semibold text-[#315e4e] hover:bg-[#f2f0e8]" data-testid={`button-dialog-save-${activeScholarship.id}`}>{saved.includes(activeScholarship.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}{saved.includes(activeScholarship.id) ? 'Saved for later' : 'Save for later'}</button><button type="button" onClick={() => setActiveScholarship(null)} className="h-11 rounded-xl bg-[#214b40] px-5 text-[13px] font-semibold text-[#fff9e9] transition-colors hover:bg-[#183d33]" data-testid="button-done-details">Done</button></div>
          </section>
        </div>
      )}
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
