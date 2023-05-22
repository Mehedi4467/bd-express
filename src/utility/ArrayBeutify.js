export const FinalArray = (data)=>{

    const cartons= []
    const mother_carton = []

    for(let item of data){
        cartons.push({
            carton_no:+item?.carton,
            mother_carton:parseInt(item?.cartonNumber),
            weight:parseFloat(item?.weigth),
            route:item?.route,
            item:item?.items,
        })

        if(mother_carton?.find(carton=>carton?.carton_no === parseInt(item?.cartonNumber))){
           const main = mother_carton?.find(carton=>carton?.carton_no === parseInt(item?.cartonNumber))
           const index = mother_carton.indexOf(main);
           mother_carton[index].total_weight = parseFloat(mother_carton[index].total_weight) + parseFloat(item?.weigth);
           mother_carton[index].route =data?.find((routeItem)=> routeItem?.route === "HK") ? "HK" : "GZ";
        }else{
            mother_carton.push({
                carton_no:parseInt(item?.cartonNumber),
                // total_weight:parseFloat(item?.finalWeight),
                total_weight:parseFloat(item?.weigth),
                route:item?.route,
            })
        }
    }

    // console.log(mother_carton)

    if(cartons?.every(cartonitem=> cartonitem?.carton_no && cartonitem?.mother_carton && cartonitem?.mother_carton && cartonitem?.weight && cartonitem?.item.length > 0) && mother_carton.every(motherCarton=> motherCarton?.carton_no && motherCarton?.total_weight && motherCarton?.route)){
        return {cartons,mother_carton}
    }else{
        return false
    }
}