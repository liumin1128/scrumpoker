import { ArrowUpRight, Layers2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative py-2 lg:py-8">
      <Badge
        variant="secondary"
        className="gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em]"
      >
        <span className="size-1.5 rounded-full bg-primary" />
        SMALL CARDS. SHARED CLARITY.
      </Badge>

      <h1 className="mt-6 text-[clamp(2.75rem,5.5vw,5rem)] font-semibold leading-[1.08] tracking-[-0.065em]">
        Get your team
        <br />
        on the{" "}
        <span className="font-serif font-normal italic text-primary">
          same page.
        </span>
      </h1>
      <p className="mt-5 max-w-[390px] text-base leading-7 text-muted-foreground">
        Big ideas start with a little alignment. A thoughtful space to estimate,
        discuss, and move forward together.
      </p>

      <div
        className="relative mt-7 hidden h-[235px] max-w-[460px] sm:block"
        aria-hidden="true"
      >
        <div className="dot-grid absolute inset-x-5 inset-y-4 rounded-[50%] [mask-image:radial-gradient(ellipse,black_25%,transparent_72%)]" />
        <div className="absolute left-14 top-6 flex -rotate-[16deg]">
          {[3, 5, 8].map((score, index) => (
            <div
              key={score}
              className={cn(
                "relative flex h-[156px] w-[108px] items-center justify-center rounded-xl border shadow-[0_8px_20px_-10px_rgba(30,60,40,0.25)]",
                index === 0 && "z-10 bg-card text-primary",
                index === 1 &&
                  "card-pattern z-20 -ml-4 -translate-y-2 rotate-[16deg] border-primary bg-primary text-primary-foreground",
                index === 2 &&
                  "z-30 -ml-3 translate-y-5 rotate-[32deg] border-[#d1dfc5] bg-[#e7eedc] text-primary dark:border-primary/25 dark:bg-secondary",
              )}
            >
              <span className="absolute left-3 top-2 text-sm font-semibold">
                {score}
              </span>
              {index === 1 ? (
                <Layers2 className="size-9" strokeWidth={1.3} />
              ) : (
                <span className="text-5xl font-medium tracking-tighter">
                  {score}
                </span>
              )}
              <span className="absolute bottom-2 right-3 rotate-180 text-sm font-semibold">
                {score}
              </span>
            </div>
          ))}
        </div>
        <Sparkles
          className="absolute right-12 top-7 size-6 text-primary/50"
          strokeWidth={1.4}
        />
        <div className="absolute bottom-0 right-3 flex -rotate-6 items-center gap-2 font-serif text-lg italic text-muted-foreground">
          A little perspective goes a long way.
          <ArrowUpRight className="size-5 -translate-y-3" strokeWidth={1} />
        </div>
      </div>
    </section>
  );
}
