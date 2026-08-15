import {
  Database,
  GitBranch,
  Cpu,
  Server
} from "lucide-react";

function About() {
  return (
    <main className="bg-white">

      <section className="border-b border-slate-200">

        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            About ShopSense
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A machine learning system for online shopping intention.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-500">
            ShopSense analyzes website session behavior and
            predicts whether the session is likely to result
            in a purchase.
          </p>

        </div>

      </section>


      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">

        <div className="grid gap-5 md:grid-cols-2">

          <TechCard
            icon={Database}
            title="Dataset"
            text="Online Shoppers Purchasing Intention Dataset containing 12,330 sessions."
          />

          <TechCard
            icon={Cpu}
            title="Machine learning"
            text="The current production prediction pipeline uses XGBoost."
          />

          <TechCard
            icon={Server}
            title="Backend"
            text="Node.js and Express handle the application's API layer."
          />

          <TechCard
            icon={GitBranch}
            title="ML service"
            text="A Python service loads the trained pipeline and performs inference."
          />

        </div>


        <div className="mt-16 border-t border-slate-200 pt-12">

          <h2 className="text-2xl font-semibold text-slate-950">
            Prediction pipeline
          </h2>

          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-6">

            <div className="min-w-max font-mono text-sm text-slate-600">

              <span>Visitor session</span>
              <span className="mx-3">→</span>

              <span>React</span>
              <span className="mx-3">→</span>

              <span>Node.js</span>
              <span className="mx-3">→</span>

              <span>Python ML service</span>
              <span className="mx-3">→</span>

              <span>XGBoost</span>
              <span className="mx-3">→</span>

              <span>Prediction</span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


function TechCard({
  icon: Icon,
  title,
  text
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-7">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
        <Icon size={19} />
      </div>

      <h3 className="mt-5 font-semibold text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}

export default About;