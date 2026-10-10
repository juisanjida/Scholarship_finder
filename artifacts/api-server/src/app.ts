const scholarshipData = [
  {
    id: 1,
    title: "Erasmus Mundus Joint Masters",
    authority: "European Union",
    degree: "Masters",
    coverage: "Full-Funded",
    country: "Europe",
    amount: "Fully Covered + Monthly Stipend",
    deadline: "০১ মার্চ, ২০২৭",
    link: "https://europa.eu"
  },
  {
    id: 2,
    title: "Chevening Scholarship",
    authority: "UK Government",
    degree: "Masters",
    coverage: "Full-Funded",
    country: "United Kingdom",
    amount: "Full Tuition + Living Allowance",
    deadline: "০৫ নভেম্বর, ২০২৬",
    link: "https://chevening.org"
  },
  {
    id: 3,
    title: "Fulbright Foreign Student Program",
    authority: "US Government",
    degree: "Masters / PhD",
    coverage: "Full-Funded",
    country: "USA",
    amount: "Full Tuition + Airfare + Insurance",
    deadline: "১৫ ফেব্রুয়ারি, ২০২৭",
    link: "https://fulbrightonline.org"
  },
  {
    id: 4,
    title: "MEXT Scholarship",
    authority: "Japanese Government",
    degree: "Bachelors / Masters / PhD",
    coverage: "Full-Funded",
    country: "Japan",
    amount: "100% Tuition Fee + Stipend",
    deadline: "৩০ মে, ২০২৭",
    link: "https://mext.go.jp"
  },
  {
    id: 5,
    title: "PM ICT Fellowship",
    authority: "Bangladesh Government",
    degree: "Masters / PhD",
    coverage: "Partial-Funded",
    country: "Bangladesh",
    amount: "Research Grant & Honorarium",
    deadline: "২০ ডিসেম্বর, ২০২৬",
    link: "https://ictd.gov.bd"
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedCoverage, setSelectedCoverage] = useState('');

  // ফিল্টারিং লজিক
  const filteredScholarships = scholarshipData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDegree = selectedDegree === '' || item.degree.includes(selectedDegree);
    const matchesCoverage = selectedCoverage === '' || item.coverage === selectedCoverage;

    return matchesSearch && matchesDegree && matchesCoverage;
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', paddingBottom: '40px', color: '#1f2937' }}>

      {/* আধুনিক হিরো সেকশন */}
      <div style={{ backgroundColor: '#064e3b', color: 'white', textAlign: 'center', padding: '60px 20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: '700' }}>আপনার স্বপ্নের স্কলারশিপটি খুঁজুন</h1>
        <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
          দেশ ও যোগ্যতার ভিত্তিতে ফিল্টার করে সঠিক ও যাচাইকৃত তথ্যের মাধ্যমে সহজেই আবেদন করুন।
        </p>
      </div>

      {/* সার্চ ও ফিল্টার এরিয়া */}
      <div style={{ maxWidth: '1000px', margin: '-30px auto 40px auto', background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="কীওয়ার্ড বা দেশ দিয়ে খুঁজুন..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 2, minWidth: '250px', padding: '14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '15px', outline: 'none' }}
        />
        <select 
          value={selectedDegree} 
          onChange={(e) => setSelectedDegree(e.target.value)}
          style={{ flex: 1, minWidth: '150px', padding: '14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '15px', background: 'white' }}
        >
          <option value="">ডিগ্রী (সবগুলো)</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>
        <select 
          value={selectedCoverage} 
          onChange={(e) => setSelectedCoverage(e.target.value)}
          style={{ flex: 1, minWidth: '150px', padding: '14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '15px', background: 'white' }}
        >
          <option value="">ফান্ডিং (সবগুলো)</option>
          <option value="Full-Funded">Full-Funded</option>
          <option value="Partial-Funded">Partial-Funded</option>
        </select>
      </div>

      {/* স্কলারশিপ গ্রিড লেআউট */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#111827', fontWeight: '600' }}>Opportunities to explore</h2>

        {filteredScholarships.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '40px' }}>দুঃখিত! এই ফিল্টারে কোনো স্কলারশিপ পাওয়া যায়নি।</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {filteredScholarships.map(scholarship => (
              <div key={scholarship.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div>
                  <span style={{ background: scholarship.coverage === 'Full-Funded' ? '#e6f4ea' : '#fef3c7', color: scholarship.coverage === 'Full-Funded' ? '#137333' : '#d97706', fontWeight: '600', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', display: 'inline-block', marginBottom: '15px' }}>
                    {scholarship.coverage}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', margin: '0 0 12px 0', color: '#064e3b', fontWeight: '700' }}>{scholarship.title}</h3>
                  <p style={{ margin: '6px 0', fontSize: '14px', color: '#4b5563' }}><strong>📍 প্রতিষ্ঠান:</strong> {scholarship.authority}</p>
                  <p style={{ margin: '6px 0', fontSize: '14px', color: '#4b5563' }}><strong>🌍 দেশ:</strong> {scholarship.country}</p>
                  <p style={{ margin: '12px 0 6px 0', fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>💰 {scholarship.amount}</p>
                  <p style={{ color: '#b45309', fontWeight: '600', fontSize: '14px', margin: '8px 0 0 0' }}>📅 শেষ সময়: {scholarship.deadline}</p>
                </div>
                <a href={scholarship.link} target="_blank" rel="noopener noreferrer" style={{ background: '#064e3b', color: 'white', textAlign: 'center', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', display: 'block', marginTop: '20px', fontSize: '15px', transition: 'background 0.2s' }}>
                  বিস্তারিত দেখুন ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}