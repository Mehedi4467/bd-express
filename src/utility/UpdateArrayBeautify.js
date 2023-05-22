export const UpdateFinalArray = (data)=>{
    const cartons= []
    const mother_carton = []

    for(let item of data){
        cartons.push({
            carton_no:item?.carton_no,
            mother_carton:parseInt(item?.mother_carton),
            weight:parseFloat(item?.weight),
            route:item?.route,
            item:item?.item,
        })

        if(mother_carton?.find(carton=>carton?.carton_no === parseInt(item?.mother_carton))){
           const main = mother_carton?.find(carton=>carton?.carton_no === parseInt(item?.mother_carton))
           const index = mother_carton.indexOf(main);
           mother_carton[index].total_weight = parseFloat(mother_carton[index].total_weight) + parseFloat(item?.weight);
           mother_carton[index].route =data?.find((routeItem)=> routeItem?.route === "HK") ? "HK" : "GZ";
        }else{
            mother_carton.push({
                carton_no:parseInt(item?.mother_carton),
                // total_weight:parseFloat(item?.finalWeight),
                total_weight:parseFloat(item?.weight),
                route:item?.route,
            })
        }
    }

    if(cartons?.every(cartonitem=> cartonitem?.carton_no && cartonitem?.mother_carton && cartonitem?.mother_carton && cartonitem?.weight && cartonitem?.item.length > 0) && mother_carton.every(motherCarton=> motherCarton?.carton_no && motherCarton?.total_weight && motherCarton?.route)){
        return {cartons,mother_carton}
    }else{
        return false
    }
}