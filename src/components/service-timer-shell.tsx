'use client'

import {useMounted} from "@/hooks/use-mounted";


interface Props {
    weights?: any[],
    pets?:any[]
}
export   function ServiceTimerShell ({weights, pets}: Props) {
    console.log("pers", pets?.length)
    const mounted = useMounted()

   if(mounted) return (
        <div>
            <table >

                <tr>
                    <th rowSpan={2}>weights</th>
                    <th colSpan={2} rowSpan={1}>Qty.</th>
                    <tr>
                        <td>Cat</td>
                        <td>Dog</td>
                    </tr>
                </tr>

                <tr>
                    <td>Paper (Case)</td>
                    <td>10</td>
                    <td>123123</td>
                </tr>
                <tr>
                    <td>Wastepaper Baskets</td>
                    <td>2</td>
                    <td>dada</td>
                </tr>

            </table>
            <table className={"table border border-primary min-w-screen-md"}>
                <thead>
                <tr className="border border-primary">
                    <th className="border border-primary">Weights</th>
                    <th className="border border-primary" colSpan={2} rowSpan={2}> Pets</th>

                </tr>
                </thead>
                <tbody>


                {weights && weights.map((i, ii) => (
                    <>
                        <tr className="border border-primary" key={ii}>
                            <td className="border border-primary"> {i.name} </td>
                            <td className="border border-primary">
                                <input type="text" placeholder=''/>
                            </td>
                            <td className="border border-primary">
                                <input type="text" placeholder=''/>
                            </td>
                        </tr>


                    </>
                ))}
                </tbody>
            </table>

        </div>
    )
}