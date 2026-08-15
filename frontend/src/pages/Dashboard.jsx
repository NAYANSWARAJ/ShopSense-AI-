import { useEffect, useState } from "react";

import {
  BarChart3,
  ShoppingCart,
  Users,
  TrendingUp
} from "lucide-react";

import api from "../services/api";


function Dashboard() {

  const [analytics, setAnalytics] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const [
          analyticsResponse,
          historyResponse
        ] = await Promise.all([

          api.get("/analytics"),

          api.get("/history?limit=10")

        ]);


        setAnalytics(
          analyticsResponse.data.data
        );


        setHistory(
          historyResponse.data.data
        );


      } catch (error) {

        console.error(
          "Dashboard error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadDashboard();

  }, []);


  if (loading) {

    return (

      <main className="flex min-h-[70vh] items-center justify-center">

        <p className="text-sm text-slate-500">
          Loading analytics...
        </p>

      </main>

    );

  }


  return (

    <main className="bg-slate-50">

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">

        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Analytics
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            ShopSense dashboard
          </h1>

          <p className="mt-3 text-slate-500">
            Overview of prediction activity and purchase intent.
          </p>

        </div>


        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            icon={Users}
            label="Total predictions"
            value={
              analytics?.totalPredictions || 0
            }
          />


          <MetricCard
            icon={ShoppingCart}
            label="Purchase intent"
            value={
              analytics?.purchasePredictions || 0
            }
          />


          <MetricCard
            icon={BarChart3}
            label="Not purchase"
            value={
              analytics?.notPurchasePredictions || 0
            }
          />


          <MetricCard
            icon={TrendingUp}
            label="Avg. probability"
            value={
              `${(
                (analytics?.averagePurchaseProbability || 0)
                * 100
              ).toFixed(1)}%`
            }
          />

        </div>


        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">

          <div className="border-b border-slate-200 px-6 py-5">

            <h2 className="font-semibold">
              Recent predictions
            </h2>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">

                <tr>

                  <th className="px-6 py-4">
                    Date
                  </th>

                  <th className="px-6 py-4">
                    Result
                  </th>

                  <th className="px-6 py-4">
                    Probability
                  </th>

                  <th className="px-6 py-4">
                    Confidence
                  </th>

                </tr>

              </thead>


              <tbody>

                {history.map(
                  (item) => (

                    <tr
                      key={item._id}
                      className="border-t border-slate-100"
                    >

                      <td className="px-6 py-4 text-slate-500">

                        {new Date(
                          item.createdAt
                        ).toLocaleString()}

                      </td>


                      <td className="px-6 py-4 font-medium">

                        {item.label}

                      </td>


                      <td className="px-6 py-4">

                        {(
                          item.purchaseProbability
                          * 100
                        ).toFixed(1)}%

                      </td>


                      <td className="px-6 py-4">

                        {item.confidenceLevel}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </main>

  );

}


function MetricCard({
  icon: Icon,
  label,
  value
}) {

  return (

    <div className="rounded-xl border border-slate-200 bg-white p-6">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <Icon
          size={18}
          className="text-slate-400"
        />

      </div>


      <p className="mt-4 text-3xl font-semibold">
        {value}
      </p>

    </div>

  );

}


export default Dashboard;