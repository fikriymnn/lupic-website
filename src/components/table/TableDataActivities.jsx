const arry = {
        no: "1.1.1",
        goals:"Holding chemistry education expert consulting meetings (once a year)",

    }
    "2-Days wokshop (Venue: Bandung, June 2023)"
export default function TableDataActivities({point,sub_point,sub_sub_point,text,upi,unnes,undiksha}) {
    return (
       
            <tr className="w-full">
                <td className="py-3 md:px-3 px-2 border-2">
                    {point}.{sub_point}.{sub_sub_point}
                </td>
                <td className="py-3 md:px-3 px-2 border-2">
                {text}
                </td>
                <td className="py-3 md:px-3 px-2 border-2">
                {upi}
                </td>
                <td className="py-3 md:px-3 px-2 border-2">
                {unnes}
                </td>
                <td className="py-3 md:px-3 px-2 border-2">
                {undiksha}
                </td>
            </tr>
    
    )
}