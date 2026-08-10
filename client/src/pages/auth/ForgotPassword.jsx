import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Logo from '../../components/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
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
          <h1 className="text-center text-2xl font-semibold tracking-tight text-neutral-900">Reset your password</h1>
          <p className="mt-2 text-center text-sm text-neutral-500">
            Enter your email and we will send a reset link shortly.
          </p>

          {submitted ? (
            <div className="animate-fade-in-up mt-8 flex flex-col items-center rounded-lg bg-emerald-50 px-6 py-8 text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              <p className="mt-3 text-sm font-medium text-emerald-700">Check your inbox</p>
              <p className="mt-1 text-xs text-emerald-600">
                If an account exists for <span className="font-semibold">{email}</span>, a reset link is on its way.
              </p>
            </div>
          ) : (
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Button className="w-full" type="submit">
                Send reset link
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-neutral-500">
            <Link to="/login" className="font-semibold text-neutral-900 transition hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
