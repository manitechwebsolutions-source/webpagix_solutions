'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Award, Calendar, Briefcase, User, Folder, MapPin } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import internDataRaw from '@/data/interns.json';

// Define the shape of our imported JSON
type InternRecord = {
  name: string;
  role: string;
  projectTitle: string;
  internshipMode: string;
  startDate: string;
  endDate: string;
  status: string;
  issuedDate: string;
};

// Safe cast
const internData: Record<string, InternRecord> = internDataRaw as Record<string, InternRecord>;

export default function VerifyPageClient() {
  const [verificationCode, setVerificationCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<InternRecord | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    setHasSearched(true);
    const upperCode = verificationCode.trim().toUpperCase();

    if (internData[upperCode]) {
      setResult(internData[upperCode]);
    } else {
      setResult(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div variants={staggerItem} className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#0FADA8]/10 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-[#0FADA8]" />
            </div>
          </motion.div>
          <motion.h1 variants={staggerItem} className="text-4xl font-extrabold text-[#111827] mb-4">
            Certificate Verification
          </motion.h1>
          <motion.p variants={staggerItem} className="text-lg text-[#6B7280]">
            Enter the certificate verification code to validate the authenticity of a Webpagix internship.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-8"
        >
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="e.g. WPS-INT-xxxx-xx"
                className="w-full pl-14 pr-32 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-[#111827] font-medium outline-none focus:border-[#0FADA8] focus:bg-white transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-[#111827] text-white rounded-xl font-medium hover:bg-[#0FADA8] transition-colors duration-300 shadow-sm"
              >
                Verify
              </button>
            </div>
          </form>
        </motion.div>

        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 border ${result
                ? 'bg-green-50/50 border-green-100'
                : 'bg-red-50/50 border-red-100'
              }`}
          >
            {result ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-green-200/50 pb-6">
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <h3 className="text-xl font-bold text-green-900">Valid Certificate Found</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-700/70 text-sm font-medium">
                      <User className="w-4 h-4" /> Intern Name
                    </div>
                    <p className="text-[#111827] font-semibold text-lg">{result.name}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-700/70 text-sm font-medium">
                      <Briefcase className="w-4 h-4" /> Role
                    </div>
                    <p className="text-[#111827] font-semibold text-lg">{result.role}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-700/70 text-sm font-medium">
                      <Calendar className="w-4 h-4" /> Duration
                    </div>
                    <p className="text-[#111827] font-medium">
                      {result.startDate} to {result.endDate}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-700/70 text-sm font-medium">
                      <Folder className="w-4 h-4" /> Project Title
                    </div>
                    <p className="text-[#111827] font-medium">{result.projectTitle}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-700/70 text-sm font-medium">
                      <MapPin className="w-4 h-4" /> Internship Mode
                    </div>
                    <p className="text-[#111827] font-medium">{result.internshipMode}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-700/70 text-sm font-medium">
                      <Award className="w-4 h-4" /> Status
                    </div>
                    <p className="text-[#111827] font-medium">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {result.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-2">Certificate Not Found</h3>
                <p className="text-red-700/80">
                  We couldn't find a valid certificate matching that code. Please check the code and try again.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
