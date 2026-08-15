import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  ShieldCheck
} from "lucide-react";

function Home() {
  return (
    <main>

      {/* Hero */}

      <section className="overflow-hidden border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">

          <div className="max-w-4xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Machine learning powered
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Understand when
              <br />
              shoppers are ready
              <span className="text-indigo-600"> to buy.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-500">
              ShopSense analyzes online visitor behavior and
              predicts the likelihood of a purchase using a
              trained XGBoost machine learning model.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/predict"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Make a prediction
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                How it works
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* Stats */}

      <section className="border-b border-slate-200 bg-slate-50">

        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4">

          <Stat
            value="12,330"
            label="Sessions in dataset"
          />

          <Stat
            value="18"
            label="Behavioral features"
          />

          <Stat
            value="XGBoost"
            label="Production model"
          />

          <Stat
            value="Binary"
            label="Prediction type"
          />

        </div>

      </section>


      {/* Product overview */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">

          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Built for analysis
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Turn browsing behavior into a measurable signal.
              </h2>

              <p className="mt-5 leading-7 text-slate-500">
                Enter a visitor session and let ShopSense
                evaluate the behavioral signals that influence
                online purchase intention.
              </p>

            </div>


            <div className="grid gap-5 sm:grid-cols-2">

              <Feature
                icon={BrainCircuit}
                title="Machine learning"
                text="Predictions are generated using the trained XGBoost pipeline."
              />

              <Feature
                icon={BarChart3}
                title="Probability"
                text="See the estimated probability of a purchase rather than only a label."
              />

              <Feature
                icon={ShieldCheck}
                title="Validated pipeline"
                text="Input preprocessing and model inference are handled consistently."
              />

              <Feature
                icon={ArrowRight}
                title="Simple workflow"
                text="Enter session data, submit it, and receive a clear result."
              />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


function Stat({ value, label }) {
  return (
    <div className="px-5 py-8 sm:px-8">
      <p className="text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}


function Feature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-slate-200 p-6">

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

export default Home;