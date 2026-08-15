import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

import FormSection from "../components/FormSection";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import PredictionResult from "../components/PredictionResult";

import {
  predictShoppingIntention
} from "../services/api";


const initialForm = {

  Administrative: 0,
  Administrative_Duration: 0,

  Informational: 0,
  Informational_Duration: 0,

  ProductRelated: 0,
  ProductRelated_Duration: 0,

  BounceRates: 0,
  ExitRates: 0,

  PageValues: 0,
  SpecialDay: 0,

  Month: "Nov",

  OperatingSystems: 2,
  Browser: 1,
  Region: 1,
  TrafficType: 2,

  VisitorType: "Returning_Visitor",

  Weekend: false
};


function Predict() {

  const [form, setForm] =
    useState(initialForm);

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleChange = (event) => {

    const {
      name,
      value,
      type,
      checked
    } = event.target;

    setForm((current) => ({
      ...current,

      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
            ? checked
            : value
    }));
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {

      const response =
        await predictShoppingIntention(
          form
        );

      setResult(response);

    } catch (err) {

      console.error(err);

      setError(
        "Prediction failed. Please make sure the ShopSense backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  const resetForm = () => {

    setForm(initialForm);
    setResult(null);
    setError("");

  };


  return (
    <main className="bg-slate-50">

      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">

        <div className="mb-10 max-w-2xl">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Prediction
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Analyze a shopping session.
          </h1>

          <p className="mt-4 leading-7 text-slate-500">
            Enter the visitor's browsing behavior below.
            ShopSense will evaluate the session using its
            trained machine learning model.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          <FormSection
            number="01"
            title="Page activity"
            description="How the visitor interacted with different types of pages."
          >

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              <InputField
                label="Administrative pages"
                name="Administrative"
                value={form.Administrative}
                onChange={handleChange}
                min="0"
                step="1"
              />

              <InputField
                label="Administrative duration"
                name="Administrative_Duration"
                value={form.Administrative_Duration}
                onChange={handleChange}
              />

              <InputField
                label="Informational pages"
                name="Informational"
                value={form.Informational}
                onChange={handleChange}
                min="0"
                step="1"
              />

              <InputField
                label="Informational duration"
                name="Informational_Duration"
                value={form.Informational_Duration}
                onChange={handleChange}
              />

              <InputField
                label="Product related pages"
                name="ProductRelated"
                value={form.ProductRelated}
                onChange={handleChange}
                min="0"
                step="1"
              />

              <InputField
                label="Product related duration"
                name="ProductRelated_Duration"
                value={form.ProductRelated_Duration}
                onChange={handleChange}
              />

            </div>

          </FormSection>


          <div className="mt-10">
            <FormSection
              number="02"
              title="Engagement"
              description="Signals that describe the quality of the visitor's session."
            >

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                <InputField
                  label="Bounce rate"
                  name="BounceRates"
                  value={form.BounceRates}
                  onChange={handleChange}
                  min="0"
                  max="1"
                  step="0.001"
                />

                <InputField
                  label="Exit rate"
                  name="ExitRates"
                  value={form.ExitRates}
                  onChange={handleChange}
                  min="0"
                  max="1"
                  step="0.001"
                />

                <InputField
                  label="Page value"
                  name="PageValues"
                  value={form.PageValues}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />

                <InputField
                  label="Special day"
                  name="SpecialDay"
                  value={form.SpecialDay}
                  onChange={handleChange}
                  min="0"
                  max="1"
                  step="0.1"
                />

              </div>

            </FormSection>
          </div>


          <div className="mt-10">
            <FormSection
              number="03"
              title="Visitor & session"
              description="Technical and contextual information about the session."
            >

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                <SelectField
                  label="Month"
                  name="Month"
                  value={form.Month}
                  onChange={handleChange}
                  options={[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "June",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                  ]}
                />

                <InputField
                  label="Operating system"
                  name="OperatingSystems"
                  value={form.OperatingSystems}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />

                <InputField
                  label="Browser"
                  name="Browser"
                  value={form.Browser}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />

                <InputField
                  label="Region"
                  name="Region"
                  value={form.Region}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />

                <InputField
                  label="Traffic type"
                  name="TrafficType"
                  value={form.TrafficType}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />

                <SelectField
                  label="Visitor type"
                  name="VisitorType"
                  value={form.VisitorType}
                  onChange={handleChange}
                  options={[
                    "Returning_Visitor",
                    "New_Visitor",
                    "Other"
                  ]}
                />

              </div>


              <label className="mt-6 flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  name="Weekend"
                  checked={form.Weekend}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <span className="text-sm font-medium text-slate-700">
                  Session occurred on a weekend
                </span>

              </label>

            </FormSection>
          </div>


          {error && (

            <div className="mt-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>

          )}


          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">

            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw size={15} />
              Reset
            </button>


            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Analyzing..."
                : "Analyze session"
              }

              {!loading && (
                <ArrowRight size={16} />
              )}

            </button>

          </div>

        </form>


        <PredictionResult
          result={result}
        />

      </div>

    </main>
  );
}

export default Predict;