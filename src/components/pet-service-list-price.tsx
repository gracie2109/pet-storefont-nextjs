import {formatPrice} from "@/lib/helpers";

export function PetServiceListPrice({services, weights, petId}: {
    services: any,
    weights: any[],
    petId: string
}) {

    return (
        <section id="pet_table_services">
            {services?.data ? (
                <div>
                    <div className="overflow-x-auto">
                        <table className="table-auto">
                            <thead>
                            <tr>
                                <th className="border border-orange-400 cursor-pointer  ">
                                    {services?.petId?.name}
                                </th>
                                {Object.keys(services?.data)?.map((key, index) => {
                                    const serviceInfo = services?.data[key]?.[0]?.serviceId?.name;
                                    return (

                                        <th key={index}
                                            className="border border-orange-400 px-4 py-2 truncate max-w-[41px] has-tooltip_tw">
                                                     <span
                                                         className='tooltip_tw p-2 rounded bg-black text-white text-sm'>
                                                              {serviceInfo}
                                                     </span>
                                            {serviceInfo}
                                        </th>

                                    )
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {weights?.map((weight, weightIndex) => (
                                <tr key={weightIndex} className="relative">
                                    <td className="border border-orange-400 px-4 py-2 h-[41px]">{weight?.name}</td>
                                    {Object.keys(services?.data)?.map((key, index) => {
                                        return (
                                            <td key={index} className="border border-orange-400 px-4 py-2 h-[41px]">
                                                <>
                                                    {services?.data[key]?.map((service: any, serviceIndex: any) => {
                                                        if (service.weightId?.id === weight.id) {
                                                            return (
                                                                <div key={`${index}-${serviceIndex}`}
                                                                   >
                                                                    <div className="h-[41px] w-full ">
                                                                        <input disabled
                                                                               className="select-none h-full grid place-items-center rounded w-[90%]  text-center"
                                                                               type="text" readOnly={true}
                                                                               value={service?.price ? formatPrice(service?.price) : ""}/>
                                                                    </div>
                                                                </div>
                                                            )
                                                        } else {
                                                            return <td key={`${index}-${serviceIndex}`}></td>;
                                                        }
                                                    })}
                                                </>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            ) : (
                <>Something went wrong </>
            )}

        </section>
    )
}