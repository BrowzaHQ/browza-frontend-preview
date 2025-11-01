// app/(buyer)/billing/page.tsx
import { lazy, Suspense } from 'react';

const BillingContent = lazy(() => import('@/components/buyer/billing-content'));

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
}

// app/(buyer)/create-job/page.tsx
export function CreateJobPage() {
  return <div className="p-6"><h2 className="text-2xl font-bold">Create Job</h2></div>;
}

// app/(buyer)/jobs/page.tsx
export  function JobsPage() {
  return <div className="p-6"><h2 className="text-2xl font-bold">Jobs</h2></div>;
}

// app/(buyer)/logs/page.tsx
export function LogsPage() {
  return <div className="p-6"><h2 className="text-2xl font-bold">Logs</h2></div>;
}

// app/(buyer)/account/page.tsx
export  function AccountPage() {
  return <div className="p-6"><h2 className="text-2xl font-bold">Account</h2></div>;
}
