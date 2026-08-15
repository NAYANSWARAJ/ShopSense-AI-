import {
  CheckCircle2,
  XCircle,
  TrendingUp
} from "lucide-react";

function PredictionResult({ result }) {

  if (!result) {
    return null;
  }

  const data = result.data;

  const purchase =
    data.prediction === 1;

  const probability =
    data.purchase_probability * 100;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">

      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Prediction result
        </p>
      </div>


      <div className="p-6 sm:p-8">

        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                purchase
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {purchase ? (
                <CheckCircle2 size={28} />
              ) : (
                <XCircle size={28} />
              )}
            </div>

            <div>

              <p className="text-2xl font-semibold tracking-tight text-slate-950">
                {purchase
                  ? "Purchase likely"
                  : "Purchase unlikely"
                }
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {data.confidence_level} confidence
              </p>

            </div>

          </div>


          <div className="sm:text-right">

            <p className="text-4xl font-semibold tracking-tight text-indigo-600">
              {probability.toFixed(1)}%
            </p>

            <p className="mt-1 text-sm text-slate-500">
              purchase probability
            </p>

          </div>

        </div>


        <div className="mt-8">

          <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">

            <span>
              Probability
            </span>

            <span>
              {probability.toFixed(1)}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-700"
              style={{
                width: `${probability}%`
              }}
            />

          </div>

        </div>


        <div className="mt-7 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">

          <Info
            label="Model"
            value={data.model}
          />

          <Info
            label="Prediction"
            value={data.label}
          />

        </div>

      </div>

    </div>
  );
}


function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
        {label === "Model" && (
          <TrendingUp size={14} />
        )}
        {value}
      </p>
    </div>
  );
}

export default PredictionResult;