import { formatCurrency } from "../helpers/formatCurrency";

export function StatItem({ name, value, type, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50">
      <p className="text-gray-500">{name}</p>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {type === "currency" ? formatCurrency(value) : value}
      </h2>
    </div>
  );
}
