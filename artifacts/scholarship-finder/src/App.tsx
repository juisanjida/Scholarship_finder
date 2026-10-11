 
import React, { useState } from 'react';
import { scholarshipData } from '@/data/scholarships';

    export default function App() {
      const [searchQuery, setSearchQuery] = useState('');
      const [categoryFilter, setCategoryFilter] = useState('');
      const [typeFilter, setTypeFilter] = useState('');

      // সার্চ ও ফিল্টারিং লজিক
      const filteredScholarships = scholarshipData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.sponsor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === '' || item.category.includes(categoryFilter);
        const matchesType = typeFilter === '' || item.type === typeFilter;
        return matchesSearch && matchesCategory && matchesType;
      });

      return (
        <div style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1a3028' }}>

          {/* প্রফেশনাল হেডার ও হিরো সেকশন */}
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #eaddca' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <span style={{ background: '#1a3028', color: 'white', padding: '8px', borderRadius: '50%', display: 'inline-flex' }}>🎓</span>
              Scholarship Finder
            </div>
          </header>

          <div style={{ backgroundColor: '#1a3028', color: '#fcfbf7', padding: '60px 40px', textAlign: 'left' }}>
            <span style={{ fontSize: '0.85rem', letterSpacing: '2px', color: '#c2d5cd', fontWeight: '600' }}>✨ A MORE THOUGHTFUL WAY TO SEARCH</span>
            <h1 style={{ fontSize: '3rem', margin: '15px 0', fontWeight: '500', lineHeight: '1.2', maxWidth: '700px' }}>
              Your next step deserves a little support.
            </h1>
            <p style={{ color: '#c2d5cd', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6' }}>
              Find scholarships that fit your studies, your story, and where you want to go next.
            </p>
          </div>

          <p style={{ maxWidth: '1100px', margin: '18px auto 0', padding: '0 20px', color: '#667a70', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Scholarship details and deadlines can change. Confirm current eligibility and dates with each sponsor before applying.
          </p>

          {/* সার্চ এবং ফিল্টার বার */}
          <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
            <h3 style={{ fontSize: '0.85rem', letterSpacing: '1px', color: '#b58a57', fontWeight: '600', textTransform: 'uppercase', marginBottom: '15px' }}>
              Start with what matters to you
            </h3>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 2, minWidth: '300px', position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Search by keyword, sponsor, or study area" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '30px', border: '1px solid #eaddca', backgroundColor: '#fff', boxSizing: 'border-box', fontSize: '0.95rem', outline: 'none' }}
                />
                <span style={{ position: 'absolute', left: '15px', top: '15px', color: '#8aa095' }}>🔍</span>
              </div>

              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '30px', border: '1px solid #eaddca', backgroundColor: '#fff', fontSize: '0.95rem', outline: 'none' }}
              >
                <option value="">All Categories</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
              </select>

              <select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '30px', border: '1px solid #eaddca', backgroundColor: '#fff', fontSize: '0.95rem', outline: 'none' }}
              >
                <option value="">All Types</option>
                <option value="Full-Funded">Full-Funded</option>
                <option value="Partial-Funded">Partial-Funded</option>
              </select>
            </div>
          </div>

          {/* স্কলারশিপ লিস্ট সেকশন */}
          <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '500', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Opportunities to explore 
              <span style={{ backgroundColor: '#e2ece8', color: '#1a3028', fontSize: '0.85rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>
                {filteredScholarships.length}
              </span>
            </h2>

            {filteredScholarships.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#667a70' }}>No scholarships match your filters. Try adjusting your search!</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                {filteredScholarships.map(item => (
                  <div key={item.id} style={{ backgroundColor: '#fff', border: '1px solid #eaddca', borderRadius: '4px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#b58a57', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {item.sponsor}
                        </span>
                        <span style={{ fontSize: '0.75rem', backgroundColor: '#e2ece8', color: '#1a3028', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>
                          {item.type}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.25rem', fontWeight: '500', margin: '0 0 15px 0', lineHeight: '1.4', color: '#1a3028' }}>
                        {item.title}
                      </h3>

                      <div style={{ borderTop: '1px dashed #eaddca', padding: '12px 0', margin: '15px 0 0 0' }}>
                        <p style={{ margin: '8px 0', fontSize: '1.1rem', fontWeight: '600', color: '#1a3028' }}>{item.amount}</p>
                        <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#667a70' }}><strong>Category:</strong> {item.category}</p>
                        <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#a0522d', fontWeight: '600' }}>📅 Deadline: {item.deadline}</p>
                      </div>
                    </div>

                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#1a3028', color: '#fcfbf7', padding: '12px', borderRadius: '30px', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem', marginTop: '20px' }}>
                      Apply Now ↗
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      );
    }