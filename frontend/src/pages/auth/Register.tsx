import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Register Component
 * Step 1 of the Progressive Onboarding flow.
 * Collects core user details (First Name, Last Name, Email, Password).
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    try {
      console.log('Registering user:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // On success, redirect to step 2 (onboarding)
      navigate('/onboarding');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="card w-full max-w-md">
        <header className="mb-8">
          <h1 className="text-3xl mb-2 font-heading">
            Create your <em>Account</em>
          </h1>
          <p className="text-[var(--color-text)] opacity-70">
            Join the InternBridge community and start your professional journey.
          </p>
        </header>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider opacity-60">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                className="input w-full"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider opacity-60">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className="input w-full"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider opacity-60">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              className="input w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider opacity-60">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6 py-3"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <footer className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-sm opacity-60">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline"
            >
              Sign In
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
