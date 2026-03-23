import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * CompleteProfile Component
 * Step 2 of the Progressive Onboarding flow.
 * Collects academic details (Registration Number, School, Department, Bio).
 */
const CompleteProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    regNumber: '',
    school: '',
    department: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    try {
      console.log('Updating profile:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // On success, redirect to dashboard
      navigate('/dashboard/student');
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="card w-full max-w-2xl">
        <header className="mb-8">
          <span className="label-mono mb-2 inline-block">STEP 2 OF 2</span>
          <h1 className="text-3xl mb-2 font-heading">
            Complete your <em>Academic Profile</em>
          </h1>
          <p className="text-[var(--color-text)] opacity-70">
            Provide your academic details to unlock all platform features.
          </p>
        </header>

        <form onSubmit={handleCompleteProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider opacity-60">
                Registration Number
              </label>
              <input
                type="text"
                name="regNumber"
                placeholder="24rp03297"
                className="input w-full"
                value={formData.regNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider opacity-60">School</label>
              <select
                name="school"
                className="input w-full appearance-none"
                value={formData.school}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your School</option>
                <option value="College of Science and Technology">
                  College of Science and Technology
                </option>
                <option value="College of Business">
                  College of Business
                </option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider opacity-60">Department</label>
            <select
              name="department"
              className="input w-full appearance-none"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your Department</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider opacity-60">Headline / Bio</label>
            <textarea
              name="bio"
              placeholder="Tell us about your interests and goals..."
              className="input w-full min-h-[120px] py-3"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg"
            >
              {loading ? 'Finalizing Setup...' : 'Complete Setup & Enter Portal'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard/student')}
            className="text-sm opacity-50 hover:opacity-100 italic"
          >
            I'll complete this later (Skip)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
