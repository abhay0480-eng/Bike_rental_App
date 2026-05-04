import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const chartData = [
    { name: "Jan", amt: 400  },
    { name: "Feb", amt: 100  },
    { name: "Mar", amt: 1850 },
    { name: "Apr", amt: 2100 },
    { name: "May", amt: 1900 },
    { name: "Jun", amt: 2300 },
    { name: "Jul", amt: 2500 },
    { name: "Aug", amt: 2200 },
    { name: "Sep", amt: 2750 },
    { name: "Oct", amt: 3100 },
    { name: "Nov", amt: 2900 },
    { name: "Dec", amt: 3400 },
]

const transactions = [
    { id: 1, amount: "₹720",  date: "1 Dec, 2022" },
    { id: 2, amount: "₹840",  date: "14 Dec, 2022" },
    { id: 3, amount: "₹700",  date: "28 Dec, 2022" },
]

export const Income = () => (
    <div className="flex flex-col gap-8">

        {/* ── header ── */}
        <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Income</h1>
            <p className="text-slate-500 text-sm mt-0.5">Last 30 days</p>
        </div>

        {/* ── total ── */}
        <div className="bg-orange-500 rounded-2xl p-6 text-white">
            <p className="text-orange-100 text-sm font-medium mb-1">Total earned</p>
            <p className="text-4xl font-extrabold">₹2,260</p>
            <p className="text-orange-200 text-xs mt-2">+12% from last month</p>
        </div>

        {/* ── chart ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="font-bold text-slate-700 text-sm mb-5">Monthly earnings</p>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barCategoryGap="30%">
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                        contentStyle={{
                            background: "#fff",
                            border: "1px solid #f1f5f9",
                            borderRadius: 12,
                            fontSize: 12,
                        }}
                        formatter={(v: number) => [`₹${v}`, "Earned"]}
                    />
                    <Bar dataKey="amt" fill="#FF8C38" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* ── transactions ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-800 text-sm">
                    Transactions ({transactions.length})
                </h2>
                <span className="text-slate-400 text-xs">Last 30 days</span>
            </div>
            <div className="divide-y divide-slate-50">
                {transactions.map(({ id, amount, date }) => (
                    <div
                        key={id}
                        className="flex items-center justify-between px-5 py-4"
                    >
                        <div>
                            <p className="font-bold text-slate-800 text-sm">{amount}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{date}</p>
                        </div>
                        <span className="text-xs font-semibold text-green-500
                                         bg-green-50 px-2.5 py-1 rounded-full">
                            Paid
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
)