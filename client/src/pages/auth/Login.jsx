import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react';
import Logo from '../../components/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
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
    if (!form.email || !form.password) {
      setError('Please fill in both email and password.');
      return;
    }
    const response = await authService.login(form);
    login(response.user, response.token);
    navigate('/organization');
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
          <h1 className="text-center text-2xl font-semibold tracking-tight text-neutral-900">Sign in to ToggleNest</h1>
          <p className="mt-2 text-center text-sm text-neutral-500">Welcome back! Please sign in to continue.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error ? (
              <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>
            ) : null}

            <Button className="w-full" type="submit">
              Continue
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
            <Link to="/forgot-password" className="inline-flex items-center gap-1 transition hover:text-neutral-900">
              <KeyRound className="h-3.5 w-3.5" /> Forgot password?
            </Link>
            <Link to="/register" className="inline-flex items-center gap-1 font-medium transition hover:text-neutral-900">
              <Mail className="h-3.5 w-3.5" /> Create account
            </Link>
          </div>

          <div className="mt-6 rounded-md bg-slate-50 px-4 py-3 text-center text-xs text-neutral-400">
            Demo mode — any email and password will sign you in.
          </div>
        </div>
      </div>
    </div>
  );
}
