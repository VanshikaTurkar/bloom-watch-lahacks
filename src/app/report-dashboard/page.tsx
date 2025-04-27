'use client';

import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type Report = {
  type: 'General' | 'Bloom' | 'Animal';
  location: string;
  description: string;
  date: string;
};

const reports: Report[] = [
  { type: 'Bloom', location: 'Lagoon Bay', description: 'Green bloom expanding rapidly.', date: '2025-04-26' },
  { type: 'Animal', location: 'Dockside', description: 'Injured pelican spotted.', date: '2025-04-25' },
  { type: 'General', location: 'Marina Beach', description: 'Water appears murky.', date: '2025-04-24' },
  { type: 'Bloom', location: 'North Shore', description: 'Small red bloom observed.', date: '2025-04-23' },
  { type: 'Animal', location: 'West Pier', description: 'Seagull with abnormal behavior.', date: '2025-04-22' },
  { type: 'General', location: 'City Dock', description: 'Floating debris spotted.', date: '2025-04-21' },
];

export default function ReportsDashboard() {
  const router = useRouter();

  return (
    <main className={styles.page}>
      <Navbar />
      
      <div className={styles.card}>
        {/* Add Report Button */}
        {/* ADD CODE */}
        <div className={styles.headerRow}>
          <button
            className={styles.reportButton}
            onClick={() => router.push('/report')}
          >
            + New Report
          </button>
        </div>
        {/* ADD CODE */}
        <center><h1 className={styles.heading}>Reports Dashboard</h1></center>

        <div className={styles.grid}>
          {reports.map((report, index) => (
            <div key={index} className={styles.reportCard}>
              <div className={`${styles.badge} ${styles[report.type.toLowerCase()]}`}>
                {report.type}
              </div>
              <h2 className={styles.location}>{report.location}</h2>
              <p className={styles.description}>{report.description}</p>
              <p className={styles.date}>{report.date}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
