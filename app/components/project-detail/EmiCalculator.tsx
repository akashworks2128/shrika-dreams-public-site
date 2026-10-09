"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface EmiCalculatorProps {
  /** Seed the loan amount from the project's starting price, in ₹ lakh. */
  defaultLoanLakh?: number;
}

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/**
 * Standard reducing-balance EMI formula:
 * EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * where P = principal, r = monthly interest rate, n = tenure in months.
 */
function calculateEmi(principal: number, annualRatePct: number, tenureYears: number) {
  const r = annualRatePct / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

export default function EmiCalculator({ defaultLoanLakh = 85 }: EmiCalculatorProps) {
  const [loanLakh, setLoanLakh] = useState(defaultLoanLakh);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalPayment, totalInterest } = useMemo(() => {
    const principal = loanLakh * 100000;
    const monthlyEmi = calculateEmi(principal, rate, tenure);
    const total = monthlyEmi * tenure * 12;
    return {
      emi: monthlyEmi,
      totalPayment: total,
      totalInterest: total - principal,
    };
  }, [loanLakh, rate, tenure]);

  return (
    <section className="py-8 lg:py-10 bg-white border-t border-black/[0.05]">
      <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Plan Your Purchase
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy flex items-center gap-2.5">
            <Calculator className="w-6 h-6 text-gold" />
            EMI Calculator
          </h2>
        </FadeIn>

        <FadeIn
          delay={0.1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 rounded-xl border border-black/[0.06] bg-offwhite p-5 lg:p-8"
        >
          {/* Inputs */}
          <div className="space-y-5">
            <SliderField
              label="Loan Amount"
              value={loanLakh}
              onChange={setLoanLakh}
              min={10}
              max={500}
              step={1}
              displayValue={`₹${loanLakh}L`}
            />
            <SliderField
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={6}
              max={15}
              step={0.1}
              displayValue={`${rate.toFixed(1)}%`}
            />
            <SliderField
              label="Loan Tenure"
              value={tenure}
              onChange={setTenure}
              min={1}
              max={30}
              step={1}
              displayValue={`${tenure} yrs`}
            />
          </div>

          {/* Result */}
          <div className="flex flex-col justify-center rounded-lg bg-navy p-5 lg:p-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wide text-white/50 mb-1.5">
              Monthly EMI
            </p>
            <p className="font-serif text-3xl lg:text-4xl font-bold text-gold mb-5">
              ₹{formatINR(emi)}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wide text-white/45 mb-0.5">
                  Total Interest
                </p>
                <p className="text-sm font-semibold text-white">
                  ₹{formatINR(totalInterest)}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wide text-white/45 mb-0.5">
                  Total Payment
                </p>
                <p className="text-sm font-semibold text-white">
                  ₹{formatINR(totalPayment)}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <p className="text-xs text-gray-400 mt-3">
          * This is an indicative estimate for planning purposes only and is not connected to any bank. Actual EMI may vary based on your lender&apos;s terms.
        </p>
      </div>
    </section>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  displayValue,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  displayValue: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </label>
        <span className="text-sm font-bold text-navy">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-gold cursor-pointer"
      />
    </div>
  );
}
