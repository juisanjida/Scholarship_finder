import React, { useState } from 'react';

const scholarshipData = [
  { id: 1, title: "MIT Financial Aid Program", sponsor: "MIT, USA", amount: "100% Need Aid", deadline: "Feb 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://mit.edu" },
  { id: 2, title: "Harvard Financial Aid Fellowship", sponsor: "Harvard University, USA", amount: "Full Ride Funding", deadline: "Jan 01, 2027", category: "Bachelors", type: "Full-Funded", link: "https://harvard.edu" },
  { id: 3, title: "Princeton Financial Aid Promise", sponsor: "Princeton University, USA", amount: "Full Cost Coverage", deadline: "Jan 01, 2027", category: "Bachelors", type: "Full-Funded", link: "https://princeton.edu" },
  { id: 4, title: "Yale Financial Aid Program", sponsor: "Yale University, USA", amount: "100% Need Met", deadline: "Jan 02, 2027", category: "Bachelors", type: "Full-Funded", link: "https://yale.edu" },
  { id: 5, title: "Amherst Financial Aid Grant", sponsor: "Amherst College, USA", amount: "Full Need Grant", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://amherst.edu" },
  { id: 6, title: "Bowdoin Need-Based Aid", sponsor: "Bowdoin College, USA", amount: "100% Financial Aid", deadline: "Jan 05, 2027", category: "Bachelors", type: "Full-Funded", link: "https://bowdoin.edu" },
  { id: 7, title: "Brown University Scholarship", sponsor: "Brown University, USA", amount: "Full Tuition & Living", deadline: "Jan 05, 2027", category: "Bachelors", type: "Full-Funded", link: "https://brown.edu" },
  { id: 8, title: "Dartmouth Financial Aid", sponsor: "Dartmouth College, USA", amount: "Need-Blind Full Ride", deadline: "Jan 02, 2027", category: "Bachelors", type: "Full-Funded", link: "https://dartmouth.edu" },
  { id: 9, title: "Stanford Scholarship Fund", sponsor: "Stanford University, USA", amount: "Full Tuition + Expenses", deadline: "Jan 05, 2027", category: "Bachelors", type: "Full-Funded", link: "https://stanford.edu" },
  { id: 10, title: "Columbia University Grants", sponsor: "Columbia University, USA", amount: "100% Need Met", deadline: "Jan 01, 2027", category: "Bachelors", type: "Full-Funded", link: "https://columbia.edu" },
  { id: 11, title: "UPenn Financial Aid Award", sponsor: "University of Pennsylvania, USA", amount: "Full Cost Coverage", deadline: "Jan 05, 2027", category: "Bachelors", type: "Full-Funded", link: "https://upenn.edu" },
  { id: 12, title: "Williams College Grant", sponsor: "Williams College, USA", amount: "Full Ride Funding", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://williams.edu" },
  { id: 13, title: "Pomona College Financial Aid", sponsor: "Pomona College, USA", amount: "100% Need Met", deadline: "Jan 08, 2027", category: "Bachelors", type: "Full-Funded", link: "https://pomona.edu" },
  { id: 14, title: "Swarthmore College Fellowship", sponsor: "Swarthmore College, USA", amount: "Full Ride Package", deadline: "Jan 04, 2027", category: "Bachelors", type: "Full-Funded", link: "https://swarthmore.edu" },
  { id: 15, title: "Colby College Aid Promise", sponsor: "Colby College, USA", amount: "100% Financial Aid", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://colby.edu" },
  { id: 16, title: "Wellesley College Grant", sponsor: "Wellesley College, USA", amount: "Full Financial Aid", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://wellesley.edu" },
  { id: 17, title: "Carleton College Scholarship", sponsor: "Carleton College, USA", amount: "Full Tuition & Living", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://carleton.edu" },
  { id: 18, title: "Haverford Scholarship", sponsor: "Haverford College, USA", amount: "100% Met Need Assistance", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://haverford.edu" },
  { id: 19, title: "Rice University Financial Aid", sponsor: "Rice University, USA", amount: "Full Ride Support", deadline: "Jan 04, 2027", category: "Bachelors", type: "Full-Funded", link: "https://rice.edu" },
  { id: 20, title: "Duke Robertson Scholars Program", sponsor: "Duke University, USA", amount: "Full Ride Scholarship", deadline: "Nov 15, 2026", category: "Bachelors", type: "Full-Funded", link: "https://duke.edu" },
  { id: 21, title: "Vanderbilt Merit Scholarships", sponsor: "Vanderbilt University, USA", amount: "Full Tuition Awards", deadline: "Dec 01, 2026", category: "Bachelors", type: "Full-Funded", link: "https://vanderbilt.edu" },
  { id: 22, title: "Notre Dame Financial Aid", sponsor: "University of Notre Dame, USA", amount: "100% Need Met", deadline: "Jan 01, 2027", category: "Bachelors", type: "Full-Funded", link: "https://nd.edu" },
  { id: 23, title: "Northwestern Need-Based Aid", sponsor: "Northwestern University, USA", amount: "Full Tuition Support", deadline: "Jan 02, 2027", category: "Bachelors", type: "Full-Funded", link: "https://northwestern.edu" },
  { id: 24, title: "UChicago Odyssey Scholars", sponsor: "University of Chicago, USA", amount: "Full Ride Funding", deadline: "Jan 02, 2027", category: "Bachelors", type: "Full-Funded", link: "https://uchicago.edu" },
  { id: 25, title: "WashU Signature Scholars Program", sponsor: "Washington University, USA", amount: "Full Ride Merit Award", deadline: "Jan 02, 2027", category: "Bachelors", type: "Full-Funded", link: "https://wustl.edu" },
  { id: 26, title: "Grinnell Financial Aid", sponsor: "Grinnell College, USA", amount: "100% Need Met", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://grinnell.edu" },
  { id: 27, title: "Macalester International Grant", sponsor: "Macalester College, USA", amount: "Full Tuition to Cost Aid", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://macalester.edu" },
  { id: 28, title: "Middlebury Institutional Grant", sponsor: "Middlebury College, USA", amount: "100% Met Need Package", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://middlebury.edu" },
  { id: 29, title: "Hamilton Financial Aid Award", sponsor: "Hamilton College, USA", amount: "Full Ride Opportunity", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://hamilton.edu" },
  { id: 30, title: "Tufts International Grant", sponsor: "Tufts University, USA", amount: "Full Demonstrated Need", deadline: "Jan 04, 2027", category: "Bachelors", type: "Full-Funded", link: "https://tufts.edu" },
  { id: 31, title: "Freeman Asian Scholars", sponsor: "Wesleyan University, USA", amount: "Full Ride Coverage", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://wesleyan.edu" },
  { id: 32, title: "Smith College Need Grant", sponsor: "Smith College, USA", amount: "Full Demonstrated Need", deadline: "Jan 25, 2027", category: "Bachelors", type: "Full-Funded", link: "https://smith.edu" },
  { id: 33, title: "Vassar International Grant", sponsor: "Vassar College, USA", amount: "100% Met Financial Aid", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://vassar.edu" },
  { id: 34, title: "Marquis Fellowship", sponsor: "Lafayette College, USA", amount: "Full Tuition & Grants", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://lafayette.edu" },
   { id: 38, title: "John Montgomery Belk Scholarship", sponsor: "Davidson College, USA", amount: "Full Ride Award", deadline: "Nov 01, 2026", category: "Bachelors", type: "Full-Funded", link: "https://davidson.edu" },
  { id: 39, title: "Emory University Scholars", sponsor: "Emory University, USA", amount: "Full Tuition Merit Support", deadline: "Nov 15, 2026", category: "Bachelors", type: "Full-Funded", link: "https://emory.edu" },
  { id: 40, title: "Johns Hopkins Need Aid", sponsor: "Johns Hopkins University, USA", amount: "Full Cost Coverage (No Loans)", deadline: "Jan 04, 2027", category: "Bachelors", type: "Full-Funded", link: "https://jhu.edu" },
  { id: 41, title: "Cornell Financial Aid Program", sponsor: "Cornell University, USA", amount: "100% Need-Based Grant", deadline: "Jan 02, 2027", category: "Bachelors", type: "Full-Funded", link: "https://cornell.edu" },
  { id: 42, title: "Rochester Merit & Need Support", sponsor: "University of Rochester, USA", amount: "Full Tuition Scholarships", deadline: "Jan 05, 2027", category: "Bachelors", type: "Full-Funded", link: "https://rochester.edu" },
  { id: 43, title: "CWRU University Scholarship", sponsor: "Case Western Reserve, USA", amount: "Full Tuition Awards", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://case.edu" },
  { id: 44, title: "Clark Global Scholars Program", sponsor: "Clark University, USA", amount: "$15,000 to $25,000 Annual Grant", deadline: "Jan 15, 2027", category: "Bachelors", type: "Partial-Funded", link: "https://clarku.edu" },
  { id: 45, title: "Trinity International Aid", sponsor: "Trinity College, USA", amount: "100% Need Support", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://trincoll.edu" },
  { id: 46, title: "Union College Financial Aid", sponsor: "Union College, USA", amount: "Full Ride & Need Fellowships", deadline: "Jan 15, 2027", category: "Bachelors", type: "Full-Funded", link: "https://union.edu" },
  { id: 47, title: "Berea College Tuition Promise", sponsor: "Berea College, USA", amount: "100% Funding for 4 Years", deadline: "Nov 30, 2026", category: "Bachelors", type: "Full-Funded", link: "https://berea.edu" },
  { id: 48, title: "UCL Global Scholarship", sponsor: "University College London, UK", amount: "Full Tuition & Living", deadline: "Apr 27, 2027", category: "Bachelors", type: "Full-Funded", link: "https://ucl.ac.uk" },
  { id: 49, title: "Lester B. Pearson Scholarship", sponsor: "University of Toronto, Canada", amount: "4 Years Full Ride Coverage", deadline: "Nov 06, 2026", category: "Bachelors", type: "Full-Funded", link: "https://utoronto.ca" },
  { id: 50, title: "International Leader Award", sponsor: "University of British Columbia, Canada", amount: "Full Ride Tuition & Living", deadline: "Dec 02, 2026", category: "Bachelors", type: "Full-Funded", link: "https://ubc.ca" }, 
];
export default function App() {
const [searchQuery, setSearchQuery] = useState('');
const [typeFilter, setTypeFilter] = useState('');
    const filteredScholarships = scholarshipData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||                         item.sponsor.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesType = typeFilter === 'All' || typeFilter === '' || item.type === typeFilter;     return matchesSearch && matchesType;
   });

return (
<div style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1a3028', paddingBottom: '30px' }}>
{/* Header */}
<div style={{ padding: '20px 20px 0 20px', maxWidth: '1100px', margin: '0 auto' }}></div>
<span style={{ background: '#1a3028', color: 'white', padding: '8px', borderRadius: '50%', display: 'inline-flex' }}>🎓</span>
Scholarship Finder
{/* Hero */}
<div style={{ backgroundColor: '#1a3028', color: '#fcfbf7', padding: '40px 20px' }}></div>
<h1 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>Your next step deserves a little support.</h1>
<p style={{ color: '#c2d5cd', margin: 0 }}>Explore elite financial aid and top university scholarships curated for your profile.</p>
{/* Controls */}
<div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
<input
type="text"
placeholder="Search by university..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
style={{ flex: 2, padding: '12px', borderRadius: '30px', border: '1px solid #eaddca', outline: 'none' }}
/>
<select
value={typeFilter}
onChange={(e) => setTypeFilter(e.target.value)}
style={{ flex: 1, padding: '12px', borderRadius: '30px', border: '1px solid #eaddca', background: '#fff' }}
>
<option value="All">All Funding</option>
        <option value="Full-Funded">Full-Funded</option>
       <option value="Partial-Funded">Partial-Funded</option>
</select>
  {/* Grid list */}
<div style={{ width: '1100px', margin: '20px auto', padding: '0 20px' }}>
<h2 style={{ fontSize: '1.2rem', font: 'bold', marginBottom: '20px' }}></h2>
  Opportunities to explore ({filteredScholarships.length})
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>     {filteredScholarships.map(item => (
  <div key={item.id} style={{ backgroundColor: '#fff', border: '1px solid #eaddca', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  97           <p style={{ fontSize: '0.8rem', color: '#b58a57', margin: '0 0 5px 0', fontWeight: 'bold' }}>{item.sponsor}</p>
  98           <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px 0', color: '#1a3028' }}>{item.title}</h3>
<p style={{ fontWeight: 'bold', margin: '5px 0' }}>{item.amount}</p>
<p style={{ fontSize: '0.85rem', color: '#667a70', margin: '2px 0' }}>Level: {item.category}</p>
<p style={{ fontSize: '0.85rem', color: '#a0522d', margin: '2px 0' }}>Deadline: {item.deadline}</p>

<a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#1a3028', color: '#fcfbf7', padding: '10px', borderRadius: '30px', textDecoration: 'none', marginTop: '15px', fontSize: '0.9rem' }}>
  Apply Now ↗
 </a>
   </div>	
 ))}
 </div> 	</div> 		</div>										
</div>
)
}
