import ViewCountChart from "../../Components/Chart";

const AnalyticsSection = () => (
  <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-4 shadow-xl shadow-black/20 sm:p-5">
    <div className="mb-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-blue)">
        Analytics
      </p>
      <h3 className="mt-1 text-lg font-black text-white">View trend</h3>
    </div>
    <ViewCountChart />
  </section>
);

export default AnalyticsSection;
