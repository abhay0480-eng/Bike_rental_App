import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { H2 } from "../../ui/typography/H2"
import { Ptag } from "../../ui/typography/PTag"


export const Income = () => {
    const formatAxisTick = (value: any): string => {
        return `${value}`;
    };
    return (
        <div >
            <H2>Income</H2>
            <Ptag>Last 30 days</Ptag>
            <H2 size="5xl">₹2,260</H2>
            <div className="my-10">
                <ResponsiveContainer
                    height={400}
                    width="50%"
                >
                    <BarChart
                        accessibilityLayer
                        barCategoryGap="20%"
                        barGap={2}
                        data={[
                            {
                                "name": "Jan",
                                "amt": 1400
                            },
                            {
                                "name": "Feb",
                                "amt": 1400
                            },
                            {
                                "name": "Mar",
                                "amt": 1850
                            },
                            {
                                "name": "Apr",
                                "amt": 2100
                            },
                            {
                                "name": "May",
                                "amt": 1900
                            },
                            {
                                "name": "Jun",
                                "amt": 2300
                            },
                            {
                                "name": "Jul",
                                "amt": 2500
                            },
                            {
                                "name": "Aug",
                                "amt": 2200
                            },
                            {
                                "name": "Sep",
                                "amt": 2750
                            },
                            {
                                "name": "Oct",
                                "amt": 3100
                            },
                            {
                                "name": "Nov",
                                "amt": 2900
                            },
                            {
                                "name": "Dec",
                                "amt": 3400
                            }
                        ]}
                        layout="horizontal"
                        margin={{
                            bottom: 0,
                            left: 0,
                            right: 0,
                            top: 0
                        }}
                        stackOffset="none"
                        syncMethod="index"
                        throttleDelay="raf"
                        throttledEvents={[
                            'mousemove',
                            'touchmove',
                            'pointermove',
                            'scroll',
                            'wheel'
                        ]}
                    >
                        <XAxis
                            dataKey="name"
                            tickFormatter={formatAxisTick}
                            label={{ position: 'insideBottomRight', value: '', offset: -10 }}
                        />
                        <YAxis label={{ position: 'insideTopLeft', value: '', angle: -90, dy: 60 }} />
                        <Bar dataKey="amt" fill="#FF8C38" />
                        {/* <RechartsHookInspector /> */}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="w-[50%]">
                <div className="flex justify-between items-center">
                    <H2>Your transactions (3) </H2>
                    <Ptag>Last 30 days</Ptag>
                </div>
                <div>
                    <div className="flex justify-between items-center bg-[#FFF7ED] my-5 rounded px-5 py-3">
                        <H2>$720</H2>
                        <p>1/12/22</p>
                    </div>
                    <div className="flex justify-between items-center bg-[#FFF7ED] my-5 rounded px-5 py-3">
                        <H2>$720</H2>
                        <p>1/12/22</p>
                    </div>
                    <div className="flex justify-between items-center bg-[#FFF7ED] my-5 rounded px-5 py-3">
                        <H2>$720</H2>
                        <p>1/12/22</p>
                    </div>
                </div>
            </div>
        </div>
    )
}