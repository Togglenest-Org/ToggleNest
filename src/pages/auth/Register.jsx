import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../../components/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/organization" replace />;
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    try {
      const response = await authService.register(form);
      const { _id, name, email, token } = response;
      login({ _id, name, email }, token);
      navigate('/organization');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-10">
      <div className="animate-fade-in-up w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-y-4">
          <Logo />
          <p className="text-sm text-neutral-500">
            <Link to="/" className="inline-flex items-center gap-1 font-medium text-neutral-700 transition hover:text-neutral-900">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
          </p>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-xl shadow-neutral-900/5">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-neutral-900">Create your account</h1>
          <p className="mt-2 text-center text-sm text-neutral-500">Start moving work forward in minutes.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <Input label="Full name" name="name" placeholder="Alex Morgan" value={form.name} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error ? (
              <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>
            ) : null}

            <Button className="w-full" type="submit">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-neutral-900 transition hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
