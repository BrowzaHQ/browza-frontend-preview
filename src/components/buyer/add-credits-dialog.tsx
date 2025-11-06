// components/buyer/add-credits-dialog.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useBuyerStore } from '@/stores/buyer-store';

interface AddCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QUICK_AMOUNTS = [
  { label: '₹1,000', value: 1000 },
  { label: '₹5,000', value: 5000 },
  { label: '₹10,000', value: 10000 },
  { label: '₹25,000', value: 25000 },
];

const FEATURE_FLAG_OPTIMISTIC_UPDATE = true; // Toggle for optimistic balance update

export function AddCreditsDialog({ open, onOpenChange }: AddCreditsDialogProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToBalance } = useBuyerStore();

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedAmount(5000);
      setCustomAmount('');
      setIsProcessing(false);
    }
  }, [open]);

  const handleQuickAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers
    const numValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numValue);
    if (numValue) {
      setSelectedAmount(parseInt(numValue, 10));
    } else {
      setSelectedAmount(0);
    }
  };

  const isValidAmount = selectedAmount >= 100;

  const handlePayment = async () => {
    if (!isValidAmount) return;

    setIsProcessing(true);

    // Mock payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock success
    const amountFormatted = selectedAmount.toLocaleString('en-IN');
    
    // Optimistic balance update (feature flag)
    if (FEATURE_FLAG_OPTIMISTIC_UPDATE) {
      addToBalance(selectedAmount);
    }

    // Show success toast
    toast.success('Credits added successfully!', {
      description: `₹${amountFormatted} has been added to your wallet. GST invoice will be emailed shortly.`,
      duration: 5000,
    });

    setIsProcessing(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add Credits to Wallet
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Secure payment via Razorpay. GST invoice generated automatically.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Amounts */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Quick Amounts</h3>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_AMOUNTS.map((amount) => (
              <button
                key={amount.value}
                onClick={() => handleQuickAmount(amount.value)}
                disabled={isProcessing}
                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  selectedAmount === amount.value && !customAmount
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {amount.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="space-y-2">
          <label htmlFor="custom-amount" className="text-sm font-medium text-gray-700">
            Custom Amount (₹)
          </label>
          <Input
            id="custom-amount"
            type="text"
            inputMode="numeric"
            placeholder="Enter amount (min ₹100)"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            disabled={isProcessing}
            className="h-10 rounded-md border border-gray-200 px-3 text-sm"
          />
          {customAmount && selectedAmount < 100 && (
            <p className="text-xs text-red-600">Minimum amount is ₹100</p>
          )}
        </div>

        {/* Enterprise Billing Info */}
       <div className="rounded-md border border-[rgba(162,244,253,1)] bg-[rgba(236,254,255,1)] p-3">
  <p className="text-xs font-medium text-[rgba(0,117,149,1)]">Enterprise Billing:</p>
  <p className="mt-1 text-xs text-[rgba(0,117,149,1)]">
    • 18% GST applied • Instant processing • Razorpay secured
  </p>
</div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={!isValidAmount || isProcessing}
          className="h-11 w-full rounded-md bg-black text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" stroke="white" strokeWidth="2" />
              </svg>
              Pay with Razorpay
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
