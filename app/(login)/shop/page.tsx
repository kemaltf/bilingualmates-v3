"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";

function formatIDR(cents: number) {
  const rupiah = Math.round(cents / 100);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(rupiah);
}

type Plan = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceCents: number;
  cta: string;
  variant: VariantProps<typeof buttonVariants>["variant"];
  badge?: string;
  features?: string[];
  expandedDetails: {
    title: string;
    bullets: string[];
    reassurance: string;
  };
};

const plans: Plan[] = [
  {
    id: "sub-3m",
    title: "3 Months (Starter Commitment)",
    subtitle: "To build a habit",
    description:
      "Suitable if you want to start without pressure. Build the habit first, slowly but surely.",
    priceCents: 9900000,
    cta: "Start This Habit",
    variant: "green",
    features: [
      "Daily structured lessons",
      "Habit tracking",
      "Basic vocabulary growth",
    ],
    expandedDetails: {
      title: "What will change in 3 months",
      bullets: [
        "You will build a consistent learning routine",
        "You will understand basic conversations",
        "Learning will feel like a habit, not a chore",
      ],
      reassurance: "Cancel anytime. No pressure. No hidden rules.",
    },
  },
  {
    id: "sub-6m",
    title: "6 Months (Most Chosen)",
    subtitle: "For results that feel real",
    description:
      "This is where change usually happens. Vocabulary increases. Confidence starts to appear.",
    priceCents: 17900000,
    cta: "This Is My Choice",
    variant: "blue",
    badge: "Selected by consistent learners",
    features: [
      "Everything in 3 months",
      "Speaking confidence modules",
      "Weekly progress review",
      "Streak & consistency system",
    ],
    expandedDetails: {
      title: "What will change in 6 months",
      bullets: [
        "You no longer translate in your head",
        "You can respond naturally in daily situations",
        "English becomes part of your routine, not a task",
      ],
      reassurance: "Cancel anytime. No pressure. No hidden rules.",
    },
  },
  {
    id: "sub-12m",
    title: "1 Year (Identity Level)",
    subtitle: "For those who want English to be part of their life",
    description:
      "Not for everyone. But for those who want to stop 'starting from scratch again'.",
    priceCents: 32900000,
    cta: "I Commit to 1 Year",
    variant: "purple",
    features: [
      "Everything above",
      "Advanced fluency tracks",
      "Long-term retention system",
      "Identity-based learning flow",
    ],
    expandedDetails: {
      title: "What will change in 1 year",
      bullets: [
        "English becomes your second nature",
        "You think in English without effort",
        "You have the confidence to express complex ideas",
      ],
      reassurance: "Cancel anytime. No pressure. No hidden rules.",
    },
  },
];

export default function Page() {
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);

  return (
    <main className="w-full space-y-12 pb-12">
      {/* Modal removed as requested to use inline expand instead */}
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
          “Small progress every day beats big intentions rarely used.”
        </h1>
        <div className="text-lg text-neutral-600 dark:text-neutral-400">
          <p>10–15 minutes a day is enough.</p>
          <p>{`The hard part isn't learning, it's consistency.`}</p>
        </div>
      </section>

      {/* Why People Quit Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 max-w-3xl mx-auto border-2 border-neutral-100 dark:border-neutral-800">
        <h2 className="text-xl font-bold mb-6 text-center">
          Why do many people stop learning in week 2?
        </h2>
        <ul className="space-y-3 mb-8 max-w-md mx-auto">
          <li className="flex items-center gap-3">
            <span className="text-rose-500 text-xl">✕</span>
            <span>{`Not because it's hard`}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-rose-500 text-xl">✕</span>
            <span>{`Not because they're busy`}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-emerald-500 text-xl">✓</span>
            <span className="font-medium">
              But because there is no system keeping them going
            </span>
          </li>
        </ul>
        <p className="text-center text-neutral-600 dark:text-neutral-400 italic">
          Subscription is not about access.
          <br />
          {"It's about having a reason to keep coming back."}
        </p>
      </section>

      {/* Social Proof Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white dark:bg-neutral-800 border shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
                {`"First time I've been consistent for over 2 weeks."`}
              </p>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">
                — Rina, Employee
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-neutral-800 border shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
                {`"Doesn't feel like studying, but my vocabulary is growing."`}
              </p>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">
                — Andi, University Student
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-neutral-800 border shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
                {`"Finally, a system that actually works for my busy schedule."`}
              </p>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">
                — Sarah, Manager
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Plans Section */}
      <section>
        <h2 className="text-2xl font-extrabold text-center mb-8">
          Choose Your Commitment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "h-full flex flex-col relative transition-all hover:shadow-lg",
                plan.badge
                  ? "border-sky-500 border-[3px] shadow-sky-100 dark:shadow-none"
                  : ""
              )}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{plan.title}</CardTitle>
                <p className="text-sm font-medium text-muted-foreground">
                  {plan.subtitle}
                </p>
              </CardHeader>
              <CardContent className="space-y-6 flex flex-col grow">
                <div className="space-y-4 grow">
                  <div className="text-3xl font-extrabold">
                    {formatIDR(plan.priceCents)}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 pt-2">
                    {plan.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 space-y-4">
                  {/* Inline Expand Panel */}
                  {selectedPlan === plan.id && (
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4 text-left space-y-3 animate-in fade-in slide-in-from-top-2">
                      <h4 className="font-bold text-sm">
                        {plan.expandedDetails.title}
                      </h4>
                      <ul className="space-y-2">
                        {plan.expandedDetails.bullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                          >
                            <span className="text-emerald-500 mt-0.5">●</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[10px] text-neutral-400 italic pt-1 border-t dark:border-neutral-800">
                        {plan.expandedDetails.reassurance}
                      </p>
                      <Button
                        variant="green"
                        size="sm"
                        className="w-full mt-2"
                        label="Proceed to Payment"
                      />
                    </div>
                  )}

                  <Button
                    variant={plan.variant}
                    size="lg"
                    className="w-full font-bold"
                    label={
                      selectedPlan === plan.id ? "Close Details" : plan.cta
                    }
                    onClick={() =>
                      setSelectedPlan(selectedPlan === plan.id ? null : plan.id)
                    }
                  />
                  {selectedPlan !== plan.id && (
                    <div className="text-center">
                      <p className="text-[10px] text-neutral-400">
                        Cancel anytime. No hidden contracts.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
